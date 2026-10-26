"""Divide un componente Astro en subcomponentes.
Uso: split.py <componente.astro> <prefijo> <nombre:inicio:fin> ...
(líneas 1-indexadas e inclusivas del marcado a extraer).
Reparte las reglas CSS del <style> por presencia de clases/ids en el marcado de cada parte;
duplica reglas compartidas; lleva @keyframes donde se usan. Aborta si una regla no cabe en ninguna parte."""
import sys, re, pathlib, tinycss2
src = pathlib.Path(sys.argv[1]); prefix = sys.argv[2]
specs = [(a.split(":")[0], int(a.split(":")[1]), int(a.split(":")[2])) for a in sys.argv[3:]]
text = src.read_text(encoding="utf-8"); lines = text.split("\n")
# localizar el <style> principal (el último bloque <style> de nivel superior)
sm = [m for m in re.finditer(r"^<style>\n(.*?)^</style>", text, re.S|re.M)]
assert len(sm) == 1, f"bloques <style> de nivel superior: {len(sm)}"
css = sm[0].group(1)
style_start_line = text[:sm[0].start()].count("\n")+1
for _,a,b in specs: assert b < style_start_line
parts = {n: "\n".join(lines[a-1:b]) for n,a,b in specs}
rest_lines = list(lines); 
for n,a,b in sorted(specs, key=lambda s:-s[1]):
    ind = re.match(r"\s*", lines[a-1]).group(0)
    rest_lines[a-1:b] = [f"{ind}<{prefix}{n} />"]
rest_text = "\n".join(rest_lines)
rest_markup = rest_text[:rest_text.index("<style>\n" + css)] if ("<style>\n"+css) in rest_text else rest_text
def tokens(markup):
    cls=set()
    for m in re.finditer(r'class(?::list)?="([^"]*)"', markup): cls.update(m.group(1).split())
    ids=set(re.findall(r'\bid="([^"]+)"', markup))
    tags=set(t.lower() for t in re.findall(r"<([a-zA-Z][a-zA-Z0-9-]*)", markup))
    return cls, ids, tags
T = {n: tokens(m) for n,m in parts.items()}; T["__parent__"] = tokens(rest_markup)
def sel_needs(sel):
    s = re.sub(r":global\([^)]*\)", "", sel)
    s = re.sub(r"::?[a-zA-Z-]+(\([^)]*\))?", "", s)
    s = re.sub(r"\[[^\]]*\]", "", s)
    return set(re.findall(r"\.([A-Za-z0-9_-]+)", s)), set(re.findall(r"#([A-Za-z0-9_-]+)", s)), set(t.lower() for t in re.findall(r"(?:^|[\s>+~(,])([a-zA-Z][a-zA-Z0-9]*)", s))
ALLC=set().union(*[v[0] for v in T.values()])
def fits(P, sel):
    c,i,t = sel_needs(sel); C,I,TG = T[P]
    c = c & ALLC  # clases solo añadidas por JS: no cuentan
    return c<=C and i<=I and (t - {"html","body"})<=TG
out = {n: [] for n in list(parts)+["__parent__"]}
keyframes = {}
problems = []
def assign(rule, wrapper=None):
    sel = tinycss2.serialize([t for t in rule.prelude if t.type!="comment"]).strip()
    targets = [P for P in out if all(fits(P, s.strip()) for s in sel.split(",") if s.strip())]
    if not targets:
        # admitir listas de selectores repartibles por partes
        targets = [P for P in out if any(fits(P, s.strip()) for s in sel.split(","))]
        if not targets: problems.append(sel); return
    body = tinycss2.serialize([rule])
    for P in targets: out[P].append((wrapper, body))
for node in tinycss2.parse_stylesheet(css, skip_whitespace=False, skip_comments=True):
    if node.type == "qualified-rule": assign(node)
    elif node.type == "at-rule" and node.lower_at_keyword == "keyframes":
        keyframes[tinycss2.serialize(node.prelude).strip()] = tinycss2.serialize([node])
    elif node.type == "at-rule" and node.lower_at_keyword in ("media","supports"):
        w = "@"+node.lower_at_keyword+" "+tinycss2.serialize(node.prelude).strip()
        for inner in tinycss2.parse_rule_list(node.content, skip_whitespace=True, skip_comments=True):
            if inner.type=="qualified-rule": assign(inner, w)
            else: problems.append("anidado:"+tinycss2.serialize([inner])[:60])
    elif node.type in ("whitespace","comment"): pass
    else: problems.append("desconocido:"+node.type)
if problems:
    print("ABORTA: reglas sin destino:"); [print("  ", p) for p in problems[:30]]; sys.exit(1)
def render(items):
    o=[]; cur=None
    for w,b in items:
        if w!=cur:
            if cur: o.append("  }")
            if w: o.append(f"  {w} {{")
            cur=w
        o.append(("    " if w else "  ")+b.strip().replace("\n","\n"+("    " if w else "  ")))
    if cur: o.append("  }")
    body="\n".join(o)
    used = [k for k in keyframes if re.search(r"\b"+re.escape(k)+r"\b", body)]
    return body + ("\n\n" + "\n\n".join("  "+keyframes[k].strip().replace("\n","\n  ") for k in used) if used else "")
d = src.parent
for n in parts:
    (d/f"{prefix}{n}.astro").write_text(f"---\n// {prefix}{n}.astro — extraído de {src.name}\n---\n\n" + "\n".join(l[4:] if l.startswith("    ") else l for l in parts[n].split("\n")) + "\n\n<style>\n" + render(out[n]) + "\n</style>\n", encoding="utf-8")
fm_end = rest_text.index("---", 3)
imports = "".join(f"import {prefix}{n} from './{prefix}{n}.astro';\n" for n in parts)
rest_text = rest_text[:fm_end] + imports + rest_text[fm_end:]
rest_text = rest_text.replace("<style>\n"+css+"</style>", "<style>\n"+render(out["__parent__"])+"\n</style>")
src.write_text(rest_text, encoding="utf-8")
for P in out: print(P, "reglas:", len(out[P]))
