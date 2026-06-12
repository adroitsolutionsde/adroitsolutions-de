(function () {
  var STORAGE_KEY = 'adroit-cookie-consent';

  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
  } catch (e) {
    return;
  }

  var de = {
    eyebrow: 'Datenschutz & Cookies',
    title: 'Cookies und Technologien erlauben?',
    intro: 'Wir speichern ausschließlich technisch notwendige Daten lokal auf Ihrem Gerät: Ihre Cookie-Einwilligung und Ihre Spracheinstellung. <strong>Kein Tracking. Keine Werbung. Keine Weitergabe an Dritte.</strong>',
    necessary_title: 'Technisch notwendig',
    necessary_desc: 'Speichert Ihre Einwilligung (<code>localStorage</code>) und Spracheinstellung (<code>sessionStorage</code>) – ausschließlich für die Grundfunktionen dieser Website. Rechtsgrundlage: § 25 Abs. 2 TTDSG.',
    link: 'Datenschutzerklärung',
    accept: 'Akzeptieren',
    necessary: 'Nur notwendige erlauben'
  };
  var en = {
    eyebrow: 'Privacy & Cookies',
    title: 'Allow cookies and technologies?',
    intro: 'We store only technically necessary data locally on your device: your consent choice and language preference. <strong>No tracking. No advertising. No third-party sharing.</strong>',
    necessary_title: 'Technically necessary',
    necessary_desc: 'Stores your consent choice (<code>localStorage</code>) and language preference (<code>sessionStorage</code>) — essential for basic site functionality only. Legal basis: § 25(2) TTDSG.',
    link: 'Privacy Policy',
    accept: 'Accept all',
    necessary: 'Allow necessary only'
  };

  function getLang() {
    return (sessionStorage.getItem('adroit-lang') || 'de') === 'en' ? en : de;
  }

  function dismiss(choice) {
    try { localStorage.setItem(STORAGE_KEY, choice); } catch (e) {}
    var overlay = document.getElementById('adroit-cookie-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.35s';
      overlay.style.opacity = '0';
      setTimeout(function () { overlay.remove(); }, 380);
    }
  }

  function buildHTML(l, isLight) {
    var gold = '#c9a84c';
    var bg   = isLight ? '#f5f2eb' : '#111009';
    var fg   = isLight ? '#1a1a1a' : '#e8e4da';
    var sub  = isLight ? 'rgba(30,28,20,0.55)' : 'rgba(232,228,218,0.5)';
    var bdr  = isLight ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.18)';
    var chip = isLight ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.1)';

    return (
      '<div id="adroit-cookie-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.72);backdrop-filter:blur(4px);z-index:99998"></div>' +
      '<div id="adroit-cookie-modal" role="dialog" aria-modal="true" aria-labelledby="adroit-cookie-title" style="' +
        'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
        'z-index:99999;width:calc(100% - 2rem);max-width:540px;max-height:90vh;overflow-y:auto;' +
        'background:' + bg + ';color:' + fg + ';' +
        'border:1px solid ' + bdr + ';border-radius:16px;' +
        'padding:2rem 2rem 1.6rem;font-family:inherit;font-size:0.88rem;line-height:1.65;' +
        'box-shadow:0 24px 80px rgba(0,0,0,0.6)">' +

        '<p style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:' + gold + ';margin-bottom:0.6rem" id="adroit-cookie-eyebrow"></p>' +
        '<h2 id="adroit-cookie-title" style="font-family:\'DM Serif Display\',serif;font-size:clamp(1.15rem,3vw,1.45rem);color:' + fg + ';margin-bottom:1rem;line-height:1.25"></h2>' +
        '<p id="adroit-cookie-intro" style="color:' + sub + ';margin-bottom:1.4rem;font-size:0.86rem"></p>' +

        '<div style="border:1px solid ' + bdr + ';border-radius:10px;padding:1rem 1.25rem;background:' + chip + ';margin-bottom:1.6rem">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem">' +
            '<strong id="adroit-cookie-nec-title" style="font-size:0.82rem;color:' + fg + '"></strong>' +
            '<span style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:' + gold + ';border:1px solid ' + bdr + ';padding:0.15rem 0.55rem;border-radius:4px">✓ aktiv</span>' +
          '</div>' +
          '<p id="adroit-cookie-nec-desc" style="font-size:0.8rem;color:' + sub + ';margin:0"></p>' +
        '</div>' +

        '<p style="font-size:0.75rem;text-align:center;margin-bottom:1.2rem;color:' + sub + '">' +
          '<a id="adroit-cookie-link" href="/datenschutz.html" style="color:' + gold + ';text-decoration:underline"></a>' +
        '</p>' +

        '<div style="display:flex;flex-direction:column;gap:0.65rem">' +
          '<button id="adroit-cookie-accept" style="width:100%;padding:0.75rem;border-radius:8px;border:none;background:' + gold + ';color:#0a0a0a;font-size:0.88rem;font-weight:700;letter-spacing:0.04em;cursor:pointer;font-family:inherit"></button>' +
          '<button id="adroit-cookie-necessary" style="width:100%;padding:0.72rem;border-radius:8px;border:1px solid ' + bdr + ';background:transparent;color:' + fg + ';font-size:0.84rem;cursor:pointer;font-family:inherit"></button>' +
        '</div>' +
      '</div>'
    );
  }

  function applyTexts(l) {
    var q = function(id) { return document.getElementById(id); };
    q('adroit-cookie-eyebrow').textContent    = l.eyebrow;
    q('adroit-cookie-title').textContent      = l.title;
    q('adroit-cookie-intro').innerHTML        = l.intro;
    q('adroit-cookie-nec-title').textContent  = l.necessary_title;
    q('adroit-cookie-nec-desc').innerHTML     = l.necessary_desc;
    q('adroit-cookie-link').textContent       = l.link;
    q('adroit-cookie-accept').textContent     = l.accept;
    q('adroit-cookie-necessary').textContent  = l.necessary;
  }

  function render() {
    var l = getLang();
    var isLight = document.documentElement.getAttribute('data-mode') === 'light';

    var overlay = document.createElement('div');
    overlay.id = 'adroit-cookie-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99998';
    overlay.innerHTML = buildHTML(l, isLight);
    document.body.appendChild(overlay);

    applyTexts(l);

    document.getElementById('adroit-cookie-accept').addEventListener('click',    function () { dismiss('accepted'); });
    document.getElementById('adroit-cookie-necessary').addEventListener('click', function () { dismiss('necessary'); });

    document.addEventListener('lang-changed', function () { applyTexts(getLang()); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
