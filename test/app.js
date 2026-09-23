/* SNAP360 Club Preview Generator */
(function () {
  // ===== INSTELLINGEN: pas deze aan =====
  var BASE = new URL('.', document.currentScript.src).href;
  var S = {
    jaar: '2027',                          // seizoen op de posters
    whatsapp: '',                          // bv. '32470123456' (zonder + of spaties). Leeg = geen WhatsApp-knop
    email: 'tom@snapwithus360.com',
    instagram: 'snapwithus360',
    website: 'https://snapwithus360.com',
    spelerFoto: BASE + 'assets/speler.png', // optioneel: uitgeknipte voorbeeldspeler (transparante PNG)
    geluid: BASE + 'assets/reveal.mp3',     // optioneel: geluid voor de reveal
    referenties: [                          // clubs die je al deed (de eigen club wordt automatisch weggelaten)
      { key: 'condors', naam: 'de Koninklijke Sint-Niklase Condors' },
      { key: 'braves', naam: 'de Brasschaat Braves' }
    ]
  };
  // ======================================

  var SPORTS = {
    baseball: { label: 'Baseball', pos: ['Pitcher', 'Catcher', 'Shortstop', 'First base', 'Center field', 'Second base', 'Third base', 'Left field', 'Right field'] },
    softball: { label: 'Softball', pos: ['Pitcher', 'Catcher', 'Shortstop', 'First base', 'Center field', 'Second base', 'Third base', 'Left field', 'Right field'] },
    voetbal: { label: 'Voetbal', pos: ['Aanvaller', 'Keeper', 'Middenvelder', 'Verdediger', 'Flankaanvaller', 'Centrale verdediger', 'Spits', 'Back', 'Controleur'] },
    basketbal: { label: 'Basketbal', pos: ['Point guard', 'Center', 'Shooting guard', 'Power forward', 'Small forward', 'Guard', 'Forward', 'Center', 'Guard'] },
    hockey: { label: 'Hockey', pos: ['Aanvaller', 'Keeper', 'Middenvelder', 'Verdediger', 'Spits', 'Libero', 'Linkshalf', 'Rechtshalf', 'Middenvelder'] },
    volleybal: { label: 'Volleybal', pos: ['Spelverdeler', 'Libero', 'Hoekaanvaller', 'Opposite', 'Middenaanvaller', 'Hoekaanvaller', 'Middenaanvaller', 'Spelverdeler', 'Libero'] },
    rugby: { label: 'Rugby', pos: ['Fly-half', 'Hooker', 'Prop', 'Scrum-half', 'Wing', 'Lock', 'Flanker', 'Centre', 'Full-back'] },
    andere: { label: 'Andere sport', pos: ['Speler', 'Speler', 'Speler', 'Speler', 'Speler', 'Speler', 'Speler', 'Speler', 'Speler'] }
  };
  var NUMS = [10, 7, 23, 4, 15, 31, 2, 12, 9];

  var cfg = window.CLUB_CONFIG || null;
  var app = document.getElementById('app');
  var state = null;
  var hasPhoto = false;
  var probe = new Image();
  probe.onload = function () { hasPhoto = true; };
  probe.src = S.spelerFoto;

  // ---------- helpers ----------
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function rgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join(''); var n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function hex(a) { return '#' + a.map(function (v) { return Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'); }).join(''); }
  function mix(h, t, amt) { var a = rgb(h), b = rgb(t); return hex(a.map(function (v, i) { return v + (b[i] - v) * amt; })); }
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
      if (Math.min(r, g, bl) > 228) continue; // witte achtergrond negeren
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
    pair.sort(function (a, z) { return lum(a) - lum(z); }); // donkerste = hoofdkleur
    return pair;
  }

  // ---------- grafieken ----------
  function poster(i, main) {
    var sport = SPORTS[state.sport] || SPORTS.andere;
    var word = state.kort.toUpperCase();
    var fs = Math.min(40, 150 / Math.max(word.length, 3));
    var player = (main && hasPhoto) ? '<img src="' + esc(S.spelerFoto) + '" alt="">' : silhouette();
    var tagText = (main && hasPhoto) ? 'Voorbeeld. Hier komt jouw speler.' : 'Jouw speler hier';
    return '<div class="poster">' +
      '<div class="p-bg"></div><div class="p-stripe"></div>' +
      '<div class="p-word" data-fs="' + fs + '" style="font-size:' + fs + 'cqw">' + esc(word) + '</div>' +
      '<div class="p-num">' + NUMS[i] + '</div>' +
      '<div class="p-player">' + player + '</div>' +
      '<div class="p-top">Media day ' + esc(S.jaar) + '</div><div class="p-snap">SNAP360</div>' +
      '<div class="p-band"><div class="p-logo">' + logo() + '</div><div><div class="p-name">' + (main ? 'Jouw speler' : esc(sport.pos[i])) + '</div>' +
      '<div class="p-meta">' + esc(sport.pos[i]) + ' / #' + NUMS[i] + '</div></div></div>' +
      '<span class="tag">' + tagText + '</span>' +
      '</div>';
  }

  function roster() {
    var sport = SPORTS[state.sport] || SPORTS.andere;
    var cards = NUMS.map(function (n, i) {
      return '<div class="r-card">' + silhouette() + '<span class="n">' + n + '</span><span class="pos">' + esc(sport.pos[i]) + '</span></div>';
    }).join('');
    return '<div class="roster"><div class="r-head"><div class="p-logo">' + logo() + '</div><div><div class="r-title">Roster ' + esc(S.jaar) + '</div><div class="r-club">' + esc(state.kort) + '</div></div></div>' +
      '<div class="r-grid">' + cards + '</div><span class="tag">Jouw spelers hier</span></div>';
  }

  function instagram() {
    var handle = (state.handle || state.kort + '_' + (SPORTS[state.sport] || SPORTS.andere).label).toLowerCase().replace(/[^a-z0-9_.]/g, '');
    var tiles = [
      poster(0), '<div class="tile-type"><div class="p-logo">' + logo() + '</div><div>Media<br>day</div><small>' + esc(S.jaar) + '</small></div>', poster(1),
      poster(2), roster(), poster(3),
      '<div class="tile-type alt">Welkom<br>in het<br>team</div>', poster(4), poster(5)
    ];
    return '<div class="ig" aria-label="Voorbeeld van het Instagram-profiel">' +
      '<div class="ig-bar"><span>' + esc(handle) + '</span><span aria-hidden="true">&#9776;</span></div>' +
      '<div class="ig-head"><div class="ig-av"><div>' + logo() + '</div></div>' +
      '<div class="ig-stats"><div><b>9</b>berichten</div><div><b>1.284</b>volgers</div><div><b>312</b>volgend</div></div></div>' +
      '<div class="ig-bio"><b>' + esc(state.naam) + '</b>' + esc((SPORTS[state.sport] || SPORTS.andere).label) + 'club. Media day ' + esc(S.jaar) + ' door @' + esc(S.instagram) + '</div>' +
      '<div class="ig-btns"><span>Volgen</span><span>Bericht</span></div>' +
      '<div class="ig-hl"><div><i>MD</i>Media day</div><div><i>' + esc(initials(state.kort)) + '</i>Roster</div><div><i>GD</i>Game day</div></div>' +
      '<div class="ig-grid">' + tiles.map(function (t) { return '<div class="tile">' + t + '</div>'; }).join('') + '</div></div>';
  }

  // ---------- schermen ----------
  function header() {
    return '<header class="top"><a class="brand" href="' + esc(S.website) + '">SNAP360</a><small>Media days voor clubs</small></header>';
  }

  function renderForm(prefill) {
    prefill = prefill || {};
    var opts = Object.keys(SPORTS).map(function (k) { return '<option value="' + k + '"' + (prefill.sport === k ? ' selected' : '') + '>' + SPORTS[k].label + '</option>'; }).join('');
    app.innerHTML = '<div class="wrap">' + header() +
      '<section class="intro"><div><h1>Hoe ziet jullie club eruit op media day?</h1>' +
      '<p class="lead">Vul je club in en zie meteen jullie spelersposters, roster en Instagram in Amerikaanse media-day stijl.</p></div>' +
      '<form id="f" novalidate>' +
      '<label>Clubnaam<input type="text" name="naam" required placeholder="Bv. Brasschaat Braves" value="' + esc(prefill.naam) + '"></label>' +
      '<label>Naam op de posters <span class="hint">Kort en krachtig, max. 14 tekens</span><input type="text" name="kort" maxlength="14" placeholder="Bv. Braves" value="' + esc(prefill.kort) + '"></label>' +
      '<label>Sport<select name="sport">' + opts + '</select></label>' +
      '<label>Clublogo <span class="hint">Optioneel. De kleuren halen we er automatisch uit.</span><input type="file" name="logo" accept="image/*"></label>' +
      '<div class="colors"><label><input type="color" name="c1" value="' + (prefill.c1 || '#13294B') + '">Hoofdkleur</label>' +
      '<label><input type="color" name="c2" value="' + (prefill.c2 || '#C8102E') + '">Accentkleur</label></div>' +
      '<button class="btn" type="submit">Toon onze club</button>' +
      '</form></section></div>';

    var f = document.getElementById('f');
    var logoData = null;
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
      if (!naam) { f.naam.focus(); f.naam.setAttribute('aria-invalid', 'true'); f.naam.placeholder = 'Vul eerst de clubnaam in'; return; }
      state = { naam: naam, kort: (f.kort.value.trim() || shortName(naam)).slice(0, 14), sport: f.sport.value, c1: f.c1.value, c2: f.c2.value, logo: logoData, key: null, open: true };
      reveal();
    });
  }

  function renderClubIntro() {
    app.innerHTML = '<div class="wrap">' + header() +
      '<section class="intro intro--club"><div class="intro-logo">' + logo() + '</div><div>' +
      '<h1>' + esc(state.kort) + ', zo zien jullie eruit op media day.</h1>' +
      '<p class="lead">We maakten een preview in jullie clubkleuren. Zet je geluid aan.</p>' +
      '<button class="btn" id="go">Toon de preview</button></div></section></div>';
    applyColors(app);
    fixLogos(app);
    document.getElementById('go').addEventListener('click', reveal);
  }

  function reveal() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ov = document.createElement('div');
    ov.className = 'reveal';
    applyColors(ov);
    ov.innerHTML = '<div class="rv-beam"></div><div class="rv-stack"><div class="rv-logo">' + logo() + '</div>' +
      '<div class="rv-name">' + esc(state.kort) + '</div><div class="rv-sub">Media day ' + esc(S.jaar) + '</div></div>';
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
    var refs = S.referenties.filter(function (r) { return r.key !== state.key; }).map(function (r) { return r.naam; });
    var proof = refs.length ? '<p class="proof">Eerder gedaan bij ' + (refs.length > 1 ? refs.slice(0, -1).join(', ') + ' en ' + refs[refs.length - 1] : refs[0]) + '.</p>' : '';
    var msg = 'Hallo SNAP360, wij zijn ' + state.naam + ' en hebben interesse in een media day. Kunnen we een datum bekijken?';
    var wa = S.whatsapp ? '<a class="btn btn--wa" href="https://wa.me/' + esc(S.whatsapp) + '?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">Vraag een datum aan via WhatsApp</a>' : '';
    var mail = '<a class="btn' + (S.whatsapp ? ' btn--ghost' : '') + '" href="mailto:' + esc(S.email) + '?subject=' + encodeURIComponent('Media day voor ' + state.naam) + '&body=' + encodeURIComponent(msg) + '">Vraag een datum aan via mail</a>';

    app.innerHTML = '<div class="wrap">' + header() +
      '<section class="res-head"><h2>' + esc(state.naam) + '</h2><p>Media day ' + esc(S.jaar) + '. Een voorbeeld van wat elke speler en de club krijgen.</p></section>' +
      '<div class="showcase"><figure>' + poster(0, true) + '<figcaption>Een persoonlijke poster voor elk lid</figcaption></figure>' +
      '<figure>' + roster() + '<figcaption>Een roster per ploeg</figcaption></figure></div>' +
      '<section class="ig-block"><div><h3>Jullie Instagram na één media day</h3><p>Een feed vol eigen spelers in clubkleuren. Content voor maanden, voor leden, ouders en sponsors.</p></div>' + instagram() + '</section>' +
      '<section class="cta"><h2>Nu nog jullie eigen spelers erin.</h2>' +
      '<p>Op een media day zetten we elk lid apart in beeld, met rook of water in de voor- of achtergrond. De club krijgt beelden van al haar spelers.</p>' +
      '<p>Jullie sturen één bericht naar de leden. Inschrijven per tijdslot, planning per ploeg en levering regelen wij.</p>' +
      proof +
      '<p class="scarce">We komen een paar keer per jaar vanuit Los Angeles naar België en werken per bezoek met een beperkt aantal clubs.</p>' +
      '<div class="actions">' + wa + mail + '<button class="btn btn--ghost" id="share">Deel met het bestuur</button></div></section>' +
      '<footer class="foot"><span>SNAP360, media days voor clubs</span><span><a href="https://instagram.com/' + esc(S.instagram) + '" target="_blank" rel="noopener">@' + esc(S.instagram) + '</a>' +
      (state.open ? ' &nbsp; <button class="linkbtn" id="again">Andere club proberen</button>' : '') + '</span></footer></div>';

    applyColors(app);
    fixLogos(app);
    fitWords(app);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitWords(app); });
    window.scrollTo(0, 0);

    document.getElementById('share').addEventListener('click', function () {
      var btn = this, url = location.href.split('?')[0];
      if (state.open) {
        url += '?' + new URLSearchParams({ naam: state.naam, kort: state.kort, sport: state.sport, c1: state.c1.slice(1), c2: state.c2.slice(1) }).toString();
      }
      var data = { title: state.kort + ' op media day', text: 'Kijk hoe onze club eruit zou zien op een media day:', url: url };
      if (navigator.share) { navigator.share(data).catch(function () {}); return; }
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
        btn.textContent = 'Link gekopieerd';
      }, function () { prompt('Kopieer deze link:', url); });
    });
    var again = document.getElementById('again');
    if (again) again.addEventListener('click', function () { renderForm({ sport: state.sport }); window.scrollTo(0, 0); });
  }

  // ---------- start ----------
  if (cfg) {
    state = { naam: cfg.naam, kort: (cfg.kort || shortName(cfg.naam)).slice(0, 14), sport: cfg.sport || 'andere', c1: validHex(cfg.kleur1) || '#13294B', c2: validHex(cfg.kleur2) || '#C8102E', logo: cfg.logo || null, handle: cfg.handle, key: cfg.key, open: false };
    renderClubIntro();
  } else {
    var q = new URLSearchParams(location.search);
    if (q.get('naam')) {
      state = { naam: q.get('naam'), kort: (q.get('kort') || shortName(q.get('naam'))).slice(0, 14), sport: SPORTS[q.get('sport')] ? q.get('sport') : 'andere', c1: validHex(q.get('c1')) || '#13294B', c2: validHex(q.get('c2')) || '#C8102E', logo: null, key: null, open: true };
      renderClubIntro();
    } else {
      renderForm();
    }
  }
})();
