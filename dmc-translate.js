/* DMC whole-page language translation. First-time translations require internet; results are cached locally. */
(function () {
  const selector = document.getElementById("appLanguage");
  if (!selector) return;

  const CACHE_KEY = "dmcTranslationCacheV2";
  const cache = (() => { try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch (_) { return {}; } })();
  const originals = new WeakMap();
  const lastTranslated = new WeakMap();
  const attrOriginals = new WeakMap();
  const attrLast = new WeakMap();
  const ignored = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT"]);
  let busy = false, pending = false, observer, debounce;

  function targetLanguage() { return selector.value || "rw"; }
  function textNodes() {
    const found = [], walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode, parent = node.parentElement;
      if (!parent || ignored.has(parent.tagName) || !node.nodeValue.trim() ||
          parent.closest("[data-translation-ignore]")) continue;
      found.push(node);
    }
    return found;
  }
  async function translate(text, lang) {
    if (!text || !text.trim() || lang === "en") return text;
    const key = lang + "|" + text;
    if (Object.prototype.hasOwnProperty.call(cache, key)) return cache[key];
    try {
      const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
        encodeURIComponent(lang) + "&dt=t&q=" + encodeURIComponent(text);
      const response = await fetch(url);
      if (!response.ok) return text;
      const data = await response.json();
      const result = (data[0] || []).map(part => part[0] || "").join("");
      if (result) { cache[key] = result; return result; }
    } catch (_) {}
    return text;
  }
  async function apply() {
    if (busy) { pending = true; return; }
    busy = true;
    if (observer) observer.disconnect();
    const lang = targetLanguage();
    try {
      const nodes = textNodes();
      const jobs = [];
      for (const node of nodes) {
        const current = node.nodeValue;
        let base = originals.get(node);
        if (base === undefined) { base = current; originals.set(node, base); }
        else if (current !== lastTranslated.get(node) && current !== base) {
          base = current; originals.set(node, base);
        }
        if (lang === "en") { node.nodeValue = base; lastTranslated.set(node, base); }
        else jobs.push({ node, base });
      }
      for (let i = 0; i < jobs.length; i += 5) {
        await Promise.all(jobs.slice(i, i + 5).map(async job => {
          const result = await translate(job.base, lang);
          job.node.nodeValue = result;
          lastTranslated.set(job.node, result);
        }));
      }
      const attrs = ["placeholder", "title", "alt", "aria-label"];
      for (const el of document.querySelectorAll("[placeholder], [title], [alt], [aria-label]")) {
        let saved = attrOriginals.get(el); if (!saved) { saved = {}; attrOriginals.set(el, saved); }
        let last = attrLast.get(el); if (!last) { last = {}; attrLast.set(el, last); }
        for (const attr of attrs) {
          if (!el.hasAttribute(attr)) continue;
          const current = el.getAttribute(attr);
          if (saved[attr] === undefined || (current !== last[attr] && current !== saved[attr])) saved[attr] = current;
          if (lang === "en") { el.setAttribute(attr, saved[attr]); last[attr] = saved[attr]; }
          else { const result = await translate(saved[attr], lang); el.setAttribute(attr, result); last[attr] = result; }
        }
      }
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch (_) {}
      document.documentElement.lang = lang;
    } finally {
      busy = false;
      if (observer) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      if (pending) { pending = false; schedule(); }
    }
  }
  function schedule() {
    clearTimeout(debounce);
    debounce = setTimeout(() => { if (busy) pending = true; else apply(); }, 180);
  }
  observer = new MutationObserver(schedule);
  selector.addEventListener("change", apply);
  const savedLang = localStorage.getItem("dmcAppLanguage");
  if (savedLang && ["rw", "en", "fr"].includes(savedLang)) selector.value = savedLang;
  else { selector.value = "rw"; localStorage.setItem("dmcAppLanguage", "rw"); }
  apply();
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  window.dmcTranslateAll = apply;
})();