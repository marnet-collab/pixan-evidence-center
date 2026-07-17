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
      { label: "Valmistevero havaittu", value: `${audit.specificExciseCount} maata`, detail: "WHO:n open-system otoksessa > 0 %", tone: "blue" },
      { label: "Virallinen volyymi", value: `${audit.officialVolumeCount} maa`, detail: "Saksa; muiden maiden haku auki", tone: "red" },
    ].map((item) => `<article class="metric-card ${item.tone}"><span class="metric-label">${esc(item.label)} <span>↗</span></span><strong class="metric-value">${esc(item.value)}</strong><span class="metric-detail">${esc(item.detail)}</span></article>`).join("");

    const items = (taxFilter === "all" ? data.taxes : data.taxes.filter((item) => item.status === taxFilter))
      .sort((a, b) => a.name.localeCompare(b.name, "fi"));
    $("#tax-count").textContent = `${items.length} maata/aluetta`;
    $("#tax-table").innerHTML = `
      <table>
        <thead><tr><th>Maa</th><th>WHO-tila</th><th>Closed 1 ml<br>hinta / kokonaisvero</th><th>Disposable 1 ml<br>hinta / kokonaisvero</th><th>Open 10 ml<br>hinta / kokonaisvero</th><th>Johdettu specific<br>excise / ml</th><th>Verotettu volyymi</th><th>Verotuotto</th><th>Kansallinen tarkistus</th></tr></thead>
        <tbody>${items.map((item) => `<tr>
          <td><a class="source-link" href="${esc(item.url)}" target="_blank" rel="noopener"><strong>${esc(item.name)}</strong> ↗</a><div class="meta-line">${esc(item.period)}</div></td>
          <td>${tag(item.status)}</td>
          <td class="num">${price(item.prices.closed1ml, item.currency)}<br><small>${pct(item.totalPct.closed)}</small></td>
          <td class="num">${price(item.prices.disposable1ml, item.currency)}<br><small>${pct(item.totalPct.disposable)}</small></td>
          <td class="num">${price(item.prices.open10ml, item.currency)}<br><small>${pct(item.totalPct.open)}</small></td>
          <td class="num"><strong>${item.derivedRate === null ? "—" : price(item.derivedRate, item.currency) + "/ml"}</strong><div class="meta-line">${item.derivedRate !== null ? "WHO-hinnasta johdettu" : ""}</div></td>
          <td>${item.taxedVolume === "not_obtained" ? "Ei saatu" : esc(item.taxedVolume)}</td>
          <td>${item.taxRevenue === "not_obtained" ? "Ei saatu" : esc(item.taxRevenue)}</td>
          <td><div class="meta-line">${esc(item.verification)}</div></td>
        </tr>`).join("")}</tbody>
      </table>`;
    $("#tax-audit").innerHTML = `<span>MENETELMÄ JA HIT RATE</span><strong>${audit.numericCount}/${audit.profileCount} numeerista osumaa (${hitRate} %); ${audit.banCount} profiilia ilmoitti myyntikiellon.</strong><p>${esc(audit.method)}</p><p>Varsinaisen maakohtaisen verotuoton osuma tällä hetkellä: ${audit.officialRevenueCount}/${data.taxes.length}. Puuttuva verotuotto on merkitty puutteeksi, ei nollaksi.</p>`;
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
