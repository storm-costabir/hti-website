/* ============================================================================
   hti-build.js — the rendering shared by the three candidate layouts
   ----------------------------------------------------------------------------
   The first set of templates repeated the same 200 lines of DOM building three
   times, which meant a fix to the hero typing effect had to be made three
   times and could silently land in only two. Everything that is genuinely
   identical between layouts lives here; everything that is a design decision
   stays in the template, passed in as a callback or an HTML string.

   Depends on hti-data.js being loaded first.
   ========================================================================== */

window.HTIBuild = (function () {
  const D = window.HTI;

  const $  = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- inline SVG by data-icon, so the markup stays readable -------- */
  function icons () {
    $$('[data-icon]').forEach(el => {
      const svg = D.icons[el.dataset.icon];
      if (svg) el.insertAdjacentHTML('afterbegin', svg);
    });
  }

  /* ---- the hero's rotating tail -------------------------------------
     The static half of the H1 is in the HTML, so a crawler reading the
     document with no JS still gets a correct, complete heading. Only the
     flourish is scripted, and it does not run at all for a reader who has
     asked for reduced motion. */
  function typeTail (sel) {
    const el = $(sel);
    if (!el) return;
    const words = D.hero.rotate;
    if (reduced()) { el.textContent = words[0]; return; }
    let w = 0, c = 0, deleting = false;
    (function tick () {
      const word = words[w];
      if (!deleting) {
        el.textContent = word.slice(0, ++c);
        if (c === word.length) { deleting = true; return setTimeout(tick, 1600); }
      } else {
        el.textContent = word.slice(0, --c);
        if (c === 0) { deleting = false; w = (w + 1) % words.length; return setTimeout(tick, 320); }
      }
      setTimeout(tick, deleting ? 40 : 75);
    })();
  }

  /* ---- the hero's two scrolling logo columns ------------------------
     Each column renders its list twice so the CSS loop can run seamlessly;
     the second copy is hidden from assistive tech and from search engines,
     because announcing every brand name twice helps nobody.
     `variant` is 'colour' or 'white'. */
  function heroColumns (selA, selB, variant) {
    const cols = D.heroColumns[variant] || D.heroColumns.colour;
    const cell = (list, dupe) => list.map(([src, name]) =>
      `<div><img src="${src}" ${dupe ? 'alt="" aria-hidden="true"' : `alt="${esc(name)}"`}
             loading="lazy" decoding="async"></div>`).join('');
    [[selA, cols[0]], [selB, cols[1]]].forEach(([sel, list]) => {
      const el = $(sel);
      if (el) el.innerHTML = cell(list, false) + cell(list, true);
    });
  }

  /* ---- venue tabs over the fifteen programmes -----------------------
     Every panel is written into the DOM and the inactive ones are hidden,
     rather than built on click: all fifteen programme links then stay in
     the HTML for a crawler and for a reader with JS off, whichever tab
     happens to be selected.

     The template supplies tabHTML(venue, count) and panelHTML(programmes,
     venue); this only owns the wiring and the keyboard behaviour. */
  function venueTabs ({ tabs, wrap, tabHTML, panelHTML }) {
    const tabsEl = $(tabs), wrapEl = $(wrap);
    if (!tabsEl || !wrapEl) return;

    tabsEl.innerHTML = D.venues.map((v, i) => {
      const n = D.programmes.filter(p => p.venue === v.key).length;
      return `<button type="button" role="tab" id="tab-${v.key}" aria-controls="panel-${v.key}"
                      aria-selected="${i === 0}" data-venue="${v.key}">${tabHTML(v, n)}</button>`;
    }).join('');

    wrapEl.innerHTML = D.venues.map((v, i) => {
      const mine = D.programmes.filter(p => p.venue === v.key);
      return `<div role="tabpanel" id="panel-${v.key}" aria-labelledby="tab-${v.key}"
                   data-panel="${v.key}" ${i ? 'hidden' : ''}>${panelHTML(mine, v)}</div>`;
    }).join('');

    function select (key) {
      $$(`${tabs} button`).forEach(b => b.setAttribute('aria-selected', b.dataset.venue === key));
      $$(`${wrap} [data-panel]`).forEach(p => { p.hidden = p.dataset.panel !== key; });
    }
    tabsEl.addEventListener('click', e => {
      const b = e.target.closest('button[data-venue]');
      if (b) select(b.dataset.venue);
    });
    /* left/right arrows move between tabs, which is what a tablist owes a
       keyboard user */
    tabsEl.addEventListener('keydown', e => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const btns = $$(`${tabs} button`);
      const i = btns.findIndex(b => b.getAttribute('aria-selected') === 'true');
      const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length;
      e.preventDefault(); select(btns[n].dataset.venue); btns[n].focus();
    });
    return select;
  }

  /* ---- small shared renderers --------------------------------------- */
  const citiesHTML = () => D.cities
    .map(([n, h]) => `<a href="${h}">Hospitality training in ${esc(n)}</a>`).join('');

  const pressHTML = () => D.press
    .map(([src, name]) => `<img src="${src}" alt="${esc(name)}" loading="lazy" decoding="async">`).join('');

  /* logo walls: `variant` picks the colour set or the reversed-out set */
  const logosHTML = (variant, wrapEach) => (variant === 'white' ? D.clientsWhite : D.clientsColour)
    .map(([src, name]) => wrapEach(src, esc(name))).join('');

  function footer (colsSel, addrSel, socialSel) {
    const cols = $(colsSel);
    if (cols) cols.innerHTML = D.footer.map(c => `
      <div class="foot-col"><h2>${esc(c.head)}</h2>
        ${c.links.map(([l, h]) =>
          `<a href="${h}"${h.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(l)}</a>`).join('')}
      </div>`).join('');

    const addr = $(addrSel);
    if (addr) addr.textContent = D.brand.address;

    const social = $(socialSel);
    if (social) social.innerHTML = D.brand.social.map(([name, href]) =>
      `<a href="${href}" target="_blank" rel="noopener" aria-label="${esc(name)}">${D.icons[name.toLowerCase()]}</a>`).join('');
  }

  /* ---- mobile menu toggle ------------------------------------------- */
  function burger (btnSel, navSel) {
    const btn = $(btnSel), nav = $(navSel);
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', nav.classList.toggle('open'));
    });
    $$(`${navSel} a`).forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  return { $, $$, esc, reduced, icons, typeTail, heroColumns, venueTabs,
           citiesHTML, pressHTML, logosHTML, footer, burger };
})();
