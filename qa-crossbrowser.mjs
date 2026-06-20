// One-off cross-browser QA (PRO-32): loads the site in WebKit (Safari engine)
// and Firefox (Gecko) at 3 breakpoints, checks for horizontal overflow + console
// errors, and screenshots each. Run: node qa-crossbrowser.mjs [url]
import { webkit, firefox } from "playwright";

const URL = process.argv[2] || "http://localhost:4350/";
const WIDTHS = [320, 768, 1440];
const ENGINES = [
  ["webkit", webkit],
  ["firefox", firefox],
];

const results = [];

for (const [name, type] of ENGINES) {
  const browser = await type.launch();
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)));
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 120)));
    await page.goto(URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const overflow = await page.evaluate(() => {
      const vw = window.innerWidth;
      const sw = document.documentElement.scrollWidth;
      const off = [];
      document.querySelectorAll("main *, footer *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > vw + 1 && !(el.className || "").toString().includes("blob"))
          off.push(el.tagName.toLowerCase() + "." + (el.className || "").toString().slice(0, 16));
      });
      return { vw, scrollW: sw, horizOverflow: sw > vw + 1, offenders: [...new Set(off)].slice(0, 6) };
    });
    const shot = `/tmp/pgqa/${name}-${width}.png`;
    await page.screenshot({ path: shot, fullPage: false });
    results.push({ engine: name, width, ...overflow, consoleErrors: errors, shot });
    await ctx.close();
  }
  await browser.close();
}

console.log(JSON.stringify(results, null, 1));
