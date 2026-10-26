import { chromium } from 'playwright';
const [,, url, out] = process.argv;
const b = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
for (const [w,h,tag] of [[390,844,'m'],[1440,900,'d']]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await p.goto(url, { waitUntil: 'networkidle' });
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 300) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(40); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(700);
  await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
  await p.screenshot({ path: `${out}-${tag}.png`, fullPage: true });
  await p.close();
}
await b.close();
