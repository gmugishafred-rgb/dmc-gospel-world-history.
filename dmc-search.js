/* DMC universal search: refreshable index of all loaded app sections + full-Bible search handoff. */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const input = $("search"), run = $("searchBtn"), web = $("webSearchBtn");
  if (!input || !run) return;
  const norm = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  const aliases = [
    ["yesu","jesus","christ","kristo","messiah","messiya","umukiza"],
    ["imana","god","yahweh","uwiteka","nyagasani"],
    ["mose","moses"],["pawulo","paul"],["aburahamu","abraham"],["dawidi","david"],
    ["yerusalemu","jerusalem"],["umwuka wera","holy spirit"],["mariya","mary"],
    ["petero","peter"],["yohana","john"],["mariko","mark"],["matayo","matthew"],
    ["luka","luke"],["satani","satan","dayimoni","demon"],["icyaha","sin"],
    ["urukundo","love","agape"],["izuka","resurrection","kuzuka"]
  ];
  let index = [];
  let refreshedAt = 0;
  function add(title, text, tab, kind) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return;
    index.push({ title: String(title || "DMC content").trim(), text: clean, tab: tab || "library", kind: kind || "DMC content", normalized: norm(title + " " + clean) });
  }
  function buildIndex() {
    index = [];
    document.querySelectorAll("main.wrap .section").forEach(section => {
      const tab = section.id || "library";
      section.querySelectorAll(".card, article, .story-card").forEach((node, i) => {
        const heading = node.querySelector("h1,h2,h3,h4,b,strong");
        const title = heading ? heading.textContent.trim() : (section.querySelector("h2")?.textContent || tab) + " " + (i + 1);
        add(title, node.innerText || node.textContent, tab, section.querySelector("h2")?.textContent || tab);
      });
    });
    if (Array.isArray(window.dmcSearchExtra)) window.dmcSearchExtra.forEach(x => add(x.title, x.text, x.tab, x.kind));
    refreshedAt = Date.now();
    const status = $("dmcSearchIndexStatus");
    if (status) status.textContent = "Search index refreshed • " + index.length + " entries";
    return index.length;
  }
  function variants(query) {
    const q = norm(query);
    const expanded = new Set([q, ...q.split(" ").filter(Boolean)]);
    aliases.forEach(group => {
      const n = group.map(norm);
      if (n.some(alias => q.includes(alias) || alias.includes(q))) group.forEach(alias => expanded.add(norm(alias)));
    });
    return [...expanded].filter(Boolean);
  }
  function excerpt(text, query) {
    const words = norm(query).split(" ").filter(w => w.length > 1);
    const lower = norm(text);
    let at = -1;
    for (const word of words) { at = lower.indexOf(word); if (at >= 0) break; }
    if (at < 0) return text.slice(0, 230) + (text.length > 230 ? "…" : "");
    const start = Math.max(0, at - 75), end = Math.min(text.length, at + 190);
    return (start ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }
  function fullBibleUrl(query) {
    return "https://www.biblegateway.com/quicksearch/?quicksearch=" + encodeURIComponent(query) + "&version=KJV";
  }
  function search() {
    const raw = input.value.trim();
    if (!raw) { input.focus(); return; }
    if (!index.length || Date.now() - refreshedAt > 300000) buildIndex();
    const terms = variants(raw);
    const tokens = norm(raw).split(" ").filter(Boolean);
    const found = index.map(item => {
      const score = terms.reduce((n, term) => n + (item.normalized.includes(term) ? (term === norm(raw) ? 5 : 2) : 0), 0)
        + tokens.reduce((n, token) => n + (item.normalized.includes(token) ? 1 : 0), 0);
      return { ...item, score };
    }).filter(item => item.score > 0).sort((a,b) => b.score - a.score);
    const unique = [...new Map(found.map(x => [x.title + "|" + x.tab, x])).values()];
    const target = $("dmcSearchResults");
    if (!target) return;
    target.innerHTML = '<div class="card" style="grid-column:1/-1"><h2>Search results: ' + escapeHTML(raw) + '</h2><p class="muted">Found ' + unique.length + ' matches in DMC content. Use the Bible button to search the complete Bible text online.</p><div class="toolbar"><button class="btn gold" type="button" id="dmcFullBibleSearch">Search complete Bible text</button><button class="btn" type="button" id="dmcRefreshAgain">Refresh index</button></div></div>' +
      (unique.length ? unique.slice(0,100).map(x => '<article class="card"><span class="tag">' + escapeHTML(x.kind) + '</span><h3>' + escapeHTML(x.title) + '</h3><p>' + escapeHTML(excerpt(x.text, raw)) + '</p><button class="btn" type="button" data-open="' + escapeHTML(x.tab) + '">Open section</button></article>').join("") :
      '<div class="card"><h3>No matching DMC entry found</h3><p>Try another spelling, a related word, or search the complete Bible text online.</p></div>');
    $("dmcFullBibleSearch").onclick = () => window.open(fullBibleUrl(raw), "_blank", "noopener,noreferrer");
    $("dmcRefreshAgain").onclick = () => { buildIndex(); search(); };
    target.querySelectorAll("[data-open]").forEach(button => button.addEventListener("click", () => {
      if (typeof window.showTab === "function") window.showTab(button.dataset.open);
    }));
    if (typeof window.showTab === "function") window.showTab("dmc-search");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  }
  const row = input.closest(".search");
  const refresh = document.createElement("button");
  refresh.type = "button"; refresh.className = "btn"; refresh.id = "dmcRefreshSearch"; refresh.textContent = "Refresh index";
  web?.insertAdjacentElement("afterend", refresh);
  const results = document.createElement("section");
  results.id = "dmc-search"; results.className = "section";
  results.innerHTML = '<h2>DMC Search Library</h2><p id="dmcSearchIndexStatus" class="muted">Preparing search index…</p><div id="dmcSearchResults" class="grid"></div>';
  document.querySelector("main.wrap")?.appendChild(results);
  refresh.addEventListener("click", () => { const count = buildIndex(); const status = $("dmcSearchIndexStatus"); if (status) status.textContent = "Search index refreshed successfully • " + count + " entries"; });
  run.onclick = search;
  input.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); search(); } });
  buildIndex();
  window.DMCrefreshSearchIndex = buildIndex;
  window.DMCsearch = search;
})();