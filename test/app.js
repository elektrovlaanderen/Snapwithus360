/* SNAP360 Club Preview Generator (NL + EN) */
(function () {
  // ===== INSTELLINGEN: pas deze aan =====
  var BASE = new URL('.', document.currentScript.src).href;
  var S = {
    jaar: '2027',                           // seizoen op de posters
    email: 'tom@snapwithus360.com',
    whatsapp: '',                           // NL-versie: bv. '32470123456' (zonder + of spaties). Leeg = geen WhatsApp-knop
    smsUS: '',                              // EN-versie: bv. '19515551234'. Leeg = geen "Text us"-knop
    instagram: 'snapwithus360',
    website: 'https://snapwithus360.com',
    logo: BASE + 'assets/snap360-logo.png', // SNAP360-logo (transparant)
    // Voorbeeldspeler op de grote poster, per sport. fit 'full' = volledige speler, 'cut' = bovenlichaam tot onderrand
    spelers: {
      baseball: { src: BASE + 'assets/speler-baseball.webp', fit: 'full' },
      softball: { src: BASE + 'assets/speler-baseball.webp', fit: 'full' },
      standaard: { src: BASE + 'assets/speler-football.webp', fit: 'cut' }
    },
    // Echt werk (sectie onderaan). sport = welke foto's eerst getoond worden
    werk: [
      { src: BASE + 'assets/werk-1.jpg', sport: 'baseball' },
      { src: BASE + 'assets/werk-2.jpg', sport: 'football' },
      { src: BASE + 'assets/werk-3.jpg', sport: 'baseball' },
      { src: BASE + 'assets/werk-4.jpg', sport: 'football' }
    ],
    geluid: BASE + 'assets/reveal.mp3',     // optioneel: geluid voor de reveal
    // Bewijs NL: clubnamen (Belgische besturen kennen die). De eigen club wordt automatisch weggelaten.
    referenties: [
      { key: 'condors', naam: 'de Koninklijke Sint-Niklase Condors' },
      { key: 'braves', naam: 'de Brasschaat Braves' }
    ],
    // Bewijs EN: geen namen (die kent in de VS niemand), wel cijfers die indruk maken. Controleer ze!
    bewijsEN: 'One club, 23 teams and 300 members, all photographed in a single week.'
  };
  // ======================================

  var T = {
    nl: {
      tagline: 'Media days voor clubs',
      formH1: 'Hoe ziet jullie club eruit op media day?',
      formLead: 'Vul je club in en zie meteen jullie spelersposters, roster en Instagram in Amerikaanse media-day stijl.',
      fNaam: 'Clubnaam', fNaamPh: 'Bv. Brasschaat Braves', fNaamErr: 'Vul eerst de clubnaam in',
      fKort: 'Naam op de posters', fKortHint: 'Kort en krachtig, max. 14 tekens', fKortPh: 'Bv. Braves',
      fSport: 'Sport', fLogo: 'Clublogo', fLogoHint: 'Optioneel. De kleuren halen we er automatisch uit.',
      fC1: 'Hoofdkleur', fC2: 'Accentkleur', fSubmit: 'Toon onze club',
      clubH1: function (k) { return k + ', zo zien jullie eruit op media day.'; },
      clubLead: 'We maakten een preview in jullie clubkleuren. Zet je geluid aan.',
      clubBtn: 'Toon de preview',
      mediaDay: 'Media day',
      resLead: function (y) { return 'Media day ' + y + '. Een voorbeeld van wat elke speler en de club krijgen.'; },
      yourPlayer: 'Jouw speler', tagOne: 'Jouw speler hier', tagPhoto: 'Voorbeeld. Hier komt jouw speler.', tagMany: 'Jouw spelers hier',
      capPoster: 'Een persoonlijke poster voor elk lid', capRoster: 'Een roster per ploeg',
      igH: 'Jullie Instagram na één media day',
      igP: 'Een feed vol eigen spelers in clubkleuren. Content voor maanden, voor leden, ouders en sponsors.',
      igAria: 'Voorbeeld van het Instagram-profiel',
      igLabels: ['berichten', 'volgers', 'volgend'], igNums: ['9', '1.284', '312'], igFollow: 'Volgen', igMsg: 'Bericht',
      igBio: function (y) { return 'Officiële account. Media day ' + y + ' door @' + S.instagram; },
      hl: ['Media day', 'Roster', 'Game day'],
      welcome: 'Welkom<br>in het<br>team',
      ctaH: 'Nu nog jullie eigen spelers erin.',
      ctaP: [
        'Op een media day zetten we elk lid apart in beeld, met rook of water in de voor- of achtergrond. De club krijgt beelden van al haar spelers.',
        'Jullie sturen één bericht naar de leden. Inschrijven per tijdslot, planning per ploeg en levering regelen wij.'
      ],
      proof: function (key) {
        var refs = S.referenties.filter(function (r) { return r.key !== key; }).map(function (r) { return r.naam; });
        if (!refs.length) return '';
        return 'Eerder gedaan bij ' + (refs.length > 1 ? refs.slice(0, -1).join(', ') + ' en ' + refs[refs.length - 1] : refs[0]) + '.';
      },
      scarce: 'We zijn gevestigd in Las Vegas en Zuid-Californië, komen een paar keer per jaar naar België en werken per bezoek met een beperkt aantal clubs.',
      werkH: 'Echt werk van onze media days',
      werkP: 'Geen stockfoto\'s. Zo staan spelers in beeld na een SNAP360 media day.',
      werkAlt: 'Spelersportret van een SNAP360 media day',
      msg: function (n) { return 'Hallo SNAP360, wij zijn ' + n + ' en hebben interesse in een media day. Kunnen we een datum bekijken?'; },
      subject: function (n) { return 'Media day voor ' + n; },
      btnWa: 'Vraag een datum aan via WhatsApp', btnSms: '', btnMail: 'Vraag een datum aan via mail',
      btnShare: 'Deel met het bestuur', copied: 'Link gekopieerd', copyPrompt: 'Kopieer deze link:',
      shareTitle: function (k) { return k + ' op media day'; }, shareText: 'Kijk hoe onze club eruit zou zien op een media day:',
      foot: 'SNAP360, media days voor clubs', again: 'Andere club proberen',
      docTitle: function (k) { return (k ? k + ' op media day' : 'Jullie club op media day') + ' | SNAP360'; }
    },
    en: {
      tagline: 'Media days for clubs',
      formH1: 'What does your club look like on media day?',
      formLead: 'Enter your club and instantly see your player posters, roster and Instagram in true media-day style.',
      fNaam: 'Club or organization', fNaamPh: 'E.g. Inland Valley Hawks', fNaamErr: 'Enter your club name first',
      fKort: 'Name on the posters', fKortHint: 'Short and bold, max. 14 characters', fKortPh: 'E.g. Hawks',
      fSport: 'Sport', fLogo: 'Club logo', fLogoHint: 'Optional. We pull your colors from it automatically.',
      fC1: 'Primary color', fC2: 'Accent color', fSubmit: 'Show our club',
      clubH1: function (k) { return k + ', this is your media day.'; },
      clubLead: 'We built a preview in your club colors. Turn your sound on.',
      clubBtn: 'Show the preview',
      mediaDay: 'Media day',
      resLead: function (y) { return 'Media Day ' + y + '. A preview of what every athlete and your club get.'; },
      yourPlayer: 'Your player', tagOne: 'Your player here', tagPhoto: 'Sample. Your player goes here.', tagMany: 'Your players here',
      capPoster: 'A personal poster for every athlete', capRoster: 'A roster graphic for every team',
      igH: 'Your Instagram after one media day',
      igP: 'A feed full of your own athletes in club colors. Months of content for families, fans and sponsors.',
      igAria: 'Instagram profile preview',
      igLabels: ['posts', 'followers', 'following'], igNums: ['9', '1,284', '312'], igFollow: 'Follow', igMsg: 'Message',
      igBio: function (y) { return 'Official account. Media Day ' + y + ' by @' + S.instagram; },
      hl: ['Media Day', 'Roster', 'Game Day'],
      welcome: 'Welcome<br>to the<br>team',
      ctaH: 'Now put your own athletes in.',
      ctaP: [
        'On media day we photograph every athlete individually, with smoke or water in the fore- or background. Your club gets images of every player.',
        'You send one message to your families. Time-slot sign-ups, scheduling per team and delivery are on us.',
        'Book a media day per age group, or for your whole organization in one day.'
      ],
      proof: function () { return S.bewijsEN; },
      scarce: 'Based in Las Vegas and the Inland Empire, serving clubs across California, Nevada and Utah.',
      werkH: 'Real work from our media days',
      werkP: 'No stock photos. This is how athletes look after a SNAP360 media day.',
      werkAlt: 'Athlete portrait from a SNAP360 media day',
      msg: function (n) { return 'Hi SNAP360, this is ' + n + '. We are interested in a media day. Can we look at dates?'; },
      subject: function (n) { return 'Media day for ' + n; },
      btnWa: '', btnSms: 'Text us for a date', btnMail: 'Request a date by email',
      btnShare: 'Share with your board', copied: 'Link copied', copyPrompt: 'Copy this link:',
      shareTitle: function (k) { return k + ' on media day'; }, shareText: 'See what our club would look like on media day:',
      foot: 'SNAP360, media days for clubs', again: 'Try another club',
      docTitle: function (k) { return (k ? k + ' on media day' : 'Your club on media day') + ' | SNAP360'; }
    }
  };

  var SPORTS = {
    nl: {
      baseball: { label: 'Baseball', pos: ['Pitcher', 'Catcher', 'Shortstop', 'First base', 'Center field', 'Second base', 'Third base', 'Left field', 'Right field'] },
      softball: { label: 'Softball', pos: ['Pitcher', 'Catcher', 'Shortstop', 'First base', 'Center field', 'Second base', 'Third base', 'Left field', 'Right field'] },
      voetbal: { label: 'Voetbal', pos: ['Aanvaller', 'Keeper', 'Middenvelder', 'Verdediger', 'Flankaanvaller', 'Centrale verdediger', 'Spits', 'Back', 'Controleur'] },
      basketbal: { label: 'Basketbal', pos: ['Point guard', 'Center', 'Shooting guard', 'Power forward', 'Small forward', 'Guard', 'Forward', 'Center', 'Guard'] },
      hockey: { label: 'Hockey', pos: ['Aanvaller', 'Keeper', 'Middenvelder', 'Verdediger', 'Spits', 'Libero', 'Linkshalf', 'Rechtshalf', 'Middenvelder'] },
      volleybal: { label: 'Volleybal', pos: ['Spelverdeler', 'Libero', 'Hoekaanvaller', 'Opposite', 'Middenaanvaller', 'Hoekaanvaller', 'Middenaanvaller', 'Spelverdeler', 'Libero'] },
      rugby: { label: 'Rugby', pos: ['Fly-half', 'Hooker', 'Prop', 'Scrum-half', 'Wing', 'Lock', 'Flanker', 'Centre', 'Full-back'] },
      andere: { label: 'Andere sport', pos: ['Speler', 'Speler', 'Speler', 'Speler', 'Speler', 'Speler', 'Speler', 'Speler', 'Speler'] }
    },
    en: {
      baseball: { label: 'Baseball', pos: ['Pitcher', 'Catcher', 'Shortstop', 'First base', 'Center field', 'Second base', 'Third base', 'Left field', 'Right field'] },
      softball: { label: 'Softball', pos: ['Pitcher', 'Catcher', 'Shortstop', 'First base', 'Center field', 'Second base', 'Third base', 'Left field', 'Right field'] },
      football: { label: 'Football', pos: ['Quarterback', 'Wide receiver', 'Running back', 'Linebacker', 'Tight end', 'Cornerback', 'Safety', 'Offensive line', 'Defensive end'] },
      soccer: { label: 'Soccer', pos: ['Forward', 'Goalkeeper', 'Midfielder', 'Defender', 'Winger', 'Center back', 'Striker', 'Fullback', 'Defensive mid'] },
      basketball: { label: 'Basketball', pos: ['Point guard', 'Center', 'Shooting guard', 'Power forward', 'Small forward', 'Guard', 'Forward', 'Center', 'Guard'] },
      volleyball: { label: 'Volleyball', pos: ['Setter', 'Libero', 'Outside hitter', 'Opposite', 'Middle blocker', 'Outside hitter', 'Middle blocker', 'Setter', 'Defensive specialist'] },
      lacrosse: { label: 'Lacrosse', pos: ['Attack', 'Goalie', 'Midfield', 'Defense', 'Faceoff', 'Attack', 'Midfield', 'Defense', 'Long stick mid'] },
      hockey: { label: 'Hockey', pos: ['Center', 'Goalie', 'Left wing', 'Right wing', 'Defense', 'Center', 'Defense', 'Left wing', 'Right wing'] },
      rugby: { label: 'Rugby', pos: ['Fly-half', 'Hooker', 'Prop', 'Scrum-half', 'Wing', 'Lock', 'Flanker', 'Centre', 'Full-back'] },
      other: { label: 'Other sport', pos: ['Athlete', 'Athlete', 'Athlete', 'Athlete', 'Athlete', 'Athlete', 'Athlete', 'Athlete', 'Athlete'] }
    }
  };
  var SPORT_MAP = { voetbal: 'soccer', soccer: 'voetbal', basketbal: 'basketball', basketball: 'basketbal', volleybal: 'volleyball', volleyball: 'volleybal', andere: 'other', other: 'andere' };
  var NUMS = [10, 7, 23, 4, 15, 31, 2, 12, 9];

  var cfg = window.CLUB_CONFIG || null;
  var app = document.getElementById('app');
  var state = null;
  var lang = 'nl';
  var screen = 'form';
  var loaded = {};
  Object.keys(S.spelers).forEach(function (k) {
    var src = S.spelers[k].src;
    if (loaded[src] !== undefined) return;
    loaded[src] = false;
    var im = new Image(); im.onload = function () { loaded[src] = true; }; im.src = src;
  });
  function sample() {
    var k = sportKey(state.sport), sp = S.spelers[k] || S.spelers[SPORT_MAP[k]] || S.spelers.standaard;
    return loaded[sp.src] ? sp : null;
  }
  function snapLogo(cls) { return '<img class="' + (cls || 'snap-logo') + '" src="' + esc(S.logo) + '" alt="SNAP360">'; }

  // ---------- helpers ----------
  function t() { return T[lang]; }
  function sports() { return SPORTS[lang]; }
  function sportKey(k) { var s = sports(); if (s[k]) return k; if (SPORT_MAP[k] && s[SPORT_MAP[k]]) return SPORT_MAP[k]; return lang === 'nl' ? 'andere' : 'other'; }
  function sport() { return sports()[sportKey(state.sport)]; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function rgb(h) { h = h.replace('#', ''); var n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function hex(a) { return '#' + a.map(function (v) { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'); }).join(''); }
  function mix(h, to, amt) { var a = rgb(h), b = rgb(to); return hex(a.map(function (v, i) { return v + (b[i] - v) * amt; })); }
  function lum(h) { var c = rgb(h).map(function (v) { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; }
  function on(h) { return lum(h) > .42 ? '#15120e' : '#ffffff'; }
  function validHex(h) { return /^#?[0-9a-f]{6}$/i.test(h || '') ? (h[0] === '#' ? h : '#' + h) : null; }
  function initials(s) { var w = String(s).trim().split(/\s+/); return (w.length > 1 ? w[0][0] + w[w.length - 1][0] : w[0][0]).toUpperCase(); }
  function shortName(naam) { var w = naam.trim().split(/\s+/); return w[w.length - 1]; }

  function applyColors(el) {
    el.style.setProperty('--c1', state.c1);
    el.style.setProperty('--c2', state.c2);
    el.style.setProperty('--on1', on(state.c1));
    el.style.setProperty('--on2', on(state.c2));
    el.style.setProperty('--c1l', mix(state.c1, '#ffffff', .18));
    el.style.setProperty('--c1d', mix(state.c1, '#000000', .55));
  }
  function setLang(l) {
    lang = T[l] ? l : 'en';
    document.documentElement.lang = lang;
  }

  function logo() {
    if (state.logo) return '<img data-logo src="' + esc(state.logo) + '" alt="">';
    return '<span class="mono">' + esc(initials(state.kort)) + '</span>';
  }
  function fixLogos(root) {
    root.querySelectorAll('img[data-logo]').forEach(function (img) {
      img.addEventListener('error', function () {
        var s = document.createElement('span'); s.className = 'mono'; s.textContent = initials(state.kort);
        img.replaceWith(s);
      });
    });
  }
  // clubnaam op de poster altijd binnen de breedte houden
  function fitWords(root) {
    root.querySelectorAll('.p-word').forEach(function (el) {
      el.style.fontSize = el.dataset.fs + 'cqw';
      var max = el.clientWidth * .94, sw = el.scrollWidth;
      if (sw > max && sw > 0) el.style.fontSize = (parseFloat(el.dataset.fs) * max / sw) + 'cqw';
    });
  }
  function silhouette() {
    return '<svg class="silh" viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true"><path d="M100 22c22 0 38 17 38 42 0 20-9 36-21 43v11c34 6 63 24 71 62l2 60H10l2-60c8-38 37-56 71-62v-11c-12-7-21-23-21-43 0-25 16-42 38-42z" vector-effect="non-scaling-stroke"/></svg>';
  }

  // ---------- kleuren uit logo ----------
  function extractColors(img) {
    var n = 48, c = document.createElement('canvas'); c.width = c.height = n;
    var x = c.getContext('2d'); x.drawImage(img, 0, 0, n, n);
    var d; try { d = x.getImageData(0, 0, n, n).data; } catch (e) { return null; }
    var b = {};
    for (var i = 0; i < d.length; i += 4) {
      if (d[i + 3] < 200) continue;
      var r = d[i], g = d[i + 1], bl = d[i + 2];
      if (Math.min(r, g, bl) > 228) continue;
      var k = (r >> 5) + ',' + (g >> 5) + ',' + (bl >> 5);
      var o = b[k] || (b[k] = { n: 0, r: 0, g: 0, b: 0 });
      o.n++; o.r += r; o.g += g; o.b += bl;
    }
    var list = Object.keys(b).map(function (k) {
      var o = b[k], r = o.r / o.n, g = o.g / o.n, bl = o.b / o.n, mx = Math.max(r, g, bl), mn = Math.min(r, g, bl);
      return { c: [r, g, bl], score: o.n * (.35 + (mx ? (mx - mn) / mx : 0)) };
    }).sort(function (a, z) { return z.score - a.score; });
    if (!list.length) return null;
    var first = list[0].c;
    var second = list.find(function (o) { var e = o.c; return Math.hypot(e[0] - first[0], e[1] - first[1], e[2] - first[2]) > 110; });
    var pair = [hex(first), second ? hex(second.c) : '#ffffff'];
    pair.sort(function (a, z) { return lum(a) - lum(z); });
    return pair;
  }

  // ---------- grafieken ----------
  function poster(i, main) {
    var sp = sport(), word = state.kort.toUpperCase();
    var fs = Math.min(40, 150 / Math.max(word.length, 3));
    var smp = main ? sample() : null;
    var player = smp ? '<img src="' + esc(smp.src) + '" alt="">' : silhouette();
    return '<div class="poster' + (smp ? ' has-photo fit-' + smp.fit : '') + '">' +
      '<div class="p-bg"></div><div class="p-stripe"></div>' +
      '<div class="p-word" data-fs="' + fs + '" style="font-size:' + fs + 'cqw">' + esc(word) + '</div>' +
      '<div class="p-num">' + NUMS[i] + '</div>' +
      '<div class="p-player' + (smp ? ' fit-' + smp.fit : '') + '">' + player + '</div>' +
      '<div class="p-top">' + t().mediaDay + ' ' + esc(S.jaar) + '</div><div class="p-snap">' + snapLogo('') + '</div>' +
      '<div class="p-band"><div class="p-logo">' + logo() + '</div><div><div class="p-name">' + (main ? t().yourPlayer : esc(sp.pos[i])) + '</div>' +
      '<div class="p-meta">' + esc(sp.pos[i]) + ' / #' + NUMS[i] + '</div></div></div>' +
      '<span class="tag">' + (smp ? t().tagPhoto : t().tagOne) + '</span>' +
      '</div>';
  }
  function roster() {
    var sp = sport();
    var cards = NUMS.map(function (n, i) {
      return '<div class="r-card">' + silhouette() + '<span class="n">' + n + '</span><span class="pos">' + esc(sp.pos[i]) + '</span></div>';
    }).join('');
    return '<div class="roster"><div class="r-head"><div class="p-logo">' + logo() + '</div><div><div class="r-title">Roster ' + esc(S.jaar) + '</div><div class="r-club">' + esc(state.kort) + '</div></div></div>' +
      '<div class="r-grid">' + cards + '</div><span class="tag">' + t().tagMany + '</span></div>';
  }
  function instagram() {
    var L = t();
    var handle = (state.handle || state.kort + '_' + sport().label.split(' ')[0]).toLowerCase().replace(/[^a-z0-9_.]/g, '');
    var tiles = [
      poster(0), '<div class="tile-type"><div class="p-logo">' + logo() + '</div><div>Media<br>day</div><small>' + esc(S.jaar) + '</small></div>', poster(1),
      poster(2), roster(), poster(3),
      '<div class="tile-type alt">' + L.welcome + '</div>', poster(4), poster(5)
    ];
    return '<div class="ig" aria-label="' + L.igAria + '">' +
      '<div class="ig-bar"><span>' + esc(handle) + '</span><span aria-hidden="true">&#9776;</span></div>' +
      '<div class="ig-head"><div class="ig-av"><div>' + logo() + '</div></div><div class="ig-stats">' +
      L.igLabels.map(function (lb, i) { return '<div><b>' + L.igNums[i] + '</b>' + lb + '</div>'; }).join('') + '</div></div>' +
      '<div class="ig-bio"><b>' + esc(state.naam) + '</b>' + esc(L.igBio(S.jaar)) + '</div>' +
      '<div class="ig-btns"><span>' + L.igFollow + '</span><span>' + L.igMsg + '</span></div>' +
      '<div class="ig-hl"><div><i>MD</i>' + L.hl[0] + '</div><div><i>' + esc(initials(state.kort)) + '</i>' + L.hl[1] + '</div><div><i>GD</i>' + L.hl[2] + '</div></div>' +
      '<div class="ig-grid">' + tiles.map(function (x) { return '<div class="tile">' + x + '</div>'; }).join('') + '</div></div>';
  }

  function werk() {
    var k = sportKey(state.sport), L = t();
    var list = S.werk.slice().sort(function (a, b) { return (b.sport === k) - (a.sport === k); });
    return '<section class="werk"><div class="werk-head"><h3>' + L.werkH + '</h3><p>' + L.werkP + '</p></div><div class="werk-grid">' +
      list.map(function (w) { return '<img src="' + esc(w.src) + '" alt="' + L.werkAlt + '" loading="lazy">'; }).join('') + '</div></section>';
  }

  // ---------- schermen ----------
  function header(showToggle) {
    var tog = showToggle ? '<div class="lang" role="group" aria-label="Taal / Language">' +
      ['nl', 'en'].map(function (l) { return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === lang) + '">' + l.toUpperCase() + '</button>'; }).join('') + '</div>' : '';
    return '<header class="top"><a class="brand" href="' + esc(S.website) + '">' + snapLogo() + '</a><div class="top-right"><small>' + t().tagline + '</small>' + tog + '</div></header>';
  }
  function bindToggle(onSwitch) {
    app.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { if (b.dataset.lang === lang) return; setLang(b.dataset.lang); onSwitch(); });
    });
  }

  function renderForm(prefill) {
    screen = 'form';
    prefill = prefill || {};
    var L = t(), sk = sportKey(prefill.sport || 'baseball');
    document.title = L.docTitle();
    var opts = Object.keys(sports()).map(function (k) { return '<option value="' + k + '"' + (sk === k ? ' selected' : '') + '>' + sports()[k].label + '</option>'; }).join('');
    app.innerHTML = '<div class="wrap">' + header(true) +
      '<section class="intro"><div><h1>' + L.formH1 + '</h1><p class="lead">' + L.formLead + '</p></div>' +
      '<form id="f" novalidate>' +
      '<label>' + L.fNaam + '<input type="text" name="naam" required placeholder="' + L.fNaamPh + '" value="' + esc(prefill.naam) + '"></label>' +
      '<label>' + L.fKort + ' <span class="hint">' + L.fKortHint + '</span><input type="text" name="kort" maxlength="14" placeholder="' + L.fKortPh + '" value="' + esc(prefill.kort) + '"></label>' +
      '<label>' + L.fSport + '<select name="sport">' + opts + '</select></label>' +
      '<label>' + L.fLogo + ' <span class="hint">' + L.fLogoHint + '</span><input type="file" name="logo" accept="image/*"></label>' +
      '<div class="colors"><label><input type="color" name="c1" value="' + (prefill.c1 || '#13294B') + '">' + L.fC1 + '</label>' +
      '<label><input type="color" name="c2" value="' + (prefill.c2 || '#C8102E') + '">' + L.fC2 + '</label></div>' +
      '<button class="btn" type="submit">' + L.fSubmit + '</button>' +
      '</form></section></div>';

    var f = document.getElementById('f');
    var logoData = prefill.logo || null;
    function current() { return { naam: f.naam.value, kort: f.kort.value, sport: f.sport.value, c1: f.c1.value, c2: f.c2.value, logo: logoData }; }
    bindToggle(function () { renderForm(current()); });
    f.logo.addEventListener('change', function () {
      var file = f.logo.files[0]; if (!file) return;
      var rd = new FileReader();
      rd.onload = function () {
        logoData = rd.result;
        var im = new Image();
        im.onload = function () { var p = extractColors(im); if (p) { f.c1.value = p[0]; f.c2.value = p[1]; } };
        im.src = logoData;
      };
      rd.readAsDataURL(file);
    });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var naam = f.naam.value.trim();
      if (!naam) { f.naam.focus(); f.naam.setAttribute('aria-invalid', 'true'); f.naam.placeholder = L.fNaamErr; return; }
      state = { naam: naam, kort: (f.kort.value.trim() || shortName(naam)).slice(0, 14), sport: f.sport.value, c1: f.c1.value, c2: f.c2.value, logo: logoData, key: null, open: true };
      reveal();
    });
  }

  function renderClubIntro() {
    screen = 'intro';
    var L = t();
    document.title = L.docTitle(state.kort);
    app.innerHTML = '<div class="wrap">' + header(state.open) +
      '<section class="intro intro--club"><div class="intro-logo">' + logo() + '</div><div>' +
      '<h1>' + esc(L.clubH1(state.kort)) + '</h1><p class="lead">' + L.clubLead + '</p>' +
      '<button class="btn" id="go">' + L.clubBtn + '</button></div></section></div>';
    applyColors(app);
    fixLogos(app);
    bindToggle(renderClubIntro);
    document.getElementById('go').addEventListener('click', reveal);
  }

  function reveal() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ov = document.createElement('div');
    ov.className = 'reveal';
    applyColors(ov);
    ov.innerHTML = '<div class="rv-beam"></div><div class="rv-by">' + snapLogo('') + '<span>presents</span></div><div class="rv-stack"><div class="rv-logo">' + logo() + '</div>' +
      '<div class="rv-name">' + esc(state.kort) + '</div><div class="rv-sub">' + t().mediaDay + ' ' + esc(S.jaar) + '</div></div>';
    fixLogos(ov);
    document.body.appendChild(ov);
    document.body.classList.add('lock');
    if (!reduce) { try { var a = new Audio(S.geluid); a.volume = .8; a.play().catch(function () {}); } catch (e) {} }
    renderResults();
    setTimeout(function () {
      ov.classList.add('out');
      document.body.classList.remove('lock');
      setTimeout(function () { ov.remove(); }, 650);
    }, reduce ? 400 : 3300);
  }

  function renderResults() {
    screen = 'results';
    var L = t();
    document.title = L.docTitle(state.kort);
    var proof = L.proof(state.key);
    var msg = L.msg(state.naam);
    var btns = '';
    if (lang === 'nl' && S.whatsapp) btns += '<a class="btn btn--wa" href="https://wa.me/' + esc(S.whatsapp) + '?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' + L.btnWa + '</a>';
    if (lang === 'en' && S.smsUS) btns += '<a class="btn" href="sms:+' + esc(S.smsUS) + '?&body=' + encodeURIComponent(msg) + '">' + L.btnSms + '</a>';
    btns += '<a class="btn' + (btns ? ' btn--ghost' : '') + '" href="mailto:' + esc(S.email) + '?subject=' + encodeURIComponent(L.subject(state.naam)) + '&body=' + encodeURIComponent(msg) + '">' + L.btnMail + '</a>';

    app.innerHTML = '<div class="wrap">' + header(state.open) +
      '<section class="res-head"><h2>' + esc(state.naam) + '</h2><p>' + L.resLead(S.jaar) + '</p></section>' +
      '<div class="showcase"><figure>' + poster(0, true) + '<figcaption>' + L.capPoster + '</figcaption></figure>' +
      '<figure>' + roster() + '<figcaption>' + L.capRoster + '</figcaption></figure></div>' +
      '<section class="ig-block"><div><h3>' + L.igH + '</h3><p>' + L.igP + '</p></div>' + instagram() + '</section>' +
      werk() +
      '<section class="cta"><h2>' + L.ctaH + '</h2>' +
      L.ctaP.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
      (proof ? '<p class="proof">' + esc(proof) + '</p>' : '') +
      '<p class="scarce">' + L.scarce + '</p>' +
      '<div class="actions">' + btns + '<button class="btn btn--ghost" id="share">' + L.btnShare + '</button></div></section>' +
      '<footer class="foot"><span class="foot-brand">' + snapLogo() + L.foot + '</span><span><a href="https://instagram.com/' + esc(S.instagram) + '" target="_blank" rel="noopener">@' + esc(S.instagram) + '</a>' +
      (state.open ? ' &nbsp; <button class="linkbtn" id="again">' + L.again + '</button>' : '') + '</span></footer></div>';

    applyColors(app);
    fixLogos(app);
    fitWords(app);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitWords(app); });
    bindToggle(renderResults);

    document.getElementById('share').addEventListener('click', function () {
      var btn = this, url = location.href.split('?')[0];
      if (state.open) {
        url += '?' + new URLSearchParams({ lang: lang, naam: state.naam, kort: state.kort, sport: sportKey(state.sport), c1: state.c1.slice(1), c2: state.c2.slice(1) }).toString();
      }
      var data = { title: L.shareTitle(state.kort), text: L.shareText, url: url };
      if (navigator.share) { navigator.share(data).catch(function () {}); return; }
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
        btn.textContent = L.copied;
      }, function () { prompt(L.copyPrompt, url); });
    });
    var again = document.getElementById('again');
    if (again) again.addEventListener('click', function () { renderForm({ sport: state.sport }); window.scrollTo(0, 0); });
  }

  // ---------- start ----------
  var q = new URLSearchParams(location.search);
  if (cfg) {
    setLang(cfg.lang || 'nl');
    state = { naam: cfg.naam, kort: (cfg.kort || shortName(cfg.naam)).slice(0, 14), sport: cfg.sport || 'other', c1: validHex(cfg.kleur1) || '#13294B', c2: validHex(cfg.kleur2) || '#C8102E', logo: cfg.logo || null, handle: cfg.handle, key: cfg.key, open: false };
    renderClubIntro();
  } else {
    var browser = (navigator.language || '').toLowerCase().indexOf('nl') === 0 ? 'nl' : 'en';
    setLang(q.get('lang') || browser);
    if (q.get('naam')) {
      state = { naam: q.get('naam'), kort: (q.get('kort') || shortName(q.get('naam'))).slice(0, 14), sport: q.get('sport') || 'other', c1: validHex(q.get('c1')) || '#13294B', c2: validHex(q.get('c2')) || '#C8102E', logo: null, key: null, open: true };
      renderClubIntro();
    } else {
      renderForm();
    }
  }
})();
