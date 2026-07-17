/*
 * Source register for leads that are useful for triangulation but are not
 * currently accepted as a verified consumer-sales total.  Keep these rows
 * separate from A/B evidence: a portal can be official while the number is
 * still a proxy, survey estimate, classification result, or policy forecast.
 */
window.PIXAN_UNVERIFIED_SOURCES = [
  {
    id: "US-CDC-IRI-2020-2022",
    market: "USA",
    source: "CDC / Truth Initiative / CDC Foundation MMWR",
    type: "secondary retail scanner",
    status: "historical_proxy",
    measure: "UPC unit sales by product, flavour and brand (brick-and-mortar)",
    signal: "2020–2022 monthly unit-sales series is published and reproducible from the paper, but the licensed IRI data are not an open raw file.",
    caveat: "Excludes online retailers and tobacco-specialty/vape shops; not a current total market value.",
    next: "Request the underlying aggregate tables or obtain a current licensed scanner extract; compare with Census imports and state excise.",
    url: "https://www.cdc.gov/mmwr/volumes/72/wr/mm7225a1.htm",
    checked: "2026-07-17"
  },
  {
    id: "US-FTC-2019-2020",
    market: "USA",
    source: "Federal Trade Commission E-Cigarette Report",
    type: "official manufacturer report",
    status: "historical_partial",
    measure: "Reported manufacturer sales by cartridge, disposable and refill category",
    signal: "2018–2020 manufacturer-reported sales provide a historical cross-check.",
    caveat: "Coverage is incomplete and does not represent all brands, new entrants or all retail channels; not current market total.",
    next: "Ask FTC for the next aggregated release and the coverage universe; preserve manufacturer scope in any comparison.",
    url: "https://www.ftc.gov/system/files/ftc_gov/pdf/E-Cigarette%20Report%202019-20%20final.pdf",
    checked: "2026-07-17"
  },
  {
    id: "US-FDA-STPD",
    market: "USA",
    source: "FDA Searchable Tobacco Products Database",
    type: "official authorization register",
    status: "official_not_sales",
    measure: "Products that may be legally marketed, including e-cigarettes",
    signal: "Useful denominator for legal-product coverage and brand/SKU mapping.",
    caveat: "Authorization status is not a sales, shipment or market-share measure; unauthorized products can still appear in retail observations.",
    next: "Join authorized product names/identifiers to any future retail or state-tax data; do not infer units from the register.",
    url: "https://www.fda.gov/tobacco-products",
    checked: "2026-07-17"
  },
  {
    id: "US-FDA-RETAIL-INSPECTIONS",
    market: "USA",
    source: "FDA retail inspection and warning-letter databases",
    type: "official enforcement proxy",
    status: "official_not_sales",
    measure: "Retailer inspections, warning letters and civil-penalty actions",
    signal: "Shows enforcement intensity and unauthorized-product routes.",
    caveat: "Inspection counts are risk-based and cannot be converted into illegal-market share or sales volume.",
    next: "Aggregate by state, product and date; compare enforcement clusters with Census origin flows and state license lists.",
    url: "https://www.fda.gov/tobacco-products/compliance-enforcement-training/retail-sales-tobacco-products",
    checked: "2026-07-17"
  },
  {
    id: "EU-EUCEG-ART20-7",
    market: "EU-27",
    source: "EU-CEG / Tobacco Products Directive Article 20(7)",
    type: "official reporting route",
    status: "official_route_no_public_aggregate",
    measure: "Annual sales volumes by brand and product type reported to Member States",
    signal: "The legal reporting obligation gives a precise route for national aggregate requests.",
    caveat: "EU-CEG public access does not provide a complete open EU-wide sell-out table; annual sales field handling and national release practice vary.",
    next: "Send the same non-identifying request to each national EU-CEG authority and ask for numerator, denominator and suppression rules.",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32014L0040",
    checked: "2026-07-17"
  },
  {
    id: "EU-TEDB",
    market: "EU-27",
    source: "European Commission TEDB / Tobacco excise portal",
    type: "official tax rule database",
    status: "official_not_sales",
    measure: "National excise structures and rates",
    signal: "Provides comparable tax-rate inputs for price and tax stress tests.",
    caveat: "Tax rules and minimum-rate proposals are not realized sales, tax receipts or volume.",
    next: "Capture each country rate with effective date and reconcile to national receipts or millilitre returns.",
    url: "https://taxation-customs.ec.europa.eu/online-services/online-services-and-databases-taxation_en",
    checked: "2026-07-17"
  },
  {
    id: "EU-COMEXT-API",
    market: "EU-27",
    source: "Eurostat Comext REST API",
    type: "official customs API",
    status: "official_proxy",
    measure: "CN/HS trade values and quantities by partner and flow",
    signal: "Automatable route for repeated 2404 and device-code updates.",
    caveat: "Border trade is not domestic production, inventory change or retail sell-through; classification changes require HS revision control.",
    next: "Schedule monthly API refreshes, store query JSON and hash raw responses, then reconcile WORLD = intra + extra.",
    url: "https://ec.europa.eu/eurostat/web/user-guides/data-browser/api-data-access/api-introduction",
    checked: "2026-07-17"
  },
  {
    id: "CHINA-TAX-2022-33",
    market: "China",
    source: "State Tax Administration / Customs / Ministry of Finance announcement 2022 No.33",
    type: "official tax and classification rule",
    status: "official_not_sales",
    measure: "E-cigarette definition and production/import/wholesale tax framework",
    signal: "Defines pods, devices and combinations and the applicable tax structure from 1 Nov 2022.",
    caveat: "The rule is not a public national sales series; domestic transaction detail and company-level data are restricted.",
    next: "Request aggregated production, wholesale and export tables by code and province from GACC/State Tobacco Monopoly Administration.",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c102416/c5201994/content.html",
    checked: "2026-07-17"
  },
  {
    id: "CHINA-GACC-HS4",
    market: "China",
    source: "China Customs monthly Customs Statistics / HS4 2404",
    type: "official customs index",
    status: "official_aggregate_only",
    measure: "Monthly HS4 trade index and published customs classification",
    signal: "Confirms 2404 exists in the customs statistics frame and supports a formal data request.",
    caveat: "The public index is not the detailed product-level import/export value needed for a market total.",
    next: "File the GACC statistical-service request for HS8, partner, destination, transit and customs procedure fields.",
    url: "https://english.customs.gov.cn/Statics/730a6583-f241-4f04-a10b-af9c6ff8a164.html",
    checked: "2026-07-17"
  },
  {
    id: "JAPAN-CLASS-240412",
    market: "Japan",
    source: "Japan Customs advance classification ruling",
    type: "official tariff classification",
    status: "official_not_sales",
    measure: "Disposable e-cigarette classification 2404.12-000 and tariff/tax treatment",
    signal: "Provides a defensible product-code interpretation for filled disposable devices.",
    caveat: "A classification ruling does not establish national import quantity, retail sales or market value.",
    next: "Use the ruling as the code concordance, then pull 9-digit MOF/e-Stat monthly partner data and reconcile to annual totals.",
    url: "https://www.customs.go.jp/tetsuzuki_search/bunrui/J4/24/J42400321.htm",
    checked: "2026-07-17"
  },
  {
    id: "JAPAN-SEIZURE-2024",
    market: "Japan",
    source: "Japan Customs intellectual-property seizure statistics",
    type: "official enforcement proxy",
    status: "official_broad_category",
    measure: "Seizures under broad tobacco/smoking-implement category",
    signal: "Can identify enforcement pressure and potential illicit-route changes.",
    caveat: "The published category is broader than e-cigarettes and cannot be used as vape-unit volume.",
    next: "Request a vape-specific breakdown or keep only as a qualitative route-risk indicator.",
    url: "https://www.customs.go.jp/mizugiwa/chiteki/pages/statistics2024.pdf",
    checked: "2026-07-17"
  },
  {
    id: "KOREA-KCS-PORTAL",
    market: "South Korea",
    source: "Korea Customs Service Trade Statistics / Public Data Portal",
    type: "official customs portal",
    status: "official_access_pending",
    measure: "HS6/HS10 trade by month, partner, value and weight",
    signal: "The portal and API route exist; exact liquid sub-code values have not yet been captured in the public evidence pack.",
    caveat: "API key, query parameters and HSK revision must be preserved before a number is accepted.",
    next: "Obtain API access or a reproducible portal export for 240412/240419 and attach the raw response and query manifest.",
    url: "https://www.data.go.kr/en/data/15101612/openapi.do",
    checked: "2026-07-17"
  },
  {
    id: "AU-ABS-TRADE",
    market: "Australia",
    source: "Australian Bureau of Statistics international merchandise trade",
    type: "official customs data",
    status: "official_route_pending",
    measure: "Customs administrative import/export cubes and API",
    signal: "A structured non-patent-region benchmark and Asia-Pacific route source.",
    caveat: "Confidentiality and HS concordance can suppress or aggregate vape-specific rows; no sell-out is implied.",
    next: "Query 2404 and device headings, capture suppression flags and compare with ABF tariff classification.",
    url: "https://www.abs.gov.au/statistics/economy/international-trade/international-trade-goods/latest-release",
    checked: "2026-07-17"
  },
  {
    id: "SG-CUSTOMS-PROHIBITED",
    market: "Singapore",
    source: "Singapore Customs controlled/prohibited goods and HS classifier",
    type: "official legal/enforcement route",
    status: "official_no_legal_sales",
    measure: "Import prohibition and product-code classification for e-vaporisers",
    signal: "Useful for excluding Singapore domestic legal sales and flagging seizure/enforcement evidence.",
    caveat: "A prohibition page is not a market-size statistic; seized quantities are incomplete.",
    next: "Collect ICA/HSA seizure releases and use UN Comtrade mirror flows only as a clearly labelled route proxy.",
    url: "https://www.customs.gov.sg/doing-business/import-operations/import-procedures/controlled-and-prohibited-goods-for-imports/",
    checked: "2026-07-17"
  },
  {
    id: "NZ-TARIFF-2404",
    market: "New Zealand",
    source: "New Zealand Customs Working Tariff",
    type: "official tariff concordance",
    status: "official_not_sales",
    measure: "Separate 2404 device, cartridge and liquid units plus duty rates",
    signal: "Good model for separating devices (units), cartridges (litres) and liquids (litres/kg).",
    caveat: "Tariff schedule gives classification and duty, not realized imports, sales or tax receipts.",
    next: "Pair the tariff with Stats NZ/Customs import cubes and OIA retailer returns, preserving each unit.",
    url: "https://www.customs.govt.nz/media/mdtlz5fd/section-iv.pdf",
    checked: "2026-07-17"
  },
  {
    id: "WHO-MPOWER-TAX",
    market: "Global",
    source: "WHO GHO/MPOWER health taxes database",
    type: "secondary official cross-country dataset",
    status: "official_survey_proxy",
    measure: "Excise, VAT/sales tax, import duty, price and affordability indicators",
    signal: "Comparable tax and price inputs for stress tests across countries without public receipts.",
    caveat: "Country-reported tax/price indicators are not transaction-level sales or current national tax receipts.",
    next: "Use as a prior only; replace each country with current finance/customs data when obtained.",
    url: "https://www.who.int/tools/health-taxes-database",
    checked: "2026-07-17"
  },
  {
    id: "COMMERCIAL-MARKET-ESTIMATES",
    market: "Global",
    source: "Euromonitor / Statista / ECigIntelligence / GlobalData",
    type: "commercial estimate",
    status: "unverified_commercial",
    measure: "Market-size, retail value and forecast estimates",
    signal: "Useful for a range comparison and investor-sensitivity work when the methodology and vintage are documented.",
    caveat: "Paywalls, model assumptions and inconsistent device/liquid definitions prevent bank-grade verification from the public pages.",
    next: "Record provider, publication date, geography, product definition, currency and forecast interval; never blend with A-level totals.",
    url: "https://www.euromonitor.com/",
    checked: "2026-07-17"
  },
  {
    id: "SHIPMENT-COMMERCIAL",
    market: "Global",
    source: "ImportGenius / Panjiva / commercial shipment databases",
    type: "commercial shipment lead",
    status: "unverified_commercial",
    measure: "Bill-of-lading and shipment records",
    signal: "Can reveal exporter/importer names, routes and product descriptions that public customs aggregates hide.",
    caveat: "Incomplete coverage, misclassification, duplicate manifests and no guarantee of final consumption or declared value.",
    next: "Use only as lead generation; corroborate every material quantity/value with customs, tax or audited company evidence.",
    url: "https://www.panjiva.com/",
    checked: "2026-07-17"
  },
  {
    id: "PATENT-WIPO-PATENTSCOPE",
    market: "Global patent family",
    source: "WIPO PATENTSCOPE",
    type: "official patent register",
    status: "official_legal_not_market",
    measure: "PCT filings, national-phase links and patent documents",
    signal: "Routes patent-family and national-phase verification for the claimed Pixan coverage.",
    caveat: "A published or granted patent does not prove enforceability, maintenance-fee status or market size in a country.",
    next: "Check each national register (USPTO, CIPO, EPO, CNIPA, J-PlatPat) and preserve application/grant/maintenance dates separately.",
    url: "https://patentscope.wipo.int/",
    checked: "2026-07-17"
  },
  {
    id: "PATENT-EPO-ESPACENET",
    market: "Europe",
    source: "EPO Espacenet / European Patent Register",
    type: "official patent register",
    status: "official_legal_not_market",
    measure: "EP family, legal-status and prosecution records",
    signal: "Primary European family and prosecution cross-check for patent-territory claims.",
    caveat: "Espacenet family data is not a substitute for each national validation and does not provide market data.",
    next: "Capture EP publication, validation states and renewal status by country; attach register snapshots to the patent annex.",
    url: "https://worldwide.espacenet.com/",
    checked: "2026-07-17"
  }
];

