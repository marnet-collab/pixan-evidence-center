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
  assert.equal(await page.locator("#germany-retail-summary tbody tr").count(), 1);
  assert.equal(await page.locator("#germany-retail-observations tbody tr").count(), 10);
  assert.equal(await page.locator("#germany-retail-stress tbody tr").count(), 3);
  assert.match(await page.locator("#germany-retail-summary").innerText(), /9,49 €/);
  assert.match(await page.locator("#germany-retail-stress").innerText(), /1,4235 mrd €/);
  await page.locator("#germany-retail-summary").screenshot({ path: `/tmp/pixan-germany-summary-${label}.png` });
  await page.locator("#germany-retail-stress").screenshot({ path: `/tmp/pixan-germany-stress-${label}.png` });

  await page.locator('[data-view="customs"]').dispatchEvent("click");
  await page.waitForSelector('[data-view-panel="customs"].active');
  assert.equal(await page.locator("#korea-summary tbody tr").count(), 3);
  assert.equal(await page.locator("#korea-hsk10 tbody tr").count(), 7);
  assert.equal(await page.locator("#korea-origins tbody tr").count(), 53);
  assert.match(await page.locator("#korea-summary").innerText(), /148,5 milj\. USD/);
  assert.match(await page.locator("#korea-hsk10").innerText(), /2404121000/);
  assert.match(await page.locator("#korea-hsk10").innerText(), /2404199010/);
  await page.locator("#korea-summary").screenshot({ path: `/tmp/pixan-korea-summary-${label}.png` });
  await page.locator("#korea-hsk10").screenshot({ path: `/tmp/pixan-korea-hsk10-${label}.png` });
  assert.equal(errors.length, 0, errors.join("\n"));

  if (label === "desktop") {
    for (const relative of [
      "data/canada/canada_retail_price_observations_2026-07-17.csv",
      "data/canada/canada_retail_health_comparison_2026-07-17.csv",
      "data/canada/canada_retail_stress_test_2026-07-17.csv",
      "data/canada/canada_retail_price_manifest_2026-07-17.json",
      "data/raw/canada_retail/canada_retail_capture_manifest_2026-07-17.json",
      "data/germany/germany_retail_price_observations_2026-07-17.csv",
      "data/germany/germany_retail_price_summary_2026-07-17.csv",
      "data/germany/germany_retail_stress_test_2026-07-17.csv",
      "data/germany/germany_retail_source_excerpts_2026-07-17.json",
      "data/germany/germany_retail_price_manifest_2026-07-17.json",
      "data/raw/germany_official/destatis_2025_taxed_substitutes.html",
      "data/raw/germany_official/tobacco_tax_act_section_2.html",
      "data/china/china_gacc_access_manifest_2026-07-17.json",
      "data/korea/korea_customs_hs6_totals_2025.csv",
      "data/korea/korea_customs_hs6_monthly_2025.csv",
      "data/korea/korea_customs_hs6_import_origins_2025.csv",
      "data/korea/korea_customs_hsk10_classification_2025.csv",
      "data/korea/korea_customs_hs6_manifest_2025.json",
      "data/raw/korea_customs/kcs_hs6_annual_2025.json",
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
  process.stdout.write("Dashboard QA passed: Canada pricing 3/10/3, Germany pricing 1/10/3, no runtime errors, mobile body fits viewport.\n");
} finally {
  await browser.close();
}
