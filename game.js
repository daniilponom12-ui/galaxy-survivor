(function () {
  'use strict';

  var canvas = document.getElementById('gc');
  var ctx = canvas.getContext('2d');
  var overlay = document.getElementById('ui-overlay');

  var WORLD_W = 4200, WORLD_H = 4200;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var W, H;
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  /* ============ LOCALIZATION ============ */
  var CUR_LANG = 'ru';
  function normalizeLang(lng) {
    lng = (lng || '').toLowerCase();
    if (lng.indexOf('en') === 0) return 'en';
    return 'ru';
  }
  try {
    if (typeof window.YaGames === 'undefined') { CUR_LANG = normalizeLang(navigator.language || 'ru'); }
  } catch (e) {}

  var I18N = {
    ru: {
      play: '▶ ИГРАТЬ', shop: '🛒 Магазин (реклама)', top: '🏆 Топ игроков',
      recordLbl: 'Рекорд: ',
      subtitle: 'Выживай среди орд космических монстров!<br>Собирай XP, прокачивайся и ставь рекорды',
      controls: 'WASD/стрелки/тач-джойстик — движение<br>Пробел — заморозка врагов',
      gameOver: 'GAME OVER', waveReached: 'Достигнута волна: ', kills: 'Убито врагов: ',
      scoreFinal: 'Очки: ', timeSurv: 'Время выживания: ', recordFinal: 'Рекорд: ',
      newRecord: 'НОВЫЙ РЕКОРД!', again: 'Играть снова',
      reviveBtn: '💎 Вернуться (+1 жизнь) — смотри рекламу',
      reviveMax: 'МАКС. РЕВАЙВОВ (3/3)',
      mapLbl: 'КАРТА',
      lbBtn: '🏆 Лидерборд', menuBtn: 'Меню',
      waveLbl: 'Волна: ', waveTitle: 'Волна ', lvlLbl: 'Ур: ', ptsLbl: 'Очки: ', frozen: '  |  ❄',
      levelT: 'УРОВЕНЬ ',
      shopTitle: '🛒 МАГАЗИН', shipsSec: '🚀 Корабли (просмотр рекламы)',
      ammoSec: '🔫 Снаряды (просмотр рекламы)',
      ammoCountSec: '🔁 Количество снарядов за выстрел',
      boostSec: '⚡ Усиления на матч (просмотр рекламы)', back: 'Назад',
      skSel: '✓ Выбран', ammoSel: '✓ В бою', choose: 'Выбрать', watch: '▶ Реклама (',
      maxLabel: 'Максимум', watchPlus: '▶ Реклама +1', barrels: 'Стволы: ', baseLbl: 'база ',
      boostDmg: '⚔ Урон', boostHp: '❤ HP', boostSpeed: '⚡ Скорость',
      top10: 'Топ-10 игроков\n', playerName: 'Игрок', noRecords: 'Пока нет рекордов. Ты будешь первым!\n',
      lbEmpty: 'Лидерборд пока пуст!', lbFail: 'Не удалось загрузить лидерборд :(',
      lbUnavailable: 'Лидерборд недоступен', lbInGames: 'Лидерборд будет доступен при запуске в Яндекс Играх',
      lbWave: 'волна', topH: '🏆 ТАБЛИЦА РЕКОРДОВ', nickPh: 'Введи свой ник…', nickSaved: 'Ник сохранён:',
      lbLoading: 'Загрузка…',
      bossAlert: 'Осторожно — БОСС!', bossKilledLbl: 'БОСС ПОБЕЖДЁН! +', frozenLbl: 'ЗАМОРОЗКА!',
      reviveHp: 'ВОЗВРАЩЕНИЕ! +60% HP', reviveLives: 'ВОЗВРАЩЕНИЕ! +1 жизнь', ammoUnlocked: 'Снаряд разблокирован!', skinUnlocked: 'Скин разблокирован!',
      adNotDone: 'Реклама не досмотрена', adNotDoneEnd: 'Реклама не досмотрена до конца',
      maxAmmo: 'Максимум снарядов!', ammoPlus: 'Количество снарядов +1', boosterGot: 'Усиление получено!',
      ammoPlusTest: 'Количество снарядов +1', boosterGotTest: 'Усиление получено',
      u_hp: 'Макс. здоровье +25%', u_hp_d: 'Увеличивает максимальное здоровье и лечит',
      u_heal: 'Полное лечение', u_heal_d: 'Восстанавливает всё здоровье',
      u_speed: 'Быстрее +15%', u_speed_d: 'Увеличивает скорость передвижения',
      u_auto: 'Бластер +', u_auto_d: 'Урон и скорость стрельбы +',
      u_orbit: 'Новый орбитальный диск', u_orbit_d: 'Добавляет вращающийся диск',
      u_orbitplus: 'Диски быстрее', u_orbitplus_d: 'Орбитальные диски вращаются быстрее',
      u_nova: 'Новая энерговолна', u_nova_d: 'Добавляет волну урона',
      u_splash: 'Взрывной выстрел', u_splash_d: 'Выстрелы бластера взрываются',
      u_magnet: 'Магнит опыта', u_magnet_d: 'XP-кристаллы сами летят к тебе',
      u_freeze: 'Замедление', u_freeze_d: 'Враги замедляются на 5 сек (абилка)',
      u_mines: 'Минное поле', u_mines_d: 'Разбрасывает мины вокруг',
      u_multishot: 'Доп. снаряд', u_multishot_d: 'Стреляет на один снаряд больше',
      u_crit: 'Крит 20% (урон x2)', u_crit_d: 'Каждый 5-й выстрел наносит двойной урон',
      u_pierce: 'Пронзание', u_pierce_d: 'Все выстрелы пробивают врагов насквозь',
      u_life: '+1 жизнь', u_life_d: 'Одно воскрешение за бой',
      pu_rate: 'Скорострельность +8%', pu_rate_d: 'Постоянно увеличивает темп стрельбы',
      pu_speed: 'Скорость +6%', pu_speed_d: 'Постоянно увеличивает скорость героя',
      pu_shield: '🛡 Щит', pu_shield_d: 'Бесплатно поглощает 1 удар за бой на уровень',
      pu_crit: 'Крит +8% (x2)', pu_crit_d: 'Постоянно повышает шанс крита',
      pu_xp: 'Бонус XP +10%', pu_xp_d: 'Постоянно увеличивает получаемый опыт',
      buyDiam: 'Купить за 💎', orLbl: ' или ',
      w_auto: 'Автоматический бластер', w_auto_d: 'Автоматически стреляет по ближайшему врагу',
      w_orbit: 'Орбитальный диск', w_orbit_d: 'Вращающиеся лезвия вокруг героя',
      w_nova: 'Энергетическая волна', w_nova_d: 'Периодически испускает волну урона',
      w_mine: 'Разбрасыватель мин', w_mine_d: 'Ставит мины, взрывающиеся при касании',
      sk_s1: 'Классик', sk_s1_d: 'Стандартный истребитель', sk_s2: 'Неон-Фантом', sk_s2_d: 'Фиолетовый с неоном',
      sk_s3: 'Золотой Герой', sk_s3_d: 'Сверхзвуковой золотой', sk_s4: 'Изумруд', sk_s4_d: 'Смертоносный изумруд',
      sk_s5: 'Ледяной Страж', sk_s5_d: 'Холодная сталь', sk_s6: 'Кобальт', sk_s6_d: 'Атомная мощь кобальта', sk_s7: 'Некрон', sk_s7_d: 'Повелитель самоцветов',
      sk_s8: 'Истребитель', sk_s8_d: 'Реактивный и со следом', sk_s9: 'Феникс', sk_s9_d: 'Огненный, с пламенным следом', sk_s10: 'Космический Рыцарь', sk_s10_d: 'Неоновый страж Вселенной',
      am_a1: 'Бластер', am_a1_d: 'Уверенный средний урон', am_a2: 'Лазер', am_a2_d: 'Пронзает врагов насквозь',
      am_a3: 'Дробовик', am_a3_d: 'Веер из осколков', am_a4: 'Ракеты', am_a4_d: 'Взрываются при попадании',
      am_a5: 'Плазма', am_a5_d: 'Быстрая и мощная',
      am_a6: 'Цепная молния', am_a6_d: 'Бьёт по врагам и перекидывается дальше',
      am_a7: 'Крио', am_a7_d: 'Замораживает врагов при попадании',
      boostShield: '🛡 Щит', boostRegen: '❤ Регенерация',
      diamSec: '💎 Улучшения за алмазы', diamBal: 'Алмазов: ', puLvl: 'Уровень ', puMax: 'МАКС',
      pu_dmg: 'Урон +10%', pu_dmg_d: 'Постоянно увеличивает урон оружия',
      pu_hp: 'Макс. HP +15', pu_hp_d: 'Постоянно увеличивает запас здоровья',
      pu_magnet: 'Сбор +20%', pu_magnet_d: 'Увеличивает радиус подбора кристаллов',
      diamNo: 'Не хватает алмазов!', diamBuy: 'Куплено!', diamGot: 'Алмаз!'
    },
    en: {
      play: '▶ PLAY', shop: '🛒 Shop (ads)', top: '🏆 Leaderboards',
      recordLbl: 'Best: ',
      subtitle: 'Survive hordes of space monsters!<br>Collect XP, level up and set records',
      controls: 'WASD / arrows / touch stick — move<br>Space — freeze enemies',
      gameOver: 'GAME OVER', waveReached: 'Reached wave: ', kills: 'Enemies killed: ',
      scoreFinal: 'Score: ', timeSurv: 'Survival time: ', recordFinal: 'Best: ',
      newRecord: 'NEW RECORD!', again: 'Play again',
      reviveBtn: '💎 Come back (+1 life) — watch ad',
      reviveMax: 'MAX REVIVES (3/3)',
      mapLbl: 'MAP',
      lbBtn: '🏆 Leaderboard', menuBtn: 'Menu',
      waveLbl: 'Wave: ', waveTitle: 'Wave ', lvlLbl: 'Lvl: ', ptsLbl: 'Score: ', frozen: '  |  ❄',
      levelT: 'LEVEL ',
      shopTitle: '🛒 SHOP', shipsSec: '🚀 Ships (watch ads)',
      ammoSec: '🔫 Ammo (watch ads)',
      ammoCountSec: '🔁 Projectiles per shot',
      boostSec: '⚡ Match boosts (watch ads)', back: 'Back',
      skSel: '✓ Selected', ammoSel: '✓ Active', choose: 'Select', watch: '▶ Watch ad (',
      maxLabel: 'Max', watchPlus: '▶ Watch ad +1', barrels: 'Barrels: ', baseLbl: 'base ',
      boostDmg: '⚔ Damage', boostHp: '❤ HP', boostSpeed: '⚡ Speed',
      top10: 'Top-10 players\n', playerName: 'Player', noRecords: 'No records yet. Be the first!\n',
      lbEmpty: 'Leaderboard is empty!', lbFail: 'Failed to load leaderboard :(',
      lbUnavailable: 'Leaderboard unavailable', lbInGames: 'Leaderboard will be available on Yandex Games',
      lbWave: 'wave', topH: '🏆 HIGH SCORES', nickPh: 'Enter your nickname…', nickSaved: 'Nick saved:',
      lbLoading: 'Loading…',
      bossAlert: 'Warning — BOSS!', bossKilledLbl: 'BOSS DOWN! +', frozenLbl: 'FROZEN!',
      reviveHp: 'BACK! +60% HP', reviveLives: 'BACK! +1 life', ammoUnlocked: 'Ammo unlocked!', skinUnlocked: 'Skin unlocked!',
      adNotDone: 'Ad not finished', adNotDoneEnd: 'Ad was not watched till the end',
      maxAmmo: 'Max ammo count!', ammoPlus: 'Ammo count +1', boosterGot: 'Boost received!',
      ammoPlusTest: 'Ammo count +1', boosterGotTest: 'Boost received',
      u_hp: 'Max HP +25%', u_hp_d: 'Increases max HP and heals',
      u_heal: 'Full heal', u_heal_d: 'Restores all HP',
      u_speed: 'Faster +15%', u_speed_d: 'Increases move speed',
      u_auto: 'Blaster +', u_auto_d: 'Damage and fire rate +',
      u_orbit: 'New orbital disc', u_orbit_d: 'Adds one rotating disc',
      u_orbitplus: 'Faster discs', u_orbitplus_d: 'Orbital discs spin faster',
      u_nova: 'New energy wave', u_nova_d: 'Adds a damage wave',
      u_splash: 'Blast shot', u_splash_d: 'Blaster shots explode',
      u_magnet: 'XP magnet', u_magnet_d: 'XP crystals fly to you',
      u_freeze: 'Slowdown', u_freeze_d: 'Enemies slow for 5 sec (ability)',
      u_mines: 'Mine field', u_mines_d: 'Throws mines around',
      u_multishot: 'Extra shot', u_multishot_d: 'Fires one more projectile',
      u_crit: 'Crit 20% (x2 dmg)', u_crit_d: 'Every 5th shot deals double damage',
      u_pierce: 'Piercing', u_pierce_d: 'All shots pierce through enemies',
      u_life: '+1 life', u_life_d: 'One revive per run',
      pu_rate: 'Fire rate +8%', pu_rate_d: 'Permanently increases fire rate',
      pu_speed: 'Speed +6%', pu_speed_d: 'Permanently increases hero speed',
      pu_shield: '🛡 Shield', pu_shield_d: 'Free absorbs 1 hit per run per level',
      pu_crit: 'Crit +8% (x2)', pu_crit_d: 'Permanently raises crit chance',
      pu_xp: 'XP bonus +10%', pu_xp_d: 'Permanently increases gained XP',
      buyDiam: 'Buy for 💎', orLbl: ' or ',
      w_auto: 'Auto blaster', w_auto_d: 'Automatically shoots nearest enemy',
      w_orbit: 'Orbital disc', w_orbit_d: 'Rotating blades around hero',
      w_nova: 'Energy wave', w_nova_d: 'Periodically emits a damage wave',
      w_mine: 'Mine thrower', w_mine_d: 'Plants mines that explode on contact',
      sk_s1: 'Classic', sk_s1_d: 'Standard fighter', sk_s2: 'Neon Phantom', sk_s2_d: 'Purple with neon',
      sk_s3: 'Golden Hero', sk_s3_d: 'Supersonic gold', sk_s4: 'Emerald', sk_s4_d: 'Deadly emerald',
      sk_s5: 'Ice Guardian', sk_s5_d: 'Cold steel', sk_s6: 'Cobalt', sk_s6_d: 'Atomic cobalt power', sk_s7: 'Necron', sk_s7_d: 'Gem master',
      sk_s8: 'Fighter', sk_s8_d: 'Reactive with trail', sk_s9: 'Phoenix', sk_s9_d: 'Fiery, with a flame trail', sk_s10: 'Cosmic Knight', sk_s10_d: 'Neon guardian of the universe',
      am_a1: 'Blaster', am_a1_d: 'Steady medium damage', am_a2: 'Laser', am_a2_d: 'Pierces through enemies',
      am_a3: 'Shotgun', am_a3_d: 'Fan of shards', am_a4: 'Rockets', am_a4_d: 'Explode on hit',
      am_a5: 'Plasma', am_a5_d: 'Fast and powerful',
      am_a6: 'Chain lightning', am_a6_d: 'Hits enemies and jumps to more',
      am_a7: 'Cryo', am_a7_d: 'Slows enemies on hit',
      boostShield: '🛡 Shield', boostRegen: '❤ Regen',
      diamSec: '💎 Gem upgrades', diamBal: 'Gems: ', puLvl: 'Level ', puMax: 'MAX',
      pu_dmg: 'Damage +10%', pu_dmg_d: 'Permanently increases weapon damage',
      pu_hp: 'Max HP +15', pu_hp_d: 'Permanently increases health pool',
      pu_magnet: 'Pickup +20%', pu_magnet_d: 'Increases crystal pickup radius',
      diamNo: 'Not enough gems!', diamBuy: 'Bought!', diamGot: 'Gem!'
    }
  };
  function t(key) {
    var d = I18N[CUR_LANG] || I18N.ru;
    return d[key] !== undefined ? d[key] : (I18N.ru[key] !== undefined ? I18N.ru[key] : key);
  }

  /* ============ YANDEX GAMES SDK ============ */
  var SDK = { inited: false, adsReady: false, playingRewarded: false };
  function initSDK(onDone) {
    var finished = false;
    function finish() { if (!finished) { finished = true; onDone && onDone(); } }
    function tryInit(retries) {
      if (typeof YaGames === 'undefined') {
        if (retries > 0) return setTimeout(function () { tryInit(retries - 1); }, 200);
        return finish();
      }
      try {
        YaGames.init().then(function (ysdk) {
          SDK.ysdk = ysdk;
          SDK.inited = true;
          try {
            if (ysdk.environment && ysdk.environment.i18n && ysdk.environment.i18n.lang) {
              CUR_LANG = normalizeLang(ysdk.environment.i18n.lang);
            }
          } catch (e) {}
          try {
            if (ysdk.adv) {
              ysdk.adv.getBannerAdvStatus && ysdk.adv.getBannerAdvStatus().then(function (s) {
                if (s.status === 'on') { SDK.showSticky = true; }
              }).catch(function () {});
              SDK.adv = ysdk.adv;
              if (ysdk.adv.showBannerAdv) {
                try { ysdk.adv.showBannerAdv(); } catch (e) {}
              }
            }
          } catch (e) {}
          try {
            if (ysdk.features && ysdk.features.LoadingAPI) {
              ysdk.features.LoadingAPI.ready();
            }
          } catch (e) {}
          // загрузка ника игрока из облачного хранилища Яндекса (localStorage в игре может быть недоступен)
          try {
            if (ysdk.getPlayer) {
              ysdk.getPlayer({ scopes: false }).then(function (pl) {
                SDK.player = pl;
                return pl.getData(['gs_nick']);
              }).then(function (d) {
                if (d && d.gs_nick && typeof d.gs_nick === 'string' && d.gs_nick) {
                  try { localStorage.setItem('gs_nick', String(d.gs_nick).slice(0, 16)); } catch (e2) {}
                  if (typeof playerNick !== 'undefined') playerNick = String(d.gs_nick).slice(0, 16);
                }
                if (typeof playerNick !== 'undefined' && playerNick && SDK.player) {
                  SDK.player.setData({ gs_nick: playerNick }).catch(function () {});
                }
              }).catch(function () {});
            }
          } catch (e) {}
          finish();
        }).catch(function () { finish(); });
      } catch (e) { finish(); }
    }
    tryInit(30);
    // защита: если SDK завис, всё равно запускаем игру
    setTimeout(finish, 4000);
  }

  SDK.showInterstitial = function (cb) {
    if (SDK.adv && SDK.adv.showFullscreenAdv) {
      var called = false;
      function done() { if (!called) { called = true; cb && cb(); } }
      try {
        SDK.adv.showFullscreenAdv({
          callbacks: { onClose: done, onError: done, onOffline: done }
        });
        setTimeout(done, 15000);
        return;
      } catch (e) { done(); }
    }
    cb && cb();
  };

  SDK.showRewarded = function (cb) {
    if (SDK.adv && SDK.adv.showRewardedVideo) {
      var finished = false;
      try {
        SDK.adv.showRewardedVideo({
          callbacks: {
            onRewarded: function () { finished = true; },
            onClose: function () { cb && cb(finished); },
            onError: function () { cb && cb(false); }
          }
        });
        return;
      } catch (e) {}
    }
    cb && cb(false);
  };

  SDK.leaderboardSubmit = function (score, onDone) {
    if (SDK.ysdk && SDK.ysdk.getLeaderboards) {
      try {
        SDK.ysdk.getLeaderboards().then(function (lb) {
          lb.setLeaderboardScore('galaxy-survivor', { score: Math.round(score) }).then(function(){ onDone && onDone(true); }).catch(function(){ onDone && onDone(false); });
        }).catch(function () { onDone && onDone(false); });
      } catch (e) { onDone && onDone(false); }
    } else { onDone && onDone(false); }
  };

  SDK.showLeaderboard = function (onDone) {
    if (SDK.ysdk && SDK.ysdk.getLeaderboards) {
      try {
        SDK.ysdk.getLeaderboards().then(function (lb) {
          lb.getLeaderboardEntries('galaxy-survivor', { includeUser: true, quantityTop: 10 }).then(function (res) {
var text = t('top10');
            if (res && res.entries) {
              res.entries.forEach(function (e, i) {
                var name = (e.player && (e.player.publicName || e.player.scopePermissions)) ? (e.player.publicName || t('playerName')) : t('playerName');
                if (e.player && e.player.scopePermissions && e.player.range) { name = e.player.getAvatarSrc ? '' : name; }
                text += (i + 1) + '. ' + name + ' — ' + e.score + '\n';
              });
            } else { text += t('noRecords'); }
            alert(text);
          }).catch(function(){ alert(t('lbEmpty')); onDone && onDone(); });
        }).catch(function(){ alert(t('lbFail')); onDone && onDone(); });
      } catch (e) { alert(t('lbUnavailable')); onDone && onDone(); }
    } else { alert(t('lbInGames')); onDone && onDone(); }
  };

  /* ============ GAME STATE ============ */
  var state = 'menu';
  var victory = false;
  var victoryTime = 0;
  var keys = {};
  var mouse = { x: W/2, y: H/2, down: false };
  var touchId = null;
  var lastTime = performance.now();
  var animFrame = requestAnimationFrame(loop);

  var player = null;
  var enemies = [], projectiles = [], gems = [], parts = [], fx = [], orbHit = [], magnet = [];
  var waves = [], spawnTimer = 0;
  var helper = null;
  var gameTime = 0, waveNum = 0, score = 0, kills = 0, xpEarned = 0;
  var combo = 0, comboTimer = 0, maxCombo = 0;
  var revivesUsed = 0;
  var bestScore = 0;
  try { bestScore = +(localStorage.getItem('gs_best') || 0); } catch (e) {}
  var playerNick = '';
  try { playerNick = (localStorage.getItem('gs_nick') || '').slice(0, 16); } catch (e) {}
  // ─── ОБЩИЙ ЛИДЕРБОРД ────────────────────────────────────────────────────────────
  // Игроки вводят ник в меню → очки попадают в общий топ-10 для всех.
  //
  // СЕРВЕР БЕСПЛАТНЫЙ — Firebase Realtime Database (Google).
  // Весь интеграционный код внизу, настраивается 3 минутами:
  //
  // 1. Открой https://console.firebase.google.com/  (входи Google-аккаунтом)
  // 2. «Create project» → любое имя (например "galaxy-scores") → создать
  // 3. В левом меню: «Build» → «Realtime Database» → «Create Database»
  //    → регион: Choose nearest → Start in TEST mode → Done
  // 4. После создания БД, URL формата:
  //      https://<id>.firebaseio.com
  //    — скопируй его.
  // 5. Правила безопасности (после 30 дней «test» автоматически удалятся!):
  //    Перейди «Rules» → вставь:
  //      { "rules": { "scores": { ".read": true, ".write": true } } }
  //    → «Publish».
  //    (Открытый write безопасен: пишут только очки, вреда нет.)
  //
  // 6. Вставь скопированный URL ниже в переменную LB_URL (или через window.gsLBUrl):
  //      var LB_URL = 'https://my-project-id-default-rtdb.firebaseio.com';
  //
  // Готово! Теперь все игроки одного устройства видят общий лидерборд.
  // Если URL пустой ('') — используется только локальный топ (на этом устройстве).
  // ──────────────────────────────────────────────────────────────────────────────
  var LB_URL = 'https://galaxy-scores-default-rtdb.firebaseio.com';
  function lbUrl() { return (typeof window !== 'undefined' && window.gsLBUrl) ? window.gsLBUrl : LB_URL; }
  // лидерборд: топ-10 локальных результатов {name, score, wave, t}
  var lbLocal = [];
  try { lbLocal = JSON.parse(localStorage.getItem('gs_lb') || '[]') || []; } catch (e) {}
  function saveNick(n) {
    playerNick = (n || '').replace(/[<>]/g, '').slice(0, 16);
    try { localStorage.setItem('gs_nick', playerNick); } catch (e) {}
    if (SDK.inited && SDK.ysdk) {
      try {
        SDK.ysdk.getPlayer().then(function (pl) {
          SDK.player = pl;
          pl.setData({ gs_nick: playerNick }).catch(function () {});
        }).catch(function () {});
      } catch (e2) {}
    }
  }
  function addToLB(score, wave, timeS, exp) {
    var name = playerNick;
    if (!name) return -1;
    lbLocal.push({ name: name, exp: Math.round(exp || 0), score: Math.round(score), wave: wave, t: Math.round(timeS || 0) });
    lbLocal.sort(function (a, b) { return (b.exp || 0) - (a.exp || 0) || a.t - b.t; });
    lbLocal = lbLocal.slice(0, 10);
    try { localStorage.setItem('gs_lb', JSON.stringify(lbLocal)); } catch (e) {}
    for (var lbi = 0; lbi < lbLocal.length; lbi++) {
      var le = lbLocal[lbi];
      if (le.score === Math.round(score) && le.wave === wave && le.name === name) return lbi;
    }
    return -1;
  }
  // отправка результата на общий сервер (Firebase RTDB: POST создаёт запись с авто-id)
  function lbPush(score, wave, timeS, exp) {
    if (!lbUrl() || !playerNick) return;
    try {
      fetch(lbUrl() + '/scores.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerNick, score: Math.round(score), exp: Math.round(exp || 0), wave: wave, t: Math.round(timeS || 0), ts: Date.now() })
      }).catch(function () {});
    } catch (e) {}
  }
  // загрузка общего лидерборда; onError -> пустой список (покажем локальный)
  function loadLB(onOk, onErr) {
    if (!lbUrl()) { onErr(); return; }
    // без orderBy-параметра: не требует индекса в правилах Firebase, сортируем тут
    fetch(lbUrl() + '/scores.json', { method: 'GET' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (d) {
        var arr = [];
        if (d) {
          for (var k in d) {
            var e = d[k];
            if (!e || !e.name) continue;
            if (e.name === 'Player' || e.name === '') continue;
            arr.push({ name: String(e.name).slice(0, 16), exp: e.exp || 0, score: e.score || 0, wave: e.wave || 1, t: e.t || 0, ts: e.ts || 0 });
          }
          arr = dedupeLB(arr);
          arr.sort(function (a, b) { return (b.exp || 0) - (a.exp || 0) || (b.ts || 0) - (a.ts || 0); });
          onOk(arr.slice(0, 10));
        } else { onErr(); }
      })
      .catch(function () { onErr(); });
  }
  var freezeTimer = 0;
  var camX = 0, camY = 0;
  var shake = 0;
  var comboFlash = 0;

  var asteroids = [];
  for (var i = 0; i < 60; i++) {
    asteroids.push({ x: Math.random() * WORLD_W, y: Math.random() * WORLD_H, r: 12 + Math.random() * 40, h: Math.random() * Math.PI * 2 });
  }

  // космический фон: звёзды (3 слоя параллакса) — только звёзды и туманности
  var starLayers = [];
  (function () {
    for (var l = 0; l < 3; l++) {
      starLayers[l] = [];
      var count = l === 0 ? 220 : (l === 1 ? 90 : 30);
      for (var s = 0; s < count; s++) {
        starLayers[l].push({ x: Math.random() * WORLD_W, y: Math.random() * WORLD_H, r: l === 0 ? (0.4 + Math.random() * 0.6) : (l === 1 ? (1.1 + Math.random() * 0.9) : (1.8 + Math.random() * 1.4)), tw: Math.random() * Math.PI * 2 });
      }
    }
  })();

  // космическая пыль (мелкие дрейфующие частицы в слое камеры)
  var spaceDust = [];
  for (var sdi = 0; sdi < 70; sdi++) {
    spaceDust.push({ x: Math.random() * WORLD_W, y: Math.random() * WORLD_H, r: 0.6 + Math.random() * 1.6, ph: Math.random() * Math.PI * 2, spd: 4 + Math.random() * 10, c: ['#9fd0ff', '#ffd0a0', '#d0a0ff'][Math.floor(Math.random() * 3)] });
  }

  // кометы (падающие звёзды на фоне)
  var comets = [];
  var cometTimer = 6;
  function spawnComet() {
    var fromLeft = Math.random() < 0.5;
    comets.push({
      x: fromLeft ? -60 : WORLD_W + 60,
      y: Math.random() * WORLD_H * 0.5,
      vx: fromLeft ? (420 + Math.random() * 220) : -(420 + Math.random() * 220),
      vy: 130 + Math.random() * 90,
      life: 1.4, maxLife: 1.4, tail: 60 + Math.random() * 60
    });
  }

  // планеты — объекты мира (их можно облетать)
  var planets = [];
  (function () {
    var planCols = ['#5b8bd4', '#c47aa8', '#7a5fc4', '#d98a4a', '#4fbf9a', '#e0666e'];
    var planTypes = ['gas', 'rocky', 'gas', 'rocky', 'ice', 'gas'];
    var spots = [
      { x: WORLD_W * 0.18, y: WORLD_H * 0.14 },
      { x: WORLD_W * 0.84, y: WORLD_H * 0.2 },
      { x: WORLD_W * 0.78, y: WORLD_H * 0.82 },
      { x: WORLD_W * 0.16, y: WORLD_H * 0.8 },
      { x: WORLD_W * 0.5, y: WORLD_H * 0.05 },
      { x: WORLD_W * 0.5, y: WORLD_H * 0.94 }
    ];
    for (var p = 0; p < spots.length; p++) {
      planets.push({ x: spots[p].x, y: spots[p].y, r: 150 + Math.random() * 180, c: planCols[p], type: planTypes[p], ring: p === 1 || p === 4, bands: 0.25 + Math.random() * 0.32, moon: p === 2 || p === 3 || p === 5, moonR: 14 + Math.random() * 26, moonAng: Math.random() * Math.PI * 2, spin: 0.4 + Math.random() * 0.8, seed: Math.floor(Math.random() * 1000) });
    }
  })();

  function makePlayer() {
    var skin = SKINS[progress.selectedSkin] || SKINS.s1;
    var upg = progress.upg || {};
    return {
      x: WORLD_W / 2, y: WORLD_H / 2, r: 18, speed: 190 * (1 + 0.06 * (upg.speed || 0)), hp: 100 + 15 * (upg.hp || 0), maxHp: 100 + 15 * (upg.hp || 0),
      xp: 0, xpNeed: 30, lvl: 1, iframes: 0,
      skinColor: skin.color, ang: 0, aimAng: 0, speedBoost: 0, dmgBoost: 0, skinModel: 'jet', victory: false, trail: [], trailColor: skin.trail || null, selectedSkin: progress.selectedSkin,
      upDmg: 1 + 0.1 * (upg.dmg || 0), pickupR: 60 * (1 + 0.2 * (upg.magnet || 0)),
      upRateMul: Math.pow(0.92, upg.rate || 0), shield: upg.shield || 0, critChance: 0.08 * (upg.crit || 0), xpMul: 1 + 0.1 * (upg.xp || 0),
      weapons: [{ id: 'auto', lvl: 1 }],
      orbitWeps: [], aoeWeps: [], specials: []
    };
  }

  function makeHelper() {
    return {
      x: player.x + 120, y: player.y + 40, r: 60, hp: 4000, maxHp: 4000,
      ang: 0, fireTimer: 0, kamTimer: 0, laserTimer: 0, hurtCd: 0
    };
  }

  /* ============ WEAPONS / UPGRADES ============ */
  var WEAPONS = {
    auto: { name: 'Автоматический бластер', desc: 'Автоматически стреляет по ближайшему врагу', dmg: 8, rate: 0.55, speed: 520, color: '#4af' },
    orbit: { name: 'Орбитальный диск', desc: 'Вращающиеся лезвия вокруг героя', dmg: 12, count: 2, radius: 70, speedR: 3.2, color: '#f4f' },
    nova: { name: 'Энергетическая волна', desc: 'Периодически испускает волну урона', dmg: 15, rate: 2.4, radius: 150, color: '#ff0' },
    mine: { name: 'Разбрасыватель мин', desc: 'Ставит мины, взрывающиеся при касании', dmg: 30, rate: 1.5, color: '#f80' }
  };

  var UPGRADES_POOL = [
    { id: 'hp', name: 'Макс. здоровье +25%', desc: 'Увеличивает максимальное здоровье и лечит', icon: '❤' },
    { id: 'heal', name: 'Полное лечение', desc: 'Восстанавливает всё здоровье', icon: '✚' },
    { id: 'speed', name: 'Быстрее +15%', desc: 'Увеличивает скорость передвижения', icon: '⚡' },
    { id: 'auto', name: 'Бластер +', desc: 'Урон и скорость стрельбы +', icon: '🔫' },
    { id: 'orbit', name: 'Новый орбитальный диск', desc: 'Добавляет вращающийся диск', icon: '🛸' },
    { id: 'orbitplus', name: 'Диски быстрее', desc: 'Орбитальные диски вращаются быстрее', icon: '🌀' },
    { id: 'nova', name: 'Новая энерговолна', desc: 'Добавляет волну урона', icon: '💥' },
    { id: 'splash', name: 'Взрывной выстрел', desc: 'Выстрелы бластера взрываются', icon: '☄' },
    { id: 'magnet', name: 'Магнит опыта', desc: 'XP-кристаллы сами летят к тебе', icon: '🧲' },
    { id: 'freeze', name: 'Замедление', desc: 'Враги замедляются на 5 сек (абилка)', icon: '❄' },
    { id: 'mines', name: 'Минное поле', desc: 'Разбрасывает мины вокруг', icon: '💣' },
    { id: 'multishot', name: 'Доп. снаряд', desc: 'Стреляет на один снаряд больше', icon: '🎇' },
    { id: 'crit', name: 'Крит 20% (урон x2)', desc: 'Каждый 5-й выстрел наносит двойной урон', icon: '🎯' },
    { id: 'pierce', name: 'Пронзание', desc: 'Все выстрелы пробивают врагов насквозь', icon: '🏹' },
    { id: 'life', name: '+1 жизнь', desc: 'Одно воскрешение за бой', icon: '❤' }
  ];

  function applyUpgrade(id) {
    var p = player;
    if (id === 'hp') { p.maxHp = Math.round(p.maxHp * 1.25); p.hp = p.maxHp; }
    else if (id === 'heal') { p.hp = p.maxHp; }
    else if (id === 'speed') { p.speed *= 1.15; }
    else if (id === 'auto') {
      var w = getWeapon('auto'); w.lvl++;
      WEAPONS.auto.dmg = 8 + w.lvl * 4; WEAPONS.auto.rate = Math.max(0.18, 0.55 - w.lvl * 0.06);
    }
    else if (id === 'orbit') { addOrbit(); }
    else if (id === 'orbitplus') { var o = getWeapon('orbit'); o.speedR += 1.1; for (var i = 0; i < orbHit.length; i++) orbHit[i].hitTimer = 0; }
    else if (id === 'nova') { addNova(); }
    else if (id === 'splash') { p.weapons.push('splash'); }
    else if (id === 'magnet') { p.magnet = true; }
    else if (id === 'freeze') { p.freezeUnlocked = true; }
    else if (id === 'mines') { addMines(); }
    else if (id === 'multishot') { p.extraShots = (p.extraShots || 0) + 1; }
    else if (id === 'crit') { p.critChance = (p.critChance || 0) + 0.2; }
    else if (id === 'pierce') { p.pierceAll = true; }
else if (id === 'life') { p.lives = (p.lives || 0) + 1; }
    }

  function getWeapon(id) {
    for (var i = 0; i < player.weapons.length; i++) if (player.weapons[i].id === id) return player.weapons[i];
    var w = { id: id, lvl: 0 };
    player.weapons.push(w);
    return w;
  }

  function addOrbit() { var o = getWeapon('orbit'); o.lvl++; player.orbitWeps.push({ ang: Math.random() * Math.PI * 2, hitTimer: 0, dmg: WEAPONS.orbit.dmg + o.lvl * 4 }); }
  function addNova() { var n = getWeapon('nova'); n.lvl++; player.aoeWeps.push({ timer: 1, dmg: WEAPONS.nova.dmg + n.lvl * 8 }); }
  function addMines() { getWeapon('mine'); }

  /* ============ SHOP / SKINS / MUSIC / BOOSTERS (за рекламу) ============ */
  var SAVE_KEY = 'gs_progress_v2';
  var progress = { skinsUnlocked: ['s1'], musicUnlocked: ['m1'], ammoUnlocked: ['a1'], selectedSkin: 's1', selectedMusic: 'm1', selectedAmmo: 'a1', ammoCount: 0, boosters: {}, diamonds: 0, upg: { dmg: 0, hp: 0, magnet: 0, rate: 0, speed: 0, shield: 0, crit: 0, xp: 0 } };
  try {
    var saved = localStorage.getItem(SAVE_KEY);
    if (saved) { var sp = JSON.parse(saved); if (sp && typeof sp === 'object') { for (var k in sp) progress[k] = sp[k]; } }
  } catch (e) {}
  if (progress.skinsUnlocked.indexOf('s1') < 0) progress.skinsUnlocked.push('s1');
  if (progress.musicUnlocked.indexOf('m1') < 0) progress.musicUnlocked.push('m1');
  if (!progress.ammoUnlocked || progress.ammoUnlocked.indexOf('a1') < 0) { progress.ammoUnlocked = ['a1']; }
  if (!progress.selectedAmmo) progress.selectedAmmo = 'a1';
  if (progress.ammoCount === undefined) progress.ammoCount = 0;
  function saveProgress() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(progress)); } catch (e) {} }

  var SKINS = {
    s1: { name: 'Классик', color: '#4af', price: 0, desc: 'Стандартный истребитель', icon: '▲' },
    s2: { name: 'Неон-Фантом', color: '#f4f', price: 1, gcost: 100, desc: 'Фиолетовый с неоном', icon: '◆' },
    s3: { name: 'Золотой Герой', color: '#fd0', price: 2, gcost: 180, desc: 'Сверхзвуковой золотой', icon: '⭐' },
    s4: { name: 'Изумруд', color: '#0f6', price: 2, gcost: 180, desc: 'Смертоносный изумруд', icon: '❖' },
    s5: { name: 'Ледяной Страж', color: '#7ef', price: 3, gcost: 240, desc: 'Холодная сталь', icon: '✚' },
    s6: { name: 'Кобальт', color: '#38f', price: 4, gcost: 360, desc: 'Атомная мощь кобальта', icon: '♠' },
    s7: { name: 'Некрон', color: '#f26', price: 5, gcost: 480, desc: 'Повелитель самоцветов', icon: 'ꙮ' },
    s8: { name: 'Истребитель', color: '#9f3', price: 6, gcost: 720, desc: 'Реактивный и со следом', icon: '✈', model: 'jet', trail: '#dfd' },
    s9: { name: 'Феникс', color: '#f80', price: 7, gcost: 900, desc: 'Пламя вместо двигателя', icon: '🦅', model: 'jet', trail: '#fd0' },
    s10: { name: 'Космический Рыцарь', color: '#7af', price: 8, gcost: 1080, desc: 'Благородный неоновый страж', icon: '⚔', model: 'jet', trail: '#7af' }
  };
  var MUSIC = {
    m1: { name: 'Космический драйв', price: 0 },
    m2: { name: 'Неоновый рейв', price: 1 },
    m3: { name: 'Энергия орды', price: 1 },
    m4: { name: 'Турбо-бит', price: 2 }
  };

  var AMMO_TYPES = {
    a1: { name: 'Бластер', desc: 'Уверенный средний урон', price: 0, dmgMult: 1, rate: 0.55, speed: 520, color: '#4af', count: 1, spread: 8, r: 5 },
    a2: { name: 'Лазер', desc: 'Пронзает врагов насквозь', price: 1, gcost: 120, dmgMult: 1.3, rate: 0.85, speed: 680, color: '#f0f', count: 1, spread: 6, r: 4, pierce: true },
    a3: { name: 'Дробовик', desc: 'Веер из осколков', price: 2, gcost: 200, dmgMult: 0.55, rate: 0.9, speed: 470, color: '#fa0', count: 5, spread: 30, r: 5 },
    a4: { name: 'Ракеты', desc: 'Взрываются при попадании', price: 3, gcost: 280, dmgMult: 2.6, rate: 1.35, speed: 380, color: '#f80', count: 1, spread: 10, r: 7, rocket: true },
    a5: { name: 'Плазма', desc: 'Быстрая и мощная', price: 4, gcost: 360, dmgMult: 1.9, rate: 0.45, speed: 720, color: '#0ff', count: 1, spread: 8, r: 6 },
    a6: { name: 'Цепная молния', desc: 'Бьёт по врагам и перекидывается', price: 5, gcost: 520, dmgMult: 1.1, rate: 0.7, speed: 560, color: '#e8f', count: 1, spread: 7, r: 6, chain: true, chainTargets: 4, chainRange: 180 },
    a7: { name: 'Крио', desc: 'Замораживает врагов при попадании', price: 6, gcost: 600, dmgMult: 1.0, rate: 0.5, speed: 600, color: '#8ef', count: 1, spread: 7, r: 5, cryo: true, cryoDur: 2.2 }
  };

  var MAX_AMMO_COUNT = 3;

  var musicCtx = null, musicNodes = null, musicTimer = null, curTrack = 'm1';

  function isSkinOwned(id) { return progress.skinsUnlocked.indexOf(id) >= 0; }
  function isMusicOwned(id) { return progress.musicUnlocked.indexOf(id) >= 0; }
  function isAmmoOwned(id) { return progress.ammoUnlocked.indexOf(id) >= 0; }
  function unlockSkin(id) { if (progress.skinsUnlocked.indexOf(id) < 0) { progress.skinsUnlocked.push(id); progress.selectedSkin = id; saveProgress(); } }
  function unlockMusic(id) { if (progress.musicUnlocked.indexOf(id) < 0) { progress.musicUnlocked.push(id); progress.selectedMusic = id; saveProgress(); } }
  function unlockAmmo(id) { if (progress.ammoUnlocked.indexOf(id) < 0) { progress.ammoUnlocked.push(id); progress.selectedAmmo = id; saveProgress(); } }

  function watchForReward(item) {
    if (!SDK.adv || !SDK.adv.showRewardedVideo) {
      // нет SDK — разблокируем бесплатно в режиме теста
      if (item.type === 'skin') { unlockSkin(item.id); showShop(); return true; }
      else if (item.type === 'music') { unlockMusic(item.id); showShop(); return true; }
      else if (item.type === 'ammo') { unlockAmmo(item.id); hud(t('ammoUnlocked'), '#0f0'); showShop(); return true; }
      return true;
    }
    SDK.showRewarded(function (ok) {
      if (ok) {
        if (item.type === 'skin') { unlockSkin(item.id); hud(t('skinUnlocked'), '#0f0'); }
        else if (item.type === 'music') { unlockMusic(item.id); hud(t('ammoUnlocked'), '#0f0'); }
        else if (item.type === 'ammo') { unlockAmmo(item.id); hud(t('ammoUnlocked'), '#0f0'); }
      } else {
        hud(t('adNotDoneEnd'), '#f44');
      }
      showShop();
    });
    return false;
  }

  function buyAmmoCount() {
    if (progress.ammoCount >= MAX_AMMO_COUNT) { hud(t('maxAmmo'), '#f44'); return; }
    if (SDK.adv && SDK.adv.showRewardedVideo) {
      SDK.showRewarded(function (ok) {
        if (ok) { progress.ammoCount++; saveProgress(); hud(t('ammoPlus'), '#0f0'); showShop(); }
        else { hud(t('adNotDone'), '#f44'); }
      });
    } else {
      progress.ammoCount++; saveProgress(); hud(t('ammoPlus'), '#0f0'); showShop();
    }
  }

  function buyBooster(bid) {
    if (SDK.adv && SDK.adv.showRewardedVideo) {
      SDK.showRewarded(function (ok) {
        if (ok) { progress.boosters[bid] = (progress.boosters[bid] || 0) + 1; saveProgress(); hud(t('boosterGot'), '#0f0'); showShop(); }
        else { hud(t('adNotDone'), '#f44'); }
      });
    } else {
      progress.boosters[bid] = (progress.boosters[bid] || 0) + 1; saveProgress(); hud(t('boosterGot'), '#0f0'); showShop();
    }
  }

  var UPG_COSTS = { dmg: [160, 400, 800, 1400, 2200], hp: [200, 480, 1000, 1800, 3200], magnet: [120, 320, 720], rate: [120, 280, 560, 960, 1600], speed: [160, 360, 720], shield: [240, 600], crit: [200, 480, 880, 1440, 2200], xp: [160, 400, 800] };
  var UPG_ICONS = { dmg: '🔥', hp: '❤', magnet: '🧲', rate: '🔁', speed: '💨', shield: '🛡', crit: '🎯', xp: '⭐' };

  function buyWithGems(type, id) {
    var spec = type === 'skin' ? SKINS[id] : AMMO_TYPES[id];
    var cost = spec && spec.gcost;
    if (!cost) return;
    if ((progress.diamonds || 0) < cost) { hud(t('diamNo'), '#f44'); return; }
    progress.diamonds -= cost;
    if (type === 'skin') unlockSkin(id); else unlockAmmo(id);
    saveProgress();
    hud(t('diamBuy'), '#0f0');
    showShop();
  }

  function buyUpgrade(id) {
    var upg = progress.upg || {};
    var lvl = upg[id] || 0;
    var costs = UPG_COSTS[id] || [];
    if (lvl >= costs.length) { hud(t('puMax'), '#f80'); return; }
    var cost = costs[lvl];
    if ((progress.diamonds || 0) < cost) { hud(t('diamNo'), '#f44'); return; }
    progress.diamonds -= cost;
    upg[id] = lvl + 1;
    saveProgress();
    hud(t('diamBuy'), '#0f0');
    showShop();
  }

  function showShop() {
    state = 'shop';
    // удалить старые экраны магазина
    document.querySelectorAll('.menu-screen').forEach(function (el) { el.remove(); });
    var scr = document.createElement('div');
    scr.className = 'menu-screen';
    scr.innerHTML =
      '<button class="btn-close" onclick="window.__closeShop()">×</button>' +
      '<h1 style="font-size:32px">' + t('shopTitle') + ' <span style="color:#4ff;font-size:22px">💎' + (progress.diamonds || 0) + '</span></h1>' +
      '<div class="menu-scroll">' +
      '<div style="width:100%;max-width:680px;color:#fff;margin:10px 0 4px;font-size:18px;text-align:left">' + t('shipsSec') + '</div>' +
      '<div class="garage-grid" id="gg-skins"></div>' +
      '<div style="width:100%;max-width:680px;color:#fff;margin:24px 0 4px;font-size:18px;text-align:left">' + t('ammoSec') + '</div>' +
      '<div class="garage-grid" id="gg-ammo"></div>' +
      '<div style="width:100%;max-width:680px;color:#fff;margin:14px 0 4px;font-size:14px;text-align:left">' + t('ammoCountSec') + '</div>' +
      '<div class="booster-row" id="bb-ammo-count"></div>' +
      '<div style="width:100%;max-width:680px;color:#fff;margin:24px 0 4px;font-size:18px;text-align:left">' + t('boostSec') + '</div>' +
      '<div class="booster-row" id="bb-boost"></div>' +
      '<div style="width:100%;max-width:680px;color:#fff;margin:24px 0 4px;font-size:18px;text-align:left">' + t('diamSec') + '</div>' +
      '<div class="booster-row" id="bb-diam"></div>' +
      '<div style="margin-top:14px"><button class="btn-play" style="padding:12px 40px" onclick="window.__closeShop()">' + t('back') + '</button></div>' +
      '</div>';
    document.body.appendChild(scr);

    // skins
    var gs = document.getElementById('gg-skins');
    Object.keys(SKINS).forEach(function (id) {
      var s = SKINS[id];
      var owned = isSkinOwned(id);
      var selected = progress.selectedSkin === id;
      var d = document.createElement('div');
      d.className = 'garage-item' + (owned ? (selected ? ' selected' : '') : ' locked');
      var body = '<div class="g-preview" style="color:' + s.color + ';font-size:40px">' + s.icon + '</div>' +
        '<div class="g-name">' + t('sk_' + id) + '</div><div class="g-desc">' + t('sk_' + id + '_d') + '</div>';
      if (owned) { body += selected ? '<div class="g-selected">' + t('skSel') + '</div>' : '<div class="g-hint" style="color:#4af">' + t('choose') + '</div>'; }
      else {
        body += '<div class="g-hint">' + t('watch') + s.price + ')</div>';
        if (s.gcost) body += '<div class="g-hint" style="color:#4ff" data-buy="skin:' + id + '">' + t('buyDiam') + ' ' + s.gcost + '</div>';
      }
      d.innerHTML = body;
      d.onclick = function () {
        if (!owned) { watchForReward({ type: 'skin', id: id }); }
        else if (!selected) { progress.selectedSkin = id; saveProgress(); showShop(); }
      };
      gs.appendChild(d);
      var buySkinEl = d.querySelector('[data-buy]');
      if (buySkinEl) buySkinEl.addEventListener('click', function (ev) { ev.stopPropagation(); buyWithGems('skin', id); });
    });

    // ammo types
    var ga = document.getElementById('gg-ammo');
    Object.keys(AMMO_TYPES).forEach(function (id) {
      var am = AMMO_TYPES[id];
      var owned = isAmmoOwned(id);
      var selected = progress.selectedAmmo === id;
      var d = document.createElement('div');
      d.className = 'garage-item' + (owned ? (selected ? ' selected' : '') : ' locked');
      var body = '<div class="g-preview" style="font-size:36px">🔫</div><div class="g-name">' + t('am_' + id) + '</div>' +
        '<div class="g-desc">' + t('am_' + id + '_d') + '</div>';
      if (owned) { body += selected ? '<div class="g-selected">' + t('ammoSel') + '</div>' : '<div class="g-hint" style="color:#4af">' + t('choose') + '</div>'; }
      else {
        body += '<div class="g-hint">' + t('watch') + am.price + ')</div>';
        if (am.gcost) body += '<div class="g-hint" style="color:#4ff" data-buy="ammo:' + id + '">' + t('buyDiam') + ' ' + am.gcost + '</div>';
      }
      d.innerHTML = body;
      d.onclick = function () {
        if (!owned) { watchForReward({ type: 'ammo', id: id }); }
        else if (!selected) { progress.selectedAmmo = id; saveProgress(); showShop(); }
      };
      ga.appendChild(d);
      var buyAmmoEl = d.querySelector('[data-buy]');
      if (buyAmmoEl) buyAmmoEl.addEventListener('click', function (ev) { ev.stopPropagation(); buyWithGems('ammo', id); });
    });

    // ammo count
    var gac = document.getElementById('bb-ammo-count');
    var countChip = document.createElement('div');
    var curCount = AMMO_TYPES[progress.selectedAmmo] ? (AMMO_TYPES[progress.selectedAmmo].count || 1) + (progress.ammoCount || 0) : (progress.ammoCount || 0);
    var maxReached = progress.ammoCount >= MAX_AMMO_COUNT;
    countChip.className = 'booster-chip' + (progress.ammoCount > 0 ? ' active' : '');
    countChip.innerHTML = t('barrels') + ' <b>' + curCount + '</b> (' + t('baseLbl') + (AMMO_TYPES[progress.selectedAmmo] ? AMMO_TYPES[progress.selectedAmmo].count : 1) + ' + ' + (progress.ammoCount || 0) + ')<span class="b-cost">' + (maxReached ? t('maxLabel') : t('watchPlus')) + '</span>';
    countChip.onclick = function () { buyAmmoCount(); };
    gac.appendChild(countChip);

    // boosters
    var gb = document.getElementById('bb-boost');
    var BOOST = { dmg: t('boostDmg'), hp: t('boostHp'), speed: t('boostSpeed'), shield: t('boostShield'), regen: t('boostRegen') };
    Object.keys(BOOST).forEach(function (bid) {
      var b = document.createElement('div');
      var count = progress.boosters[bid] || 0;
      b.className = 'booster-chip' + (count > 0 ? ' active' : '');
      b.innerHTML = BOOST[bid] + ' <span style="color:#0f6">×' + count + '</span><span class="b-cost">' + t('watchPlus') + '</span>';
      b.onclick = function () { buyBooster(bid); };
      gb.appendChild(b);
    });

    // gem upgrades
    var gd2 = document.getElementById('bb-diam');
    var upg = progress.upg || {};
    ['dmg', 'hp', 'magnet', 'rate', 'speed', 'shield', 'crit', 'xp'].forEach(function (uid) {
      var b = document.createElement('div');
      var lvl = upg[uid] || 0;
      var costs = UPG_COSTS[uid] || [];
      var maxed = lvl >= costs.length;
      var cost = maxed ? 0 : costs[lvl];
      b.className = 'booster-chip' + (lvl > 0 ? ' active' : '');
      b.innerHTML = UPG_ICONS[uid] + ' ' + t('pu_' + uid) + '<br><span style="font-size:12px;opacity:.7">' + t('pu_' + uid + '_d') + '</span><br><span style="color:' + (lvl > 0 ? '#4ff' : '#888') + '">' + t('puLvl') + lvl + (maxed ? '/' + costs.length : '') + '</span>' +
        '<span class="b-cost">' + (maxed ? t('puMax') : cost + '💎') + '</span>';
      b.onclick = function () { buyUpgrade(uid); };
      gd2.appendChild(b);
    });

    window.__closeShop = function () { showMenu(); };
  }

  function startMusic() {
    // музыка отключена
  }

  function stopMusic() {
    if (musicTimer) { clearInterval(musicTimer); musicTimer = null; }
    if (musicNodes) {
      try {
        musicNodes.oscs.forEach(function (o) { try { o.stop(); } catch (e) {} });
        try { musicNodes.gain.disconnect(); } catch (e) {}
      } catch (e) {}
      musicNodes = null;
    }
  }

  /* ============ ENEMIES ============ */
  var ENEMY_TYPES = {
    chaser: { r: 16, hp: 12, speed: 80, dmg: 8, xp: 3, color: '#c33', score: 10 },
    fast: { r: 12, hp: 8, speed: 140, dmg: 6, xp: 4, color: '#4af', score: 15 },
    tank: { r: 26, hp: 60, speed: 45, dmg: 16, xp: 10, color: '#a83', score: 30 },
    splitter: { r: 14, hp: 10, speed: 85, dmg: 7, xp: 3, color: '#fa4', score: 20, splits: 2 },
    shooter: { r: 15, hp: 14, speed: 60, dmg: 5, xp: 6, color: '#c4f', score: 25, shoot: true },
    boss: { r: 55, hp: 600, speed: 55, dmg: 22, xp: 80, color: '#e02', score: 300, boss: true },
    boss_gunner: { r: 62, hp: 1000, speed: 65, dmg: 16, xp: 120, color: '#b0f', score: 450, boss: true, shoot: true },
    boss_titan: { r: 85, hp: 2400, speed: 38, dmg: 38, xp: 200, color: '#f90', score: 700, boss: true, minSpeed: true },
    boss_dread: { r: 95, hp: 4200, speed: 32, dmg: 55, xp: 350, color: '#f2f', score: 1200, boss: true, shoot: true },
    boss_colossus: { r: 120, hp: 7500, speed: 26, dmg: 85, xp: 600, color: '#d80', score: 2000, boss: true, minSpeed: true, shoot: true },
    boss_overlord: { r: 230, hp: 50000, speed: 12, dmg: 90, xp: 5000, color: '#f0f', score: 12000, boss: true, minSpeed: true, shoot: true, overlord: true, armor: 0.5 },
    boss_thanos: { r: 300, hp: 100000000000000, speed: 22, dmg: 250, xp: 20000, color: '#e33', score: 40000, boss: true, minSpeed: true, shoot: true, overlord: true, final: true, armor: 0.2 }
  };

  function spawnEnemy(type, zx, zy) {
    var t = ENEMY_TYPES[type];
    var ang = Math.random() * Math.PI * 2;
    var dist = Math.max(W, H) / 1.4 + 120;
    var hpScale = t.boss ? (1 + (waveNum - 1) * 0.35) : (1 + (waveNum - 1) * 0.09);
    if (t.final) hpScale = 1;
    else if (t.overlord) hpScale = 1 + (waveNum - 10) * 0.5;
    var e = {
      type: type, r: t.r, hp: t.hp * hpScale, maxHp: t.hp * hpScale,
      speed: (t.minSpeed ? Math.max(6, t.speed - waveNum) : t.speed) * (1 + waveNum * 0.02),
      dmg: Math.round(t.dmg * (1 + waveNum * 0.04)), xp: t.xp, color: t.color, score: t.score, x: 0, y: 0,
      hitFlash: 0, shootTimer: Math.random() * 2, splits: t.splits, boss: t.boss, shoot: t.shoot, overlord: !!t.overlord, final: !!t.final, armor: t.armor
    };
    e.x = player.x + Math.cos(ang) * dist;
    e.y = player.y + Math.sin(ang) * dist;
    if (e.overlord) {
      // способности повелителя
      e.abilityTimer = 0; e.phase = 0; e.spawnTimer = 8; e.beamTimer = 5; e.shieldUp = false; e.shield = e.final ? 5000000000000 : 20000; e.ringTimer = 7;
      var czx = (typeof zx === 'number') ? zx : player.x;
      var czy = (typeof zy === 'number') ? zy : player.y;
      e.minX = clamp(czx - 700, 150, WORLD_W - 150); e.maxX = clamp(czx + 700, 150, WORLD_W - 150);
      e.minY = clamp(czy - 700, 150, WORLD_H - 150); e.maxY = clamp(czy + 700, 150, WORLD_H - 150);
      if (e.final) {
        e.minX = clamp(czx - 1200, 150, WORLD_W - 150); e.maxX = clamp(czx + 1200, 150, WORLD_W - 150);
        e.minY = clamp(czy - 1200, 150, WORLD_H - 150); e.maxY = clamp(czy + 1200, 150, WORLD_H - 150);
      }
      e.x = czx + Math.cos(ang) * 400;
      e.y = czy + Math.sin(ang) * 400;
      fx.push({ type: 'boom', x: e.x, y: e.y, r: 320, life: 1, maxLife: 1, c: e.final ? '#e33' : '#f0f' });
      soundBigBoom();
    }
    enemies.push(e);
  }

  function spawnAround(pos, type) {
    var t = ENEMY_TYPES[type];
    var e = { type: type, r: t.r, hp: t.hp / 2, maxHp: t.hp / 2, speed: t.speed, dmg: t.dmg / 2, xp: t.xp, color: t.color, score: t.score, x: pos.x, y: pos.y, hitFlash: 0, splitDone: true, shootTimer: Math.random() * 2 };
    enemies.push(e);
  }

  /* ============ WAVES ============ */
  function pickBossPool(w) {
    if (w >= 9) return ['boss_colossus', 'boss_colossus', 'boss_dread', 'boss_titan'];
    if (w >= 5) return ['boss_colossus', 'boss_dread', 'boss_titan'];
    if (w >= 3) return ['boss_colossus', 'boss_titan', 'boss_gunner'];
    return ['boss', 'boss_gunner'];
  }
  function spawnWave() {
    waveNum++;
    if (waveNum > 12) { waveNum = 12; return; }
    announceWave();
    if (waveNum === 10) {
      helper = makeHelper();
      hud('GIANT HELPER ASSEMBLED!', '#0ff');
      fx.push({ type: 'boom', x: helper.x, y: helper.y, r: 260, life: 0.8, maxLife: 0.8, c: '#0ff' });
      soundBigBoom();
      shake = Math.min(shake + 6, 14);
    }
    var bossPool = pickBossPool(waveNum);
    var liveBoss = 0;
    for (var lb = 0; lb < enemies.length; lb++) { if (enemies[lb].boss) liveBoss++; }
    if (waveNum === 10) {
      // три повелителя: сложно убить, огромное хп
      for (var ovc = 0; ovc < 3; ovc++) {
        var ovAng = ovc / 3 * Math.PI * 2 + Math.PI / 6;
        var ovR = 550;
        spawnEnemy('boss_overlord', player.x + Math.cos(ovAng) * ovR, player.y + Math.sin(ovAng) * ovR);
      }
      hud('THREE OVERLORDS!', '#f0f');
      soundBigBoom();
      shake = Math.min(shake + 12, 22);
    }
    if (waveNum === 12) {
      // убираем всех врагов перед финальным боссом
      for (var ci = enemies.length - 1; ci >= 0; ci--) {
        boom(enemies[ci].x, enemies[ci].y, '#fff', 5);
        enemies.splice(ci, 1);
      }
      projectiles = [];
      spawnEnemy('boss_thanos', player.x, player.y - 400);
      hud('★ THANOS AWAKENS ★', '#e33');
      soundBigBoom();
      shake = Math.min(shake + 15, 24);
    }
    var bossCount = 1;
    if (waveNum >= 6) bossCount = 2;
    if (waveNum >= 10 && waveNum !== 10) bossCount = 3;
    if (waveNum >= 16) bossCount = 4;
    if (waveNum >= 22) bossCount = 5;
    if (bossCount > 5) bossCount = 5;
    if (waveNum === 10) bossCount = 0;
    if (waveNum === 12) bossCount = 0;
    var maxLive = 4 + Math.floor(waveNum / 6);
    if (bossCount > maxLive - liveBoss) bossCount = Math.max(0, maxLive - liveBoss);
    for (var bi = 0; bi < bossCount; bi++) {
      var pool = pickBossPool(waveNum);
      spawnEnemy(pool[Math.min(bi, pool.length - 1)]);
    }
    if (bossCount > 0) hud(t('bossAlert'), '#f44');
    if (SDK.showInterstitial && waveNum % 3 === 0) {
      if (SDK.inited) { SDK.showInterstitial(function () {}); }
    }
    spawnTimer = 0.5;
  }

  function announceWave() {
    var el = document.createElement('div');
    el.className = 'wave-announce';
    el.textContent = t('waveTitle') + waveNum;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 2200);
  }

  function waveEnemyPool() {
    var pool = [];
    pool.push('chaser');
    if (waveNum >= 2) pool.push('fast');
    if (waveNum >= 3) pool.push('tank');
    if (waveNum >= 4) pool.push('splitter');
    if (waveNum >= 4) pool.push('shooter');
    if (waveNum >= 8) pool.push('fast', 'tank', 'splitter', 'shooter', 'shooter');
    return pool;
  }

  function nextWaveTime() { return Math.max(11 - waveNum * 0.35, 4.5); }

  /* ============ LIBRARY ============ */
  function dist(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function wrapRelax() {
    if (player.x < 80) { player.x = 80; }
    if (player.y < 80) { player.y = 80; }
    if (player.x > WORLD_W - 80) { player.x = WORLD_W - 80; }
    if (player.y > WORLD_H - 80) { player.y = WORLD_H - 80; }
  }

  function hud(msg, color) {
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;top:20%;left:50%;transform:translateX(-50%);font-size:22px;color:' + (color || '#fff') + ';z-index:40;text-shadow:0 0 10px rgba(0,0,0,.8);animation:fadeUp 1.5s forwards;pointer-events:none';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 1500);
  }

  /* ============ PARTICLES / FX ============ */
  function boom(x, y, color, n) {
    if (parts.length > 520) return;
    if (fx.length > 260) return;
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, sp = 60 + Math.random() * 200;
      parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.4 + Math.random() * 0.5, maxLife: 0.9, r: 2 + Math.random() * 3, c: color });
    }
    fx.push({ type: 'ring', x: x, y: y, r: 4, maxR: 30 + Math.random() * 20, life: 0.4, c: color });
    if (n >= 8) {
      fx.push({ type: 'mist', x: x, y: y, vx: 0, vy: 0, r: 14, life: 0.2, maxLife: 0.2, c: '#fff' });
    }
  }

  function textFx(x, y, txt, color) {
    if (fx.length > 260) return;
    fx.push({ type: 'text', x: x, y: y, txt: txt, life: 0.7, maxLife: 0.7, c: color });
  }

  /* ============ SHOOTING ============ */
  function findNearest(range) {
    var best = null, bd = range;
    for (var i = 0; i < enemies.length; i++) {
      var d = dist(player, enemies[i]);
      if (d < bd) { bd = d; best = enemies[i]; }
    }
    return best;
  }

  var autoTimers = {};

  function fireAuto(ws) {
    var ammo = AMMO_TYPES[progress.selectedAmmo] || AMMO_TYPES.a1;
    for (var i = 0; i < ws.length; i++) {
      var w = ws[i];
      if (w.id !== 'auto') continue;
      var key = 'a' + i;
      autoTimers[key] = (autoTimers[key] || 0) - dt;
      if (autoTimers[key] > 0) continue;
      autoTimers[key] = ammo.rate * (player.upRateMul || 1);
      var t = findNearest(ammo.speed * 1.6);
      if (!t) continue;
      var tx = t.x, ty = t.y;
      var a = Math.atan2(ty - player.y, tx - player.x);
      var sp = ammo.speed;
      var total = (ammo.count || 1) + (progress.ammoCount || 0) + (player.extraShots || 0);
      var spreadStep = total <= 1 ? 0 : (ammo.spread * Math.PI / 180) / Math.max(total - 1, 1);
      var critType = (player.critChance || 0) > 0 && Math.random() < (player.critChance || 0);
      for (var s = 0; s < total; s++) {
        var off = total <= 1 ? 0 : (s - (total - 1) / 2) * spreadStep;
        var ang = a + off;
        var isLaser = w.id === 'auto';
        var p = { x: player.x, y: player.y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, dmg: WEAPONS.auto.dmg * (ammo.dmgMult || 1) * (player.upDmg || 1) * (critType ? 2 : 1) * (1 + 0.5 * (player.dmgBoost || 0)) * (isLaser ? 1.15 : 1), r: ammo.r || 5, c: critType ? '#fff' : (isLaser ? '#af0' : ammo.color), life: isLaser ? 2 : 1.6, splash: hasSplash, pierce: isLaser || !!ammo.pierce || !!player.pierceAll, pierceHits: (isLaser || ammo.pierce || player.pierceAll) ? 8 : 0, rocket: !!ammo.rocket, laser: isLaser, chain: !!ammo.chain, chainTargets: ammo.chainTargets || 0, chainRange: ammo.chainRange || 0, cryo: !!ammo.cryo, cryoDur: ammo.cryoDur || 0 };
        projectiles.push(p);
        if (fx.length < 240) {
          fx.push({ type: 'mist', x: player.x + Math.cos(ang) * 24, y: player.y + Math.sin(ang) * 24, vx: Math.cos(ang) * 60, vy: Math.sin(ang) * 60, r: 5, life: 0.12, maxLife: 0.12, c: '#dfe8ff' });
        }
        if (isLaser && total % 2 === 1) {
          var parAng = ang + 0.12;
          var p2 = { x: player.x, y: player.y, vx: Math.cos(parAng) * sp, vy: Math.sin(parAng) * sp, dmg: Math.round(p.dmg * 0.45), r: (ammo.r * 0.7) || 4, c: '#8f0', life: 2, splash: hasSplash, pierce: true, pierceHits: 6, laser: true };
          projectiles.push(p2);
        }
      }
    }
  }

  var hasSplash = false;

  function fireMines(ws) {
    for (var i = 0; i < ws.length; i++) {
      var w = ws[i];
      if (w.id !== 'mine') continue;
      var key = 'm' + i;
      w.t = (w.t || 0) - dt;
      if (w.t > 0) continue;
      w.t = WEAPONS.mine.rate;
      var a = Math.random() * Math.PI * 2;
      var md = 140;
      for (var j = 0; j < 3; j++) {
        var aa = a + j * Math.PI * 2 / 3;
        magnet.push({ x: player.x + Math.cos(aa) * md, y: player.y + Math.sin(aa) * md, t: 8, armed: 1.2, r: 10, exploded: false });
      }
    }
  }

  function mineExplode(m) {
    if (m.exploded) return;
    m.exploded = true;
    soundPop(m);
    boom(m.x, m.y, '#f80', 16);
    shake = Math.min(shake + 4, 12);
    for (var i = enemies.length - 1; i >= 0; i--) {
      var e = enemies[i];
      if (dist(m, e) < 90) {
        damageEnemy(i, WEAPONS.mine.dmg * (getOrbitLevel() || 1) || WEAPONS.mine.dmg * 2);
      }
    }
  }

  function getOrbitLevel() { var o = getWeapon('orbit'); return o.lvl || 0; }

  function updateOrbits() {
    var orbs = player.orbitWeps;
    var speedR = WEAPONS.orbit.speedR;
    var ol = getWeapon('orbit'); if (ol) speedR = ol.speedR || speedR;
    for (var i = 0; i < orbs.length; i++) {
      var o = orbs[i];
      o.ang += speedR * dt * (hasFreezeFreeze ? 0.2 : 1);
      var r = WEAPONS.orbit.radius * (1 + ol.lvl * 0.08);
      o.hx = player.x + Math.cos(o.ang) * r;
      o.hy = player.y + Math.sin(o.ang) * r;
      o.hitTimer -= dt;
      if (o.hitTimer > 0) continue;
      var hit = false;
      for (var j = enemies.length - 1; j >= 0; j--) {
        var e = enemies[j];
        var d = dist({ x: o.hx, y: o.hy }, e);
        if (d < e.r + 16) {
          damageEnemy(j, o.dmg);
          hit = true;
        }
      }
      if (hit) { o.hitTimer = 0.3; boom(o.hx, o.hy, '#f4f', 4); }
    }
  }

  function updateHelper() {
    if (!helper) return;
    var h = helper;
    // следование за игроком на орбите (большой радиус)
    var oa = Math.atan2(player.y - h.y, player.x - h.x);
    var wantD = 190;
    var d = dist(h, player);
    if (d > wantD + 20) {
      h.x += Math.cos(oa) * 120 * dt;
      h.y += Math.sin(oa) * 120 * dt;
    } else if (d < wantD - 40) {
      h.x -= Math.cos(oa) * 70 * dt;
      h.y -= Math.sin(oa) * 70 * dt;
    } else {
      var swing = Math.PI * 2 * 0.15;
      var ta = oa + Math.PI * 0.5 + Math.sin(gameTime * 0.7) * swing;
      h.x += Math.cos(ta) * 16 * dt;
      h.y += Math.sin(ta) * 16 * dt;
    }
    h.x = Math.max(80, Math.min(WORLD_W - 80, h.x));
    h.y = Math.max(80, Math.min(WORLD_H - 80, h.y));
    // получение урона от врагов рядом
    h.hurtCd -= dt;
    if (h.hurtCd <= 0) {
      var hurt = false;
      for (var hz = 0; hz < enemies.length; hz++) {
        var he = enemies[hz];
        if (dist(h, he) < he.r + h.r * 0.8) { hurt = true; break; }
      }
      if (hurt) {
        h.hp -= 60;
        h.hurtCd = 0.4;
        boom(h.x, h.y, '#f44', 5);
        hud('HELPER HIT!', '#f44');
        soundPop(false);
      }
      if (h.hp <= 0) {
        boom(h.x, h.y, '#0ff', 40);
        fx.push({ type: 'boom', x: h.x, y: h.y, r: 320, life: 1, maxLife: 1, c: '#0ff' });
        hud('HELPER DESTROYED!', '#f44');
        soundBigBoom();
        shake = Math.min(shake + 10, 18);
        helper = null;
        return;
      }
    }
    h.ang += dt * 0.6;

    // стрельба лазерами по ближайшим врагам
    h.fireTimer -= dt;
    if (h.fireTimer <= 0 && enemies.length > 0) {
      h.fireTimer = 0.6;
      var t = findNearest(600);
      if (t) {
        var ha = Math.atan2(t.y - h.y, t.x - h.x);
        for (var li = 0; li < 2; li++) {
          var la = ha + (li - 0.5) * 0.12;
          projectiles.push({ x: h.x + Math.cos(la) * h.r, y: h.y + Math.sin(la) * h.r, vx: Math.cos(la) * 520, vy: Math.sin(la) * 520, dmg: 70, r: 4, c: '#0ff', life: 1.8, laser: true, pierce: true, pierceHits: 4 });
        }
        fx.push({ type: 'ring', x: h.x + Math.cos(ha) * h.r, y: h.y + Math.sin(ha) * h.r, r: 6, maxR: 20, life: 0.2, c: '#0ff' });
      }
    }

    // периодическая ракета-залп по случайным врагам
    h.kamTimer -= dt;
    if (h.kamTimer <= 0) {
      h.kamTimer = 9;
      for (var ki = 0; ki < 3; ki++) {
        var target = enemies[Math.floor(Math.random() * enemies.length)];
        if (!target) break;
        var ka = Math.atan2(target.y - h.y, target.x - h.x);
        projectiles.push({ x: h.x + Math.cos(ka) * h.r, y: h.y + Math.sin(ka) * h.r, vx: Math.cos(ka) * 320, vy: Math.sin(ka) * 320, dmg: 200, r: 7, c: '#ff6', life: 2.5, rocket: true, splash: true, laser: false });
      }
      soundBoom();
    }

    // лазерная пушка-луч время от времени
    h.laserTimer -= dt;
    if (h.laserTimer <= 0) {
      h.laserTimer = 12;
      var beamT = enemies[Math.floor(Math.random() * enemies.length)];
      if (beamT) {
        for (var ej = enemies.length - 1; ej >= 0; ej--) {
          if (dist(enemies[ej], beamT) < 110) {
            damageEnemy(ej, 450);
          }
        }
        fx.push({ type: 'boom', x: beamT.x, y: beamT.y, r: 110, life: 0.5, maxLife: 0.5, c: '#0ff' });
        boom(beamT.x, beamT.y, '#0ff', 10);
        hud('MEGA LASER!', '#0ff');
      }
    }
  }

  var hasFreezeFreeze = false;

  function updateNovas() {
    for (var i = 0; i < player.aoeWeps.length; i++) {
      var n = player.aoeWeps[i];
      n.timer -= dt;
      if (n.timer > 0) continue;
      n.timer = WEAPONS.nova.rate;
      fx.push({ type: 'boom', x: player.x, y: player.y, r: WEAPONS.nova.radius * 1.8, life: 0.5, maxLife: 0.5 });
      shake = Math.min(shake + 3, 10);
      for (var j = enemies.length - 1; j >= 0; j--) {
        var e = enemies[j];
        if (dist(player, e) < WEAPONS.nova.radius) { damageEnemy(j, n.dmg); }
      }
      soundBoom();
    }
  }

  /* ============ DAMAGE ============ */
  function damageEnemy(idx, dmg) {
    var e = enemies[idx];
    if (!e) return;
    if (e.overlord && e.shieldUp) {
      e.shield -= dmg;
      textFx(e.x, e.y + e.r * 0.6, 'SHIELD ' + Math.max(0, Math.round(e.shield / 1000)) + 'k', '#9cf');
      boom(e.x, e.y, '#9cf', 2);
      if (e.shield <= 0) {
        e.shieldUp = false;
        e.shieldTimer = 6;
        hud('OVERLORD SHIELD DOWN!', '#9cf');
        fx.push({ type: 'boom', x: e.x, y: e.y, r: e.r * 2, life: 0.8, maxLife: 0.8, c: '#9cf' });
      }
      return;
    }
    e.hp -= dmg * (e.armor ? (1 - e.armor) : 1);
    e.hitFlash = 0.1;
    boom(e.x, e.y, e.color, 4);
    if (fx.length < 260) {
      var dmgFmt = Math.round(dmg * (e.armor ? (1 - e.armor) : 1));
      fx.push({ type: 'text', x: e.x + (Math.random() - 0.5) * 14, y: e.y - e.r * 0.6 - Math.random() * 10, txt: dmgFmt, life: 0.55, maxLife: 0.55, c: '#ffd24d', r: dmg >= 80 ? 15 : 12, vy: -26 });
    }
    if (e.hp <= 0) { killEnemy(idx); }
  }

  function killEnemy(idx) {
    var e = enemies[idx];
    if (!e) return;
    enemies.splice(idx, 1);
    kills++;
    combo++;
    comboTimer = 3;
    if (combo > maxCombo) maxCombo = combo;
    var combMult = 1 + Math.floor(combo / 8);
    if (combMult > 10) combMult = 10;
    score += (e.score || 10) * combMult;
    if (combo > 0 && combo % 8 === 0) {
      hud('COMBO x' + combMult, '#ff8');
      comboFlash = Math.min(comboFlash + 0.35, 1);
      shake = Math.min(shake + 2, 10);
    }
    gems.push({ x: e.x, y: e.y, vx: (Math.random() - 0.5) * 60, vy: (Math.random() - 0.5) * 60, val: e.xp, r: e.boss ? 12 : 5, c: e.boss ? '#ff0' : '#0f6' });
    if (e.boss) {
      var dn = 4 + Math.floor(Math.random() * 4);
      for (var di2 = 0; di2 < dn; di2++) {
        var da2 = Math.random() * Math.PI * 2;
        gems.push({ x: e.x + Math.cos(da2) * e.r * 0.5, y: e.y + Math.sin(da2) * e.r * 0.5, vx: (Math.random() - 0.5) * 80, vy: (Math.random() - 0.5) * 80, val: 2, r: 9, c: '#4ff', d: true });
      }
    } else if (Math.random() < 0.2) {
      gems.push({ x: e.x, y: e.y, vx: (Math.random() - 0.5) * 60, vy: (Math.random() - 0.5) * 60, val: 1, r: 7, c: '#4ff', d: true });
    } else if (Math.random() < 0.015) {
      gems.push({ x: e.x, y: e.y, vx: (Math.random() - 0.5) * 60, vy: (Math.random() - 0.5) * 60, val: 0, r: 9, c: '#fd0', bonus: true });
    }
    if (e.boss) {
      soundBigBoom();
      shake = 20;
      hud(t('bossKilledLbl') + e.xp + ' XP', '#ff0');
      for (var i = 0; i < 40; i++) {
        var a = Math.random() * Math.PI * 2;
        parts.push({ x: e.x, y: e.y, vx: Math.cos(a) * 300, vy: Math.sin(a) * 300, life: 1, maxLife: 1.5, r: 4, c: '#ff0' });
      }
      fx.push({ type: 'boom', x: e.x, y: e.y, r: 220, life: 0.8, maxLife: 0.8 });
      if (player.lvl < 15 && Math.random() < 0.5) { player.xp += e.xp; }
      // THANOS побеждён — победа!
      if (e.final) {
        victory = true;
        victoryTime = gameTime;
        for (var vbi = 0; vbi < 80; vbi++) {
          var vba = Math.random() * Math.PI * 2;
          parts.push({ x: e.x, y: e.y, vx: Math.cos(vba) * 400, vy: Math.sin(vba) * 400, life: 2, maxLife: 2.5, r: 6, c: '#ff0' });
          parts.push({ x: e.x, y: e.y, vx: Math.cos(vba + 0.2) * 300, vy: Math.sin(vba + 0.2) * 300, life: 2, maxLife: 2.5, r: 4, c: '#f44' });
        }
        fx.push({ type: 'boom', x: e.x, y: e.y, r: 600, life: 2, maxLife: 2, c: '#fff' });
        hud('★ THANOS HAS FALLEN ★', '#ff0');
        // истребитель превращается
        player.r = 50;
        player.maxHp = 9999;
        player.hp = 9999;
        player.speed = 280;
        player.victory = true;
        shake = 30;
        setTimeout(function () {
          state = 'victory';
          showVictory();
        }, 4000);
      }
    } else {
      boom(e.x, e.y, e.color, 8);
    }
    // splitter split
    if (e.type === 'splitter' && !e.splitDone) {
      for (var s = 0; s < 2; s++) {
        spawnAround({ x: e.x, y: e.y }, 'chaser');
      }
    }
  }

  /* ============ XP ============ */
  function doBonusPickup() {
    var p = player;
    if (!p) return;
    var b = [];
    if (p.lives < 3) b.push('life');
    b.push('dmg', 'speed', 'heal', 'shield', 'diam');
    var pick = b[Math.floor(Math.random() * b.length)];
    var txt = '';
    switch (pick) {
      case 'life':
        p.lives = (p.lives || 0) + 1;
        txt = '❤ +1 LIFE';
        soundLevel();
        break;
      case 'dmg':
        p.dmgBoost = (p.dmgBoost || 0) + 1;
        txt = '⚔ DMG +50%';
        soundLevel();
        break;
      case 'speed':
        p.speedBoost = (p.speedBoost || 0) + 1;
        txt = '💨 SPEED +25%';
        soundLevel();
        break;
      case 'heal':
        p.hp = Math.min(p.maxHp, p.hp + p.maxHp * 0.35);
        txt = '❤ +35% HP';
        soundLevel();
        break;
      case 'shield':
        p.shield = (p.shield || 0) + 1;
        txt = '🛡 SHIELD +1';
        soundLevel();
        break;
      default:
        progress.diamonds += 5;
        saveProgress();
        txt = '💎 +5 GEMS';
        blip(900, 0.1, 'sine', 0.06);
    }
    hud(txt, '#fd0');
    for (var bi = 0; bi < 26; bi++) {
      var bAng = Math.random() * Math.PI * 2;
      parts.push({ x: p.x, y: p.y, vx: Math.cos(bAng) * 220, vy: Math.sin(bAng) * 220, life: 0.9, maxLife: 0.9, r: 3, c: '#fd0' });
    }
    fx.push({ type: 'boom', x: p.x, y: p.y, r: 80, life: 0.5, maxLife: 0.5 });
  }

  function gainXp(v) {
    var gv = Math.max(0, Math.round(v * (player.xpMul || 1)));
    xpEarned += gv;
    player.xp += gv;
    if (player.xp >= player.xpNeed) {
      player.xp -= player.xpNeed;
      player.lvl++;
      player.xpNeed = Math.round(player.xpNeed * 1.28 + 10);
      // золотой взрыв левел-апа
      fx.push({ type: 'boom', x: player.x, y: player.y, r: 90, life: 0.7, maxLife: 0.7, c: '#ffd700' });
      fx.push({ type: 'ring', x: player.x, y: player.y, r: 20, maxR: 160, life: 0.6, maxLife: 0.6, c: '#ffd700' });
      for (var lv = 0; lv < 20; lv++) {
        var la = Math.random() * Math.PI * 2, lsp = 60 + Math.random() * 140;
        parts.push({ x: player.x, y: player.y, vx: Math.cos(la) * lsp, vy: Math.sin(la) * lsp, life: 0.6 + Math.random() * 0.5, maxLife: 1.1, r: 2 + Math.random() * 3, c: Math.random() < 0.5 ? '#ffd700' : '#fff' });
      }
      shake = Math.min(shake + 3, 10);
      showLevelUp();
      if (player.lvl % 2 === 0) spawnWave();
    }
  }

  function showLevelUp() {
    state = 'levelup';
    var options = pickUpgrades(3);
    var scr = document.createElement('div');
    scr.className = 'levelup-screen';
    scr.innerHTML = '<h2>' + t('levelT') + player.lvl + '!</h2>';
    options.forEach(function (u) {
      var b = document.createElement('button');
      b.className = 'upgrade-choice';
      b.innerHTML = '<div class="uname">' + (u.icon || '⭐') + ' ' + t('u_' + u.id) + '</div><div class="udesc">' + t('u_' + u.id + '_d') + '</div>';
      b.onclick = function () {
        applyUpgrade(u.id);
        scr.remove();
        state = 'playing';
        if (SDK.inited && player.lvl % 5 === 0) { SDK.showInterstitial(function () {}); }
      };
      scr.appendChild(b);
    });
    document.body.appendChild(scr);
  }

  function pickUpgrades(n) {
    var pool = UPGRADES_POOL.slice();
    var have = {};
    player.weapons.forEach(function (w) { have[w.id] = (have[w.id] || 0) + 1; });
    // filter: orbit max 4
    pool = pool.filter(function (u) {
      if (u.id === 'orbit') return have.orbit < 4;
      if (u.id === 'orbitplus') return have.orbit > 0;
      if (u.id === 'nova') return have.nova < 3;
      if (u.id === 'auto') return have.auto < 5;
      if (u.id === 'mines') return have.mine < 1;
      return true;
    });
    var out = [];
    while (out.length < n && pool.length) {
      var idx = Math.floor(Math.random() * pool.length);
      out.push(pool.splice(idx, 1)[0]);
    }
    return out;
  }

  /* ============ SOUND ============ */
  var SOUND_OFF = true;
  var actx = null;
  function audio() {
    if (SOUND_OFF) return null;
    if (!actx) {
      try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    return actx;
  }
  function blip(f, d, type, vol) {
    try {
      var a = audio(); if (!a) return;
      var o = a.createOscillator(), g = a.createGain();
      o.type = type || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(vol || 0.04, a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + d);
      o.connect(g); g.connect(a.destination);
      o.start(); o.stop(a.currentTime + d);
    } catch (e) {}
  }
  function soundShoot() { blip(880, 0.05, 'square', 0.02); }
  function soundPop(e) { blip(e ? 200 : 320, 0.08, 'sawtooth', 0.04); }
  function soundBoom() { try { var a = audio(); if (!a) return; var o = a.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(200, a.currentTime); o.frequency.exponentialRampToValueAtTime(40, a.currentTime + 0.3); var g = a.createGain(); g.gain.setValueAtTime(0.08, a.currentTime); g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.3); o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + 0.3); } catch (e) {} }
  function soundBigBoom() { soundBoom(); soundBoom(); soundBoom(); }
  function soundLevel() { blip(520, 0.1, 'triangle', 0.05); setTimeout(function(){ blip(780, 0.1, 'triangle', 0.05); }, 80); }

  /* ============ INPUT ============ */
  document.addEventListener('keydown', function (e) {
    // не мешаем набору текста в полях ввода (ник в меню)
    var tag = e.target ? e.target.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') { return; }
    keys[e.code] = true;
    if (e.code === 'KeyP' || e.code === 'Escape') { togglePause(); }
    if (e.code === 'Space' && state === 'playing') {
      if (player.freezeUnlocked) { doFreeze(); }
    }
    e.preventDefault();
  });
  document.addEventListener('keyup', function (e) {
    var tag = e.target ? e.target.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') { return; }
    keys[e.code] = false;
  });

  canvas.addEventListener('touchstart', function (e) {
    e.preventDefault();
    var t = e.changedTouches[0];
    touchId = t.identifier;
    mouse.x = t.clientX; mouse.y = t.clientY; mouse.down = true;
  }, { passive: false });
  canvas.addEventListener('touchmove', function (e) {
    e.preventDefault();
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchId) {
        mouse.x = e.changedTouches[i].clientX; mouse.y = e.changedTouches[i].clientY;
      }
    }
  }, { passive: false });
  canvas.addEventListener('touchend', function (e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchId) { mouse.down = false; touchId = null; }
    }
  });
  canvas.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
  canvas.addEventListener('mousedown', function (e) { mouse.down = true; });
  canvas.addEventListener('mouseup', function () { mouse.down = false; });
  canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  function doFreeze() {
    if (player.freezeCd > 0) return;
    player.freezeCd = 5;
    freezeTimer = 2.5;
    fx.push({ type: 'boom', x: player.x, y: player.y, r: 400, life: 0.8, maxLife: 0.8, c: '#4ff' });
    blip(300, 0.3, 'sine', 0.06);
    hud(t('frozenLbl'), '#4ff');
  }

  function togglePause() {
    if (state === 'playing') { state = 'paused'; showPaused(); }
    else if (state === 'paused') { state = 'playing'; hidePaused(); }
  }

  function showPaused() {
    var scr = document.createElement('div');
    scr.className = 'menu-screen'; scr.id = 'p1';
    scr.innerHTML = '<h1>ПАУЗА</h1><div class="subtitle">Урон: ' + Math.round(kills) + ' | Очки: ' + Math.round(score) + '</div>' +
      '<button class="btn-play" onclick="window.__resume()">Продолжить</button>' +
      '<button class="btn-shop" onclick="window.__quit()">Выйти в меню</button>';
    document.body.appendChild(scr);
    window.__resume = function () { state = 'playing'; document.getElementById('p1').remove(); };
    window.__quit = function () { quitToMenu(); };
  }
  function hidePaused() { var el = document.getElementById('p1'); if (el) el.remove(); }

  function quitToMenu() {
    state = 'menu';
    stopMusic();
    enemies = []; gems = []; projectiles = []; parts = []; fx = []; magnet = [];
    showMenu();
    if (SDK.inited) SDK.showInterstitial(function () {});
  }

  /* ============ MENU / GAME OVER ============ */
  function startGame() {
    audio(); // unlock audio
    state = 'playing';
    player = makePlayer();
    enemies = []; projectiles = []; gems = []; parts = []; fx = []; orbHit = []; magnet = [];
    helper = null;
    victory = false; victoryTime = 0;
    xpEarned = 0; waves = []; gameTime = 0; waveNum = 0; spawnTimer = 0; kills = 0; score = 0; freezeTimer = 0; shake = 0;
    combo = 0; comboTimer = 0; revivesUsed = 0;
    autoTimers = {}; hasSplash = false; hasFreezeFreeze = false; victory = false; victoryTime = 0;

    // apply boosters (потратить 1 за матч)
    if (progress.boosters.dmg > 0) { progress.boosters.dmg--; player.skinColor = player.skinColor; WEAPONS.auto.dmg = 12; player.dmgBoost = true; }
    if (progress.boosters.hp > 0) { progress.boosters.hp--; player.maxHp = 150; player.hp = 150; }
    if (progress.boosters.speed > 0) { progress.boosters.speed--; player.speed = 235; }
    if (progress.boosters.shield > 0) { progress.boosters.shield--; player.shield += 2; hud(t('boostShield') || 'SHIELD', '#4ff'); }
    if (progress.boosters.regen > 0) { progress.boosters.regen--; player.regenRate = 5; hud(t('boostRegen') || 'REGEN', '#f77'); }

    document.querySelectorAll('.menu-screen,.gameover-screen').forEach(function (el) { el.remove(); });
    addHUD();
    spawnWave();
  }

  function endGame() {
    if (victory) { state = 'victory'; showVictory(); return; }
    state = 'gameover';
    stopMusic();
    var isBest = score > bestScore;
    if (isBest) { bestScore = score; try { localStorage.setItem('gs_best', bestScore); } catch (e) {} }
    addToLB(score, waveNum, gameTime, xpEarned);
    lbPush(score, waveNum, gameTime, xpEarned);
    if (SDK.inited) {
      SDK.leaderboardSubmit(score, function () {});
    }
    var scr = document.createElement('div');
    scr.className = 'gameover-screen';
    scr.innerHTML = '<h2>' + t('gameOver') + '</h2>' +
      '<div class="stats">' + t('waveReached') + '<b>' + waveNum + '</b></div>' +
      '<div class="stats">' + t('kills') + '<b>' + kills + '</b></div>' +
      '<div class="stats">' + t('scoreFinal') + '<b>' + Math.round(score) + '</b></div>' +
      '<div class="stats">' + t('timeSurv') + '<b>' + fmtTime(gameTime) + '</b></div>' +
      '<div class="stats">' + t('recordFinal') + '<b>' + bestScore + '</b>' + (isBest ? ' <span style="color:#ff0">' + t('newRecord') + '</span>' : '') + '</div>' +
      '<button class="btn-play" onclick="window.__restart()">' + t('again') + '</button>' +
      '<button class="btn-revive" onclick="window.__revive()" style="padding:14px 48px;font-size:20px;border:none;border-radius:12px;cursor:pointer;margin:8px;font-weight:700;background:linear-gradient(135deg,#fa2,#f80);color:#fff">' + (revivesUsed >= 3 ? t('reviveMax') : t('reviveBtn') + ' (' + (3 - revivesUsed) + '/' + 3 + ')') + '</button>' +
      '<button class="btn-leaderboard" onclick="window.__lb()">' + t('lbBtn') + '</button>' +
      '<button class="btn-shop" onclick="window.__menu()">' + t('menuBtn') + '</button>';
    document.body.appendChild(scr);
    window.__restart = function () { if (SDK.inited) SDK.showInterstitial(function(){}); startGame(); };
    window.__revive = function () {
      if (revivesUsed >= 3) {
        hud(t('reviveMax') || 'MAX REVIVES!', '#f44');
        return;
      }
      var scr2 = document.querySelector('.gameover-screen');
      if (scr2) scr2.remove();
      revivesUsed++;
      state = 'reviving';
      var doRevive = function () {
        state = 'playing';
        player.hp = player.maxHp * 0.6;
        enemies.forEach(function (e) { e.hp = Math.max(e.hp / 3, 1); });
        player.iframes = 2.5;
        fx.push({ type: 'boom', x: player.x, y: player.y, r: 200, life: 1, maxLife: 1, c: '#0f0' });
        hud((t('reviveHp') || 'REVIVE!') + ' (' + revivesUsed + '/3)', '#0f0');
        shake = Math.min(shake + 5, 14);
      };
      if (SDK.inited && SDK.adv && SDK.adv.showRewardedVideo) {
        SDK.showRewarded(function (ok) {
          doRevive();
        });
      } else {
        doRevive();
      }
    };
    window.__lb = function () { showLB(); };
    window.__menu = function () { quitToMenu(); };
  }

  function fmtTime(s) {
    var m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function showVictory() {
    var scr = document.createElement('div');
    scr.className = 'gameover-screen';
    scr.innerHTML = '<h2 style="color:#ff0;font-size:48px">★ VICTORY ★</h2>' +
      '<div class="stats" style="color:#ff0;font-size:20px">THANOS HAS BEEN DEFEATED!</div>' +
      '<div class="stats">' + t('waveReached') + '<b>' + waveNum + '</b></div>' +
      '<div class="stats">' + t('kills') + '<b>' + kills + '</b></div>' +
      '<div class="stats">' + t('scoreFinal') + '<b>' + Math.round(score) + '</b></div>' +
      '<div class="stats">' + t('timeSurv') + '<b>' + fmtTime(gameTime) + '</b></div>' +
      '<div class="stats" style="color:#ff0">★你的战斗机已成为宇宙之王★</div>' +
      '<button class="btn-play" onclick="window.__restart()">' + t('again') + '</button>' +
      '<button class="btn-shop" onclick="window.__menu()">' + t('menuBtn') + '</button>';
    document.body.appendChild(scr);
    window.__restart = function () { startGame(); };
    window.__menu = function () { quitToMenu(); };
  }

  function renderLB(list, intoEl) {
    list = dedupeLB(list || []);
    if (!list || list.length === 0) {
      intoEl.innerHTML = '<div class="lb-row" style="justify-content:center;color:#888">' + t('lbEmpty') + '</div>';
      return;
    }
    intoEl.innerHTML = '';
    list.forEach(function (r, i) {
      var row = document.createElement('div');
      row.className = 'lb-row' + (String(r.name) === playerNick ? ' lb-mine' : '');
      row.innerHTML = '<span class="lb-pos">' + (i + 1) + '.</span>' +
        '<span class="lb-name">' + escapeHtml(r.name) + '</span>' +
        '<span class="lb-score">⚡ ' + (r.exp || 0) + '</span>' +
        '<span class="lb-wave">' + t('lbWave') + ' ' + r.wave + '</span>';
      intoEl.appendChild(row);
    });
  }

  // оставить один ник в лидерборде — самую последнюю игру игрока (по ts)
  function dedupeLB(arr) {
    var byName = {}, out = [];
    for (var di = 0; di < arr.length; di++) {
      var de = arr[di];
      var cur = byName[de.name];
      if (!cur) { byName[de.name] = de; }
      else if ((de.ts || 0) > (cur.ts || 0)) { byName[de.name] = de; }
    }
    for (var dk in byName) { if (byName.hasOwnProperty(dk)) out.push(byName[dk]); }
    return out;
  }

  function showLB() {
    document.querySelectorAll('.menu-screen,.gameover-screen,.levelup-screen,.lb-screen').forEach(function (el) { el.remove(); });
    var scr = document.createElement('div');
    scr.className = 'menu-screen';
    scr.innerHTML = '<h1 style="font-size:26px">' + t('topH') + '</h1>' +
      '<div class="lb-list" style="color:#888">' + t('lbLoading') + '</div>' +
      '<button class="btn-play" style="padding:12px 40px;margin-top:14px" onclick="window.__closeLB()">' + t('back') + '</button>';
    document.body.appendChild(scr);
    var list = scr.querySelector('.lb-list');
    if (!lbUrl()) {
      renderLB(lbLocal, list);
    } else {
      loadLB(function (serv) {
        renderLB(serv, list);
        window.__servScores = serv;
      }, function () {
        renderLB(lbLocal, list);
      });
    }
    window.__closeLB = function () { quitToMenu(); };
  }

  function escapeHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function showMenu() {
    document.querySelectorAll('.menu-screen,.gameover-screen,.levelup-screen').forEach(function (el) { el.remove(); });
    var scr = document.createElement('div');
    scr.className = 'menu-screen';
    scr.innerHTML = '<h1>🛸 GALAXY SURVIVOR</h1>' +
      '<div class="subtitle">' + t('subtitle') + '</div>' +
      '<div class="subtitle" style="color:#4af">' + t('recordLbl') + bestScore + '</div>' +
      '<div class="nick-box"><input id="nick-input" maxlength="16" placeholder="' + t('nickPh') + '" value="' + escapeHtml(playerNick) + '"><button onclick="window.__setNick()">✓</button></div>' +
      '<button class="btn-play" onclick="window.__play()">' + t('play') + '</button>' +
      '<button class="btn-shop" onclick="window.__shop()">' + t('shop') + '</button>' +
      '<button class="btn-leaderboard" onclick="window.__showLB()">' + t('top') + '</button>' +
      '<div class="subtitle" style="font-size:13px;color:#666;margin-top:20px">' + t('controls') + '</div>';
    document.body.appendChild(scr);
    var nickEl = document.getElementById('nick-input');
    if (nickEl) {
      nickEl.setAttribute('autocomplete', 'off');
      nickEl.focus();
      nickEl.onkeydown = function (ev) {
        if (ev.key === 'Enter') { window.__setNick(); nickEl.blur(); }
      };
    }
    window.__setNick = function () {
      var el = document.getElementById('nick-input');
      saveNick(el ? el.value : '');
      hud((t('nickSaved') || 'Nick saved') + ': ' + playerNick, '#4ff');
    };
    window.__showLB = function () { showLB(); };
    window.__play = function () {
      var el = document.getElementById('nick-input');
      if (el && el.value && el.value !== playerNick) { saveNick(el.value); }
      startGame();
    };
    window.__test = function () {
      var bc = 0;
      for (var ti = 0; ti < enemies.length; ti++) { if (enemies[ti].boss) bc++; }
      return { enemies: enemies.length, waveNum: waveNum, bosses: bc, helper: helper ? 1 : 0, diamonds: progress.diamonds, upg: progress.upg, hp: Math.round(player.hp), regen: player.regenRate || 0, types: enemies.map(function (e) { return e.type; }).slice(0, 10), bossTypes: enemies.filter(function (e) { return e.boss; }).map(function (e) { return e.type; }) };
    };
    window.__test.forceWave = function () { spawnWave(); return window.__test(); };
    window.__test.bp = function (w) { return pickBossPool(w); };
    window.__test.thanosDist = function () {
      for (var i = 0; i < enemies.length; i++) {
        var t = enemies[i];
        if (t.final) {
          var dx = t.x - player.x, dy = t.y - player.y;
          return 'dist=' + Math.round(Math.sqrt(dx * dx + dy * dy)) + ' t=(' + Math.round(t.x) + ',' + Math.round(t.y) + ') p=(' + Math.round(player.x) + ',' + Math.round(player.y) + ') hp=' + Math.round(t.hp);
        }
      }
      return 'DEAD/NOT FOUND';
    };
    window.__test.killFinal = function () {
      for (var i = 0; i < enemies.length; i++) {
        var t = enemies[i];
        if (t.final) { damageEnemy(i, 9e15); break; }
      }
      for (var k2 = 0; k2 < enemies.length; k2++) { if (enemies[k2].final) return 'STILL ALIVE hp=' + Math.round(enemies[k2].hp); }
      return 'victory=' + victory + ' state=' + state + ' playerR=' + player.r + ' playerVictory=' + player.victory;
    };
    window.__killPlayer = function () { player.hp = 0; endGame(); return state; };
    window.__moveTo = function (x, y) { player.x = x; player.y = y; camX = x; camY = y; };
    window.__test.balance = function () {
      var out = { helper: null, overlords: [] };
      if (helper) out.helper = { maxHp: helper.maxHp };
      for (var i = 0; i < enemies.length; i++) {
        var e = enemies[i];
        if (e.overlord && !e.final) out.overlords.push({ hp: Math.round(e.maxHp), armor: e.armor });
      }
      return out;
    };
    window.__test.victoryState = function () { return 'victory=' + victory + ' state=' + state + ' playerR=' + player.r + ' playerVictory=' + player.victory; };
    window.__test.types = function () { var s = {}; for (var i = 0; i < enemies.length; i++) { s[enemies[i].type] = (s[enemies[i].type] || 0) + 1; } return s; };
    window.__test.giveDiam = function (n) { progress.diamonds += n; saveProgress(); return progress.diamonds; };
    window.__test.giveBoost = function (id) { progress.boosters[id] = (progress.boosters[id] || 0) + 1; return progress.boosters[id]; };
    window.__test.giveXp = function (v) { gainXp(v); return window.__test(); };
    window.__test.lbPush = function (s, w, t, ex) { lbPush(s, w, t, ex); return 'sent'; };
    window.__test.lbUrl = function () { return lbUrl(); };
    window.__test.loadServ = function (cb) {
      loadLB(function (lst) { if (cb) cb(JSON.stringify({ ok: lst })); }, function () { if (cb) cb(JSON.stringify({ err: 1 })); });
    };
    window.__shop = function () { showShop(); };
    window.__lb2 = function () { SDK.showLeaderboard(function () {}); };
  }

  /* ============ HUD ============ */
  var hudEl = null;
  function addHUD() {
    document.querySelectorAll('.hud,.pause-btn,.weapon-hud').forEach(function (el) { el.remove(); });
    hudEl = document.createElement('div');
    hudEl.className = 'hud';
    hudEl.innerHTML = '<div class="hp-bar"><div class="hp-fill" id="hpfill"></div></div>' +
      '<div class="xp-bar"><div class="xp-fill" id="xpfill"></div></div>' +
      '<div id="hudinfo" style="font-size:12px;color:#ccc"></div>';
    document.body.appendChild(hudEl);
    var pb = document.createElement('button');
    pb.className = 'pause-btn';
    pb.textContent = '⏸';
    pb.onclick = function () { togglePause(); };
    document.body.appendChild(pb);
  }

  function updateHUD() {
    var hpEl = document.getElementById('hpfill'), xpEl = document.getElementById('xpfill'), infoEl = document.getElementById('hudinfo');
    if (!hudEl || !player) return;
    if (hpEl) hpEl.style.width = Math.max(0, player.hp / player.maxHp * 100) + '%';
    if (xpEl) xpEl.style.width = Math.min(100, player.xp / player.xpNeed * 100) + '%';
    if (infoEl) {
      var xpField = 0;
      for (var hI = 0; hI < gems.length; hI++) { if (!gems[hI].d) xpField++; }
      var combHtml = '';
      if (combo >= 4) {
        var cm = 1 + Math.floor(combo / 8);
        if (cm > 10) cm = 10;
        combHtml = '  <span style="color:#ff8;font-weight:700">COMBO ' + combo + ' (x' + cm + ')</span>';
      }
      infoEl.innerHTML = t('waveLbl') + waveNum + '  |  ' + t('lvlLbl') + player.lvl + '  |  ' + t('ptsLbl') + Math.round(score) + '  |  <span style="color:#4ff">💎' + progress.diamonds + '</span>' + (xpField > 0 ? '  <span style="color:#0f6">✦' + xpField + '</span>' : '') + combHtml + (player.freezeUnlocked && player.freezeCd > 0 ? t('frozen') + Math.ceil(player.freezeCd) : '');
    }
  }

  /* ============ MAIN LOOP ============ */
  var dt = 0.016;
  var __errs = [];
  function loop(ts) {
    dt = Math.min((ts - lastTime) / 1000, 0.05);
    lastTime = ts;
    try {
      if (state === 'playing') { update(); updateHUD(); }
      render();
    } catch (err) {
      if (__errs.length < 10) {
        __errs.push((err.message || String(err)) + ' @ ' + ((err.stack || '').split('\n')[1] || '').trim());
      }
    }
    animFrame = requestAnimationFrame(loop);
  }

  function hitPlayer(dmgv) {
    var p = player;
    if (victory) { p.hp = 9999; return false; }
    if (p.shield > 0) {
      p.shield--;
      shake = Math.min(shake + 4, 12);
      boom(p.x, p.y, '#4ff', 6);
      hud('🛡', '#4ff');
      return false;
    }
    p.hp -= dmgv;
    combo = 0; comboTimer = 0;
    p.iframes = 0.8;
    shake = Math.min(shake + 6, 15);
    fx.push({ type: 'boom', x: p.x, y: p.y, r: 40, life: 0.3, maxLife: 0.3, c: '#f55' });
    boom(p.x, p.y, '#f44', 10);
    if (p.hp <= 0) {
      if ((p.lives || 0) > 0) {
        p.lives--;
        p.hp = p.maxHp;
        p.iframes = 1.5;
        hud(t('reviveLives'), '#0f0');
        return false;
      }
      endGame();
      return true;
    }
    return false;
  }
  function update() {
    gameTime += dt;
    var p = player;

    // movement
    var dx = 0, dy = 0;
    if (keys['KeyW'] || keys['ArrowUp']) dy -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) dy += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) dx -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) dx += 1;
    if (mouse.down) {
      var cx = W / 2, cy = H / 2;
      dx = mouse.x - cx; dy = mouse.y - cy;
      var mlen = Math.sqrt(dx * dx + dy * dy);
      if (mlen > 18) { dx /= mlen; dy /= mlen; }
      else { dx = 0; dy = 0; }
    }
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len > 1) { dx /= len; dy /= len; }
    p.vx = dx; p.vy = dy;
    var thr = (dx !== 0 || dy !== 0);
    if (thr && parts.length < 260) {
      if (Math.random() < 0.7) {
        parts.push({ x: p.x - dx * 20 + (Math.random() - 0.5) * 6, y: p.y - dy * 20 + (Math.random() - 0.5) * 6, vx: -dx * 30 + (Math.random() - 0.5) * 20, vy: -dy * 30 + (Math.random() - 0.5) * 20, life: 0.5 + Math.random() * 0.2, maxLife: 0.7, r: 3 + Math.random() * 3, c: p.dmgBoost ? '#ffb84d' : '#4af' });
      }
    }
    // хвост следа: запоминаем позиции позади корабля
    if (player.trail) {
      for (var trd = player.trail.length - 1; trd >= 0; trd--) { player.trail[trd].t -= dt; if (player.trail[trd].t <= 0) player.trail.splice(trd, 1); }
      if (thr) {
        player.trail.push({ x: p.x - dx * 26, y: p.y - dy * 26, t: 0.5 });
        if (player.trail.length > 16) player.trail.shift();
      }
    }
    // регенерация от бустера
    if (player.regenRate && player.hp < player.maxHp) {
      player.hp = Math.min(player.maxHp, player.hp + player.regenRate * dt);
      if (Math.random() < dt * 10 && parts.length < 260) {
        parts.push({ x: p.x + (Math.random() - 0.5) * 22, y: p.y + (Math.random() - 0.5) * 22, vx: (Math.random() - 0.5) * 20, vy: -20 - Math.random() * 15, life: 0.6, maxLife: 0.6, r: 2 + Math.random() * 2, c: '#5f5' });
      }
    }
    p.x += dx * p.speed * (1 + 0.25 * (p.speedBoost || 0)) * dt;
    p.y += dy * p.speed * (1 + 0.25 * (p.speedBoost || 0)) * dt;
    wrapRelax();

    // поворот модели: в сторону движения, иначе — на ближайшего врага
    if (len > 0.2) {
      p.aimAng = Math.atan2(dy, dx);
    } else {
      var faceTarget = findNearest(350);
      if (faceTarget) p.aimAng = Math.atan2(faceTarget.y - p.y, faceTarget.x - p.x);
    }
    var angDiff = p.ang - p.aimAng;
    p.ang -= Math.atan2(Math.sin(angDiff), Math.cos(angDiff)) * Math.min(1, dt * 10);

    if (p.iframes > 0) p.iframes -= dt;
    if (comboTimer > 0) { comboTimer -= dt; if (comboTimer <= 0) { combo = 0; } }
    if (p.freezeCd !== undefined && p.freezeCd > 0) p.freezeCd -= dt;
    if (freezeTimer > 0) { freezeTimer -= dt; hasFreezeFreeze = true; } else { hasFreezeFreeze = false; }
    if (shake > 0) shake = Math.max(shake - dt * 30, 0);
    if (comboFlash > 0) comboFlash = Math.max(comboFlash - dt * 1.4, 0);

    // flag splash
    hasSplash = p.weapons.some(function (w) { return w === 'splash'; });

    // waves
    spawnTimer -= dt;
    if (spawnTimer <= 0 && enemies.length < 240 && waveNum !== 12) {
      var pool = waveEnemyPool();
      var n = Math.min(22 + Math.floor(waveNum * 2.5), 55);
      for (var i = 0; i < n; i++) {
        var t = pool[Math.floor(Math.random() * pool.length)];
        spawnEnemy(t);
      }
      spawnTimer = nextWaveTime();
    }
    // дополнительные мини-волны между основными (если на поле мало врагов)
    if (enemies.length < waveNum * 4 + 10 && enemies.length < 150 && spawnTimer > 1.2 && waveNum !== 12) {
      spawnTimer = Math.max(spawnTimer - 0.5, 0);
      var miniN = Math.min(5 + Math.floor(waveNum / 2), 15);
      for (var mi6 = 0; mi6 < miniN; mi6++) {
        spawnEnemy(waveEnemyPool()[Math.floor(Math.random() * waveEnemyPool().length)]);
      }
    }
    // hoard harder over time
    if (waveNum < 1 && spawnTimer < 0.4) { spawnWave(); }

    // weapons
    fireAuto(p.weapons);
    fireMines(p.weapons);
    updateOrbits();
    updateHelper();
    updateNovas();

    // projectiles
    for (var i = projectiles.length - 1; i >= 0; i--) {
      var pr = projectiles[i];
      pr.x += pr.vx * dt; pr.y += pr.vy * dt; pr.life -= dt;
      var dead = pr.life <= 0;
      for (var j = enemies.length - 1; j >= 0 && !dead; j--) {
        if (pr.enemy) continue;
        var e = enemies[j];
        if (dist(pr, e) < e.r + pr.r) {
          damageEnemy(j, pr.dmg);
          if (pr.cryo) e.slowT = pr.cryoDur;
          boom(pr.x, pr.y, pr.c || '#4af', pr.rocket ? 14 : 5);
          if (pr.chain && pr.chainTargets > 0) {
            // цепная молния: бьёт по ближайшим врагам и перепрыгивает
            var hit = [j];
            var cx = pr.x, cy = pr.y, chainDmg = pr.dmg * 0.8;
            for (var ci = 0; ci < pr.chainTargets; ci++) {
              var best2 = -1, bd2 = pr.chainRange;
              for (var cj = enemies.length - 1; cj >= 0; cj--) {
                if (hit.indexOf(cj) >= 0) continue;
                var cd2 = dist(enemies[cj], { x: cx, y: cy });
                if (cd2 < bd2) { bd2 = cd2; best2 = cj; }
              }
              if (best2 < 0) break;
              hit.push(best2);
              if (fx.length < 260) {
                fx.push({ type: 'bolt', x: cx, y: cy, tx: enemies[best2].x, ty: enemies[best2].y, life: 0.28, maxLife: 0.28, c: '#e8f' });
              }
              damageEnemy(best2, chainDmg);
              boom(enemies[best2].x, enemies[best2].y, '#e8f', 6);
              cx = enemies[best2].x; cy = enemies[best2].y;
            }
          }
          if (pr.rocket) {
            // взрыв ракеты
            shake = Math.min(shake + 5, 14);
            fx.push({ type: 'boom', x: pr.x, y: pr.y, r: 110, life: 0.4, maxLife: 0.4 });
            for (var k2 = enemies.length - 1; k2 >= 0; k2--) {
              if (k2 !== j && dist(enemies[k2], { x: pr.x, y: pr.y }) < 80) {
                damageEnemy(k2, pr.dmg * 0.6);
              }
            }
          } else if (hasSplash) {
            for (var k = enemies.length - 1; k >= 0; k--) {
              if (k !== j && dist(enemies[k], { x: pr.x, y: pr.y }) < 50) {
                damageEnemy(k, pr.dmg * 0.5);
              }
            }
            shake = Math.min(shake + 2, 10);
          }
          if (pr.pierce && pr.pierceHits > 0) {
            pr.pierceHits--;
          } else {
            dead = true;
          }
        }
      }
      if (dead) projectiles.splice(i, 1);
    }

    // mines
    for (var mi = magnet.length - 1; mi >= 0; mi--) {
      var m = magnet[mi];
      m.t -= dt;
      if (m.armed > 0) m.armed -= dt;
      if (m.t <= 0) { magnet.splice(mi, 1); continue; }
      var mHit = false;
      for (var e2 = enemies.length - 1; e2 >= 0; e2--) {
        if (m.armed > 0 && dist(m, enemies[e2]) < enemies[e2].r + m.r + 24) mHit = true;
        if (m.armed <= 0 && dist(m, enemies[e2]) < enemies[e2].r + m.r) mHit = true;
      }
      if (mHit) { mineExplode(m); }
    }
    // mines timer flash
    for (var mi2 = magnet.length - 1; mi2 >= 0; mi2--) { if (magnet[mi2].t <= 0) { mineExplode(magnet[mi2]); magnet.splice(mi2, 1); } }

    // enemies
    for (var i2 = enemies.length - 1; i2 >= 0; i2--) {
      var en = enemies[i2];
      if (en.hitFlash > 0) en.hitFlash -= dt;
      if (en.slowT > 0) en.slowT -= dt;
      var spd = en.speed * (hasFreezeFreeze ? 0.3 : 1) * (en.slowT > 0 ? 0.35 : 1);
      var a2 = Math.atan2(p.y - en.y, p.x - en.x);
      en.x += Math.cos(a2) * spd * dt;
      en.y += Math.sin(a2) * spd * dt;
      if (en.shoot || en.boss) {
        en.shootTimer -= dt;
        if (en.shootTimer <= 0) {
          en.shootTimer = en.boss ? 1.8 : 2.2;
          var aa = Math.atan2(p.y - en.y, p.x - en.x);
          if (en.boss) {
            // лазерный луч босса: быстрый, пробивает, бьёт больно
            for (var la = 0; la < 3; la++) {
              var lAng = aa + (la - 1) * 0.14;
              projectiles.push({ x: en.x + Math.cos(lAng) * en.r, y: en.y + Math.sin(lAng) * en.r, vx: Math.cos(lAng) * 620, vy: Math.sin(lAng) * 620, dmg: Math.round(en.dmg * 0.8), r: 5, c: '#f0f', life: 2.6, enemy: true, laser: true, pierce: true });
            }
          } else {
            projectiles.push({ x: en.x, y: en.y, vx: Math.cos(aa) * 300, vy: Math.sin(aa) * 300, dmg: en.dmg, r: 6, c: '#f4f', life: 2, enemy: true });
          }
        }
      }
      if (dist(en, p) < en.r + p.r) {
        if (p.iframes <= 0) {
          if (hitPlayer(en.dmg)) return;
        }
      }
      // способности повелителя
      if (en.overlord) {
        en.abilityTimer += dt;
        // зона всегда вокруг игрока (у финального босса ближе, чтобы был виден)
        var zR = en.final ? 480 : 700;
        en.minX = clamp(p.x - zR, 120, WORLD_W - 120); en.maxX = clamp(p.x + zR, 120, WORLD_W - 120);
        en.minY = clamp(p.y - zR, 120, WORLD_H - 120); en.maxY = clamp(p.y + zR, 120, WORLD_H - 120);
        // телепортация вдоль своей зоны, не вылетает за её пределы
        if (en.x < en.minX) en.x = en.minX;
        if (en.x > en.maxX) en.x = en.maxX;
        if (en.y < en.minY) en.y = en.minY;
        if (en.y > en.maxY) en.y = en.maxY;
        // фаза 2 при <50% hp: агрессивнее
        var ovPhase = (en.hp / en.maxHp < 0.5) ? 1 : 0;
        // щит
        en.shieldTimer = (en.shieldTimer || 20) - dt;
        if (ovPhase === 0 && en.hp / en.maxHp < 0.7 && !en.shieldUp && en.shieldTimer <= 0 && en.abilityTimer > 6) {
          en.shieldUp = true; en.shield = en.final ? 2000000000000 : 20000;
          en.shieldTimer = 12;
          hud('OVERLORD RAISES SHIELD!', '#9cf');
          en.abilityTimer = 0;
        }
        // звёздный взрыв: кольцо снарядов
        en.ringTimer -= dt;
        if (en.ringTimer <= 0) {
          en.ringTimer = ovPhase ? 4.5 : 7;
          var ringN = ovPhase ? 48 : 28;
          for (var ri = 0; ri < ringN; ri++) {
            var rA = ri / ringN * Math.PI * 2 + en.x;
            var rSp = 180 + Math.random() * 60;
            projectiles.push({ x: en.x + Math.cos(rA) * en.r, y: en.y + Math.sin(rA) * en.r, vx: Math.cos(rA) * rSp, vy: Math.sin(rA) * rSp, dmg: en.dmg * 0.6, r: 7, c: '#f0f', life: 3, enemy: true });
          }
          fx.push({ type: 'boom', x: en.x, y: en.y, r: en.r * 1.6, life: 0.5, maxLife: 0.5, c: '#f0f' });
          soundBigBoom();
        }
        // призыв миньонов
        en.spawnTimer -= dt;
        if (en.spawnTimer <= 0) {
          en.spawnTimer = ovPhase ? 6 : 9;
          var mini = 0;
          var miniTypes = ovPhase ? ['tank', 'splitter', 'fast'] : ['chaser', 'fast'];
          while (mini < (ovPhase ? 8 : 5)) {
            spawnAround(en, miniTypes[Math.floor(Math.random() * miniTypes.length)]);
            mini++;
          }
          boom(en.x, en.y, '#c33', 6);
        }
        // луч смерти: толстый лазер в игрока
        en.beamTimer -= dt;
        if (en.beamTimer <= 0) {
          en.beamTimer = ovPhase ? 3.5 : 6;
          var ba = Math.atan2(p.y - en.y, p.x - en.x);
          for (var bl = 0; bl < 6; bl++) {
            var blAng = ba + (bl - 2.5) * 0.06;
            projectiles.push({ x: en.x + Math.cos(blAng) * en.r, y: en.y + Math.sin(blAng) * en.r, vx: Math.cos(blAng) * 900, vy: Math.sin(blAng) * 900, dmg: en.dmg, r: 10, c: '#fff', life: 1.8, enemy: true, laser: true, pierce: true });
          }
          fx.push({ type: 'ring', x: en.x, y: en.y, r: 6, maxR: 80, life: 0.4, c: '#fff' });
          hud('DEATH BEAM!', '#fff');
        }
        // ===== THANOS: уникальные способности =====
        if (en.final) {
          var thPhase = (en.hp / en.maxHp < 0.5) ? 1 : 0;
          // телепортация в случайную точку зоны
          en.abilityTimer += dt;
          if (en.abilityTimer > (thPhase ? 3 : 5)) {
            en.abilityTimer = 0;
            var tTx = en.minX + Math.random() * (en.maxX - en.minX);
            var tTy = en.minY + Math.random() * (en.maxY - en.minY);
            fx.push({ type: 'boom', x: en.x, y: en.y, r: 120, life: 0.4, maxLife: 0.4, c: '#e33' });
            en.x = tTx;
            en.y = tTy;
            fx.push({ type: 'boom', x: en.x, y: en.y, r: 120, life: 0.4, maxLife: 0.4, c: '#ff0' });
            hud('THANOS TELEPORTS!', '#e33');
          }
          // кольцо смерти (задолго, много снарядов)
          en.ringTimer -= dt;
          if (en.ringTimer <= 0) {
            en.ringTimer = thPhase ? 3.5 : 6;
            var ringN2 = thPhase ? 80 : 50;
            for (var ri2 = 0; ri2 < ringN2; ri2++) {
              var rA2 = ri2 / ringN2 * Math.PI * 2 + en.x;
              var rSp2 = 220 + Math.random() * 100;
              projectiles.push({ x: en.x + Math.cos(rA2) * en.r, y: en.y + Math.sin(rA2) * en.r, vx: Math.cos(rA2) * rSp2, vy: Math.sin(rA2) * rSp2, dmg: en.dmg * 0.7, r: 9, c: '#f44', life: 4, enemy: true });
            }
            fx.push({ type: 'boom', x: en.x, y: en.y, r: en.r * 2.5, life: 0.7, maxLife: 0.7, c: '#f44' });
            soundBigBoom();
          }
          // призыв волны
          en.spawnTimer -= dt;
          if (en.spawnTimer <= 0) {
            en.spawnTimer = thPhase ? 4 : 7;
            var miniTypes2 = ['boss_colossus', 'boss_colossus', 'tank', 'shooter', 'fast'];
            for (var mi2 = 0; mi2 < 6; mi2++) { spawnAround(en, miniTypes2[Math.floor(Math.random() * miniTypes2.length)]); }
            boom(en.x, en.y, '#e33', 10);
          }
          // суперлуч ( Deathsweep 360° )
          en.beamTimer -= dt;
          if (en.beamTimer <= 0) {
            en.beamTimer = thPhase ? 2.5 : 5;
            for (var ba2 = 0; ba2 < 36; ba2++) {
              var ba2Ang = ba2 / 36 * Math.PI * 2;
              projectiles.push({ x: en.x + Math.cos(ba2Ang) * en.r, y: en.y + Math.sin(ba2Ang) * en.r, vx: Math.cos(ba2Ang) * 650, vy: Math.sin(ba2Ang) * 650, dmg: en.dmg * 1.5, r: 14, c: '#ff0', life: 2.5, enemy: true, laser: true, pierce: true });
            }
            fx.push({ type: 'boom', x: en.x, y: en.y, r: 400, life: 0.8, maxLife: 0.8, c: '#ff0' });
            hud('THANOS SNAP!', '#ff0');
            soundBigBoom();
            shake = Math.min(shake + 8, 16);
          }
        }
      }
    }

    // enemy projectiles
    for (var ei = projectiles.length - 1; ei >= 0; ei--) {
      var ep = projectiles[ei];
      if (!ep.enemy) continue;
      if (dist(ep, p) < ep.r + p.r && p.iframes <= 0) {
        soundPop(false);
        if (!ep.pierce) projectiles.splice(ei, 1);
        if (hitPlayer(ep.dmg)) return;
      }
    }

    // gems magnet/pickup
    for (var g = gems.length - 1; g >= 0; g--) {
      var gem = gems[g];
      gem.x += gem.vx * dt * (hasFreezeFreeze ? 0.5 : 1);
      gem.y += gem.vy * dt * 0.3;
      var gd = dist(gem, p);
      var pullR = player.pickupR || 60;
      var pull = (player.magnet || gd < pullR) ? 1 : 0;
      if (pull && gd > 20) {
        var ga = Math.atan2(p.y - gem.y, p.x - gem.x);
        gem.x += Math.cos(ga) * 340 * dt;
        gem.y += Math.sin(ga) * 340 * dt;
        var gd2 = dist(gem, { x: player.x, y: player.y });
        if (gd2 < p.r + 8) {
          gems.splice(g, 1);
          // искры при сборе кристалла
          if (!gem.d && fx.length < 260) {
            for (var gsp = 0; gsp < 4; gsp++) {
              var gsa = Math.random() * Math.PI * 2;
              var gss = 30 + Math.random() * 80;
              parts.push({ x: p.x, y: p.y, vx: Math.cos(gsa) * gss, vy: Math.sin(gsa) * gss, life: 0.3 + Math.random() * 0.2, maxLife: 0.5, r: 1.5 + Math.random() * 1.5, c: gem.c || '#0f6' });
            }
          }
          if (gem.bonus) {
            doBonusPickup();
          } else if (gem.d) {
            progress.diamonds += gem.val;
            saveProgress();
            blip(900 + Math.random() * 300, 0.05, 'sine', 0.03);
          } else {
            gainXp(gem.val);
            blip(400 + Math.random() * 200, 0.04, 'sine', 0.03);
          }
        }
      }
      if (gd > 1000) gems.splice(g, 1);
    }

    // particles
    for (var pi = parts.length - 1; pi >= 0; pi--) {
      var pt = parts[pi];
      pt.x += pt.vx * dt; pt.y += pt.vy * dt;
      pt.vx *= 0.96; pt.vy *= 0.96;
      pt.life -= dt;
      if (pt.life <= 0) parts.splice(pi, 1);
    }
    for (var fi = fx.length - 1; fi >= 0; fi--) {
      var f = fx[fi];
      f.life -= dt;
      if (f.type === 'mist' && f.vx !== undefined) { f.x += f.vx * dt; f.y += f.vy * dt; f.vx *= 0.9; f.vy *= 0.9; }
      if (f.type === 'text' && f.vy) { f.y += f.vy * dt; f.vy *= 0.94; }
      if (f.life <= 0) fx.splice(fi, 1);
    }
    // кометы
    cometTimer -= dt;
    if (cometTimer <= 0) { cometTimer = 5 + Math.random() * 7; if (comets.length < 4) spawnComet(); }
    for (var ci2 = comets.length - 1; ci2 >= 0; ci2--) {
      var cm = comets[ci2];
      cm.x += cm.vx * dt; cm.y += cm.vy * dt; cm.life -= dt;
      if (cm.life <= 0) comets.splice(ci2, 1);
    }
    // космическая пыль: дрейфует со своей скоростью
    for (var sdu = 0; sdu < spaceDust.length; sdu++) {
      var sdp = spaceDust[sdu];
      sdp.x -= sdp.spd * dt * 0.3; sdp.y += sdp.spd * dt * 0.12; sdp.ph += dt * 1.5;
    }
  }

  /* ============ RENDER ============ */
  function render() {
    // глубокий космос: градиент + туманности + звёзды (параллакс)
    var bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#0b1026');
    bgGrad.addColorStop(0.45, '#0f0a2a');
    bgGrad.addColorStop(1, '#1a0b2e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // туманности (мягкие цветные пятна)
    ctx.save();
    ctx.globalAlpha = 0.16;
    for (var nb = 0; nb < 4; nb++) {
      var nbx = (Math.sin(gameTime * 0.03 + nb * 1.7) + 1) * 0.5 * W;
      var nby = (Math.cos(gameTime * 0.02 + nb * 2.3) + 1) * 0.5 * H;
      var nbl = 0.5 + Math.sin(gameTime * 0.05 + nb) * 0.1;
      var ng = ctx.createRadialGradient(nbx, nby, 0, nbx, nby, 380);
      ng.addColorStop(0, ['#2b4dff', '#ff2bd4', '#2bffd4', '#ff8b2b'][nb] || '#2b4dff');
      ng.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.16 * nbl;
      ctx.fillStyle = ng;
      ctx.beginPath();
      ctx.arc(nbx, nby, 380, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // звёзды: три слоя параллакса, мерцание, разные оттенки
    for (var sl = 0; sl < starLayers.length; sl++) {
      ctx.save();
      var par = sl === 0 ? 0.05 : (sl === 1 ? 0.1 : 0.15);
      for (var sti = 0; sti < starLayers[sl].length; sti++) {
        var st = starLayers[sl][sti];
        var sx = (((st.x - camX * par) % WORLD_W) + WORLD_W) % WORLD_W;
        var sy = (((st.y - camY * par) % WORLD_H) + WORLD_H) % WORLD_H;
        var adx = Math.abs(sx - camX), ady = Math.abs(sy - camY);
        if (adx > W / 2 + 60 || ady > H / 2 + 60) continue;
        ctx.globalAlpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(gameTime * (sl === 2 ? 1.2 : 2) + st.tw));
        if (sl === 0) ctx.fillStyle = (st.x % 11 < 2) ? 'rgba(255,240,200,0.8)' : '#fff';
        else if (sl === 1) ctx.fillStyle = (st.x % 7 < 2) ? '#bfe0ff' : '#fff';
        else ctx.fillStyle = (st.x % 5 < 2) ? '#ffe9a8' : '#e8f4ff';
        ctx.beginPath();
        ctx.arc(sx, sy, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    // яркие звёзды с крестами (самый ближний слой)
    ctx.save();
    ctx.globalAlpha = 0.9;
    var sparkR = 3.5 + Math.sin(gameTime * 1.5) * 1.2;
    for (var st2 = 0; st2 < starLayers[2].length; st2++) {
      if (st2 % 6 !== 0) continue;
      var sp2 = starLayers[2][st2];
      var sx2 = (((sp2.x - camX * 0.15) % WORLD_W) + WORLD_W) % WORLD_W;
      var sy2 = (((sp2.y - camY * 0.15) % WORLD_H) + WORLD_H) % WORLD_H;
      var adx2 = Math.abs(sx2 - camX), ady2 = Math.abs(sy2 - camY);
      if (adx2 > W / 2 + 60 || ady2 > H / 2 + 60) continue;
      ctx.strokeStyle = '#e8f4ff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx2 - sparkR, sy2); ctx.lineTo(sx2 + sparkR, sy2);
      ctx.moveTo(sx2, sy2 - sparkR); ctx.lineTo(sx2, sy2 + sparkR);
      ctx.stroke();
    }
    ctx.restore();

    // космическая пыль: мелкие светящиеся точки, парящие в слое игрока
    ctx.save();
    for (var sdr = 0; sdr < spaceDust.length; sdr++) {
      var sdl = spaceDust[sdr];
      var sdx3 = (((sdl.x - camX * 0.25) % WORLD_W) + WORLD_W) % WORLD_W;
      var sdy3 = (((sdl.y - camY * 0.25) % WORLD_H) + WORLD_H) % WORLD_H;
      var pdx3 = Math.abs(sdx3 - camX), pdy3 = Math.abs(sdy3 - camY);
      if (pdx3 > W / 2 + 30 || pdy3 > H / 2 + 30) continue;
      var da = 0.12 + 0.1 * (0.5 + 0.5 * Math.sin(sdl.ph));
      ctx.globalAlpha = da;
      ctx.fillStyle = sdl.c;
      ctx.beginPath();
      ctx.arc(sdx3, sdy3, sdl.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // кометы: светящаяся голова + длинный градиентный хвост
    for (var cmi = 0; cmi < comets.length; cmi++) {
      var cmt = comets[cmi];
      var cAl = cmt.life / cmt.maxLife;
      var cvl = Math.sqrt(cmt.vx * cmt.vx + cmt.vy * cmt.vy) || 1;
      var cnx = cmt.vx / cvl, cny = cmt.vy / cvl;
      ctx.save();
      ctx.globalAlpha = cAl;
      var ctg = ctx.createLinearGradient(cmt.x, cmt.y, cmt.x - cnx * cmt.tail, cmt.y - cny * cmt.tail);
      ctg.addColorStop(0, 'rgba(180,230,255,0.95)');
      ctg.addColorStop(0.4, 'rgba(120,180,255,0.35)');
      ctg.addColorStop(1, 'rgba(120,180,255,0)');
      ctx.strokeStyle = ctg;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cmt.x, cmt.y);
      ctx.lineTo(cmt.x - cnx * cmt.tail, cmt.y - cny * cmt.tail);
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#9cf';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(cmt.x, cmt.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (state === 'menu' || (state !== 'playing' && state !== 'paused' && state !== 'gameover' && state !== 'reviving')) {
      ctx.save();
      ctx.translate(W/2, H/2);
      ctx.fillStyle = '#fff';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.restore();
    }

    // camera
    var shX = (Math.random() - 0.5) * shake, shY = (Math.random() - 0.5) * shake;
    var focus = player;
    if (player) {
      camX += (player.x - camX) * Math.min(1, dt * 6);
      camY += (player.y - camY) * Math.min(1, dt * 6);
    }
    ctx.save();
    ctx.translate(-camX + W / 2 + shX, -camY + H / 2 + shY);

    // мили-маленькие дальние звёзды между миром (без квадратов)
    ctx.strokeStyle = 'rgba(200,220,255,0.10)';
    ctx.lineWidth = 1;
    var sgs = 140;
    var sx0 = Math.floor((camX - W / 2) / sgs) * sgs;
    var sy0 = Math.floor((camY - H / 2) / sgs) * sgs;
    for (var stgX = sx0; stgX < camX + W / 2 + sgs; stgX += sgs) {
      for (var stgY = sy0; stgY < camY + H / 2 + sgs; stgY += sgs) {
        ctx.beginPath();
        ctx.arc(stgX + ((stgX * 7 + stgY * 13) % 5) - 2, stgY + ((stgX * 11 + stgY * 17) % 5) - 2, 0.7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fill();
      }
    }

    // лёгкий космический бордер-туман (не квадрат из линий)
    ctx.save();
    ctx.globalAlpha = 0.06;
    var bgrad = ctx.createLinearGradient(0, -50, 0, 50);
    bgrad.addColorStop(0, 'rgba(80,60,255,0)');
    bgrad.addColorStop(0.5, 'rgba(80,60,255,0.4)');
    bgrad.addColorStop(1, 'rgba(80,60,255,0)');
    ctx.strokeStyle = bgrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(WORLD_W / 2, WORLD_H / 2, Math.min(WORLD_W, WORLD_H) / 2 - 40, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // видимые границы мира (яркий светящийся контур, виден когда камера у края)
    var atEdge = camX - W / 2 < 0 || camY - H / 2 < 0 || camX + W / 2 > WORLD_W || camY + H / 2 > WORLD_H;
    if (atEdge) {
      ctx.save();
      ctx.strokeStyle = 'rgba(120,210,255,1)';
      ctx.lineWidth = 10;
      ctx.shadowColor = 'rgba(120,210,255,1)';
      ctx.shadowBlur = 40;
      ctx.strokeRect(0, 0, WORLD_W, WORLD_H);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(200,240,255,1)';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, WORLD_W, WORLD_H);
      ctx.restore();
      ctx.save();
      ctx.fillStyle = 'rgba(120,210,255,0.35)';
      var mkw = 500, mbd = 60;
      for (var mgx = mbd; mgx < WORLD_W; mgx += mkw) {
        ctx.fillRect(mgx, 0, 26, mbd);
        ctx.fillRect(mgx, WORLD_H - mbd, 26, mbd);
      }
      for (var mgy = mbd; mgy < WORLD_H; mgy += mkw) {
        ctx.fillRect(0, mgy, mbd, 26);
        ctx.fillRect(WORLD_W - mbd, mgy, mbd, 26);
      }
      ctx.restore();
    }

    // asteroids (decor)
    ctx.fillStyle = 'rgba(90,90,110,0.12)';
    for (var ai = 0; ai < asteroids.length; ai++) {
      var as = asteroids[ai];
      var adx = Math.abs(as.x - camX), ady = Math.abs(as.y - camY);
      if (adx > W / 2 + 100 || ady > H / 2 + 100) continue;
      ctx.save();
      ctx.translate(as.x, as.y); ctx.rotate(as.h); ctx.rotate(gameTime * 0.02);
      ctx.beginPath();
      ctx.arc(0, 0, as.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // планеты — объёмные объекты мира (можно облетать)
    for (var pb = 0; pb < planets.length; pb++) {
      var pl = planets[pb];
      var pdx = Math.abs(pl.x - camX), pdy = Math.abs(pl.y - camY);
      if (pdx > W / 2 + pl.r + 300 || pdy > H / 2 + pl.r + 300) continue;
      var px = pl.x, py = pl.y;
      ctx.save();

      // сияющая атмосфера (гало вокруг планеты)
      var atmo = ctx.createRadialGradient(px, py, pl.r * 0.7, px, py, pl.r * 1.6);
      atmo.addColorStop(0, pl.c);
      atmo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(px, py, pl.r * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // тело планеты: объёмный шар (свет слева сверху — от условной звезды)
      var rot = pl.spin * gameTime * 2 + pl.seed;
      var pgrad = ctx.createRadialGradient(px - pl.r * 0.4, py - pl.r * 0.4, pl.r * 0.1, px, py, pl.r);
      pgrad.addColorStop(0, '#ffffff');
      pgrad.addColorStop(0.25, pl.c);
      pgrad.addColorStop(0.8, '#223');
      pgrad.addColorStop(1, '#050510');
      ctx.fillStyle = pgrad;
      ctx.beginPath();
      ctx.arc(px, py, pl.r, 0, Math.PI * 2);
      ctx.fill();

      // поверхность внутри шара
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, pl.r, 0, Math.PI * 2);
      ctx.clip();
      if (pl.type === 'gas') {
        // вращающиеся полосы облаков газового гиганта
        var stripeSpd = rot;
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.lineWidth = pl.r * 0.16;
        var bandRow = 0;
        while (bandRow < 8) {
          var shrink = Math.sin(bandRow * Math.PI / 8 + stripeSpd * 0.2) * pl.r * 0.12;
          ctx.beginPath();
          ctx.ellipse(px, py - pl.r + bandRow * pl.r * 0.28 + shrink, pl.r * 1.1, pl.r * 0.16, 0, 0, Math.PI * 2);
          ctx.stroke();
          bandRow++;
        }
        // большое пятно-ураган
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(px + Math.cos(rot * 0.5) * pl.r * 0.3, py + Math.sin(rot * 0.5) * pl.r * 0.4 + pl.r * 0.2, pl.r * 0.28, pl.r * 0.18, rot * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.ellipse(px + Math.cos(rot * 0.5) * pl.r * 0.45, py + Math.sin(rot * 0.5) * pl.r * 0.5 + pl.r * 0.45, pl.r * 0.2, pl.r * 0.12, rot * 0.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // кратеры и материки каменистой/ледяной планеты
        var seedV = pl.seed;
        ctx.globalAlpha = 0.4;
        for (var cr = 0; cr < 12; cr++) {
          seedV = (seedV * 9301 + 49297) % 233280;
          var crX = (seedV / 233280 - 0.5) * 2 + Math.sin(rot * 0.5 + cr) * 0.15;
          seedV = (seedV * 9301 + 49297) % 233280;
          var crY = ((seedV / 233280 - 0.5) * 2) * 0.8;
          seedV = (seedV * 9301 + 49297) % 233280;
          var crR = (seedV / 233280) * pl.r * 0.18 + pl.r * 0.04;
          // только если кратер на видимой части
          var cDist = Math.sqrt(crX * crX + crY * crY);
          var cx = px + crX * pl.r * 1.2, cy = py + crY * pl.r * 1.1;
          if (cDist > 0.8) continue;
          ctx.fillStyle = (pl.type === 'ice') ? 'rgba(200,230,255,0.3)' : 'rgba(0,0,0,0.3)';
          ctx.beginPath();
          ctx.arc(cx, cy, crR, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.25)';
          ctx.beginPath();
          ctx.arc(cx - crR * 0.35, cy - crR * 0.35, crR * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        // тёмные материки
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#223';
        for (var cont = 0; cont < 4; cont++) {
          seedV = (seedV * 9301 + 49297) % 233280;
          var cx2 = (seedV / 233280) * 2 - 1 + Math.sin(rot * 0.4 + cont) * 0.2;
          seedV = (seedV * 9301 + 49297) % 233280;
          var cy2 = (seedV / 233280) * 2 - 1;
          if (Math.sqrt(cx2 * cx2 + cy2 * cy2) > 1.3) continue;
          ctx.beginPath();
          ctx.arc(px + cx2 * pl.r, py + cy2 * pl.r, pl.r * (0.2 + Math.random() * 0.3), 0, Math.PI * 2);
          ctx.ellipse(px + cx2 * pl.r, py + cy2 * pl.r + pl.r * 0.2, pl.r * 0.3, pl.r * 0.18, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // ночная сторона (терминатор): затеняем правую нижнюю часть
      var term = ctx.createRadialGradient(px + pl.r * 0.9, py + pl.r * 0.7, pl.r * 0.2, px, py, pl.r * 1.5);
      term.addColorStop(0, 'rgba(0,0,0,0)');
      term.addColorStop(0.75, 'rgba(0,0,10,0.55)');
      term.addColorStop(1, 'rgba(0,0,5,0.9)');
      ctx.fillStyle = term;
      ctx.beginPath();
      ctx.arc(px, py, pl.r, 0, Math.PI * 2);
      ctx.fill();

      // кольца (3D: рисуем перед планетой нижнюю половину)
      if (pl.ring) {
        ctx.globalAlpha = 0.85;
        var ringGrad = ctx.createLinearGradient(px - pl.r, py, px + pl.r, py);
        ringGrad.addColorStop(0, 'rgba(200,210,235,0.4)');
        ringGrad.addColorStop(0.5, 'rgba(235,240,255,0.95)');
        ringGrad.addColorStop(1, 'rgba(200,210,235,0.4)');
        ctx.strokeStyle = ringGrad;
        // задняя часть колец
        ctx.lineWidth = pl.r * 0.2;
        ctx.beginPath();
        ctx.ellipse(px, py, pl.r * 1.8, pl.r * 0.6, -0.35, Math.PI, Math.PI * 2);
        ctx.stroke();
        // передняя нижняя часть колец
        ctx.lineWidth = pl.r * 0.2;
        ctx.beginPath();
        ctx.ellipse(px, py, pl.r * 1.8, pl.r * 0.6, -0.35, 0, Math.PI);
        ctx.stroke();
        // тонкая линия-прорезь в кольцах
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = pl.r * 0.05;
        ctx.beginPath();
        ctx.ellipse(px, py, pl.r * 1.8, pl.r * 0.6, -0.35, 0.5, Math.PI - 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(px, py, pl.r * 1.8, pl.r * 0.6, -0.35, Math.PI * 1.5, Math.PI * 2 - 0.5);
        ctx.stroke();
      }

      // луна на орбите
      if (pl.moon) {
        var ma = pl.moonAng + gameTime * 0.6;
        var mx = px + Math.cos(ma) * (pl.r * 1.4 + pl.moonR);
        var my = py + Math.sin(ma) * (pl.r * 1.2 + pl.moonR);
        var mgr = ctx.createRadialGradient(mx - pl.moonR * 0.35, my - pl.moonR * 0.35, pl.moonR * 0.1, mx, my, pl.moonR);
        mgr.addColorStop(0, '#fff');
        mgr.addColorStop(0.5, '#c8d4e8');
        mgr.addColorStop(0.85, '#4a5870');
        mgr.addColorStop(1, '#1a1a2a');
        ctx.fillStyle = mgr;
        ctx.beginPath();
        ctx.arc(mx, my, pl.moonR, 0, Math.PI * 2);
        ctx.fill();
        // кратеры луны
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(mx - pl.moonR * 0.3, my - pl.moonR * 0.1, pl.moonR * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(mx - pl.moonR * 0.35, my - pl.moonR * 0.15, pl.moonR * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // светлый блик атмосферы по светлой стороне
      var hilite = ctx.createRadialGradient(px - pl.r * 0.4, py - pl.r * 0.4, 0, px - pl.r * 0.4, py - pl.r * 0.4, pl.r * 0.9);
      hilite.addColorStop(0, 'rgba(255,255,255,0.25)');
      hilite.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = hilite;
      ctx.beginPath();
      ctx.arc(px - pl.r * 0.4, py - pl.r * 0.4, pl.r * 0.9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // gems
    for (var gi = 0; gi < gems.length; gi++) {
      var gm = gems[gi];
      ctx.save();
      ctx.shadowColor = gm.c;
      ctx.shadowBlur = gm.d ? 16 : 8;
      ctx.fillStyle = gm.c;
      ctx.beginPath();
      ctx.arc(gm.x, gm.y, gm.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.6 + Math.sin(gameTime * 6 + gm.x) * 0.3;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(gm.x - gm.r * 0.3, gm.y - gm.r * 0.3, gm.r * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // пульсирующая аура вокруг кристалла
      var gAur = 0.08 + 0.05 * Math.sin(gameTime * 5 + gm.x * 0.7);
      ctx.globalAlpha = gAur;
      ctx.fillStyle = gm.c;
      ctx.beginPath();
      ctx.arc(gm.x, gm.y, gm.r * (2.2 + Math.sin(gameTime * 3 + gm.y) * 0.4), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // mines
    for (var mj = 0; mj < magnet.length; mj++) {
      var mn = magnet[mj];
      var blink = mn.armed <= 0 || (mn.armed > 0 && Math.sin(gameTime * 10) > 0);
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = blink ? '#f80' : '#d40';
      ctx.beginPath();
      ctx.arc(mn.x, mn.y, mn.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(mn.x, mn.y, mn.r * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // projectiles
    for (var pj = 0; pj < projectiles.length; pj++) {
      var pt2 = projectiles[pj];
      ctx.save();
      if (pt2.laser) {
        var lv = Math.sqrt(pt2.vx * pt2.vx + pt2.vy * pt2.vy) || 1;
        var lx = pt2.vx / lv, ly = pt2.vy / lv;
        ctx.strokeStyle = pt2.c || '#af0';
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = pt2.r * 3.4;
        ctx.beginPath();
        ctx.moveTo(pt2.x - lx * 14, pt2.y - ly * 14);
        ctx.lineTo(pt2.x + lx * 18, pt2.y + ly * 18);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = pt2.r;
        ctx.beginPath();
        ctx.moveTo(pt2.x - lx * 8, pt2.y - ly * 8);
        ctx.lineTo(pt2.x + lx * 20, pt2.y + ly * 20);
        ctx.stroke();
      } else {
        ctx.shadowColor = pt2.c;
        ctx.shadowBlur = 10;
        ctx.fillStyle = pt2.c;
        ctx.beginPath();
        ctx.arc(pt2.x, pt2.y, pt2.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(pt2.x, pt2.y, pt2.r * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // enemies
    for (var ej = 0; ej < enemies.length; ej++) {
      var en2 = enemies[ej];
      var dx2 = Math.abs(en2.x - camX), dy2 = Math.abs(en2.y - camY);
      if (dx2 > W / 2 + 100 || dy2 > H / 2 + 100) continue;
      var fl = en2.hitFlash > 0 ? 1 : 0;
      var froz = en2.slowT > 0;
      ctx.save();
      if (fl) ctx.globalAlpha = 1;
      // body
      ctx.fillStyle = fl ? '#fff' : (froz ? '#9ff' : en2.color);
      if (!fl) { ctx.shadowColor = froz ? '#8ef' : en2.color; ctx.shadowBlur = en2.boss ? 22 : 10; }
      ctx.beginPath();
      ctx.arc(en2.x, en2.y, en2.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      if (froz) {
        ctx.shadowColor = '#8ef'; ctx.shadowBlur = 14;
        ctx.strokeStyle = 'rgba(160,230,255,0.9)'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(en2.x, en2.y, en2.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.beginPath();
      ctx.arc(en2.x, en2.y, en2.r * 0.55, 0, Math.PI * 2);
      ctx.fill();
      // spikes for boss
      if (en2.boss) {
        ctx.strokeStyle = en2.color; ctx.lineWidth = 4;
        for (var sp = 0; sp < 8; sp++) {
          var sa = sp * Math.PI / 4 + gameTime * 0.5;
          ctx.beginPath();
          ctx.moveTo(en2.x + Math.cos(sa) * en2.r * 0.8, en2.y + Math.sin(sa) * en2.r * 0.8);
          ctx.lineTo(en2.x + Math.cos(sa) * en2.r * 1.5, en2.y + Math.sin(sa) * en2.r * 1.5);
          ctx.stroke();
        }
      }
      // повелитель: аура, корона, большой HP-бар
      if (en2.overlord) {
        var ol = en2;
        var aura = ctx.createRadialGradient(ol.x, ol.y, ol.r * 0.4, ol.x, ol.y, ol.r * 2.2);
        aura.addColorStop(0, 'rgba(255,0,255,0.4)');
        aura.addColorStop(0.6, 'rgba(255,0,255,0.1)');
        aura.addColorStop(1, 'rgba(255,0,255,0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(ol.x, ol.y, ol.r * 2.2, 0, Math.PI * 2);
        ctx.fill();
        // пульсирующие кольца
        ctx.strokeStyle = 'rgba(255,0,255,0.5)';
        ctx.lineWidth = 3;
        for (var oc = 0; oc < 3; oc++) {
          var orr = ol.r * (1.3 + ((gameTime * 0.5 + oc * 0.33) % 1) * 0.9);
          ctx.globalAlpha = 0.5 * (1 - ((gameTime * 0.5 + oc * 0.33) % 1));
          ctx.beginPath();
          ctx.arc(ol.x, ol.y, orr, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        // шипы-кольца
        ctx.strokeStyle = '#f0f'; ctx.lineWidth = 6;
        for (var sp2 = 0; sp2 < 16; sp2++) {
          var sa2 = sp2 * Math.PI / 8 + gameTime * 0.3;
          ctx.beginPath();
          ctx.moveTo(ol.x + Math.cos(sa2) * ol.r * 0.95, ol.y + Math.sin(sa2) * ol.r * 0.95);
          ctx.lineTo(ol.x + Math.cos(sa2) * ol.r * 1.45, ol.y + Math.sin(sa2) * ol.r * 1.45);
          ctx.stroke();
        }
        // корона
        ctx.fillStyle = '#ff0';
        ctx.beginPath();
        ctx.moveTo(ol.x - ol.r * 0.4, ol.y - ol.r * 0.8);
        ctx.lineTo(ol.x - ol.r * 0.3, ol.y - ol.r * 1.3);
        ctx.lineTo(ol.x - ol.r * 0.1, ol.y - ol.r * 0.95);
        ctx.lineTo(ol.x, ol.y - ol.r * 1.45);
        ctx.lineTo(ol.x + ol.r * 0.1, ol.y - ol.r * 0.95);
        ctx.lineTo(ol.x + ol.r * 0.3, ol.y - ol.r * 1.3);
        ctx.lineTo(ol.x + ol.r * 0.4, ol.y - ol.r * 0.8);
        ctx.closePath();
        ctx.fill();
        // щит
        if (ol.shieldUp) {
          ctx.strokeStyle = 'rgba(150,220,255,0.9)';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(ol.x, ol.y, ol.r * 1.35 + Math.sin(gameTime * 10) * 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(150,220,255,0.08)';
          ctx.beginPath();
          ctx.arc(ol.x, ol.y, ol.r * 1.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // THANOS: уникальный визуал поверх повелителя
      if (en2.final) {
        var th = en2;
        // страшная аура
        var thAura = ctx.createRadialGradient(th.x, th.y, th.r * 0.3, th.x, th.y, th.r * 3);
        thAura.addColorStop(0, 'rgba(255,50,0,0.5)');
        thAura.addColorStop(0.4, 'rgba(255,50,0,0.15)');
        thAura.addColorStop(1, 'rgba(255,50,0,0)');
        ctx.fillStyle = thAura;
        ctx.beginPath();
        ctx.arc(th.x, th.y, th.r * 3, 0, Math.PI * 2);
        ctx.fill();
        // 6 камней бесконечности вращаются
        var stoneCols = ['#f44', '#4af', '#ff0', '#0f0', '#f4f', '#fff'];
        for (var si = 0; si < 6; si++) {
          var siAng = gameTime * 1.5 + si / 6 * Math.PI * 2;
          var siR = th.r * 1.8 + Math.sin(gameTime * 3 + si) * 10;
          var siX = th.x + Math.cos(siAng) * siR;
          var siY = th.y + Math.sin(siAng) * siR;
          ctx.shadowColor = stoneCols[si]; ctx.shadowBlur = 20;
          ctx.fillStyle = stoneCols[si];
          ctx.beginPath();
          ctx.arc(siX, siY, 12 + Math.sin(gameTime * 5 + si) * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        // зловещий глаз
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(th.x, th.y, th.r * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#e00';
        ctx.beginPath();
        ctx.arc(th.x, th.y, th.r * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(th.x, th.y, th.r * 0.08, 0, Math.PI * 2);
        ctx.fill();
      }
      // eye
      var eang = Math.atan2(player.y - en2.y, player.x - en2.x);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(en2.x + Math.cos(eang) * en2.r * 0.4, en2.y + Math.sin(eang) * en2.r * 0.4, en2.r * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(en2.x + Math.cos(eang) * en2.r * 0.4, en2.y + Math.sin(eang) * en2.r * 0.4, en2.r * 0.15, 0, Math.PI * 2);
      ctx.fill();
      // hp bar
      if (en2.hp < en2.maxHp) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(en2.x - en2.r, en2.y - en2.r - 8, en2.r * 2, 4);
        ctx.fillStyle = '#f44';
        ctx.fillRect(en2.x - en2.r, en2.y - en2.r - 8, en2.r * 2 * (en2.hp / en2.maxHp), 4);
      }
      ctx.restore();
    }

    // orbit weapons
    if (player) { for (var oi = 0; oi < player.orbitWeps.length; oi++) {
      var orb = player.orbitWeps[oi];
      var or = WEAPONS.orbit.radius * (1 + (getWeapon('orbit').lvl || 0) * 0.08) + Math.sin(gameTime * 6) * 4;
      ctx.save();
      ctx.strokeStyle = 'rgba(244,100,255,0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(player.x, player.y, or, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowColor = '#f4f'; ctx.shadowBlur = 15;
      ctx.fillStyle = '#f4f';
      // donut
      ctx.beginPath();
      ctx.arc(orb.hx, orb.hy, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(orb.hx, orb.hy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } }

    // player
    if (player) {
      var blink2 = player.iframes > 0 && Math.sin(gameTime * 30) > 0;
      var pAng = player.ang || 0;
      var skinColor = player.skinColor || SKINS.s1.color;
      // светящийся след (только когда двигаешься)
      if (player.trail && player.trail.length > 1) {
        ctx.save();
        for (var tri = 0; tri < player.trail.length; tri++) {
          var trP = player.trail[tri];
          var trF = (trP.t !== undefined ? trP.t / 0.5 : 1 - tri / player.trail.length);
          var trA = trF * 0.35;
          var trCol = player.trailColor || skinColor;
          ctx.globalAlpha = trA;
          ctx.fillStyle = trCol;
          ctx.shadowColor = trCol;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(trP.x, trP.y, 4 + trF * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.save();
      ctx.globalAlpha = blink2 ? 0.4 : 1;
      ctx.translate(player.x, player.y);
      ctx.rotate(pAng);

      // мягкое неоновое кольцо-аура вокруг корабля
      var aur2 = ctx.createRadialGradient(0, 0, 8, 0, 0, 42);
      aur2.addColorStop(0, 'rgba(255,255,255,0)');
      aur2.addColorStop(0.75, 'rgba(120,200,255,0.12)');
      aur2.addColorStop(1, 'rgba(120,200,255,0)');
      ctx.fillStyle = aur2;
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(150,210,255,' + (0.12 + 0.05 * Math.sin(gameTime * 3 + player.x)) + ')';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, 30 + Math.sin(gameTime * 4) * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // неоновый ореол «Космического Рыцаря»
      if (player.selectedSkin === 's10') {
        var haloR = 30 + Math.sin(gameTime * 4) * 3;
        var hg = ctx.createRadialGradient(0, 0, 14, 0, 0, haloR);
        hg.addColorStop(0, 'rgba(70,140,255,0.35)');
        hg.addColorStop(1, 'rgba(70,140,255,0)');
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(0, 0, haloR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(120,170,255,0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, haloR * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.shadowColor = skinColor;
      ctx.shadowBlur = 15;
      if (player.victory) ctx.scale(2.8, 2.8);
      ctx.shadowColor = '#4af'; ctx.shadowBlur = 20;
      // ship
      if (player.skinModel === 'jet') {
        // ИСТРЕБИТЕЛЬ-КРАВЛИК: стреловидные крылья, канарды, двойной хвост, пульсирующий реактор
        var mt = gameTime * 2.4;
        var sweep = Math.sin(mt) * 3.5;             // крылья машут
        var flex = 1 + Math.sin(mt * 1.3) * 0.1;    // фюзеляж дышит
        var pulse = 0.5 + Math.sin(mt * 3) * 0.5;   // реактор
        ctx.shadowColor = skinColor; ctx.shadowBlur = 18;
        // корпус
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(20 * flex, 0);
        ctx.lineTo(4, 5);
        ctx.lineTo(4, 12 * flex);
        ctx.lineTo(-4, 8);
        ctx.lineTo(-8 * flex, 12 + sweep);
        ctx.lineTo(-14 - sweep, 7);
        ctx.lineTo(-18 - sweep * 1.5, 4);
        ctx.lineTo(-18 - sweep * 1.5, -4);
        ctx.lineTo(-14 - sweep, -7);
        ctx.lineTo(-8 * flex, -12 - sweep);
        ctx.lineTo(-4, -8);
        ctx.lineTo(4, -12 * flex);
        ctx.lineTo(4, -5);
        ctx.closePath();
        ctx.fill();
        // канарды (передние крылья)
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(6, 3);
        ctx.lineTo(-4, 6 + sweep * 0.5);
        ctx.lineTo(-6, 2);
        ctx.closePath();
        ctx.moveTo(6, -3);
        ctx.lineTo(-4, -6 - sweep * 0.5);
        ctx.lineTo(-6, -2);
        ctx.closePath();
        ctx.fill();
        // двойной хвост
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(-12, 2);
        ctx.lineTo(-22 - sweep, 6);
        ctx.lineTo(-19 - sweep, 0);
        ctx.closePath();
        ctx.moveTo(-12, -2);
        ctx.lineTo(-22 - sweep, -6);
        ctx.lineTo(-19 - sweep, 0);
        ctx.closePath();
        ctx.fill();
        // кабина
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(14 * flex, 0);
        ctx.lineTo(-2, 3);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-2, -3);
        ctx.closePath();
        ctx.fill();
        // пульсирующий реактор в корме
        ctx.fillStyle = 'rgba(150,240,255,' + (0.5 + pulse * 0.4) + ')';
        ctx.beginPath();
        ctx.arc(-13 - sweep, 0, 3 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.moveTo(18, 0);
        ctx.lineTo(-10, 11);
        ctx.lineTo(-6, 0);
        ctx.lineTo(-10, -11);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-2, 4);
        ctx.lineTo(0, 0);
        ctx.lineTo(-2, -4);
        ctx.closePath();
        ctx.fill();
      }
      // engine flame
      if (player.vx !== undefined && (player.vx !== 0 || player.vy !== 0)) {
        ctx.fillStyle = '#f80';
        ctx.beginPath();
        ctx.moveTo(-8, 3);
        ctx.lineTo(-14 - Math.random() * 8, 0);
        ctx.lineTo(-8, -3);
        ctx.closePath();
        ctx.fill();
        if (player.skinModel === 'jet') {
          ctx.fillStyle = '#fd0';
          ctx.beginPath();
          ctx.moveTo(-18, 4);
          ctx.lineTo(-26 - Math.random() * 10, 0);
          ctx.lineTo(-18, -4);
          ctx.closePath();
          ctx.fill();
        }
      }
      // сияние двигателя даже на месте (пульсирует) — для всех моделей
      ctx.shadowColor = (player.trailColor || '#f80');
      ctx.shadowBlur = 12 + Math.sin(gameTime * 6) * 4;
      ctx.fillStyle = (player.trailColor || 'rgba(255,140,0,0.5)');
      ctx.beginPath();
      ctx.arc(-10, 0, 4 + Math.sin(gameTime * 9) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // shield
      if (player.shield > 0 || player.freezeCd > 0 || freezeTimer > 0) {
        ctx.strokeStyle = 'rgba(70,220,255,0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 26 + Math.sin(gameTime * 8) * 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(70,220,255,0.06)';
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    //胜利：гигантский истребитель с короной
    if (player && player.victory) {
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.shadowColor = '#ff0';
      ctx.shadowBlur = 40;
      // огромная аура-сияние
      var vAura = ctx.createRadialGradient(0, 0, 30, 0, 0, 180);
      vAura.addColorStop(0, 'rgba(255,215,0,0.4)');
      vAura.addColorStop(0.5, 'rgba(255,215,0,0.1)');
      vAura.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.fillStyle = vAura;
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.fill();
      // корона
      ctx.fillStyle = '#ff0';
      ctx.beginPath();
      ctx.moveTo(-40, -55);
      ctx.lineTo(-30, -85);
      ctx.lineTo(-15, -65);
      ctx.lineTo(0, -95);
      ctx.lineTo(15, -65);
      ctx.lineTo(30, -85);
      ctx.lineTo(40, -55);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      // драгоценности на короне
      ctx.fillStyle = '#f44';
      ctx.beginPath(); ctx.arc(0, -70, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#4af';
      ctx.beginPath(); ctx.arc(-25, -60, 3, 0, Math.PI * 2); ctx.arc(25, -60, 3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // GIANT HELPER
    if (helper) {
      var h = helper;
      var bobb = Math.sin(gameTime * 1.5) * 6;
      ctx.save();
      ctx.translate(h.x, h.y + bobb);
      ctx.shadowColor = '#0ff'; ctx.shadowBlur = 30;
      // щит-купол
      ctx.strokeStyle = 'rgba(0,255,255,0.35)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, h.r * 1.45 + Math.sin(gameTime * 4) * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0,255,255,0.15)';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(0, 0, h.r * 1.55, 0, Math.PI * 2);
      ctx.stroke();
      // корпус — огромный боевой робот
      ctx.fillStyle = '#0b2430';
      ctx.strokeStyle = '#0ff';
      ctx.lineWidth = 3;
      // ноги
      ctx.beginPath();
      ctx.moveTo(-h.r * 0.5, h.r * 0.75);
      ctx.lineTo(-h.r * 0.9, h.r * 1.1);
      ctx.lineTo(-h.r * 0.3, h.r * 1.1);
      ctx.lineTo(0, h.r * 0.75);
      ctx.moveTo(h.r * 0.5, h.r * 0.75);
      ctx.lineTo(h.r * 0.9, h.r * 1.1);
      ctx.lineTo(h.r * 0.3, h.r * 1.1);
      ctx.lineTo(0, h.r * 0.75);
      ctx.stroke();
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = '#0e3140';
      ctx.moveTo(0, -h.r);
      ctx.lineTo(-h.r * 0.75, h.r * 0.35);
      ctx.lineTo(-h.r * 0.4, h.r * 0.75);
      ctx.lineTo(h.r * 0.4, h.r * 0.75);
      ctx.lineTo(h.r * 0.75, h.r * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // голова-кабина
      ctx.fillStyle = '#8ff';
      ctx.beginPath();
      ctx.arc(0, -h.r * 0.5, h.r * 0.26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0ff';
      ctx.beginPath();
      ctx.arc(0, -h.r * 0.5, h.r * 0.12, 0, Math.PI * 2);
      ctx.fill();
      // пульсар-реактор в груди
      var hpPulse = 0.5 + Math.sin(gameTime * 6) * 0.5;
      ctx.fillStyle = h.hp < h.maxHp * 0.5 ? '#f40' : '#0ff';
      ctx.beginPath();
      ctx.arc(0, h.r * 0.1, h.r * 0.16 * (0.6 + hpPulse * 0.4), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(0, h.r * 0.1, h.r * 0.07, 0, Math.PI * 2);
      ctx.fill();
      // плечевые пушки
      ctx.fillStyle = '#0b2430';
      ctx.strokeStyle = '#0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(-h.r * 0.72, h.r * 0.1, h.r * 0.22, 0, Math.PI * 2);
      ctx.arc(h.r * 0.72, h.r * 0.1, h.r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#0ff';
      ctx.beginPath();
      ctx.arc(-h.r * 0.72 + Math.sin(gameTime * 8) * 2, h.r * 0.1, h.r * 0.09, 0, Math.PI * 2);
      ctx.arc(h.r * 0.72 + Math.sin(gameTime * 8 + Math.PI) * 2, h.r * 0.1, h.r * 0.09, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // HP-бар
      var hw = 150;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(h.x - hw / 2, h.y - h.r * 1.75, hw, 10);
      ctx.fillStyle = '#0ff';
      ctx.fillRect(h.x - hw / 2, h.y - h.r * 1.75, hw * clamp(h.hp / h.maxHp, 0, 1), 10);
    }

    // particles
    for (var pti = 0; pti < parts.length; pti++) {
      var pa = parts[pti];
      ctx.save();
      ctx.globalAlpha = clamp(pa.life / pa.maxLife, 0, 1);
      ctx.fillStyle = pa.c;
      ctx.beginPath();
      ctx.arc(pa.x, pa.y, pa.r * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // fx
    for (var fxi = 0; fxi < fx.length; fxi++) {
      var ef = fx[fxi];
      ctx.save();
      var pr = clamp(ef.life / ef.maxLife, 0, 1);
      ctx.globalAlpha = pr;
      if (ef.type === 'ring' || ef.type === 'boom') {
        if (ef.type === 'boom') {
          var r = ef.r * (1 - pr);
          var grd = ctx.createRadialGradient(ef.x, ef.y, r * 0.3, ef.x, ef.y, r);
          grd.addColorStop(0, 'rgba(255,255,255,0)');
          grd.addColorStop(0.4, ef.c || 'rgba(255,255,0,0.5)');
          grd.addColorStop(1, 'rgba(255,255,0,0)');
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(ef.x, ef.y, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = ef.c;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(ef.x, ef.y, ef.r + (ef.maxR - ef.r) * (1 - pr), 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (ef.type === 'text') {
        ctx.fillStyle = ef.c;
        ctx.font = 'bold ' + (ef.r || 16) + 'px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(ef.txt, ef.x, ef.y - (1 - pr) * (ef.vy ? 8 : 40));
      } else if (ef.type === 'bolt') {
        // цепная молния: зигзагообразная линия между двумя точками
        ctx.strokeStyle = ef.c;
        ctx.lineWidth = 2.5 * pr;
        ctx.shadowColor = ef.c;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(ef.x, ef.y);
        var distX = ef.tx - ef.x, distY = ef.ty - ef.y;
        var segs = Math.max(4, Math.floor(Math.sqrt(distX * distX + distY * distY) / 18));
        for (var bi = 1; bi <= segs; bi++) {
          var bx = ef.x + distX * bi / segs + (Math.random() - 0.5) * 22;
          var by = ef.y + distY * bi / segs + (Math.random() - 0.5) * 22;
          ctx.lineTo(bx, by);
        }
        ctx.lineTo(ef.tx, ef.ty);
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (ef.type === 'mist') {
        // вспышка выстрела
        var mr = ef.r + (1 - pr) * 14;
        ctx.fillStyle = ef.c;
        ctx.shadowColor = ef.c;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(ef.x + ef.vx * (1 - pr), ef.y + ef.vy * (1 - pr), mr, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    }

    ctx.restore();

    // vignette
    var vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    // screen-space edge warning (после vignette — ярко и всегда видно при подходе к краю)
    if (player && (state === 'playing' || state === 'reviving')) {
      var leftD = Math.max(0, (W / 2 - camX)) / 300;
      var rightD = Math.max(0, (camX + W / 2) - WORLD_W) / 300;
      var topD = Math.max(0, (H / 2 - camY)) / 300;
      var bottomD = Math.max(0, (camY + H / 2) - WORLD_H) / 300;
      if (leftD > 0 || rightD > 0 || topD > 0 || bottomD > 0) {
        ctx.save();
        var edgeIntensity = Math.min(1, Math.max(leftD, rightD, topD, bottomD));
        ctx.globalAlpha = edgeIntensity * 0.7;
        var eGrad;
        if (leftD > 0) {
          eGrad = ctx.createLinearGradient(0, 0, 160, 0);
          eGrad.addColorStop(0, 'rgba(120,210,255,0.85)');
          eGrad.addColorStop(1, 'rgba(120,210,255,0)');
          ctx.fillStyle = eGrad;
          ctx.fillRect(0, 0, 160, H);
        }
        if (rightD > 0) {
          eGrad = ctx.createLinearGradient(W - 160, 0, W, 0);
          eGrad.addColorStop(0, 'rgba(120,210,255,0)');
          eGrad.addColorStop(1, 'rgba(120,210,255,0.85)');
          ctx.fillStyle = eGrad;
          ctx.fillRect(W - 160, 0, 160, H);
        }
        if (topD > 0) {
          eGrad = ctx.createLinearGradient(0, 0, 0, 160);
          eGrad.addColorStop(0, 'rgba(120,210,255,0.85)');
          eGrad.addColorStop(1, 'rgba(120,210,255,0)');
          ctx.fillStyle = eGrad;
          ctx.fillRect(0, 0, W, 160);
        }
        if (bottomD > 0) {
          eGrad = ctx.createLinearGradient(0, H - 160, 0, H);
          eGrad.addColorStop(0, 'rgba(120,210,255,0)');
          eGrad.addColorStop(1, 'rgba(120,210,255,0.85)');
          ctx.fillStyle = eGrad;
          ctx.fillRect(0, H - 160, W, 160);
        }
        ctx.restore();
      }
    }

    // freeze overlay
    if (freezeTimer > 0) {
      ctx.fillStyle = 'rgba(70,190,255,' + (0.06 + Math.sin(gameTime * 8) * 0.03) + ')';
      ctx.fillRect(0, 0, W, H);
    }
    // вспышка комбо: золотая рамка по краям экрана
    if (comboFlash > 0) {
      var cf = comboFlash;
      var cg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.75);
      cg.addColorStop(0, 'rgba(255,215,0,0)');
      cg.addColorStop(1, 'rgba(255,200,40,' + (cf * 0.35) + ')');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(255,215,0,' + (cf * 0.5) + ')';
      ctx.lineWidth = 3 + cf * 4;
      ctx.strokeRect(4, 4, W - 8, H - 8);
    }
    if (player && player.iframes > 0 && state === 'playing') {
      ctx.fillStyle = 'rgba(255,50,50,0.06)';
      ctx.fillRect(0, 0, W, H);
    }

    // экранный HP-бар повелителя
    for (var ovi = 0; ovi < enemies.length; ovi++) {
      if (!enemies[ovi].overlord) continue;
      var ov = enemies[ovi];
      var bx2 = W / 2, by2 = 46, bw2 = Math.min(W * 0.6, 520);
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.fillRect(bx2 - bw2 / 2 - 4, by2 - 26, bw2 + 8, 30);
      ctx.strokeStyle = '#f0f';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx2 - bw2 / 2 - 4, by2 - 26, bw2 + 8, 30);
      ctx.fillStyle = '#500';
      ctx.fillRect(bx2 - bw2 / 2, by2 - 22, bw2, 22);
      ctx.fillStyle = '#f0f';
      ctx.fillRect(bx2 - bw2 / 2, by2 - 22, bw2 * clamp(ov.hp / ov.maxHp, 0, 1), 22);
      if (ov.shieldUp) {
        ctx.fillStyle = 'rgba(150,220,255,0.7)';
        ctx.fillRect(bx2 - bw2 / 2, by2 - 6, bw2 * clamp(ov.shield / 20000, 0, 1), 6);
      }
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      var ovLabel = ov.final ? '★ THANOS' : '☠ OVERLORD';
      var ovHpText = Math.max(0, Math.round(ov.hp));
      if (ovHpText >= 1e12) ovHpText = (ovHpText / 1e12).toFixed(1).replace(/\.0$/, '') + 'T';
      else if (ovHpText >= 1e9) ovHpText = (ovHpText / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
      else if (ovHpText >= 1e6) ovHpText = (ovHpText / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
      ctx.fillText(ovLabel + ' ' + (ov.shieldUp ? '⚔ SHIELD' : '♥ ' + ovHpText), bx2, by2 - 32);
      ctx.textAlign = 'left';
      break;
    }
  }

  /* ============ INIT ============ */
  initSDK(function () {
    showMenu();
  });

  window.addEventListener('beforeunload', function () {
    if (SDK.inited && SDK.ysdk && SDK.ysdk.adv && SDK.ysdk.adv.hideBannerAdv) {
      try { SDK.ysdk.adv.hideBannerAdv(); } catch (e) {}
    }
  });

})();