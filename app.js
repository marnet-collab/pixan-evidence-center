(function () {
  "use strict";

  const data = window.PIXAN_DATA;
  if (!data) {
    document.body.innerHTML = '<p class="empty-state">Dashboard-dataa ei voitu ladata.</p>';
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const money = (value) => new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(value / 1e6) + " milj. USD";
  const moneyEur = (value) => value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(value / 1e6) + " milj. €";
  const moneyEur3 = (value) => value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(value / 1e6) + " milj. €";
  const moneyCad = (value) => value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 3 }).format(value / 1e6) + " milj. CAD";
  const moneyPln = (value) => value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 1, maximumFractionDigits: 3 }).format(value / 1e6) + " milj. PLN";
  const moneySek = (value) => value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 1, maximumFractionDigits: 3 }).format(value / 1e6) + " milj. SEK";
  const cad = (value, digits = 2) => value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value) + " CAD";
  const eur = (value, digits = 2) => value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value) + " €";
  const moneyJpy = (value) => value >= 1e9
    ? new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 3 }).format(value / 1e9) + " mrd JPY"
    : new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 3 }).format(value / 1e6) + " milj. JPY";
  const integer = (value) => new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 0 }).format(value);

  const statusLabels = {
    verified: "Vahvistettu ankkuri",
    partial: "Osittainen näyttö",
    missing: "Tieto puuttuu",
    sent: "Lähetetty",
    queued: "Jonossa",
    requested: "Pyydetty",
    ready_for_confirmation: "Odottaa lähetysvahvistusta",
    ready_for_portal_submission: "Valmis viranomaisportaaliin",
    active: "Työn alla",
    done: "Valmis",
    blocked: "Estynyt",
    numeric_data: "WHO-numeroaineisto",
    no_numeric_data: "WHO-luku puuttuu",
    sale_banned: "Myyntikielto profiilissa",
    not_applicable: "Aluekooste",
  };

  function tag(status, customLabel) {
    return `<span class="tag ${esc(status)}">${esc(customLabel || statusLabels[status] || status)}</span>`;
  }

  function goToView(view, updateHash = true) {
    const target = $(`[data-view-panel="${view}"]`) ? view : "overview";
    $$("[data-view-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.viewPanel === target));
    $$(".sidebar nav button[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === target));
    $("#sidebar").classList.remove("open");
    $("#search-results").hidden = true;
    if (updateHash) history.replaceState(null, "", target === "overview" ? location.pathname + location.search : `#${target}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderMetrics() {
    $("#metric-grid").innerHTML = data.metrics.map((item) => `
      <article class="metric-card ${esc(item.tone)}">
        <span class="metric-label">${esc(item.label)} <span>↗</span></span>
        <strong class="metric-value">${esc(item.value)}</strong>
        <span class="metric-detail">${esc(item.detail)}</span>
      </article>`).join("");
  }

  function renderAnchors() {
    $("#anchor-grid").innerHTML = data.anchors.map((item) => `
      <article class="anchor-card">
        <div class="card-top">${tag(item.grade.toLowerCase(), `Taso ${item.grade}`)}<small>${esc(item.market)}</small></div>
        <h3>${esc(item.title)}</h3>
        <strong class="anchor-value">${esc(item.value)}</strong>
        <p>${esc(item.detail)}</p>
        <p><strong>Rajoite:</strong> ${esc(item.limit)}</p>
        <a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.source)} ↗</a>
      </article>`).join("");
  }

  function renderReport() {
    $("#report-compare").innerHTML = data.report.map((item) => `
      <div class="compare-row"><span>${esc(item.label)}</span><strong>${esc(item.value)}</strong><small>${esc(item.meaning)}</small></div>`).join("");
  }

  function renderMiniTasks() {
    $("#mini-task-list").innerHTML = data.tasks.slice(0, 5).map((item, index) => `
      <div class="mini-task"><span class="task-number">${index + 1}</span><div><strong>${esc(item.title)}</strong><div class="meta-line">${esc(item.detail)}</div></div>${tag(item.status)}</div>`).join("");
  }

  let countryFilter = "all";
  function renderCountryFilters() {
    const counts = data.countries.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    const filters = [
      ["all", "Kaikki", data.countries.length],
      ["verified", "Vahvistettu", counts.verified || 0],
      ["partial", "Osittainen", counts.partial || 0],
      ["missing", "Puuttuu", counts.missing || 0],
    ];
    $("#country-filters").innerHTML = filters.map(([key, label, count]) => `<button class="filter-button ${countryFilter === key ? "active" : ""}" data-country-filter="${key}">${label} · ${count}</button>`).join("");
    $$('[data-country-filter]').forEach((button) => button.addEventListener("click", () => {
      countryFilter = button.dataset.countryFilter;
      renderCountryFilters();
      renderCountries();
    }));
  }

  function renderCountries() {
    const items = countryFilter === "all" ? data.countries : data.countries.filter((item) => item.status === countryFilter);
    $("#country-count").textContent = `${items.length} maata/aluetta`;
    $("#country-grid").innerHTML = items.map((item) => `
      <article class="country-card">
        <div class="card-top">${tag(item.status)}<small>${esc(item.sourceName)}</small></div>
        <h3>${esc(item.name)}</h3>
        <p>${esc(item.current)}</p>
        <dl>
          <div><dt>Virallinen myynti-/markkinalähde</dt><dd>${esc(item.salesSource)}</dd></div>
          <div><dt>Puuttuva todiste</dt><dd>${esc(item.missing)}</dd></div>
          <div><dt>Veronäyttö</dt><dd>${item.tax ? `${tag(item.tax.status)}${item.tax.derivedRate !== null ? ` · johdettu valmistevero ${esc(item.tax.derivedRate)} ${esc(item.tax.currency)}/ml` : ""}` : "Ei veroriviä"}</dd></div>
        </dl>
        <details>
          <summary>Avaa hankinta- ja reittiohje</summary>
          <dl>
            <div><dt>Tullitaso</dt><dd>${esc(item.customs)}</dd></div>
            <div><dt>Reittikorjaus</dt><dd>${esc(item.route)}</dd></div>
            <div><dt>Näin tieto saadaan</dt><dd>${esc(item.how)}</dd></div>
          </dl>
        </details>
      </article>`).join("");
  }

  function renderCustoms() {
    $("#eurostat-summary").innerHTML = `
      <table class="eurostat-table">
        <thead><tr><th>Maa/alue</th><th>WORLD-tuonti</th><th>EU:n sisäinen saapuminen</th><th>Extra-EU</th><th>Extra-osuus</th><th>Tulkintaperusta</th></tr></thead>
        <tbody>${data.eurostatRoutes.map((item) => `<tr>
          <td><strong>${esc(item.market)}</strong></td>
          <td class="num">${moneyEur(item.worldEur)}</td><td class="num">${moneyEur(item.intraEur)}</td><td class="num">${moneyEur(item.extraEur)}</td>
          <td class="num">${item.extraShare === null ? "—" : new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.extraShare) + " %"}</td>
          <td>${esc(item.basis)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Kapea CN8-kori:</strong> 85434000 laitteet + 24041200 nikotiinia sisältävät inhaloitavat tuotteet. Jäsenmaan WORLD-rivi täsmäytyy intra + extra; EU-27-rivi näyttää vain ulkorajan. Tulliarvo on CIF-arvo, ei vähittäismyynti.</div>`;

    $("#eurostat-origins").innerHTML = `
      <table>
        <thead><tr><th>CN8</th><th>Extra-EU-alkuperä</th><th>Tuontiarvo</th><th>Osuus maapartneririveistä</th><th>Perusta</th></tr></thead>
        <tbody>${data.eurostatOrigins.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.partner)}</strong></td><td class="num">${moneyEur(item.valueEur)}</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.sharePct)} %</td><td>${esc(item.basis)}</td>
        </tr>`).join("")}</tbody>
      </table>`;

    const france = data.franceEvidence;
    const franceOfficial = france.manifest.official_results;
    const registryMetric = (name) => france.registryAudit.find((item) => item.metric === name);
    $("#france-summary").innerHTML = `
      <table>
        <thead><tr><th>CN8</th><th>Virallinen rajaus</th><th>Tuonti</th><th>Vienti</th><th>Rajanettotuonti</th><th>Tuontipaino</th><th>Kiinan alkuperäosuus</th></tr></thead>
        <tbody>${france.customs.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.label)}</strong><div class="meta-line" lang="fr">${esc(item.officialLabel)}</div></td>
          <td class="num"><strong>${moneyEur3(item.importEur)}</strong></td><td class="num">${moneyEur3(item.exportEur)}</td>
          <td class="num"><strong>${moneyEur3(item.borderNetEur)}</strong></td><td class="num">${integer(item.importKg)} kg</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.chinaSharePct)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Virallinen yhteenveto:</strong> neljän koodin tuonti ${moneyEur3(franceOfficial.douane_all_four_codes_import_eur)}, vienti ${moneyEur3(franceOfficial.douane_all_four_codes_export_eur)} ja rajat ylittävä nettotuonti ${moneyEur3(franceOfficial.douane_all_four_codes_border_net_import_eur)}. Kapea 85434000 + 24041200 -netto on ${moneyEur3(franceOfficial.douane_narrow_border_net_import_eur)}. Kilogrammoja ei muunneta laiteyksiköiksi tai e-nestemillilitroiksi, koska lisäpaljousyksikkö puuttuu. <a class="source-link" href="${esc(france.douaneUrl)}" target="_blank" rel="noopener">France Douane ↗</a></div>`;

    $("#france-route").innerHTML = `
      <table>
        <thead><tr><th>CN8</th><th>Kansallinen ei-EU-alkuperä</th><th>Kansallinen EU/Ranska-alkuperä</th><th>Eurostat suora extra-EU</th><th>Eurostat intra-EU lähetysmaa</th><th>WORLD</th><th>Luokitusero*</th></tr></thead>
        <tbody>${france.routeBridge.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td class="num">${moneyEur3(item.nationalNonEuOriginEur)}</td>
          <td class="num">${moneyEur3(item.nationalEuOrFranceOriginEur)}</td><td class="num">${moneyEur3(item.eurostatDirectExtraEur)}</td>
          <td class="num">${moneyEur3(item.eurostatIntraConsignmentEur)}</td><td class="num"><strong>${moneyEur3(item.eurostatWorldEur)}</strong></td>
          <td class="num">${moneyEur3(item.classificationGapEur)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Täsmäytys:</strong> WORLD = intra + extra kaikissa koodeissa; komponenttiero on 0 EUR. Douanen ja Eurostatin kokonaistuonnin ero on ${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(franceOfficial.douane_vs_eurostat_total_import_gap_pct)} % ja viennin ${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(franceOfficial.douane_vs_eurostat_total_export_gap_pct)} %. *Luokitusero kertoo alkuperä- ja lähetysmaakäsitteiden herkkyydestä; se ei ole täsmällinen jälleenvienti- tai tullinoptimointimäärä. <a class="source-link" href="${esc(france.eurostatMethodUrl)}" target="_blank" rel="noopener">Eurostat-menetelmä ↗</a></div>`;

    $("#france-anses").innerHTML = `
      <table>
        <thead><tr><th>ANSES-tuotetyyppi</th><th>Ilmoitusrivejä</th><th>Osuus rekisteristä</th><th>Tulkinta</th></tr></thead>
        <tbody>${france.productTypes.map((item) => `<tr>
          <td><strong lang="fr">${esc(item.type)}</strong></td><td class="num">${integer(item.rows)}</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.sharePct)} %</td>
          <td>Ilmoitusrivejä; ei myytyjä yksiköitä tai aktiivisia SKU-tuotteita</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>1.7.2026 tilanne:</strong> ${integer(registryMetric("registry_rows").value)} ilmoitusriviä, ${integer(registryMetric("unique_product_numbers").value)} yksilöllistä tuotenumeroa ja ${integer(registryMetric("unique_brand_strings").value)} normalisoimatonta brändimerkkijonoa. Julkisessa rekisterissä ei ole vuosimyyntikenttää. Rekisteririvit eivät ole hyväksyntöjä, aktiivisia SKU-tuotteita, yrityksiä tai myytyjä yksiköitä. <a class="source-link" href="${esc(france.ansesRegistryUrl)}" target="_blank" rel="noopener">ANSES/data.gouv.fr ↗</a></div>`;

    $("#france-coverage").innerHTML = `
      <table>
        <thead><tr><th>Jakso</th><th>Odotetut tuote-esitykset</th><th>Myyntitieto toimitettu</th><th>Puuttui</th><th>Submission hit rate</th><th>Viranomaisen johtopäätös</th></tr></thead>
        <tbody>${france.salesCoverage.map((item) => `<tr>
          <td><strong>${esc(item.period)}</strong></td><td class="num">${integer(item.expected)}</td><td class="num">${integer(item.transmitted)}</td>
          <td class="num">${integer(item.missing)}</td><td class="num"><strong>${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.hitRatePct)} %</strong></td>
          <td>Myyntivolyymit eivät olleet hyödynnettävissä puuttuvien ilmoitusten vuoksi</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Menetelmäauditointi:</strong> yhdistetty 2016–2017 hit rate oli 23 036 / 65 799 = 35,010 %. Tämä mittaa historiallisten myyntitietojen toimituskattavuutta, ei viranomaisen tarkastusten virheprosenttia eikä nykyisen rekisterin tarkkuutta. ${tag(france.request.status)} <strong>${esc(france.request.id)}</strong> pyytää vuosien 2018–2025 kattavuusluvut, laite-/pod-yksiköt ja e-nestemillilitrat. Viestiä ei ole lähetetty. <a class="source-link" href="${esc(france.ansesCoverageUrl)}" target="_blank" rel="noopener">ANSES-raportti ↗</a></div>`;

    const canada = data.canadaCustoms;
    $("#canada-summary").innerHTML = `
      <table>
        <thead><tr><th>HS10</th><th>Virallinen rajaus</th><th>Vuoden 2025 määrä</th><th>Tullituonnin arvo</th><th>Lähderivejä</th><th>Suurin alkuperä</th></tr></thead>
        <tbody>${canada.totals.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.title)}</strong><div class="meta-line">${esc(item.scope)}</div></td>
          <td class="num">${integer(item.quantity)} ${esc(item.unit)}</td><td class="num"><strong>${moneyCad(item.valueCad)}</strong></td>
          <td class="num">${integer(item.sourceRecords)}</td><td>${esc(item.largestOrigin)} <span class="meta-line">(${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.largestOriginShare)} % arvosta)</span></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Auditointi hyväksytty:</strong> ${canada.audit.keys_compared} kuukausi–HS6–alkuperä–tullausmaakunta–US-osavaltio–yksikkö-avainta. HS10-summien ero viralliseen HS6-sarjaan oli ${integer(canada.audit.value_gap_cad)} CAD ja määräero ${integer(canada.audit.quantity_gap)}. Laitekori oli ${integer(canada.comparison.deviceQuantity)} kappaletta / ${moneyCad(canada.comparison.deviceValueCad)}; laaja 2404-kori ${integer(canada.comparison.broadInhalationQuantityKg)} kg / ${moneyCad(canada.comparison.broadInhalationValueCad)}.</div>
      <div class="meta-line table-note"><strong>Vertailu Health Canada -ankkuriin:</strong> vuoden 2025 tullikorin ${moneyCad(canada.comparison.customsImportBasket2025Cad)} on ${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(canada.comparison.customsToPriorYearShipmentSalesPct)} % Health Canadan vuoden 2024 toimitusmyynnistä. Tämä ei ole kate- tai kasvulaskelma: vuodet, tuoteryhmät ja arvostustaso eroavat.</div>`;

    $("#canada-origins").innerHTML = `
      <table>
        <thead><tr><th>HS10</th><th>Alkuperämaa</th><th>Määrä</th><th>Tullituonnin arvo</th><th>Osuus nimikkeen arvosta</th></tr></thead>
        <tbody>${canada.origins.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.origin)}</strong></td>
          <td class="num">${integer(item.quantity)} ${esc(item.unit)}</td><td class="num">${moneyCad(item.valueCad)}</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.valueShare)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Reittirajoite:</strong> bulk-tuonnin country-kenttä esitetään alkuperämaana. HS10-tason alkuperämaa × suora lähetys-/vientimaa -ristiintaulukkoa ei ole tässä tiedostossa; se on edelleen Statistics Canadalta pyydettävä täydennys.</div>`;

    $("#canada-clearance").innerHTML = `
      <table>
        <thead><tr><th>HS10</th><th>Tullausmaakunta</th><th>Määrä</th><th>Tullituonnin arvo</th></tr></thead>
        <tbody>${canada.clearance.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.province)}</strong> <span class="meta-line">${esc(item.provinceCode)}</span></td>
          <td class="num">${integer(item.quantity)} ${esc(item.unit)}</td><td class="num">${moneyCad(item.valueCad)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note">Statistics Canadan määritelmän mukaan province tarkoittaa tulliselvityksen maakuntaa. Sitä ei tulkita vähittäismyynnin tai loppukulutuksen maakunnaksi.</div>`;

    $("#canada-exports").innerHTML = `
      <table>
        <thead><tr><th>HS8</th><th>Tuoteryhmä</th><th>Kokonaisvienti</th><th>Kotimainen vienti</th><th>Johdettu jälleenvienti</th><th>Jälleenvientimäärä</th></tr></thead>
        <tbody>${canada.exports.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.title)}</strong></td>
          <td class="num">${moneyCad(item.totalValueCad)}</td><td class="num">${moneyCad(item.domesticValueCad)}</td>
          <td class="num"><strong>${moneyCad(item.reexportValueCad)}</strong></td><td class="num">${item.unit === "—" ? "Ei julkaistu" : `${integer(item.reexportQuantity)} ${esc(item.unit)}`}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Jälleenvientikorjaus:</strong> total exports − domestic exports = ${moneyCad(canada.comparison.derivedReexportValueCad)}, eli ${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 2 }).format(canada.comparison.derivedReexportSharePct)} % valitun tuontikorin arvosta. ${canada.reexportAudit.comparison_keys} tarkastusavaimessa ei ollut negatiivista arvo- tai määräeroa. Tämä korjaa ulkomaisen tavaran edelleenlähetystä, mutta ei ratkaise varasto- tai kotimaisen tuotannon muutosta.</div>`;

    const us = data.usCustoms;
    $("#us-summary").innerHTML = `
      <table>
        <thead><tr><th>HTS10</th><th>Virallinen rajaus</th><th>General imports määrä</th><th>General customs value</th><th>General CIF</th><th>Imports for consumption</th><th>Laskettu tulli</th><th>Suurin alkuperä</th></tr></thead>
        <tbody>${us.totals.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.title)}</strong><div class="meta-line">${esc(item.scope)}</div></td>
          <td class="num">${integer(item.quantity)} ${esc(item.unit)}</td><td class="num"><strong>${money(item.customsValueUsd)}</strong></td>
          <td class="num">${money(item.cifValueUsd)}</td><td class="num">${money(item.consumptionValueUsd)}</td>
          <td class="num">${money(item.calculatedDutyUsd)}</td><td>${esc(item.largestOrigin)} <span class="meta-line">(${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.largestOriginShare)} % general-arvosta)</span></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Auditointi hyväksytty:</strong> ${us.audit.selected_detail_records} detaljiriviä ja ${us.audit.selected_origin_rows} nimike–alkuperä-riviä. Jokainen määrä-, customs-, CIF-, maksu- ja tullikenttä täsmäytyi kansalliseen IMP_COMM-summaan; ero oli kaikissa kentissä nolla. Alkuperäinen 292 Mt Census-arkisto on lukittu SHA-256-tunnisteella <code>${esc(us.archiveSha256)}</code>.</div>`;

    $("#us-origins").innerHTML = `
      <table>
        <thead><tr><th>HTS10</th><th>Alkuperämaa</th><th>General imports määrä</th><th>Customs value</th><th>CIF</th><th>Osuus nimikkeen arvosta</th></tr></thead>
        <tbody>${us.origins.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.origin)}</strong></td>
          <td class="num">${integer(item.quantity)} ${esc(item.unit)}</td><td class="num">${money(item.customsValueUsd)}</td>
          <td class="num">${money(item.cifValueUsd)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.valueShare)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Kapea patenttikori:</strong> laitteet ${integer(us.baskets.core_devices.general_quantity_units)} kpl / ${money(us.baskets.core_devices.general_customs_value_usd)} ja täsmällisesti nimetyt sähkösavukeseokset ${integer(us.baskets.core_liquids.general_quantity_kg)} kg / ${money(us.baskets.core_liquids.general_customs_value_usd)}. Koodit 2404129000 ja 2404199000 näytetään erikseen, mutta niitä ei lasketa kapeaan nestekoriin. Tullivirtaa ei merkitä Yhdysvaltain kuluttajamyynniksi.</div>`;

    const japan = data.japanCustoms;
    $("#japan-summary").innerHTML = `
      <table>
        <thead><tr><th>Japanin 9-numeroinen nimike</th><th>Virallinen kuvaus</th><th>Vuoden 2025 määrä</th><th>CIF-tuontiarvo</th><th>Alkuperämaita</th><th>Suurin alkuperä</th></tr></thead>
        <tbody>${japan.totals.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.title)}</strong><div class="meta-line">${esc(item.scope)}</div></td>
          <td class="num">${integer(item.quantity)} ${esc(item.unit)}</td><td class="num"><strong>${moneyJpy(item.valueJpy)}</strong></td>
          <td class="num">${item.originCount}</td><td>${esc(item.largestOrigin)} <span class="meta-line">(${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.largestOriginShare)} % arvosta)</span></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Auditointi hyväksytty:</strong> ${japan.audit.selected_origin_rows} alkuperäriviä; vuosisummien ja 12 kuukauden absoluuttinen ero ${japan.audit.sum_of_absolute_value_month_gaps_thousand_jpy} tuhatta JPY ja määräero ${japan.audit.sum_of_absolute_quantity_month_gaps}. Lähde perustuu tulliselvityksiin; arvo on CIF ja kumppani on alkuperämaa. Vuoden 2025 aineisto on tarkistettu versio, ei vielä marraskuun 2026 kiinteä versio.</div>`;

    $("#japan-origins").innerHTML = `
      <table>
        <thead><tr><th>Nimike</th><th>Alkuperämaa</th><th>Määrä</th><th>CIF-tuontiarvo</th><th>Osuus nimikkeen arvosta</th></tr></thead>
        <tbody>${japan.origins.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.origin)}</strong></td>
          <td class="num">${integer(item.quantity)} ${esc(item.unit)}</td><td class="num">${moneyJpy(item.valueJpy)}</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.valueShare)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Rajaus:</strong> kapea kori on 854340000 + 240412000, yhteensä ${moneyJpy(japan.baskets.core_value_jpy)}. Laajempi kori lisää 240419200-rivin, mutta tämä “muut inhaloitavat tuotteet” -nimike ei ole yksinomaan nikotiiniton e-neste. Tullivirtaa ei merkitä Japanin kuluttajamyynniksi.</div>`;

    const korea = data.koreaCustoms;
    $("#korea-summary").innerHTML = `
      <table>
        <thead><tr><th>HS6</th><th>Virallinen rajaus</th><th>Tuontipaino</th><th>Tuontiarvo</th><th>Vientipaino</th><th>Vientiarvo</th></tr></thead>
        <tbody>${korea.totals.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.title)}</strong><div class="meta-line">${esc(item.officialTitle)}</div></td>
          <td class="num">${integer(item.importKg)} kg</td><td class="num"><strong>${money(item.importValueUsd)}</strong></td>
          <td class="num">${integer(item.exportKg)} kg</td><td class="num">${money(item.exportValueUsd)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Auditointi hyväksytty:</strong> ${korea.audit.monthly_rows} kuukausiriviä ja ${korea.audit.country_rows} alkuperämaariviä tuottivat ${korea.audit.reconciliation_checks.length} tarkastusta. Kaikki erot olivat virallisen taulukon kokonaiskilogramman ja tuhannen USD:n komponenttipyöristyksen sallimissa rajoissa. Arvo on tulliarvo, ei vähittäismyynti.</div>`;

    $("#korea-hsk10").innerHTML = `
      <table>
        <thead><tr><th>HSK10</th><th>Suomenkielinen rajaus</th><th>Virallinen koreankielinen nimike</th><th>Pixan-käsittely</th></tr></thead>
        <tbody>${korea.hsk10.map((item) => `<tr>
          <td><code>${esc(item.code)}</code><div class="meta-line">HS6 ${esc(item.parent)}</div></td>
          <td><strong>${esc(item.title)}</strong></td><td lang="ko">${esc(item.officialKorean)}</td>
          <td>${item.included ? "Sisältyy rajattuun tuotekoriin" : "Näytetään erikseen; ei ydinkoriin ilman lisänäyttöä"}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Olennainen raja:</strong> koodit <code>2404121000</code> ja <code>2404199010</code> on virallisesti nimetty sähkösavukenesteiksi. Luokitus ei vielä kerro niiden vuoden 2025 kauppa-arvoa. HS6-rivejä 240412 ja 240419 ei jaeta näille koodeille oletuksella.</div>`;

    $("#korea-origins").innerHTML = `
      <table>
        <thead><tr><th>HS6</th><th>Alkuperämaa</th><th>Tuontipaino</th><th>Tuontiarvo</th><th>Osuus nimikkeen vuotuisesta arvosta</th></tr></thead>
        <tbody>${korea.origins.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.origin)}</strong></td>
          <td class="num">${integer(item.importKg)} kg</td><td class="num">${money(item.importValueUsd)}</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 2 }).format(item.valueShare)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Reittiraja:</strong> tuonnin maa esitetään Korean tullin alkuperämaana. Tämä ei vielä ratkaise mahdollista Hongkongin tai muun hubin kautta kulkenutta lähetysmaata, jälleenvientiä, kotimaista tuotantoa tai kuluttajamyyntiä.</div>`;

    const rows = [...data.customs].sort((a, b) => a.market.localeCompare(b.market, "fi") || a.code.localeCompare(b.code));
    $("#customs-table").innerHTML = `
      <table>
        <thead><tr><th>Maa</th><th>Vuosi</th><th>HS</th><th>Tuontiarvo</th><th>Määrä*</th><th>Nettopaino</th><th>Luokitus</th></tr></thead>
        <tbody>${rows.map((item) => `<tr>
          <td><strong>${esc(item.market)}</strong></td><td>${item.period}</td><td>${esc(item.code)}</td>
          <td class="num">${money(item.valueUsd)}</td><td class="num">${integer(item.quantity)}</td><td class="num">${integer(item.netKg)} kg</td>
          <td>${tag("partial", "B-tason tulliproxy")}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line" style="padding:12px 14px">* UN-aggregaattirivin määräyksikkö ei ole tässä otteessa määritelty. Määrää ei käytetä laiteyksikkönä ennen kansallista varmennusta.</div>`;
    $("#code-grid").innerHTML = data.codes.map((item) => `
      <article class="code-card"><code>${esc(item.code)}</code><h3>${esc(item.title)}</h3><p>${esc(item.detail)}</p><p><strong>Käsittely:</strong> ${esc(item.include)}</p></article>`).join("");
  }

  function renderStress() {
    $("#stress-wrap").innerHTML = data.stress.map((market) => `
      <article class="stress-card">
        <div class="card-top"><span class="tag c">Stressitesti</span><small>${esc(market.basis)}</small></div>
        <h3>${esc(market.market)}</h3>
        ${market.scenarios.map((scenario) => `<div class="scenario-row"><strong>${esc(scenario.name)}</strong><span>${esc(scenario.price)}</span><span>${esc(scenario.volume)}</span><strong>${esc(scenario.value)}</strong></div>`).join("")}
        <p>${esc(market.note)}</p>
      </article>`).join("");

    const max = Math.max(...data.narrowCustoms.map((item) => item.valueUsd));
    $("#customs-bars").innerHTML = data.narrowCustoms.map((item) => `
      <div class="bar-row"><strong>${esc(item.market)}</strong><div class="bar-track"><div class="bar-fill" style="width:${Math.max(3, item.valueUsd / max * 100)}%"></div></div><strong>${money(item.valueUsd)}</strong></div>`).join("") +
      '<div class="meta-line">Kapea kori = HS 8543.40 + 2404.12. Arvot ovat tuontia, eivät vähittäismyyntiä.</div>';

    const retail = data.canadaRetail;
    $("#canada-retail-summary").innerHTML = `
      <table>
        <thead><tr><th>Segmentti</th><th>Havaintoja</th><th>Alin hinta</th><th>Mediaani</th><th>Ylin hinta</th><th>CAD/ml mediaani</th><th>Tulkinta</th></tr></thead>
        <tbody>${retail.summary.map((item) => `<tr>
          <td><strong>${esc(item.segment)}</strong></td><td class="num">${integer(item.count)}</td>
          <td class="num">${cad(item.minPriceCad)}</td><td class="num"><strong>${cad(item.medianPriceCad)}</strong></td><td class="num">${cad(item.maxPriceCad)}</td>
          <td class="num">${item.medianPerMlCad === null ? "—" : cad(item.medianPerMlCad, 4)}</td><td>${esc(item.interpretation)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Rajaus:</strong> ${esc(retail.scope)}</div>`;

    $("#canada-retail-observations").innerHTML = `
      <table>
        <thead><tr><th>ID</th><th>Tuote ja myyjä</th><th>Luokka</th><th>Nestemäärä</th><th>Mainoshinta</th><th>Hinta/ml</th><th>Liittovaltion duty</th><th>Määrätyn provinssin lisäduty</th><th>Hintaperusta</th></tr></thead>
        <tbody>${retail.observations.map((item) => `<tr>
          <td><code>${esc(item.id)}</code></td>
          <td><strong>${esc(item.product)}</strong><div class="meta-line">${esc(item.seller)} · ${esc(item.stock)}</div><a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener">Avaa lähde ↗</a></td>
          <td>${esc(item.category)}</td>
          <td class="num">${item.liquidMl !== null ? `${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.liquidMl)} ml` : item.emptyCapacityMl !== null ? `${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.emptyCapacityMl)} ml tyhjä kapasiteetti` : "Ei nestettä"}</td>
          <td class="num"><strong>${cad(item.priceCad)}</strong></td><td class="num">${item.pricePerMlCad === null ? "—" : cad(item.pricePerMlCad, 4)}</td>
          <td class="num">${cad(item.federalDutyCad)}</td><td class="num">${cad(item.additionalDutyCad)}</td><td>${esc(item.priceBasis)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>CRA:n laskentasääntö:</strong> ${esc(retail.taxRule)} <a class="source-link" href="${esc(retail.taxSource)}" target="_blank" rel="noopener">Virallinen verolähde ↗</a> Laskettu duty ei ole kassakuitin veroerittely.</div>`;

    $("#canada-retail-comparison").innerHTML = `
      <table>
        <thead><tr><th>Health Canada -tuoteryhmä</th><th>Virallinen 2024 toimitusarvo/yksikkö</th><th>Julkinen vertailusegmentti</th><th>Havaintoja</th><th>Vertailumediaani</th><th>Suhdeluku</th><th>Oikea tulkinta</th></tr></thead>
        <tbody>${retail.healthComparison.map((item) => `<tr>
          <td><strong>${esc(item.healthCategory)}</strong></td><td class="num">${cad(item.healthAverageCad)}</td><td>${esc(item.retailSegment)}</td>
          <td class="num">${integer(item.count)}</td><td class="num">${cad(item.retailMedianCad, item.retailMedianCad % 1 ? 4 : 2)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 3 }).format(item.ratio)}×</td><td>${esc(item.interpretation)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Ei katelaskelma:</strong> Health Canadan arvo/yksikkö on koko tuoteryhmän raportoitu toimituskeskiarvo. Julkinen otos sisältää eri kokoisia ja eri tekniikan tuotteita, joten suhdeluku kertoo vain suuruusluokan.</div>`;

    const germany = data.germanyRetail;
    $("#germany-retail-summary").innerHTML = `
      <table>
        <thead><tr><th>Segmentti</th><th>Myyjiä</th><th>Havaintoja</th><th>Varastossa</th><th>Alin hinta</th><th>Mediaani</th><th>Ylin hinta</th><th>Valmistevero / 10 ml</th><th>2026 veron osuus havaituista hinnoista*</th></tr></thead>
        <tbody>${germany.summary.map((item) => `<tr>
          <td><strong>${esc(item.segment)}</strong><div class="meta-line">Kaappaus ${esc(item.captureDate)}</div></td>
          <td class="num">${integer(item.sellerCount)}</td><td class="num">${integer(item.count)}</td><td class="num">${integer(item.inStockCount)}</td>
          <td class="num">${eur(item.minPriceEur)}</td><td class="num"><strong>${eur(item.medianPriceEur)}</strong></td><td class="num">${eur(item.maxPriceEur)}</td>
          <td class="num">2025: ${eur(item.excise2025Per10mlEur)}<br>2026: ${eur(item.excise2026Per10mlEur)}</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.minExciseSharePct)}–${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.maxExciseSharePct)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Rajaus:</strong> ${esc(germany.scope)} *Valmisteveron osuus ei ole kokonaisvero-osuus, koska hinnassa on mukana myös ALV. <a class="source-link" href="${esc(germany.statutoryRateSource)}" target="_blank" rel="noopener">Virallinen verolaki ↗</a></div>`;

    $("#germany-retail-observations").innerHTML = `
      <table>
        <thead><tr><th>ID</th><th>Tuote</th><th>SKU</th><th>Pakkaus</th><th>Hinta sis. ALV</th><th>Hinta/ml</th><th>2026 valmisteveron osuus</th><th>Tila</th><th>Lähdetunniste</th></tr></thead>
        <tbody>${germany.observations.map((item) => `<tr>
          <td><code>${esc(item.id)}</code></td>
          <td><strong>${esc(item.product)}</strong><div class="meta-line">${esc(item.brand)} · ${esc(item.seller)}</div><a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener">Avaa tuotesivu ↗</a></td>
          <td><code>${esc(item.sku)}</code></td><td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 0 }).format(item.volumeMl)} ml</td>
          <td class="num"><strong>${eur(item.priceEur)}</strong></td><td class="num">${eur(item.pricePerMlEur, 4)}</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.exciseSharePct)} %</td>
          <td>${esc(item.availability)}<div class="meta-line">Hinta voimassa -kenttä: ${esc(item.priceValidUntil || "ei ilmoitettu")}</div></td>
          <td><code title="${esc(item.rawSha256)}">${esc(item.rawSha256.slice(0, 12))}…</code></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Hintaperusta:</strong> ${esc(germany.observations[0]?.priceBasis || "")} Tuotesivut muuttuvat; auditointimanifesti sitoo havainnot täysiin SHA-256-tunnisteisiin.</div>`;

    $("#germany-retail-stress").innerHTML = `
      <table>
        <thead><tr><th>Skenaario</th><th>Virallinen 2025 volyymi</th><th>Havaittu 10 ml hinta</th><th>Mekaaninen kertolasku</th><th>2025 valmisteveropohja</th><th>Tulkinta</th></tr></thead>
        <tbody>${germany.stress.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong></td><td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 1 }).format(item.officialVolumeLitres / 1e6)} milj. l</td>
          <td class="num">${eur(item.retailPriceEur)} / 10 ml</td><td class="num"><strong>${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 4 }).format(item.mechanicalValueEur / 1e9)} mrd €</strong></td>
          <td class="num">${moneyEur(item.mechanicalExciseBaseEur)}</td><td>${esc(item.interpretation)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Kaava:</strong> 1,5 milj. litraa × 100 kpl 10 ml pakkausta/litra × havaittu hinta. Vuoden 2025 volyymi on pyöristetty viranomaisluku ja hinnat ovat 17.7.2026 yhdeltä myyjältä. <a class="source-link" href="${esc(germany.officialVolumeSource)}" target="_blank" rel="noopener">Destatis ↗</a></div>`;
  }

  function renderEvidence() {
    $("#evidence-list").innerHTML = data.evidence.map((item) => `
      <article class="evidence-row">
        <span class="evidence-grade ${item.grade.toLowerCase()}">${esc(item.grade)}</span>
        <div><strong>${esc(item.title)}</strong><p>${esc(item.coverage)}</p></div>
        <p>${esc(item.use)}</p>
        <a href="${esc(item.url)}" target="_blank" rel="noopener">Avaa virallinen lähde ↗</a>
      </article>`).join("");
  }

  let taxFilter = "all";
  function renderTaxFilters() {
    const counts = data.taxes.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    const filters = [
      ["all", "Kaikki", data.taxes.length],
      ["national_verified", "Kansallinen lähde", data.taxes.filter((item) => item.national).length],
      ["numeric_data", "Numeroaineisto", counts.numeric_data || 0],
      ["no_numeric_data", "Luku puuttuu", counts.no_numeric_data || 0],
      ["sale_banned", "Myyntikielto", counts.sale_banned || 0],
    ];
    $("#tax-filters").innerHTML = filters.map(([key, label, count]) => `<button class="filter-button ${taxFilter === key ? "active" : ""}" data-tax-filter="${key}">${label} · ${count}</button>`).join("");
    $$('[data-tax-filter]').forEach((button) => button.addEventListener("click", () => {
      taxFilter = button.dataset.taxFilter;
      renderTaxFilters();
      renderTaxes();
    }));
  }

  function pct(value) {
    return value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) + " %";
  }

  function price(value, currency) {
    return value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 3 }).format(value) + " " + currency;
  }

  function renderTaxes() {
    const audit = data.taxAudit;
    const hitRate = (audit.numericCount / audit.profileCount * 100).toFixed(1).replace(".", ",");
    $("#tax-metrics").innerHTML = [
      { label: "WHO-profiilit", value: `${audit.profileCount} maata`, detail: "Yhtenäinen sivu-9 auditointi", tone: "" },
      { label: "Numeerinen osuma", value: `${audit.numericCount} / ${audit.profileCount}`, detail: `${hitRate} % profiileista`, tone: "gold" },
      { label: "Kansallinen varmennus", value: `${audit.nationalVerifiedCount} maata`, detail: "Nykykanta tai kansallinen veroraportti", tone: "blue" },
      { label: "Virallinen volyymi", value: `${audit.officialVolumeCount} maata`, detail: "Mm. Suomi, Saksa, Ruotsi ja Puola", tone: "red" },
    ].map((item) => `<article class="metric-card ${item.tone}"><span class="metric-label">${esc(item.label)} <span>↗</span></span><strong class="metric-value">${esc(item.value)}</strong><span class="metric-detail">${esc(item.detail)}</span></article>`).join("");

    const items = (taxFilter === "all" ? data.taxes : taxFilter === "national_verified" ? data.taxes.filter((item) => item.national) : data.taxes.filter((item) => item.status === taxFilter))
      .sort((a, b) => a.name.localeCompare(b.name, "fi"));
    $("#tax-count").textContent = `${items.length} maata/aluetta`;
    $("#tax-table").innerHTML = `
      <table>
        <thead><tr><th>Maa</th><th>Todistustila</th><th>Kansallinen nykykanta</th><th>Closed 1 ml<br>hinta / kokonaisvero</th><th>Disposable 1 ml<br>hinta / kokonaisvero</th><th>Open 10 ml<br>hinta / kokonaisvero</th><th>WHO:sta johdettu<br>specific excise / ml</th><th>Verotettu / rekisteröity volyymi</th><th>Toteutunut / rajattu verotuotto</th><th>Rajaus ja lähde</th></tr></thead>
        <tbody>${items.map((item) => `<tr>
          <td><a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener"><strong>${esc(item.name)}</strong> ↗</a><div class="meta-line">${esc(item.period)}</div></td>
          <td>${item.national ? tag(item.national.status, item.national.status === "verified" ? "A-tason kansallinen" : "Kansallinen osittainen") : tag(item.status)}</td>
          <td>${item.national ? `<strong>${esc(item.national.rate)}</strong><div class="meta-line">Tilanne ${esc(item.national.asOf)}</div>${item.national.rateUrl ? `<a class="source-link" href="${esc(item.national.rateUrl)}" target="_blank" rel="noopener">Verolähde ↗</a>` : ""}` : '<span class="meta-line">Kansallinen varmennus puuttuu</span>'}</td>
          <td class="num">${price(item.prices.closed1ml, item.currency)}<br><small>${pct(item.totalPct.closed)}</small></td>
          <td class="num">${price(item.prices.disposable1ml, item.currency)}<br><small>${pct(item.totalPct.disposable)}</small></td>
          <td class="num">${price(item.prices.open10ml, item.currency)}<br><small>${pct(item.totalPct.open)}</small></td>
          <td class="num"><strong>${item.derivedRate === null ? "—" : price(item.derivedRate, item.currency) + "/ml"}</strong><div class="meta-line">${item.derivedRate !== null ? "WHO-hinnasta johdettu" : ""}</div></td>
          <td>${!item.national || item.national.taxedVolume === "not_obtained" ? "Ei saatu" : `<strong>${esc(item.national.taxedVolume)}</strong>${item.national.volumeUrl ? `<a class="source-link" href="${esc(item.national.volumeUrl)}" target="_blank" rel="noopener">Volyymilähde ↗</a>` : ""}`}</td>
          <td>${!item.national || item.national.actualRevenue === "not_obtained" ? "Ei saatu" : `<strong>${esc(item.national.actualRevenue)}</strong><div class="meta-line">${esc(item.national.revenuePeriod)}</div>${item.national.revenueUrl ? `<a class="source-link" href="${esc(item.national.revenueUrl)}" target="_blank" rel="noopener">Tulolähde ↗</a>` : ""}`}</td>
          <td><div class="meta-line">${esc(item.national ? `${item.national.scope}. ${item.national.caveat}${item.national.forecast !== "not_obtained" ? ` Ennuste: ${item.national.forecast}.` : ""}` : item.verification)}</div></td>
        </tr>`).join("")}</tbody>
      </table>`;
    $("#tax-audit").innerHTML = `<span>MENETELMÄ JA HIT RATE</span><strong>${audit.numericCount}/${audit.profileCount} WHO-numeerista osumaa (${hitRate} %); ${audit.nationalVerifiedCount} kansallista varmennusta; ${audit.officialRevenueCount} toteutunutta, laskennallista tai rajattua verotuottoriviä.</strong><p>${esc(audit.method)}</p><p>WHO:n open-system-otoksessa specific excise oli yli nollan ${audit.specificExciseCount} maassa ja ${audit.banCount} profiilia ilmoitti myyntikiellon. Puuttuva verotuotto on merkitty puutteeksi, ei nollaksi; ennuste säilytetään eri kentässä.</p>`;

    const spain = data.spainAeat;
    const spainPeak = [...spain.revenue].sort((a, b) => b.netRevenueEur - a.netRevenueEur)[0];
    $("#spain-aeat-summary").innerHTML = `
      <table>
        <thead><tr><th>Todiste</th><th>Varmennettu tulos</th><th>Todistusvoima</th><th>Rajaus / seuraava askel</th></tr></thead>
        <tbody>
          <tr><td><strong>AEAT:n tarkka nettokassasarja</strong></td><td><strong>${moneyEur3(spain.exactNetRevenueEur)}</strong> · 9 kuukausiriviä</td><td>${tag("verified", "A-tason toteutunut verotuotto")}</td><td>Yhdistetty L1-L4; ei pelkkä e-neste</td></tr>
          <tr><td><strong>AEAT:n vuosiraportti</strong></td><td>${moneyEur(spain.roundedAnnualRevenueEur)} pyöristetty nettokertymä</td><td>${tag("verified", "Täsmää tarkkaan kassasarjaan")}</td><td><a class="source-link" href="${esc(spain.annualReportUrl)}" target="_blank" rel="noopener">AEAT:n vuosiraportti ↗</a></td></tr>
          <tr><td><strong>Modelo 573</strong></td><td>L1/L2 millilitroina · L3/L4 grammoina · verovelka ja vähennykset erikseen</td><td>${tag("verified", "A-tason kenttärakenne")}</td><td><a class="source-link" href="${esc(spain.model573Url)}" target="_blank" rel="noopener">BOE:n määräys ↗</a></td></tr>
          <tr><td><strong>${esc(spain.request.id)}</strong></td><td>${esc(spain.request.scopeFi)}</td><td>${tag(spain.request.status)}</td><td><a class="source-link" href="${esc(spain.request.channel)}" target="_blank" rel="noopener">AEAT:n tunnistautuva kanava ↗</a></td></tr>
        </tbody>
      </table>
      <div class="meta-line table-note"><strong>Auditointi:</strong> kuukausisumma ${moneyEur3(spain.manifest.audit.monthly_sum_eur)} = joulukuun kumulatiivinen ${moneyEur3(spain.manifest.audit.december_cumulative_eur)}. Suurin kuukausi oli ${esc(spainPeak.period)}, ${moneyEur3(spainPeak.netRevenueEur)}. Toteutuneet L1/L2-millilitrat on saatu: <code>${spain.actualLiquidVolumeObtained ? "true" : "false"}</code>.</div>`;

    $("#spain-aeat-revenue").innerHTML = `
      <table>
        <thead><tr><th>Kassakuukausi</th><th>Nettokertymä</th><th>Kumulatiivinen nettokertymä</th><th>Lähde / täsmäytys</th></tr></thead>
        <tbody>${spain.revenue.map((item) => `<tr>
          <td><strong>${esc(item.period)}</strong></td><td class="num"><strong>${moneyEur3(item.netRevenueEur)}</strong></td><td class="num">${moneyEur3(item.cumulativeNetRevenueEur)}</td>
          <td>${item.derivation === "derived_from_may_cumulative_minus_may_monthly" ? "Huhtikuu = toukokuun kumulatiivinen − toukokuun kuukausirivi" : "AEAT:n tarkka kuukausitaulukko"} <a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener">PDF ↗</a></td>
        </tr>`).join("")}</tbody>
        <tfoot><tr><td><strong>2025 yhteensä</strong></td><td class="num"><strong>${moneyEur3(spain.exactNetRevenueEur)}</strong></td><td class="num"><strong>${moneyEur3(spain.exactNetRevenueEur)}</strong></td><td>9/9 kuukausiriviä täsmää</td></tr></tfoot>
      </table>
      <div class="meta-line table-note"><strong>Kassaperusta:</strong> sarja mittaa valtiolle kertynyttä nettotuloa, ei suoraan saman kuukauden kulutukseen luovutusta. Huhtikuun 2025 alkuvarastojen oikaisu ja ilmoitus-/maksuajankohdan viive pyydetään PX-ES-001:llä erikseen.</div>`;

    $("#spain-aeat-rates").innerHTML = `
      <table>
        <thead><tr><th>Epigrafi</th><th>Tuoteryhmä</th><th>Veropohjan yksikkö</th><th>Virallinen kanta</th><th>Voimassa / käyttötapa</th></tr></thead>
        <tbody>${spain.rates.map((item) => `<tr>
          <td><strong>${esc(item.epigraph)}</strong></td><td>${esc(item.label)}</td><td>${esc(item.baseUnit === "ml" ? "millilitra" : "gramma")}</td>
          <td class="num"><strong>${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.rateEurPerUnit)} €/${esc(item.baseUnit)}</strong></td>
          <td>${esc(item.effectiveFrom)} alkaen · <a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener">BOE ↗</a></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Oikea muunnos:</strong> vain L1- ja L2-veropohjat ovat millilitroja. L3- ja L4-grammoja ei muuteta nesteeksi eikä yhdistetä e-nestevolyymiin.</div>`;

    $("#spain-aeat-sensitivity").innerHTML = `
      <table>
        <thead><tr><th>Skenaario</th><th>Oletettu e-nesteosuus yhdistelmäverosta</th><th>Oletettu L1/L2-jako</th><th>Sekoitettu kanta</th><th>Havainnollinen määrä</th><th>Luokitus</th></tr></thead>
        <tbody>${spain.sensitivity.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong></td><td class="num">${integer(item.eLiquidRevenueSharePct)} %</td><td class="num">${integer(item.l1SharePct)} / ${integer(item.l2SharePct)} %</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(item.blendedRateEurPerMl)} €/ml</td>
          <td class="num"><strong>${integer(item.illustrativeVolumeMl)} ml</strong><div class="meta-line">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 3 }).format(item.illustrativeVolumeLitres)} l</div></td>
          <td>${tag("partial", "Oletus — ei toteutunut volyymi")}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Ei markkina-arvio:</strong> skenaariot jakavat toteutunutta yhdistelmäveroa oletuksilla. Kassakertymä sisältää L3/L4-tuotteita sekä mahdolliset vähennykset, palautukset ja ajalliset erot. Edes “täysi kohdistus” ei ole viranomaisen ilmoittama nestemäärä.</div>`;

    const italy = data.italyAdm;
    const italy2026 = italy.forecastTotals.find((item) => item.year === 2026);
    $("#italy-adm-summary").innerHTML = `
      <table>
        <thead><tr><th>Todiste</th><th>Varmennettu sisältö</th><th>Todistusvoima</th><th>Tila / seuraava askel</th></tr></thead>
        <tbody>
          <tr><td><strong>ADM PLI-PAT</strong></td><td>Puolikuukausi- ja kuukausiraportointi sekä kulutusveron maksu samassa palvelussa</td><td>${tag("verified", "A-tason raportointijärjestelmä")}</td><td><a class="source-link" href="${esc(italy.serviceUrl)}" target="_blank" rel="noopener">ADM:n palvelu ↗</a></td></tr>
          <tr><td><strong>Julkinen kuukausimallipohja</strong></td><td>${integer(italy.reportingFlows.reduce((sum, item) => sum + item.fieldCount, 0))} kenttäriviä kolmessa toimitusvirrassa</td><td>${tag("verified", "A-tason kenttärakenne")}</td><td>Kansalliset toteumasummat eivät ole mallipohjassa</td></tr>
          <tr><td><strong>Vuoden 2026 tekninen arvio</strong></td><td>${integer(italy2026.estimatedQuantityMl)} ml · ${moneyEur(italy2026.estimatedTaxRevenueEur)}</td><td>${tag("partial", "B-tason viranomaisennuste")}</td><td><strong>Ei toteutunut myynti tai verokertymä</strong></td></tr>
          <tr><td><strong>${esc(italy.request.id)}</strong></td><td>${esc(italy.actualNeeded)}</td><td>${tag(italy.request.status)}</td><td>${esc(italy.request.authority)}</td></tr>
        </tbody>
      </table>
      <div class="meta-line table-note"><strong>Auditointi:</strong> ${integer(italy.manifest.audit.service_assertions_passed)} palveluväitettä, ${integer(italy.manifest.audit.workbook_assertions_passed)} taulukkoväitettä, ${integer(italy.manifest.audit.rate_assertions_passed)} verokantaväitettä ja ${integer(italy.manifest.audit.budget_assertions_passed)} budjettitaulukon lukua tarkistettiin. Toteutuneen vuoden 2025 kansallisen aggregaatin tila on <code>${esc(italy.actualStatus)}</code>.</div>`;

    $("#italy-adm-rates").innerHTML = `
      <table>
        <thead><tr><th>Voimassa</th><th>Tuoteryhmä</th><th>Virallinen kanta</th><th>Vero / 10 ml</th><th>Käyttöraja</th></tr></thead>
        <tbody>${italy.rates.map((item) => `<tr>
          <td>${esc(item.effectiveFrom)} - ${esc(item.effectiveTo)}</td><td><strong>${esc(item.label)}</strong></td>
          <td class="num"><strong>${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 6, maximumFractionDigits: 6 }).format(item.rateEurPerMl)} €/ml</strong></td>
          <td class="num">${eur(item.rateEurPer10Ml, 5)}</td><td>Kuukausikohtainen kategoriavolyymi tarvitaan vuositason verolaskelmaan. <a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener">ADM-päätös ↗</a></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Ei yhtä koko vuoden kantaa:</strong> verokanta muuttui 1.2.2025. Tammikuun ja helmi-joulukuun määrät sekä nikotiinilliset ja nikotiinittomat/aromit on pidettävä erillään.</div>`;

    $("#italy-adm-forecast").innerHTML = `
      <table>
        <thead><tr><th>Vuosi</th><th>Tuoteryhmä</th><th>Ehdotettu kanta</th><th>Arvioitu vuotuinen määrä</th><th>Arvioitu verotuotto</th><th>Lisätuotto</th><th>Luokitus</th></tr></thead>
        <tbody>${italy.forecast.map((item) => `<tr>
          <td><strong>${item.year}</strong></td><td>${esc(item.label)}</td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 6, maximumFractionDigits: 6 }).format(item.proposedUnitTaxEurPerMl)} €/ml</td>
          <td class="num">${integer(item.estimatedQuantityMl)} ml<div class="meta-line">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 3 }).format(item.estimatedQuantityLitres)} l</div></td>
          <td class="num"><strong>${moneyEur(item.estimatedTaxRevenueEur)}</strong></td><td class="num">${moneyEur(item.estimatedIncrementalRevenueEur)}</td>
          <td>${tag("partial", "Virallinen ennuste - ei toteuma")}</td>
        </tr>`).join("")}</tbody>
        <tfoot>${italy.forecastTotals.map((item) => `<tr><td><strong>${item.year} yhteensä</strong></td><td>Kaksi tuoteryhmää</td><td>—</td><td class="num"><strong>${integer(item.estimatedQuantityMl)} ml</strong></td><td class="num"><strong>${moneyEur(item.estimatedTaxRevenueEur)}</strong></td><td class="num">${moneyEur(item.estimatedIncrementalRevenueEur)}</td><td>Budjettiennuste</td></tr>`).join("")}</tfoot>
      </table>
      <div class="meta-line table-note"><strong>Oikea käyttö:</strong> vertailu- ja plausibiliteettitieto. Taulukko 17 on merkitty “intervento proposto” ja “quantità annua stimata”; se ei korvaa ADM:n toteutuneita veroilmoitus- tai myyntisummia. <a class="source-link" href="${esc(italy.budgetUrl)}" target="_blank" rel="noopener">Italian parlamentin lähde ↗</a></div>`;

    $("#italy-adm-flows").innerHTML = `
      <table>
        <thead><tr><th>Toimitusvirta</th><th>ADM:n taulukkonimi</th><th>Kenttiä</th><th>Kokonaismäärän yksikkö</th><th>Keskeiset kentät</th><th>Käsittely</th></tr></thead>
        <tbody>${italy.reportingFlows.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong></td><td><code>${esc(item.officialSheet)}</code></td><td class="num">${integer(item.fieldCount)}</td>
          <td>${esc(item.quantityUnit === "millilitres" ? "millilitra" : "litra")}</td><td>${esc(item.fields.join(" · "))}</td><td>${esc(item.interpretation)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Kaksinkertaisen laskennan esto:</strong> verovarastojen välisiä siirtoja ei lisätä myyntipistetoimituksiin tai suoriin loppukuluttajatoimituksiin. ADM:ltä pyydetään myös viranomaisen oma määritelmä kulutukseen luovutuksesta ja mahdollisten oikaisujen käsittelystä.</div>`;

    const poland = data.polandEvidence;
    const poland2023Volume = poland.volume.find((item) => item.year === 2023);
    const poland2023Revenue = poland.revenue.find((item) => item.year === 2023);
    const poland2025Revenue = poland.revenue.find((item) => item.year === 2025);
    const polandLiquid2025 = poland.categories2025.find((item) => item.category === "e_liquid");
    const polandDevice2025 = poland.categories2025.find((item) => item.category === "vaporisation_devices");
    const polandKit2025 = poland.categories2025.find((item) => item.category === "vaporisation_device_part_kits");
    $("#poland-summary").innerHTML = `
      <table>
        <thead><tr><th>Todiste</th><th>Virallinen tulos</th><th>Todistusvoima</th><th>Rajaus / seuraava askel</th></tr></thead>
        <tbody>
          <tr><td><strong>MF ZEFIR2 / AIS 2023</strong></td><td><strong>${integer(poland2023Volume.litres)} litraa</strong></td><td>${tag("verified", "A-tason ilmoitettu laillinen virta")}</td><td>Kotimaan myynti + EU-hankinta + tuonti; ei retail-arvo</td></tr>
          <tr><td><strong>MF e-nesteverotuotto 2023</strong></td><td><strong>${moneyPln(poland2023Revenue.revenuePln)}</strong></td><td>${tag("verified", "A-tason verototeuma")}</td><td>Määrä × 0,55 PLN/ml eroaa tuotosta vain ${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(poland.manifest.audit["2023_gap_pct_of_official_revenue"])} %</td></tr>
          <tr><td><strong>MF vuoden 2025 toteuma</strong></td><td>${moneyPln(poland2025Revenue.revenuePln)} e-neste · ${moneyPln(polandDevice2025.actualMillionPln * 1e6)} laitteet · ${moneyPln(polandKit2025.actualMillionPln * 1e6)} osasarjat</td><td>${tag("verified", "A-tason tuoteryhmäkohtainen vero")}</td><td>E-nesteen 86,507 % talousarviototeuma; ei yhden kannan ml-muunnosta</td></tr>
          <tr><td><strong>${esc(poland.request.id)}</strong></td><td>2023 revisiosyy · 2024 tuotto · 2024–2025 kuukausittaiset ml ja laiteyksiköt</td><td>${tag(poland.request.status)}</td><td><a class="source-link" href="${esc(poland.publicInformationUrl)}" target="_blank" rel="noopener">MF:n virallinen julkisen tiedon kanava ↗</a></td></tr>
        </tbody>
      </table>
      <div class="meta-line table-note"><strong>Vuoden 2025 veroraja:</strong> e-nestekanta oli tammi-helmikuussa 0,55 PLN/ml ja maalis-joulukuussa 0,96 PLN/ml. Kertakäyttölaitteen nesteeseen tuli 40 PLN:n lisävero ja höyrystinlaitteisiin/osasarjoihin 40 PLN:n yksikkövero 1.7.2025. <a class="source-link" href="${esc(poland.ratesUrl)}" target="_blank" rel="noopener">Virkasäädös ↗</a></div>`;

    const polandYears = [2020, 2021, 2022, 2023, 2024, 2025];
    $("#poland-volume").innerHTML = `
      <table>
        <thead><tr><th>Vuosi</th><th>Virallinen e-nestemäärä</th><th>Virallinen e-nesteverotuotto</th><th>Tila / tulkinta</th></tr></thead>
        <tbody>${polandYears.map((year) => {
          const volume = poland.volume.find((item) => item.year === year);
          const revenue = poland.revenue.find((item) => item.year === year);
          return `<tr><td><strong>${year}</strong></td><td>${volume ? `<strong>${integer(volume.litres)} l</strong>` : "Ei saatu"}</td><td>${revenue?.revenuePln ? `<strong>${moneyPln(revenue.revenuePln)}</strong>` : "Ei saatu"}</td><td>${year === 2024 ? "Interpellaatio 18182 odottaa vastausta" : year === 2025 ? "E-nestetulo sisältää kannanmuutoksen ja kertakäyttölisän" : volume ? "Ilmoitettu laillinen valmisteverovirta; ei sell-out" : "Vain julkaistu verotuotto"}</td></tr>`;
        }).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Lähdejärjestelmät:</strong> kotimaan myynti ja EU-hankinta ZEFIR2 / IAS Kraków; tuonti AIS. <a class="source-link" href="${esc(poland.volumeUrl)}" target="_blank" rel="noopener">MF:n virallinen volyymivastaus ↗</a></div>`;

    $("#poland-revision").innerHTML = `
      <table>
        <thead><tr><th>Julkaisu</th><th>Vuoden 2023 määrä</th><th>Lähderajaus</th><th>Auditointipäätös</th></tr></thead>
        <tbody>${poland.revision.map((item) => `<tr>
          <td><strong>${esc(item.releaseDate)}</strong></td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(item.litres)} l</td>
          <td>${esc(item.sourceDetail)}</td><td>${item.maturity.startsWith("later") ? tag("verified", "Myöhempi julkaisu — käytetään") : tag("partial", "Aikaisempi julkaisu")}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Revisio:</strong> myöhempi määrä on ${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(Math.abs(poland.manifest.official_results.revision_delta_litres))} litraa eli ${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(Math.abs(poland.manifest.official_results.revision_delta_pct_vs_earlier))} % pienempi. Syy pyydetään PX-PL-001:llä; sitä ei arvata.</div>`;

    $("#poland-reconciliation").innerHTML = `
      <table>
        <thead><tr><th>Vuosi</th><th>Virallinen määrä</th><th>Määrä × 0,55 PLN/ml</th><th>Virallinen verotuotto</th><th>Ero</th><th>Ero / verotuotto</th></tr></thead>
        <tbody>${poland.reconciliation.map((item) => `<tr>
          <td><strong>${item.year}</strong></td><td class="num">${integer(item.officialMl)} ml</td><td class="num">${moneyPln(item.mechanicalExcisePln)}</td><td class="num">${moneyPln(item.officialRevenuePln)}</td><td class="num">${moneyPln(item.gapPln)}</td>
          <td class="num"><strong>${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.gapPct)} %</strong></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Ei veronkiertolaskelma:</strong> ristiintarkistus testaa suuruusluokan. Erityisesti vuoden 2021 ero voi sisältää jaksotusta, siirtymäsääntöjä ja myöhempiä oikaisuja.</div>`;

    $("#poland-controls").innerHTML = `
      <table>
        <thead><tr><th>Jakso</th><th>Kontrollit</th><th>Rikkomukset / onnistuneet kontrollit</th><th>Uudelleen laskettu hit rate</th><th>Takavarikoitu / havaittu e-neste</th><th>Kertakäyttölaitteet</th></tr></thead>
        <tbody>${poland.controls.map((item) => `<tr>
          <td><strong>${esc(item.period)}</strong></td><td class="num">${item.controls === null ? "Ei julkaistu" : integer(item.controls)}</td><td class="num">${integer(item.findingsOrSuccessful)}</td>
          <td class="num">${item.hitRatePct === null ? "Ei laskettavissa" : `<strong>${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.hitRatePct)} %</strong>`}</td>
          <td class="num">${item.liquidMl === null ? "—" : integer(item.liquidMl) + " ml"}</td><td class="num">${item.disposableDevices === null ? "—" : integer(item.disposableDevices)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Otantaraja:</strong> vuoden 2025 36,007 % kuvaa kohdennettuja vähittäismyyntipisteiden tarkastuksia. Vuoden 2026 Q1 665 “onnistuneelle kontrollille” ei julkaistu kokonaisnimittäjää, joten hit ratea ei lasketa. <a class="source-link" href="${esc(poland.kasUrl)}" target="_blank" rel="noopener">KAS ↗</a></div>`;

    $("#poland-route").innerHTML = `
      <table>
        <thead><tr><th>CN8</th><th>Rajaus</th><th>WORLD-tuonti</th><th>Intra-EU</th><th>Extra-EU</th><th>Extra-osuus</th><th>WORLD-vienti</th></tr></thead>
        <tbody>${poland.route.map((item) => `<tr>
          <td><code>${esc(item.code)}</code></td><td><strong>${esc(item.label)}</strong></td><td class="num">${moneyEur3(item.worldImportEur)}</td><td class="num">${moneyEur3(item.intraImportEur)}</td><td class="num">${moneyEur3(item.extraImportEur)}</td>
          <td class="num">${item.extraSharePct === null ? "—" : new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.extraSharePct) + " %"}</td><td class="num">${moneyEur3(item.worldExportEur)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Kapea kori:</strong> WORLD ${moneyEur3(poland.manifest.official_results.eurostat_narrow_world_import_eur)}, intra-EU ${moneyEur3(poland.manifest.official_results.eurostat_narrow_intra_eu_import_eur)} ja extra-EU ${moneyEur3(poland.manifest.official_results.eurostat_narrow_extra_eu_import_eur)}. Intra-EU kumppani on lähetysmaa, extra-EU kumppani alkuperämaa. 2404-nimikkeet ovat laajoja proxyja; tullivirta ei ole kotimyynti.</div>`;

    const nl = data.netherlandsEvidence;
    const nlTotal = nl.market.find((item) => item.metric === "reported_total_consumer_spend");
    const nlIllegal = nl.market.find((item) => item.metric === "reported_illegal_consumer_spend_age_specific");
    const nlDirect = nl.market.find((item) => item.metric === "reported_direct_illegal_87pct_method");
    const nlNarrow = nl.bridge.find((item) => item.basket === "narrow_devices_plus_nicotine_proxy");
    $("#netherlands-summary").innerHTML = `
      <table>
        <thead><tr><th>Todiste</th><th>Tulos</th><th>Todistusvoima</th><th>Rajaus / seuraava askel</th></tr></thead>
        <tbody>
          <tr><td><strong>VWS:n tilaama kokonaisarvio</strong></td><td><strong>${moneyEur3(nlTotal.valueEur)}</strong></td><td>${tag("partial", "B-tason tutkimusmalli")}</td><td>Ei vero-, tulli-, kassarekisteri- tai auditoitu retail-sarja</td></tr>
          <tr><td><strong>Ikäryhmäkohtainen laiton meno</strong></td><td><strong>${moneyEur3(nlIllegal.valueEur)} · ${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(nlIllegal.sharePct)} %</strong></td><td>${tag("partial", "Raportoitu malliarvio")}</td><td>Sisältää ulkomailta fyysisesti ostaneen keskiryhmän käyttäjäluokituksessa</td></tr>
          <tr><td><strong>Suora 87 % -menetelmä</strong></td><td><strong>${moneyEur3(nlDirect.valueEur)}</strong></td><td>${tag("partial", "Menetelmäherkkyys")}</td><td>87 % on käyttäjäinsidenssi, ei yksikkö- tai euromarkkinaosuus</td></tr>
          <tr><td><strong>${esc(nl.request.id)}</strong></td><td>Ikäsolut · SPSS · vastausdispositio · EU-CEG-yksiköt/ml/arvo</td><td>${tag(nl.request.status)}</td><td><a class="source-link" href="${esc(nl.urls.vws_woo)}" target="_blank" rel="noopener">VWS Woo -kanava ↗</a></td></tr>
        </tbody>
      </table>
      <div class="meta-line table-note"><strong>Riippumattoman toiston tila:</strong> ${esc(nl.manifest.confidence.exact_reproducibility)}. 5 529 painotetusta vastaajasta 443 oli todellisia vape-vastaajia ja analyysin painotettu määrä 501; niitä ei tulkita 501 erilliseksi ihmiseksi. Viestiä ei ole lähetetty.</div>`;

    $("#netherlands-method").innerHTML = `
      <table>
        <thead><tr><th>Auditointikohde</th><th>Havainto</th><th>Auditointitulos</th><th>Pankkikäyttö</th><th>Lähdesivu</th></tr></thead>
        <tbody>${nl.method.map((item) => `<tr>
          <td><strong>${esc(item.item.replaceAll("_", " "))}</strong></td><td>${esc(item.observed)}</td><td><code>${esc(item.result)}</code></td><td>${esc(item.bankUse)}</td>
          <td>${esc(item.sourcePage)} · <a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener">raportti ↗</a></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Hit rate -raja:</strong> 443 / 5 529 = 8,012 % on raakaseulan osuus ja 501 / 5 529 = 9,061 % painotettu analyysiosuus. Varsinaista kyselyn vastausastetta ei voi laskea, koska täydellinen kutsu-/dispositiotieto puuttuu.</div>`;

    $("#netherlands-prices").innerHTML = `
      <table>
        <thead><tr><th>Tuote</th><th>Raportoitu keskihinta</th><th>n</th><th>Ostotahti</th><th>Rajoite</th></tr></thead>
        <tbody>${nl.prices.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong></td><td class="num"><strong>${eur(item.averagePriceEur)}</strong></td><td class="num">${integer(item.reportedN)}</td><td>${esc(item.purchaseFrequency)}</td><td>${esc(item.boundary)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>E-nesteraja:</strong> täyttönesteen keskihinta oli 8,00 euroa ja raportoitu ostotahti neljä kertaa kuukaudessa, mutta pakkauskoko ja nikotiinipitoisuus puuttuvat. Hintaa ei muunnettu EUR/ml-luvuksi tai kansalliseksi litramääräksi.</div>`;

    $("#netherlands-stress").innerHTML = `
      <table>
        <thead><tr><th>Skenaario</th><th>Kerroin</th><th>Kokonaiskulutusmeno</th><th>Laiton meno</th><th>Laillinen jäännös</th><th>Laiton osuus vakiona</th></tr></thead>
        <tbody>${nl.stress.map((item) => `<tr>
          <td><strong>${esc({ lower_price_20pct: "−20 %", reported_reference: "Raportoitu", upper_price_20pct: "+20 %" }[item.scenario])}</strong></td>
          <td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.multiplier)}×</td><td class="num"><strong>${moneyEur3(item.totalSpendEur)}</strong></td><td class="num">${moneyEur3(item.illegalSpendEur)}</td><td class="num">${moneyEur3(item.legalResidualEur)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.illegalSharePct)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Ei luottamusväli:</strong> ±20 % muuttaa kaikkia hinta-/meno-oletuksia mekaanisesti ja pitää kulutusrakenteen vakiona. Skenaariot eivät ole empiirinen ala-, perus- ja yläennuste.</div>`;

    $("#netherlands-youth").innerHTML = `
      <table>
        <thead><tr><th>Skenaario</th><th>Prevalenssi</th><th>12–16-vuotiaita</th><th>Ero raportin 22,8 %:iin</th><th>Tila</th></tr></thead>
        <tbody>${nl.youth.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong></td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(item.prevalencePct)} %</td><td class="num">${integer(item.impliedPeople)}</td><td class="num">${item.differencePeople ? "+" + integer(item.differencePeople) : "—"}</td><td><code>${esc(item.status)}</code></td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Auditointihavainto:</strong> 24,6 % piste-estimaatti tuottaa raportin väestöpohjalla 13 956 henkilöä enemmän kuin 22,8 %. Tarkkaa euromäärää ei voi johtaa ilman ikäryhmän kuukausimeno- ja laittomuussoluja.</div>`;

    $("#netherlands-cbs").innerHTML = `
      <table>
        <thead><tr><th>Vuosi</th><th>Ikäryhmä</th><th>Piste-estimaatti</th><th>95 % ala</th><th>95 % ylä</th><th>Mittari</th></tr></thead>
        <tbody>${nl.cbs.map((item) => `<tr>
          <td>${item.year}</td><td><strong>${esc(item.ageGroup)}</strong></td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(item.pointPct)} %</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(item.lowerPct)} %</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(item.upperPct)} %</td><td>Päivittäin tai ei-päivittäin</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Määritelmäero:</strong> CBS mittaa nykykäyttöä; ScholierenMonitorin joskus kokeillut -mitta ei ole sama asia. Molemmat ovat käyttöprevalensseja, eivät myyntivolyymia tai kulutusmenoa. <a class="source-link" href="${esc(nl.urls.cbs_esigarette_2024)}" target="_blank" rel="noopener">CBS API ↗</a></div>`;

    $("#netherlands-bridge").innerHTML = `
      <table>
        <thead><tr><th>Kori</th><th>WORLD-tuonti</th><th>WORLD-vienti</th><th>Rajavirta netto</th><th>Intra-tuonti</th><th>Extra-tuonti</th><th>Extra-osuus</th><th>Vienti / tuonti</th><th>Täsmäytys</th></tr></thead>
        <tbody>${nl.bridge.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong><div class="meta-line">${esc(item.products)}</div></td><td class="num">${moneyEur3(item.worldImportEur)}</td><td class="num">${moneyEur3(item.worldExportEur)}</td><td class="num"><strong>${moneyEur3(item.borderNetEur)}</strong></td><td class="num">${moneyEur3(item.intraImportEur)}</td><td class="num">${moneyEur3(item.extraImportEur)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.extraImportSharePct)} %</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.exportImportRatioPct)} %</td><td>${item.importGapEur === 0 && item.exportGapEur === 0 ? tag("verified", "0 € / 0 €") : tag("partial")}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Rotterdam-raja:</strong> kapea ${moneyEur3(nlNarrow.borderNetEur)} tuonti miinus vienti ei ole kotimainen kysyntä. Hubi, tullivarastot, jälleenvienti, kotimainen tuotanto ja eri arvostustasot estävät suoran muunnoksen kuluttajamyyntiin.</div>`;

    $("#netherlands-route").innerHTML = `
      <table>
        <thead><tr><th>CN8</th><th>Rajaus</th><th>Virta</th><th>Partneriryhmä</th><th>Arvo</th><th>Määrä kg</th><th>Supplementary quantity</th><th>Täsmäytysero</th></tr></thead>
        <tbody>${nl.route.map((item) => `<tr>
          <td><code>${esc(item.product)}</code></td><td>${esc(item.scope)}</td><td><strong>${esc(item.flow === "import" ? "Tuonti" : "Vienti")}</strong></td><td>${esc(item.partnerScope)}</td><td class="num">${moneyEur3(item.valueEur)}</td><td class="num">${item.quantityKg === null ? "—" : integer(item.quantityKg)}</td><td class="num">${item.supplementaryQuantity === null ? "—" : integer(item.supplementaryQuantity)}</td><td class="num">${item.gapEur === null ? "—" : moneyEur3(item.gapEur)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Määräraja:</strong> 85434000:n kilogrammakenttä on laaja ja supplementary quantity puuttuu. Kilogrammoja ei muunnettu laitteiksi tai millilitroiksi.</div>`;

    $("#netherlands-partners").innerHTML = `
      <table>
        <thead><tr><th>CN8</th><th>Virta</th><th>Sija</th><th>Partneri</th><th>Partnerin rooli</th><th>Arvo</th><th>Osuus julkaistuista maariveistä</th></tr></thead>
        <tbody>${nl.partners.map((item) => `<tr>
          <td><code>${esc(item.product)}</code></td><td>${esc(item.flow === "import" ? "Tuonti" : "Vienti")}</td><td class="num">${item.rank}</td><td><strong>${esc(item.partnerLabel)}</strong></td><td>${esc(item.partnerRole)}</td><td class="num">${moneyEur3(item.valueEur)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.sharePct)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Partnerisemantiikka:</strong> intra-EU-tuonnissa partneri on lähetysmaa ja extra-EU-tuonnissa alkuperämaa. Laiterivin suurin tuontialkuperä oli Kiina ${moneyEur3(nl.partners.find((item) => item.product === "85434000" && item.flow === "import" && item.rank === 1).valueEur)}; 24041200-rivin Kiina-tuonti ${moneyEur3(nl.partners.find((item) => item.product === "24041200" && item.flow === "import" && item.rank === 1).valueEur)}.</div>`;

    const se = data.swedenEvidence;
    const seChecks = se.manifest.key_checks;
    const se2024 = se.volume.filter((item) => item.year === 2024);
    const seNarrowRoute = se.route.find((item) => item.scope === "narrow_patent_scope_proxy");
    $("#sweden-summary").innerHTML = `
      <table>
        <thead><tr><th>Todiste</th><th>Arvo</th><th>Luokitus</th><th>Tulkintaraja</th></tr></thead>
        <tbody>
          <tr><td><strong>Finansdepartement 2024</strong></td><td><strong>${integer(seChecks.official_2024_volume_litres)} litraa · ${moneySek(seChecks.official_2024_displayed_revenue_sek)}</strong></td><td>${tag("verified", "A-tason veroankkuri")}</td><td>Rekisteröity verollinen nikotiinia sisältävä e-nestekulutus; ei koko retail-markkina</td></tr>
          <tr><td><strong>Määrä × tarkat kannat</strong></td><td>${moneySek(seChecks.mechanical_2024_revenue_sek)} · ero ${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(seChecks.reported_minus_mechanical_pct)} %</td><td>${tag(seChecks.rounding_intervals_overlap ? "verified" : "partial", "Pyöristysvälit päällekkäin")}</td><td>Järkevyystarkastus; ei puuttuvan markkinan arvio</td></tr>
          <tr><td><strong>Eurostat 2025 · kapea kori</strong></td><td>${moneyEur3(seNarrowRoute.worldImportEur)} tuonti · ${moneyEur3(seNarrowRoute.worldExportEur)} vienti · ${moneyEur3(seNarrowRoute.borderNetEur)} netto</td><td>${tag("partial", "Virallinen rajavirta")}</td><td>Tulliarvo ei ole Ruotsin kuluttajamyynti</td></tr>
          <tr><td><strong>FHM Article 20(7)</strong></td><td>Kansallinen myyntiaggregaatti pyydetty</td><td>${tag(se.requests[0].status)} <strong>${esc(se.requests[0].id)}</strong></td><td>Keräysvelvollisuus varmistettu; julkinen kokonaisluku puuttuu</td></tr>
          <tr><td><strong>Finansdepartement</strong></td><td>Pyöristämättömät määrä- ja verosolut pyydetty</td><td>${tag(se.requests[1].status)} <strong>${esc(se.requests[1].id)}</strong></td><td>Molemmat viestit ovat lähettämättömiä luonnoksia</td></tr>
        </tbody>
      </table>
      <div class="meta-line table-note"><strong>Vuoden 2024 rakenne:</strong> ${se2024.map((item) => `${esc(item.label)} ${integer(item.litres)} l / ${moneySek(item.revenueSek)}`).join(" · ")}. Vuoden 2025–2026 taulukkorivejä ei käsitellä lopullisina toteumina.</div>`;

    $("#sweden-rates").innerHTML = `
      <table>
        <thead><tr><th>Vuosi</th><th>Ryhmä</th><th>SEK/l</th><th>SEK/ml</th><th>Tila</th></tr></thead>
        <tbody>${se.rates.map((item) => `<tr>
          <td>${item.year}</td><td><strong>${esc(item.label)}</strong></td><td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 0 }).format(item.rateSekPerLitre)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.rateSekPerMl)}</td><td>${esc(item.status)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Vuoden 2026 kanta:</strong> muu verollinen e-neste 2,087 SEK/ml ja 15–20 mg/ml e-neste 4,174 SEK/ml. <a class="source-link" href="${esc(se.urls.tax)}" target="_blank" rel="noopener">Skatteverket ↗</a></div>`;

    $("#sweden-reconciliation").innerHTML = `
      <table>
        <thead><tr><th>Ryhmä</th><th>Näytetty määrä</th><th>Kanta</th><th>Määrä × kanta</th><th>Näytetty verotuotto</th><th>Ero</th><th>Pyöristysvälit</th></tr></thead>
        <tbody>${se.reconciliation.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong></td><td class="num">${integer(item.litres)} l</td><td class="num">${item.rateSekPerLitre === null ? "Painotettu" : integer(item.rateSekPerLitre) + " SEK/l"}</td><td class="num">${moneySek(item.mechanicalTaxSek)}</td><td class="num">${moneySek(item.displayedRevenueSek)}</td><td class="num">${moneySek(item.gapSek)} · ${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.gapPct)} %</td><td>${tag(item.roundingOverlap ? "verified" : "partial", item.roundingOverlap ? "Päällekkäin" : "Ei päällekkäin")}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Auditointitulos:</strong> kokonaistason 80,8 milj. SEK:n mekaaninen tulos ja 80,0 milj. SEK:n näytetty tulo eroavat −0,8 milj. SEK eli −1,0 %. Taulukko näyttää määrän tuhansina litroina ja tulon 0,01 miljardin SEK:n tarkkuudella.</div>`;

    $("#sweden-prices").innerHTML = `
      <table>
        <thead><tr><th>WHO-havainto</th><th>Pakkaus</th><th>Hinta</th><th>SEK/ml</th><th>Valmistevero-osuus</th><th>Todistustaso</th></tr></thead>
        <tbody>${se.prices.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong></td><td class="num">${new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 0 }).format(item.packageMl)} ml</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.priceSek)} SEK</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.priceSekPerMl)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.exciseSharePct)} %</td><td>${tag("b", "B-tason halvin tuotemerkki")}</td>
        </tr>`).join("")}</tbody>
      </table>`;

    $("#sweden-stress").innerHTML = `
      <table>
        <thead><tr><th>Skenaario</th><th>SEK/10 ml</th><th>10 ml vasta-arvot</th><th>Mekaaninen arvo</th><th>Näytetty vero / arvo</th><th>Raja</th></tr></thead>
        <tbody>${se.stress.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong></td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.priceSekPer10Ml)}</td><td class="num">${integer(item.tenMlEquivalents)}</td><td class="num"><strong>${moneySek(item.mechanicalValueSek)}</strong></td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.taxSharePct)} %</td><td>Herkkyys, ei virallinen markkina-arvo</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Hintaraja:</strong> WHO:n 69 SEK/10 ml on halvimman tuotemerkin havainto, ei myyntipainotettu keskihinta. Stressi ei kata laitteita, nikotiinittomia nesteitä, laitonta kauppaa tai kanavamixiä.</div>`;

    $("#sweden-route").innerHTML = `
      <table>
        <thead><tr><th>Rajaus</th><th>WORLD-tuonti</th><th>WORLD-vienti</th><th>Rajavirta netto</th><th>Intra-tuonti</th><th>Extra-tuonti</th><th>Extra-osuus</th><th>Täsmäytys</th></tr></thead>
        <tbody>${se.route.map((item) => `<tr>
          <td><strong>${esc(item.label)}</strong><div class="meta-line">${esc(item.products)}</div></td><td class="num">${moneyEur3(item.worldImportEur)}</td><td class="num">${moneyEur3(item.worldExportEur)}</td><td class="num"><strong>${moneyEur3(item.borderNetEur)}</strong></td><td class="num">${moneyEur3(item.intraImportEur)}</td><td class="num">${moneyEur3(item.extraImportEur)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.extraImportSharePct)} %</td><td>${item.importGapEur === 0 && item.exportGapEur === 0 ? tag("verified", "0 € / 0 €") : tag("partial")}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Kapea kori:</strong> 48,611 milj. EUR:n rajavirran nettoa ei nimetä kotimaiseksi kysynnäksi. CN 24041200 on laaja nikotiinia sisältävien ilman palamista inhaloitavien tuotteiden proxy.</div>`;

    $("#sweden-partners").innerHTML = `
      <table>
        <thead><tr><th>Virta</th><th>Sija</th><th>Partneri</th><th>Rooli</th><th>Arvo</th><th>Osuus julkaistuista maariveistä</th></tr></thead>
        <tbody>${se.partners.map((item) => `<tr>
          <td>${esc(item.flow === "import" ? "Tuonti" : "Vienti")}</td><td class="num">${item.rank}</td><td><strong>${esc(item.partnerLabel)}</strong></td><td>${esc(item.partnerBasis)}</td><td class="num">${moneyEur3(item.valueEur)}</td><td class="num">${new Intl.NumberFormat("fi-FI", { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.sharePct)} %</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Reittitulkinta:</strong> Kiina oli kapean korin suurin tuontipartneririvi ${moneyEur3(se.partners.find((item) => item.flow === "import" && item.rank === 1).valueEur)} eli 74,249 %. Puola, Belgia, Saksa ja Alankomaat ovat intra-EU-riveillä lähetysmaita, eivät todistettuja valmistusalkuperiä.</div>`;

    $("#sweden-method").innerHTML = `
      <table>
        <thead><tr><th>Todiste</th><th>Taso</th><th>Lähde</th><th>Alkuperäinen mittari</th><th>Auditointitulos</th><th>Rajoite</th></tr></thead>
        <tbody>${se.method.map((item) => `<tr>
          <td><code>${esc(item.id)}</code><div class="meta-line">${esc(item.topic)}</div></td><td>${tag(item.tier.toLowerCase(), `Taso ${item.tier}`)}</td><td><strong>${esc(item.source)}</strong></td><td>${esc(item.measure)}</td><td>${esc(item.result)}</td><td>${esc(item.limitation)}</td>
        </tr>`).join("")}</tbody>
      </table>
      <div class="meta-line table-note"><strong>Hit rate:</strong> veroankkurin täsmäytysosuma on laskettu, mutta FHM:n EU-CEG-raportoinnin todellista kattavuusprosenttia ei voi laskea ilman odotettujen ja saatujen raporttien nimittäjiä. ${se.requests.map((item) => `${esc(item.id)} ${tag(item.status)}`).join(" · ")} Viestejä ei ole lähetetty.</div>`;
  }

  function renderGaps() {
    const order = { missing: 0, partial: 1, verified: 2 };
    const items = [...data.countries].sort((a, b) => order[a.status] - order[b.status] || a.name.localeCompare(b.name, "fi"));
    $("#gap-badge").textContent = data.countries.filter((item) => item.status !== "verified").length;
    $("#gap-list").innerHTML = items.map((item) => `
      <article class="gap-row">
        <div><strong>${esc(item.name)}</strong><p>${tag(item.status)}</p></div>
        <div><strong>Puuttuva näyttö</strong><p>${esc(item.missing)}</p></div>
        <div><strong>Hankintareitti</strong><p>${esc(item.how)}</p></div>
        <span class="priority ${item.status === "missing" ? "high" : item.status === "partial" ? "medium" : "low"}">${item.status === "missing" ? "AVOIN" : item.status === "partial" ? "TÄYDENNÄ" : "ANKKUROITU"}</span>
      </article>`).join("");
  }

  function renderTasks() {
    $("#work-queue").innerHTML = data.tasks.map((item, index) => `
      <article class="queue-row">
        <div><span class="priority ${esc(item.priority)}">${item.priority === "high" ? "P1" : item.priority === "medium" ? "P2" : "P3"}</span><p>Tehtävä ${index + 1}</p></div>
        <strong>${esc(item.title)}</strong>
        <p>${esc(item.detail)}</p>
        ${tag(item.status)}
      </article>`).join("");
  }

  function renderContacts() {
    $("#contact-table").innerHTML = `
      <table>
        <thead><tr><th>Tunnus</th><th>Maa</th><th>Viranomainen</th><th>Julkinen kanava</th><th>Pyydetty tieto</th><th>Tila</th><th>Lähetetty</th><th>Seuranta</th></tr></thead>
        <tbody>${data.contacts.map((item) => `<tr>
          <td>${esc(item.id)}</td><td>${esc(item.market)}</td><td><strong>${esc(item.authority)}</strong></td>
          <td>${item.channel.startsWith("http") ? `<a class="source-link" href="${esc(item.channel)}" target="_blank" rel="noopener">Avaa kanava ↗</a>` : esc(item.channel)}</td>
          <td>${esc(item.scope)}</td><td>${tag(item.status)}</td><td>${esc(item.sent)}</td><td>${esc(item.followUp)}</td>
        </tr>`).join("")}</tbody>
      </table>`;
  }

  function renderMethod() {
    $("#method-grid").innerHTML = data.method.map((item) => `
      <article class="method-card"><span class="step">${esc(item.step)}</span><h3>${esc(item.title)}</h3><p>${esc(item.detail)}</p></article>`).join("");
  }

  function buildSearchIndex() {
    const rows = [];
    data.countries.forEach((item) => rows.push({ view: "countries", title: item.name, detail: `${item.current} ${item.missing} ${item.how}` }));
    data.evidence.forEach((item) => rows.push({ view: "evidence", title: item.title, detail: `${item.coverage} ${item.use}` }));
    data.tasks.forEach((item) => rows.push({ view: "tasks", title: item.title, detail: item.detail }));
    data.contacts.forEach((item) => rows.push({ view: "contacts", title: `${item.authority} · ${item.market}`, detail: item.scope }));
    data.codes.forEach((item) => rows.push({ view: "customs", title: `HS ${item.code} · ${item.title}`, detail: item.detail }));
    data.taxes.forEach((item) => rows.push({ view: "taxes", title: `${item.name} · verotus`, detail: `${item.verification} ${item.period}` }));
    rows.push({ view: "taxes", title: "Italia · ADM PLI-PAT", detail: `Vuoden 2025 verokannat, ${italy2026Search()} ml:n virallinen 2026 budjettiennuste ja PX-IT-001 toteumapyyntö` });
    rows.push({ view: "taxes", title: "Espanja · AEAT / Modelo 573", detail: `${moneyEur3(data.spainAeat.exactNetRevenueEur)} tarkka nettokertymä, L1/L2-millilitrat ja PX-ES-001` });
    rows.push({ view: "customs", title: "Ranska · Douane / ANSES", detail: `${moneyEur3(data.franceEvidence.manifest.official_results.douane_all_four_codes_border_net_import_eur)} rajat ylittävä nettotuonti, 203 181 ANSES-ilmoitusriviä ja 35,010 % historiallinen hit rate` });
    rows.push({ view: "taxes", title: "Puola · MF / KAS / Eurostat", detail: `805 441 litraa vuoden 2023 ilmoitettua valmisteverovirtaa, ${moneyPln(data.polandEvidence.manifest.official_results.e_liquid_excise_revenue_2025_pln)} vuoden 2025 e-nesteveroa ja 36,007 % kohdennettu KAS-hit rate` });
    rows.push({ view: "taxes", title: "Alankomaat · VWS / CBS / Trimbos / Eurostat", detail: `${moneyEur3(data.netherlandsEvidence.manifest.headline.reported_total_consumer_spend_eur)} mallinnettua kulutusmenoa, 5 529 vastaajan menetelmäauditointi, 22,8 % lähdepoikkeama ja ${moneyEur3(data.netherlandsEvidence.bridge[0].worldImportEur)} WORLD-tuontia` });
    rows.push({ view: "taxes", title: "Ruotsi · Finansdepartement / Skatteverket / FHM / Eurostat", detail: `26 000 litraa ja 80 milj. SEK vuoden 2024 rekisteröityä verollista e-nestekulutusta, −1,0 % pyöristystäsmäytys ja ${moneyEur3(data.swedenEvidence.manifest.key_checks.narrow_2025_border_net_eur)} vuoden 2025 rajavirran netto` });
    data.canadaRetail.observations.forEach((item) => rows.push({ view: "pricing", title: `${item.product} · ${cad(item.priceCad)}`, detail: `${item.seller} ${item.category} ${item.priceBasis}` }));
    return rows;
  }

  function italy2026Search() {
    const total = data.italyAdm.forecastTotals.find((item) => item.year === 2026);
    return integer(total.estimatedQuantityMl);
  }

  function initSearch() {
    const input = $("#global-search");
    const results = $("#search-results");
    const index = buildSearchIndex();
    input.addEventListener("input", () => {
      const query = input.value.trim().toLocaleLowerCase("fi");
      if (query.length < 2) { results.hidden = true; return; }
      const hits = index.filter((item) => `${item.title} ${item.detail}`.toLocaleLowerCase("fi").includes(query)).slice(0, 12);
      results.innerHTML = hits.length ? hits.map((item) => `<button class="search-hit" data-result-view="${esc(item.view)}"><strong>${esc(item.title)}</strong><span>${esc(item.detail.slice(0, 180))}${item.detail.length > 180 ? "…" : ""}</span></button>`).join("") : '<div class="empty-state">Ei osumia.</div>';
      results.hidden = false;
      $$('[data-result-view]', results).forEach((button) => button.addEventListener("click", () => {
        goToView(button.dataset.resultView);
        input.value = "";
      }));
    });
    document.addEventListener("click", (event) => {
      if (!results.contains(event.target) && event.target !== input) results.hidden = true;
    });
  }

  function initActions() {
    $$(".sidebar nav button[data-view]").forEach((button) => button.addEventListener("click", () => goToView(button.dataset.view)));
    $$('[data-jump]').forEach((button) => button.addEventListener("click", () => goToView(button.dataset.jump)));
    $("#menu-button").addEventListener("click", () => $("#sidebar").classList.add("open"));
    $("#mobile-close").addEventListener("click", () => $("#sidebar").classList.remove("open"));
    $("#repo-link").href = data.meta.repo;
    $("#updated-pill").textContent = `Päivitetty ${data.meta.dataDate}`;
    $("#share-button").addEventListener("click", async () => {
      const button = $("#share-button");
      try {
        if (navigator.share) await navigator.share({ title: data.meta.title, url: location.href });
        else await navigator.clipboard.writeText(location.href);
        button.textContent = "Linkki valmis";
      } catch (_) {
        button.textContent = "Kopioi osoiteriviltä";
      }
      setTimeout(() => { button.textContent = "Jaa sivu"; }, 2200);
    });
    window.addEventListener("hashchange", () => goToView(location.hash.slice(1) || "overview", false));
  }

  renderMetrics();
  renderAnchors();
  renderReport();
  renderMiniTasks();
  renderCountryFilters();
  renderCountries();
  renderCustoms();
  renderStress();
  renderEvidence();
  renderTaxFilters();
  renderTaxes();
  renderGaps();
  renderTasks();
  renderContacts();
  renderMethod();
  initSearch();
  initActions();
  goToView(location.hash.slice(1) || "overview", false);
})();