window.PIXAN_DATA = window.PIXAN_DATA || {};

/* The generated payload contains active claim-level work items.  Preserve
 * those and append this broader portal/source register in the same shape so
 * the dashboard can search and filter both collections together. */
const existingUnverified = Array.isArray(window.PIXAN_DATA.unverifiedSources)
  ? window.PIXAN_DATA.unverifiedSources
  : [];
const sourceRegisterAsClaims = window.PIXAN_UNVERIFIED_SOURCES.map((item) => ({
  id: item.id,
  market: item.market,
  claim: `${item.source}: ${item.measure}`,
  value: item.signal,
  evidenceType: item.type,
  sourceStatus: item.status === "official_route_no_public_aggregate" || item.status === "official_access_pending" || item.status === "official_route_pending" ? "pending"
    : item.status === "unverified_commercial" || item.status === "historical_proxy" || item.status === "historical_partial" ? "unverified"
      : item.status === "official_not_sales" || item.status === "official_aggregate_only" || item.status === "official_survey_proxy" || item.status === "official_legal_not_market" || item.status === "official_broad_category" || item.status === "official_no_legal_sales" || item.status === "official_proxy" ? "partial"
        : "unverified",
  confidence: item.status === "official_proxy" ? 65 : item.status.startsWith("official_") ? 45 : 25,
  source: item.source,
  sourceUrl: item.url,
  nextVerification: `${item.next} Rajoite: ${item.caveat}`,
  contactId: item.id,
  lastChecked: item.checked,
}));

window.PIXAN_DATA.unverifiedSources = [...existingUnverified, ...sourceRegisterAsClaims];
window.PIXAN_DATA.unverifiedSourcesRegister = window.PIXAN_UNVERIFIED_SOURCES;
