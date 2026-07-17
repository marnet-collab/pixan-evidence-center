#!/usr/bin/env node

import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = process.argv[2] || "http://127.0.0.1:8765/";
const browser = await chromium.launch({ headless: true });

async function check(viewport, label) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));

  const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200);
  await page.locator('[data-view="pricing"]').dispatchEvent("click");
  await page.waitForSelector('[data-view-panel="pricing"].active');

  assert.equal(await page.locator("#canada-retail-summary tbody tr").count(), 3);
  assert.equal(await page.locator("#canada-retail-observations tbody tr").count(), 10);
  assert.equal(await page.locator("#canada-retail-comparison tbody tr").count(), 3);
  assert.equal(await page.locator("#stress-wrap .stress-card").count(), 2);
  assert.match(await page.locator("#canada-retail-observations").innerText(), /STLTH X Geek Bar/);
  assert.match(await page.locator("#canada-retail-observations").innerText(), /50,99 CAD/);
  assert.match(await page.locator("#canada-retail-comparison").innerText(), /2,403×/);
  assert.equal(errors.length, 0, errors.join("\n"));

  if (label === "desktop") {
    for (const relative of [
      "data/canada/canada_retail_price_observations_2026-07-17.csv",
      "data/canada/canada_retail_health_comparison_2026-07-17.csv",
      "data/canada/canada_retail_stress_test_2026-07-17.csv",
      "data/canada/canada_retail_price_manifest_2026-07-17.json",
      "data/raw/canada_retail/canada_retail_capture_manifest_2026-07-17.json",
      "assets/pixan_pankkiliite.pdf",
    ]) {
      const asset = await context.request.get(new URL(relative, baseUrl).href);
      assert.equal(asset.status(), 200, `${relative} returned ${asset.status()}`);
    }
  }

  if (label === "mobile") {
    const dimensions = await page.evaluate(() => ({
      body: document.body.scrollWidth,
      viewport: window.innerWidth,
    }));
    assert.ok(dimensions.body <= dimensions.viewport, `body overflow ${dimensions.body} > ${dimensions.viewport}`);
  }

  await page.screenshot({ path: `/tmp/pixan-dashboard-${label}.png`, fullPage: true });
  await context.close();
}

try {
  await check({ width: 1440, height: 1000 }, "desktop");
  await check({ width: 390, height: 844 }, "mobile");
  process.stdout.write("Dashboard QA passed: pricing tables 3/10/3, no runtime errors, mobile body fits viewport.\n");
} finally {
  await browser.close();
}
