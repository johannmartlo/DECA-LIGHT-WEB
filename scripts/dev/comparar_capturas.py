import sys
from PIL import Image, ImageChops
a_,b_=sys.argv[1],sys.argv[2]
for t in "md":
    a=Image.open(f"capturas/{a_}-{t}.png").convert("RGB"); b=Image.open(f"capturas/{b_}-{t}.png").convert("RGB")
    if a.size!=b.size: print(t,"TAMAÑO",a.size,b.size); continue
    d=ImageChops.difference(a,b).convert("L").point(lambda v:255 if v>16 else 0)
    print(t,a.size,"diferencias:",d.getbbox(), sum(d.histogram()[255:]))
