/* "Listen to this article" player for blog pages.
   Reads the article aloud with the browser's own speech engine (Web Speech
   API), so there are no audio files to record, host or keep in sync with the
   text. The player is built here and inserted under the article's meta cards;
   pages only need <script src="assets/listen.js" defer></script>.
   Pages that also carry <div class="listen-slot" data-listen-slot></div> under
   the meta cards (plus the .listen-slot rule in <head>) get the player without
   a layout shift: the slot holds its height before this script runs.

   - No matching voice for the page language (or no speech support): no player.
   - Text is read one sentence at a time. Long utterances get cut off in Chrome,
     and pause() is unreliable on Android, so pausing stops speech and resuming
     starts again from the sentence that was playing.
   - Back/forward jump a sentence-group of roughly 15 seconds, like the
     -15/+15 buttons on a podcast player.
   - Exclude a block from the reading with data-listen-skip. */
(function () {
  'use strict';
  var synth = window.speechSynthesis;
  if (!synth || typeof SpeechSynthesisUtterance === 'undefined') return;

  var WPM = 160;          // typical TTS pace at rate 1
  var SKIP_SECONDS = 15;
  var RATES = [1, 1.25, 1.5, 0.75];

  var lang = (document.documentElement.lang || 'en').toLowerCase();
  var base = lang.split('-')[0];

  /* ---------- voice ---------- */
  function pickVoice() {
    var voices = synth.getVoices().filter(function (v) {
      return v.lang && v.lang.toLowerCase().replace('_', '-').split('-')[0] === base;
    });
    if (!voices.length) return null;
    var prefer = base === 'en' ? ['en-in', 'en-gb', 'en-us'] : [base + '-in'];
    function score(v) {
      var l = v.lang.toLowerCase().replace('_', '-');
      var s = prefer.indexOf(l);
      s = s < 0 ? 10 : s;
      if (/google|natural|neural|online/i.test(v.name)) s -= 0.5; // better-sounding engines
      return s;
    }
    return voices.sort(function (a, b) { return score(a) - score(b); })[0];
  }

  /* ---------- text ---------- */
  var BLOCKS = 'h2,h3,h4,p,li,blockquote';
  var SKIP = 'header,nav,footer,aside,form,button,script,style,noscript,figcaption,' +
    '.sec-cta,.share-section,.listen,.fcc-close-card,[aria-hidden="true"],[data-listen-skip]';
  // Reading ends at the first of these after the headline: share bar, related
  // reading, the "More from HTI" strip, or the footer.
  var STOP = '.share-section,.share-bar,.related,.mfh-section,footer,[data-listen-stop]';

  function visible(el) {
    if (!el.getClientRects().length) return false;
    var cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none';
  }

  function collect(h1) {
    var stop = null;
    var stops = document.querySelectorAll(STOP);
    for (var i = 0; i < stops.length; i++) {
      if (h1.compareDocumentPosition(stops[i]) & Node.DOCUMENT_POSITION_FOLLOWING) { stop = stops[i]; break; }
    }
    var out = [{ el: h1, text: h1.textContent }];
    var all = document.querySelectorAll(BLOCKS);
    for (var j = 0; j < all.length; j++) {
      var el = all[j];
      if (!(h1.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
      if (stop && !(el.compareDocumentPosition(stop) & Node.DOCUMENT_POSITION_FOLLOWING)) break;
      if (el.closest(SKIP)) continue;
      if (el.parentElement.closest(BLOCKS)) continue; // a <p> inside an <li> is read with the <li>
      if (!visible(el)) continue;
      var t = el.textContent.replace(/\s+/g, ' ').trim();
      if (t.length < 2) continue;
      if (/^(english|hindi) blog$/i.test(t)) continue;
      out.push({ el: el, text: t });
    }
    return out;
  }

  // Split each block into sentences, each remembering its block for the highlight.
  function sentences(blocks) {
    var list = [];
    blocks.forEach(function (b) {
      // A sentence ends at . ! ? or । followed by a space, so "p.m." and "₹2.50" stay whole.
      var parts = b.text.replace(/\s+/g, ' ').trim()
        .replace(/([.!?।]+["'”’)]*) /g, '$1\u0000').split('\u0000');
      var buf = '';
      function push(t) {
        t = t.trim();
        if (!t) return;
        // Chrome stops long utterances after ~15s; split long sentences at commas.
        while (t.length > 220) {
          var cut = t.lastIndexOf(', ', 200);
          if (cut < 60) cut = t.lastIndexOf(' ', 200);
          if (cut < 60) break;
          list.push({ el: b.el, text: t.slice(0, cut + 1).trim() });
          t = t.slice(cut + 1).trim();
        }
        list.push({ el: b.el, text: t });
      }
      parts.forEach(function (p) {
        buf += (buf ? ' ' : '') + p;
        if (buf.length >= 40) { push(buf); buf = ''; } // keep tiny fragments with the next sentence
      });
      push(buf);
    });
    list.forEach(function (s) { s.words = s.text.split(/\s+/).length; });
    return list;
  }

  /* ---------- UI ---------- */
  var CSS = '' +
    '.listen{display:flex;align-items:center;gap:14px;margin-top:16px;padding:10px 16px 10px 10px;' +
    'background:#111;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:16px;max-width:560px;' +
    'font-family:inherit;box-sizing:border-box}' +
    '.listen *{box-sizing:border-box}.listen-slot .listen{margin-top:0}' +
    '.listen button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:0;' +
    'display:inline-flex;align-items:center;justify-content:center}' +
    '.listen button:focus-visible{outline:2px solid #fff;outline-offset:2px;border-radius:999px}' +
    '.listen-play{width:48px;height:48px;border-radius:50%;background:var(--hti-red,#e31e24)!important;flex-shrink:0}' +
    '.listen-play svg{width:20px;height:20px}' +
    '.listen-skip{width:34px;height:34px;flex-shrink:0;opacity:.85}.listen-skip:hover{opacity:1}' +
    '.listen-skip svg{width:28px;height:28px}' +
    '.listen-mid{flex:1;min-width:0}' +
    '.listen-title{font-size:14px;font-weight:700;line-height:1.3;margin:0 0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.listen-row{display:flex;align-items:center;gap:10px}' +
    '.listen-bar{flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,.22);position:relative;cursor:pointer}' +
    '.listen-bar::before{content:"";position:absolute;inset:-9px 0}' +
    '.listen-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:3px;background:var(--hti-red,#e31e24)}' +
    '.listen-time{font-size:12px;font-weight:500;font-variant-numeric:tabular-nums;opacity:.8;white-space:nowrap}' +
    '.listen-rate{font-size:12px;font-weight:700;min-width:44px;height:28px;border:1px solid rgba(255,255,255,.35)!important;' +
    'border-radius:999px!important;flex-shrink:0}' +
    '.listen-reading{background:rgba(227,30,36,.08);box-shadow:-8px 0 0 rgba(227,30,36,.08),8px 0 0 rgba(227,30,36,.08);border-radius:4px;transition:background .2s}' +
    '@media (max-width:520px){.listen{gap:8px;padding-right:12px}.listen-play{width:42px;height:42px}' +
    '.listen-skip{width:28px;height:28px}.listen-skip svg{width:24px;height:24px}.listen-time{display:none}}' +
    '@media (prefers-reduced-motion:reduce){.listen-reading{transition:none}}';

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    back: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 16a9 9 0 1 0 3-6.7" stroke-linecap="round"/><path d="M10 4v5.5H4.5" stroke-linecap="round" stroke-linejoin="round"/><text x="16" y="20" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" stroke="none" font-family="sans-serif">15</text></svg>',
    fwd: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M25 16a9 9 0 1 1-3-6.7" stroke-linecap="round"/><path d="M22 4v5.5h5.5" stroke-linecap="round" stroke-linejoin="round"/><text x="16" y="20" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" stroke="none" font-family="sans-serif">15</text></svg>'
  };

  var L = base === 'hi'
    ? { title: 'यह लेख सुनें', play: 'लेख सुनें', pause: 'रोकें', back: '15 सेकंड पीछे', fwd: '15 सेकंड आगे', rate: 'गति', seek: 'लेख में आगे-पीछे जाएँ' }
    : { title: 'Listen to this article', play: 'Listen to this article', pause: 'Pause', back: 'Back 15 seconds', fwd: 'Forward 15 seconds', rate: 'Playback speed', seek: 'Seek through the article' };

  function fmt(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function build(h1, voice) {
    var slot = document.querySelector('[data-listen-slot]');
    var list = sentences(collect(h1));
    if (list.length < 3) { if (slot) slot.remove(); return; } // empty or failed article

    var anchor = document.querySelector('.hero-meta, .hero-meta-row, .article-meta');
    if (anchor && !(h1.compareDocumentPosition(anchor) & Node.DOCUMENT_POSITION_FOLLOWING)) anchor = null;
    anchor = anchor || h1;

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var box = document.createElement('div');
    box.className = 'listen';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', L.title);
    box.innerHTML =
      '<button type="button" class="listen-skip" data-act="back" aria-label="' + L.back + '">' + ICON.back + '</button>' +
      '<button type="button" class="listen-play" data-act="play" aria-label="' + L.play + '">' + ICON.play + '</button>' +
      '<button type="button" class="listen-skip" data-act="fwd" aria-label="' + L.fwd + '">' + ICON.fwd + '</button>' +
      '<div class="listen-mid"><p class="listen-title">' + L.title + '</p>' +
      '<div class="listen-row"><div class="listen-bar" role="slider" tabindex="0" aria-label="' + L.seek + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
      '<div class="listen-fill"></div></div><span class="listen-time">00:00 / --:--</span></div></div>' +
      '<button type="button" class="listen-rate" data-act="rate" aria-label="' + L.rate + '">1x</button>';
    if (slot) slot.appendChild(box); // space already reserved in the page: nothing moves
    else anchor.insertAdjacentElement('afterend', box);

    var play = box.querySelector('.listen-play');
    var bar = box.querySelector('.listen-bar');
    var fill = box.querySelector('.listen-fill');
    var time = box.querySelector('.listen-time');
    var rateBtn = box.querySelector('.listen-rate');

    var total = 0, before = null;
    var idx = 0, playing = false, rate = 1, token = 0, lit = null;

    function prepare() {
      if (before) return;
      var acc = 0;
      before = list.map(function (s) { var a = acc; acc += s.words; return a; });
      total = acc;
    }
    function secs(words) { return words / (WPM * rate) * 60; }

    function render() {
      if (!before) return;
      var done = before[Math.min(idx, list.length - 1)] + (idx >= list.length ? list[list.length - 1].words : 0);
      var pct = total ? done / total * 100 : 0;
      fill.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
      time.textContent = fmt(secs(done)) + ' / ' + fmt(secs(total));
      var el = playing && idx < list.length ? list[idx].el : null;
      if (el !== lit) {
        if (lit) lit.classList.remove('listen-reading');
        if (el) el.classList.add('listen-reading');
        lit = el;
      }
    }

    function setPlaying(on) {
      playing = on;
      play.innerHTML = on ? ICON.pause : ICON.play;
      play.setAttribute('aria-label', on ? L.pause : L.play);
      render();
    }

    function speak() {
      var my = ++token;
      synth.cancel();
      if (idx >= list.length) { idx = 0; setPlaying(false); return; }
      var u = new SpeechSynthesisUtterance(list[idx].text);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = rate;
      u.onend = function () {
        if (my !== token || !playing) return;
        idx++;
        render();
        speak();
      };
      u.onerror = function (e) {
        if (my !== token) return;
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        setPlaying(false);
      };
      render();
      synth.speak(u);
    }

    function start() { prepare(); setPlaying(true); speak(); }
    function stop() { token++; synth.cancel(); setPlaying(false); }

    // Move by about SKIP_SECONDS of speech, whole sentences at a time.
    function jump(dir) {
      prepare();
      var target = secs(before[Math.min(idx, list.length - 1)]) + dir * SKIP_SECONDS;
      var i = 0;
      while (i < list.length - 1 && secs(before[i + 1]) <= target) i++;
      if (dir < 0 && target <= 0) i = 0;
      seekTo(i);
    }
    function seekTo(i) {
      idx = Math.max(0, Math.min(list.length - 1, i));
      if (playing) speak(); else render();
    }

    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'play') { playing ? stop() : start(); }
      else if (act === 'back') jump(-1);
      else if (act === 'fwd') jump(1);
      else if (act === 'rate') {
        rate = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
        rateBtn.textContent = rate + 'x';
        if (playing) speak(); else render();
      }
    });

    function barSeek(clientX) {
      prepare();
      var r = bar.getBoundingClientRect();
      var want = Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * total;
      var i = 0;
      while (i < list.length - 1 && before[i + 1] <= want) i++;
      seekTo(i);
    }
    bar.addEventListener('click', function (e) { barSeek(e.clientX); });
    bar.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { jump(1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { jump(-1); e.preventDefault(); }
    });

    // Show the full length before anyone presses play.
    prepare();
    render();

    window.addEventListener('pagehide', function () { token++; synth.cancel(); });
  }

  /* ---------- start-up ---------- */
  synth.cancel(); // a reload can leave the previous page still talking in Chrome

  function ready(h1) {
    var voice = pickVoice();
    if (voice) return build(h1, voice);
    // Voices load asynchronously in Chrome; give them a moment, then give up quietly.
    var done = false;
    function retry() {
      if (done) return;
      var v = pickVoice();
      if (v) { done = true; build(h1, v); }
    }
    if (synth.addEventListener) synth.addEventListener('voiceschanged', retry);
    setTimeout(function () {
      retry();
      if (!done) { var s = document.querySelector('[data-listen-slot]'); if (s) s.remove(); }
      done = true;
    }, 3000);
  }

  // Articles rendered from the database (blog-post.html, magazine-blog.html)
  // put their <h1> in after a fetch, so wait for it.
  function findH1() { var h = document.querySelector('main h1, h1'); return h && h.textContent.trim() ? h : null; }
  var h1 = findH1();
  if (h1) return ready(h1);
  var mo = new MutationObserver(function () {
    var h = findH1();
    if (h) { mo.disconnect(); setTimeout(function () { ready(h); }, 50); }
  });
  mo.observe(document.body, { childList: true, subtree: true });
  setTimeout(function () { mo.disconnect(); }, 15000);
})();
