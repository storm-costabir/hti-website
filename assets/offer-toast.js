/* ============================================================================
   offer-toast.js - the corner notice for a free HTI tool
   ----------------------------------------------------------------------------
   Most visitors never scroll to the part of a page that offers our free
   tools, so this brings the offer to them: it slides in after a few seconds
   or a little scrolling, keeps out of the way of the WhatsApp and Call
   buttons, goes away once the page's own section for that tool is on screen,
   and once closed stays closed only for the rest of that visit, so it is
   back the next time the site is opened. #show-popup shows it regardless.

   The page picks the offer on the script tag:
     <script src="assets/offer-toast.js" data-offer="survey" defer></script>
     survey - the free training needs analysis (homepage)
     fcc    - the food cost calculator (the food cost blog posts)
   Clicks on the link go to GA4 as survey_popup_click or fcc_popup_click.
   ========================================================================== */

(function () {
  var OFFERS = {
    survey: {
      label: 'Free Training Survey Analysis',
      icon: '<path d="M9 4h6v3H9z"/><path d="M15 5h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/><path d="M9 14l2 2 4-4"/>',
      eyebrow: 'Free &middot; 3 minutes',
      title: 'Training Survey Analysis',
      text: 'Answer 15 quick questions and see which HTI training programs fit your team. <span class="offer-toast-nosign">No obligation.</span>',
      href: 'training-needs-survey.html',
      button: 'Get my free analysis',
      key: 'hti-survey-toast-closed',
      event: 'survey_popup_click',
      /* the homepage's closing call to action already offers the survey */
      near: '.cta .cta-actions'
    },
    fcc: {
      label: 'Free Food Cost Calculator',
      icon: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h8"/>',
      eyebrow: 'Free tool &middot; No sign up',
      title: 'Food Cost Calculator',
      text: 'Find your food cost % and the right menu price in 30 seconds. <span class="offer-toast-nosign">No sign up.</span>',
      href: 'food-cost-calculator.html',
      button: 'Try it free',
      key: 'hti-fcc-toast-closed',
      event: 'fcc_popup_click',
      /* the closing calculator card at the end of each food cost post */
      near: '.fcc-promo, .fcc-close'
    }
  };

  /* looked up by attribute, not document.currentScript: previews such as
     htmlpreview.github.io run a copy of this file without the attribute */
  var tag = document.querySelector('script[data-offer]');
  var offer = OFFERS[(tag && tag.getAttribute('data-offer')) || 'fcc'];
  if (!offer || document.getElementById('offerToast')) return;

  /* a close is remembered for this visit only (sessionStorage), so the
     notice is back the next time the site is opened. Earlier versions kept
     it hidden for a week in localStorage; clear that, or browsers that
     closed it then would not see it until the week ran out */
  var force = location.hash === '#show-popup';
  try { localStorage.removeItem(offer.key); } catch (e) {}
  try {
    if (!force && sessionStorage.getItem(offer.key)) return;
  } catch (e) {}

  /* htmlpreview.github.io rewrites the links a page starts with, not ones
     added later like this one; do the same here, or the team's preview
     opens the raw file */
  var href = offer.href;
  if (location.hostname === 'htmlpreview.github.io') {
    href = location.origin + '/?' + new URL(href, document.baseURI).href;
  }

  var holder = document.createElement('div');
  holder.innerHTML =
    '<aside class="offer-toast" id="offerToast" aria-label="' + offer.label + '" hidden>' +
    '<span class="offer-toast-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + offer.icon + '</svg></span>' +
    '<div class="offer-toast-body">' +
    '<span class="offer-toast-eyebrow">' + offer.eyebrow + '</span>' +
    '<p class="offer-toast-title"><span class="offer-toast-free">Free </span>' + offer.title + '</p>' +
    '<p class="offer-toast-text">' + offer.text + '</p>' +
    '<a href="' + href + '" class="offer-toast-btn" id="offerToastGo">' + offer.button + ' <span aria-hidden="true">&nbsp;&rarr;</span></a>' +
    '</div>' +
    '<button type="button" class="offer-toast-close" id="offerToastClose" aria-label="Close">&times;</button>' +
    '</aside>';
  var toast = holder.firstElementChild;
  document.body.appendChild(toast);
  var done = false;

  function remember() {
    try { sessionStorage.setItem(offer.key, String(Date.now())); } catch (e) {}
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

  /* the page's own section for this tool is on screen: the notice would only repeat it */
  var section = document.querySelector(offer.near);
  if (section && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries, io) {
      if (entries[0].isIntersecting) {
        clearTimeout(timer);
        if (!toast.hidden) hide(); else done = true;
        io.disconnect();
      }
    }, { threshold: 0.4 }).observe(section);
  }

  document.getElementById('offerToastClose').addEventListener('click', function () {
    remember();
    hide();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !toast.hidden && toast.contains(document.activeElement)) {
      remember();
      hide();
    }
  });
  document.getElementById('offerToastGo').addEventListener('click', function () {
    remember();
    if (typeof window.gtag === 'function') window.gtag('event', offer.event, { page_path: location.pathname });
  });
})();
