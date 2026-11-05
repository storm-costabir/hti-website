/* ============================================================================
   fcc-toast.js - the free food cost calculator notice
   ----------------------------------------------------------------------------
   Most visitors never reach the calculator section of a page, so this brings
   it to them: it slides in after a few seconds or a little scrolling, keeps
   out of the way of the WhatsApp and Call buttons, goes away once the page's
   own calculator section is on screen, and once closed stays closed for a
   week (on every page that carries it). #show-popup on the address skips that
   memory, for reviewing.

   Loaded by index.html and the food cost blog posts only. Clicks on the link
   go to GA4 as fcc_popup_click.
   ========================================================================== */

var FCC_TOAST_MARKUP = '' +
  '<aside class="fcc-toast" id="fccToast" aria-label="Free Food Cost Calculator" hidden>' +
  '<span class="fcc-toast-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8"/></svg></span>' +
  '<div class="fcc-toast-body">' +
  '<span class="fcc-toast-eyebrow">Free tool &middot; No sign up</span>' +
  '<p class="fcc-toast-title"><span class="fcc-toast-free">Free </span>Food Cost Calculator</p>' +
  '<p class="fcc-toast-text">Find your food cost % and the right menu price in 30 seconds. <span class="fcc-toast-nosign">No sign up.</span></p>' +
  '<a href="food-cost-calculator.html" class="fcc-toast-btn" id="fccToastGo">Try it free <span aria-hidden="true">&nbsp;&rarr;</span></a>' +
  '</div>' +
  '<button type="button" class="fcc-toast-close" id="fccToastClose" aria-label="Close">&times;</button>' +
  '</aside>' +
  '';

(function () {
  if (document.getElementById('fccToast')) return;
  var holder = document.createElement('div');
  holder.innerHTML = FCC_TOAST_MARKUP;
  var toast = holder.firstElementChild;
  document.body.appendChild(toast);
  var KEY = 'hti-fcc-toast-closed';
  var WEEK = 7 * 24 * 60 * 60 * 1000;
  var done = false;
  /* #show-popup on the address skips the one-week memory, so the notice can
     be checked again by someone who has already closed it */
  var force = location.hash === '#show-popup';
  try {
    if (!force && Date.now() - Number(localStorage.getItem(KEY) || 0) < WEEK) return;
  } catch (e) {}

  function remember() {
    try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
  }
  function show() {
    if (done) return;
    done = true;
    toast.hidden = false;
    /* read the layout once so the entrance animation starts from its first frame;
       no requestAnimationFrame, which never fires in a background tab */
    void toast.offsetWidth;
    toast.classList.add('is-in');
  }
  function hide() {
    done = true;
    toast.classList.remove('is-in');
    setTimeout(function () { toast.hidden = true; }, 350);
  }

  /* after 6 seconds, or sooner once the visitor scrolls past the first screen */
  var timer = setTimeout(show, force ? 2000 : 6000);
  window.addEventListener('scroll', function onScroll() {
    if (window.scrollY > window.innerHeight * 0.6) {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      show();
    }
  }, { passive: true });

  /* the page's own calculator section (homepage) or closing card (blog posts)
     is on screen: the notice would only repeat it */
  var section = document.querySelector('.fcc-promo, .fcc-close');
  if (section && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries, io) {
      if (entries[0].isIntersecting) {
        clearTimeout(timer);
        if (!toast.hidden) hide(); else done = true;
        io.disconnect();
      }
    }, { threshold: 0.4 }).observe(section);
  }

  document.getElementById('fccToastClose').addEventListener('click', function () {
    remember();
    hide();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !toast.hidden && toast.contains(document.activeElement)) {
      remember();
      hide();
    }
  });
  document.getElementById('fccToastGo').addEventListener('click', function () {
    remember();
    if (typeof window.gtag === 'function') window.gtag('event', 'fcc_popup_click', { page_path: location.pathname });
  });
})();
