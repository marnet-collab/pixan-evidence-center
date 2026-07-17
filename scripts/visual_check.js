const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const outputDir = path.resolve(__dirname, "..", ".visual-check");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:8765", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outputDir, "desktop-overview.png"), fullPage: true });
  await page.click('[data-view="taxes"]');
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(outputDir, "desktop-taxes.png"), fullPage: true });
  await page.click('[data-view="customs"]');
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(outputDir, "desktop-customs.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:8765", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outputDir, "mobile-overview.png"), fullPage: true });
  console.log(JSON.stringify({ title: await page.title(), errors, bodyWidth: await page.evaluate(() => document.body.scrollWidth), viewportWidth: 390 }));
  await browser.close();
  if (errors.length) process.exitCode = 1;
})();
