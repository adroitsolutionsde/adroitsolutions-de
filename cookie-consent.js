(function () {
  var STORAGE_KEY = 'adroit-cookie-consent';

  if (localStorage.getItem(STORAGE_KEY)) return;

  var de = {
    title: 'Datenschutz & Cookies',
    text: 'Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten und unsere Website zu verbessern. Mit Klick auf „Akzeptieren" stimmen Sie der Verwendung von Cookies zu.',
    link: 'Datenschutzerklärung',
    accept: 'Akzeptieren',
    decline: 'Ablehnen'
  };
  var en = {
    title: 'Privacy & Cookies',
    text: 'We use cookies to provide you with the best possible experience and to improve our website. By clicking "Accept", you consent to the use of cookies.',
    link: 'Privacy Policy',
    accept: 'Accept',
    decline: 'Decline'
  };

  function getLang() {
    var lang = sessionStorage.getItem('adroit-lang') || 'de';
    return lang === 'en' ? en : de;
  }

  function dismiss(choice) {
    localStorage.setItem(STORAGE_KEY, choice);
    var banner = document.getElementById('adroit-cookie-banner');
    if (banner) {
      banner.style.transition = 'opacity 0.4s, transform 0.4s';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function () { banner.remove(); }, 450);
    }
  }

  function render() {
    var l = getLang();
    var isLight = document.documentElement.getAttribute('data-mode') === 'light';

    var banner = document.createElement('div');
    banner.id = 'adroit-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', l.title);
    banner.style.cssText = [
      'position:fixed',
      'bottom:1.5rem',
      'left:50%',
      'transform:translateX(-50%)',
      'z-index:99999',
      'width:calc(100% - 2rem)',
      'max-width:560px',
      'padding:1.4rem 1.6rem',
      'border-radius:12px',
      'box-shadow:0 8px 40px rgba(0,0,0,0.45)',
      'font-family:inherit',
      'font-size:0.88rem',
      'line-height:1.55',
      isLight
        ? 'background:rgba(245,242,235,0.98);color:#1a1a1a;border:1px solid rgba(201,168,76,0.35)'
        : 'background:rgba(20,18,14,0.97);color:#e8e4da;border:1px solid rgba(201,168,76,0.2)'
    ].join(';');

    var gold = '#c9a84c';

    banner.innerHTML =
      '<div style="display:flex;align-items:flex-start;gap:0.8rem;">' +
        '<svg style="flex-shrink:0;margin-top:2px" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + gold + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        '<div>' +
          '<strong style="display:block;margin-bottom:0.35rem;font-size:0.95rem;color:' + gold + '">' + l.title + '</strong>' +
          '<span>' + l.text + ' <a href="/datenschutz.html" style="color:' + gold + ';text-decoration:underline">' + l.link + '</a></span>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;gap:0.7rem;margin-top:1.1rem;justify-content:flex-end">' +
        '<button id="adroit-cookie-decline" style="padding:0.5rem 1.1rem;border-radius:6px;border:1px solid rgba(201,168,76,0.4);background:transparent;color:' + (isLight ? '#555' : '#aaa') + ';font-size:0.85rem;cursor:pointer">' + l.decline + '</button>' +
        '<button id="adroit-cookie-accept" style="padding:0.5rem 1.4rem;border-radius:6px;border:none;background:' + gold + ';color:#0a0a0a;font-size:0.85rem;font-weight:700;cursor:pointer">' + l.accept + '</button>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('adroit-cookie-accept').addEventListener('click', function () { dismiss('accepted'); });
    document.getElementById('adroit-cookie-decline').addEventListener('click', function () { dismiss('declined'); });

    document.addEventListener('lang-changed', function () {
      var updated = getLang();
      banner.querySelector('strong').textContent = updated.title;
      var span = banner.querySelector('span');
      span.innerHTML = updated.text + ' <a href="/datenschutz.html" style="color:' + gold + ';text-decoration:underline">' + updated.link + '</a>';
      document.getElementById('adroit-cookie-accept').textContent = updated.accept;
      document.getElementById('adroit-cookie-decline').textContent = updated.decline;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
