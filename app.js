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
  const moneyCad = (value) => value === null || value === undefined ? "—" : new Intl.NumberFormat("fi-FI", { maximumFractionDigits: 3 }).format(value / 1e6) + " milj. CAD";
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
      { label: "Virallinen volyymi", value: `${audit.officialVolumeCount} maata`, detail: "Suomi, Saksa ja Ruotsi", tone: "red" },
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
    data.canadaRetail.observations.forEach((item) => rows.push({ view: "pricing", title: `${item.product} · ${cad(item.priceCad)}`, detail: `${item.seller} ${item.category} ${item.priceBasis}` }));
    return rows;
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
