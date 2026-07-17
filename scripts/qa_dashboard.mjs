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
  assert.equal(await page.locator("#france-summary tbody tr").count(), 4);
  assert.equal(await page.locator("#france-route tbody tr").count(), 4);
  assert.equal(await page.locator("#france-anses tbody tr").count(), 8);
  assert.equal(await page.locator("#france-coverage tbody tr").count(), 3);
  assert.match(await page.locator("#france-summary").innerText(), /363,940 milj\. €/);
  assert.match(await page.locator("#france-summary").innerText(), /229,615 milj\. €/);
  assert.match(await page.locator("#france-route").innerText(), /0,030 %/);
  assert.match(await page.locator("#france-anses").innerText(), /203[\s\u00a0]181 ilmoitusriviä/);
  assert.match(await page.locator("#france-coverage").innerText(), /35,010 %/);
  assert.match(await page.locator("#france-coverage").innerText(), /Viestiä ei ole lähetetty/);
  assert.equal(await page.evaluate(() => window.PIXAN_DATA.franceEvidence.monthly.length), 48);
  assert.equal(await page.evaluate(() => window.PIXAN_DATA.franceEvidence.manifest.audit_checks.anses_public_registry_contains_sales_field), false);
  await page.locator("#france-summary").screenshot({ path: `/tmp/pixan-france-summary-${label}.png` });
  await page.locator("#france-coverage").screenshot({ path: `/tmp/pixan-france-coverage-${label}.png` });
  assert.equal(await page.locator("#korea-summary tbody tr").count(), 3);
  assert.equal(await page.locator("#korea-hsk10 tbody tr").count(), 7);
  assert.equal(await page.locator("#korea-origins tbody tr").count(), 53);
  assert.match(await page.locator("#korea-summary").innerText(), /148,5 milj\. USD/);
  assert.match(await page.locator("#korea-hsk10").innerText(), /2404121000/);
  assert.match(await page.locator("#korea-hsk10").innerText(), /2404199010/);
  await page.locator("#korea-summary").screenshot({ path: `/tmp/pixan-korea-summary-${label}.png` });
  await page.locator("#korea-hsk10").screenshot({ path: `/tmp/pixan-korea-hsk10-${label}.png` });

  await page.locator('[data-view="taxes"]').dispatchEvent("click");
  await page.waitForSelector('[data-view-panel="taxes"].active');
  assert.equal(await page.locator("#spain-aeat-summary tbody tr").count(), 4);
  assert.equal(await page.locator("#spain-aeat-revenue tbody tr").count(), 9);
  assert.equal(await page.locator("#spain-aeat-rates tbody tr").count(), 4);
  assert.equal(await page.locator("#spain-aeat-sensitivity tbody tr").count(), 3);
  assert.match(await page.locator("#spain-aeat-summary").innerText(), /29,568 milj\. €/);
  assert.match(await page.locator("#spain-aeat-revenue").innerText(), /5,311 milj\. €/);
  assert.match(await page.locator("#spain-aeat-rates").innerText(), /L1/);
  assert.match(await page.locator("#spain-aeat-rates").innerText(), /L4/);
  assert.match(await page.locator("#spain-aeat-sensitivity").innerText(), /ei toteutunut volyymi/i);
  await page.locator("#spain-aeat-summary").screenshot({ path: `/tmp/pixan-spain-summary-${label}.png` });
  await page.locator("#spain-aeat-revenue").screenshot({ path: `/tmp/pixan-spain-revenue-${label}.png` });
  assert.equal(await page.locator("#italy-adm-summary tbody tr").count(), 4);
  assert.equal(await page.locator("#italy-adm-rates tbody tr").count(), 4);
  assert.equal(await page.locator("#italy-adm-forecast tbody tr").count(), 6);
  assert.equal(await page.locator("#italy-adm-forecast tfoot tr").count(), 3);
  assert.equal(await page.locator("#italy-adm-flows tbody tr").count(), 3);
  assert.match(await page.locator("#italy-adm-summary").innerText(), /1[\s\u00a0]107[\s\u00a0]249[\s\u00a0]007 ml/);
  assert.match(await page.locator("#italy-adm-summary").innerText(), /Ei toteutunut myynti tai verokertymä/);
  assert.match(await page.locator("#italy-adm-rates").innerText(), /0,146966 €/);
  assert.match(await page.locator("#italy-adm-forecast").innerText(), /Virallinen ennuste - ei toteuma/i);
  await page.locator("#italy-adm-summary").screenshot({ path: `/tmp/pixan-italy-summary-${label}.png` });
  await page.locator("#italy-adm-forecast").screenshot({ path: `/tmp/pixan-italy-forecast-${label}.png` });
  assert.equal(await page.locator("#poland-summary tbody tr").count(), 4);
  assert.equal(await page.locator("#poland-volume tbody tr").count(), 6);
  assert.equal(await page.locator("#poland-revision tbody tr").count(), 2);
  assert.equal(await page.locator("#poland-reconciliation tbody tr").count(), 3);
  assert.equal(await page.locator("#poland-controls tbody tr").count(), 5);
  assert.equal(await page.locator("#poland-route tbody tr").count(), 4);
  assert.match(await page.locator("#poland-summary").innerText(), /805[\s\u00a0]441 litraa/);
  assert.match(await page.locator("#poland-summary").innerText(), /993,1 milj\. PLN/);
  assert.match(await page.locator("#poland-revision").innerText(), /8,850 %/);
  assert.match(await page.locator("#poland-reconciliation").innerText(), /0,137 %/);
  assert.match(await page.locator("#poland-controls").innerText(), /36,007 %/);
  assert.match(await page.locator("#poland-route").innerText(), /210,580 milj\. €/);
  assert.equal(await page.evaluate(() => window.PIXAN_DATA.polandEvidence.manifest.audit.eurostat_world_equals_intra_plus_extra_for_published_import_rows), true);
  await page.locator("#poland-summary").screenshot({ path: `/tmp/pixan-poland-summary-${label}.png` });
  await page.locator("#poland-controls").screenshot({ path: `/tmp/pixan-poland-controls-${label}.png` });
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
      "data/italy/italy_adm_rate_schedule_2025.csv",
      "data/italy/italy_adm_reporting_fields_2026-07-17.csv",
      "data/italy/italy_fiscal_forecast_2026_2028.csv",
      "data/italy/italy_adm_request_scope_2026-07-17.csv",
      "data/italy/italy_adm_access_manifest_2026-07-17.json",
      "data/raw/italy_adm/adm_pli_monthly_reporting_template.xlsx",
      "data/raw/italy_adm/adm_pli_rate_2025-01.pdf",
      "data/raw/italy_adm/adm_pli_rate_2025-02.pdf",
      "data/raw/italy_adm/italy_budget_2026_table17_page.pdf",
      "data/spain/spain_aeat_net_revenue_monthly_2025.csv",
      "data/spain/spain_aeat_573_rates_2025.csv",
      "data/spain/spain_aeat_liquid_sensitivity_2025.csv",
      "data/spain/spain_aeat_request_scope_2026-07-17.csv",
      "data/spain/spain_aeat_access_manifest_2026-07-17.json",
      "data/raw/spain_aeat/aeat_special_excise_report_2025.pdf",
      "data/raw/spain_aeat/aeat_monthly_revenue_2025-12.pdf",
      "data/raw/spain_aeat/boe_order_hac_86_2025_model_573.pdf",
      "data/france/france_douane_cn8_2025.csv",
      "data/france/france_douane_monthly_2025.csv",
      "data/france/france_douane_top_origins_2025.csv",
      "data/france/france_route_bridge_2025.csv",
      "data/france/france_anses_registry_audit_2026-07-01.csv",
      "data/france/france_anses_product_types_2026-07-01.csv",
      "data/france/france_anses_sales_coverage_2016_2017.csv",
      "data/france/france_evidence_manifest_2026-07-17.json",
      "data/raw/france_douane/Description-des-jeux-de-donnees-derniere-publication_EMEBI.pdf",
      "data/raw/france_douane/eurostat_france_cn8_2025.json",
      "data/raw/france_anses/anses_vaping_declarations_report_2016_2020.pdf",
      "assets/pixan_france_official_evidence_2025.xlsx",
      "data/poland/poland_mf_e_liquid_volume_2020_2023.csv",
      "data/poland/poland_mf_excise_revenue_2021_2025.csv",
      "data/poland/poland_mf_excise_categories_2025.csv",
      "data/poland/poland_2023_revision_bridge.csv",
      "data/poland/poland_excise_volume_reconciliation_2021_2023.csv",
      "data/poland/poland_kas_controls_2021_2026.csv",
      "data/poland/poland_eurostat_route_2025.csv",
      "data/poland/poland_evidence_manifest_2026-07-17.json",
      "data/raw/poland_mf/mf_interpellation_7255_volume_2020_2023.pdf",
      "data/raw/poland_mf/mf_interpellation_2408_revenue_controls_2021_2023.pdf",
      "data/raw/poland_mf/mf_interpellation_17526_excise_execution_2025.pdf",
      "data/raw/poland_mf/akc_4_m_3_current.pdf",
      "data/raw/poland_mf/eurostat_poland_cn8_2025.json",
      "assets/pixan_poland_official_evidence_2020_2026.xlsx",
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
  process.stdout.write("Dashboard QA passed: Poland MF/KAS 4 summary/6 annual/2 revision/3 reconciliation/5 controls/4 route rows, France Douane 4 codes/48 monthly rows/4 route rows and ANSES 8 product types/3 coverage rows, Canada pricing 3/10/3, Germany pricing 1/10/3, Spain AEAT 9 revenue rows/4 rates/3 scenarios, Italy ADM 4 rates/6 forecast rows/3 reporting flows, no runtime errors, mobile body fits viewport.\n");
} finally {
  await browser.close();
}
