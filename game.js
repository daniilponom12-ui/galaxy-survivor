(function () {
  'use strict';

  var canvas = document.getElementById('gc');
  var ctx = canvas.getContext('2d');
  var overlay = document.getElementById('ui-overlay');

  var WORLD_W = 2400, WORLD_H = 2400;
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
      u_leech: 'Вампиризм', u_leech_d: 'Убийство восстанавливает 3 HP',
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
      am_a1: 'Бластер', am_a1_d: 'Уверенный средний урон', am_a2: 'Лазер', am_a2_d: 'Пронзает врагов насквозь',
      am_a3: 'Дробовик', am_a3_d: 'Веер из осколков', am_a4: 'Ракеты', am_a4_d: 'Взрываются при попадании',
      am_a5: 'Плазма', am_a5_d: 'Быстрая и мощная',
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
      u_leech: 'Life steal', u_leech_d: 'Killing an enemy restores 3 HP',
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
      am_a1: 'Blaster', am_a1_d: 'Steady medium damage', am_a2: 'Laser', am_a2_d: 'Pierces through enemies',
      am_a3: 'Shotgun', am_a3_d: 'Fan of shards', am_a4: 'Rockets', am_a4_d: 'Explode on hit',
      am_a5: 'Plasma', am_a5_d: 'Fast and powerful',
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
  var keys = {};
  var mouse = { x: W/2, y: H/2, down: false };
  var touchId = null;
  var lastTime = performance.now();
  var animFrame = requestAnimationFrame(loop);

  var player = null;
  var enemies = [], projectiles = [], gems = [], parts = [], fx = [], orbHit = [], magnet = [];
  var waves = [], spawnTimer = 0;
  var gameTime = 0, waveNum = 0, score = 0, kills = 0;
  var combo = 0, comboTimer = 0, maxCombo = 0;
  var bestScore = 0;
  try { bestScore = +(localStorage.getItem('gs_best') || 0); } catch (e) {}
  var freezeTimer = 0;
  var camX = 0, camY = 0;
  var shake = 0;

  var asteroids = [];
  for (var i = 0; i < 60; i++) {
    asteroids.push({ x: Math.random() * WORLD_W, y: Math.random() * WORLD_H, r: 12 + Math.random() * 40, h: Math.random() * Math.PI * 2 });
  }

  function makePlayer() {
    var skin = SKINS[progress.selectedSkin] || SKINS.s1;
    var upg = progress.upg || {};
    return {
      x: WORLD_W / 2, y: WORLD_H / 2, r: 18, speed: 190 * (1 + 0.06 * (upg.speed || 0)), hp: 100 + 15 * (upg.hp || 0), maxHp: 100 + 15 * (upg.hp || 0),
      xp: 0, xpNeed: 30, lvl: 1, iframes: 0,
      skinColor: skin.color, ang: 0, aimAng: 0, speedBoost: 0, dmgBoost: 0,
      upDmg: 1 + 0.1 * (upg.dmg || 0), pickupR: 60 * (1 + 0.2 * (upg.magnet || 0)),
      upRateMul: Math.pow(0.92, upg.rate || 0), shield: upg.shield || 0, critChance: 0.08 * (upg.crit || 0), xpMul: 1 + 0.1 * (upg.xp || 0),
      weapons: [{ id: 'auto', lvl: 1 }],
      orbitWeps: [], aoeWeps: [], specials: []
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
    { id: 'life', name: '+1 жизнь', desc: 'Одно воскрешение за бой', icon: '❤' },
    { id: 'leech', name: 'Вампиризм', desc: 'Убийство врага восстанавливает 3 HP', icon: '🩸' }
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
    else if (id === 'leech') { p.leech = true; }
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
    s7: { name: 'Некрон', color: '#f26', price: 5, gcost: 480, desc: 'Повелитель самоцветов', icon: 'ꙮ' }
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
    a5: { name: 'Плазма', desc: 'Быстрая и мощная', price: 4, gcost: 360, dmgMult: 1.9, rate: 0.45, speed: 720, color: '#0ff', count: 1, spread: 8, r: 6 }
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
    var BOOST = { dmg: t('boostDmg'), hp: t('boostHp'), speed: t('boostSpeed') };
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
    boss_colossus: { r: 120, hp: 7500, speed: 26, dmg: 85, xp: 600, color: '#d80', score: 2000, boss: true, minSpeed: true, shoot: true }
  };

  function spawnEnemy(type) {
    var t = ENEMY_TYPES[type];
    var ang = Math.random() * Math.PI * 2;
    var dist = Math.max(W, H) / 1.4 + 120;
    var hpScale = t.boss ? (1 + (waveNum - 1) * 0.35) : (1 + (waveNum - 1) * 0.09);
    var e = {
      type: type, r: t.r, hp: t.hp * hpScale, maxHp: t.hp * hpScale,
      speed: (t.minSpeed ? Math.max(6, t.speed - waveNum) : t.speed) * (1 + waveNum * 0.02),
      dmg: Math.round(t.dmg * (1 + waveNum * 0.04)), xp: t.xp, color: t.color, score: t.score, x: 0, y: 0,
      hitFlash: 0, shootTimer: Math.random() * 2, splits: t.splits, boss: t.boss, shoot: t.shoot
    };
    e.x = player.x + Math.cos(ang) * dist;
    e.y = player.y + Math.sin(ang) * dist;
    enemies.push(e);
  }

  function spawnAround(pos, type) {
    var t = ENEMY_TYPES[type];
    var e = { type: type, r: t.r, hp: t.hp / 2, maxHp: t.hp / 2, speed: t.speed, dmg: t.dmg / 2, xp: t.xp, color: t.color, score: t.score, x: pos.x, y: pos.y, hitFlash: 0, splitDone: true, shootTimer: Math.random() * 2 };
    enemies.push(e);
  }

  /* ============ WAVES ============ */
  function pickBossPool(w) {
    if (w >= 30 && w % 10 === 0) return ['boss_colossus', 'boss_dread', 'boss_titan'];
    if (w >= 20 && w % 10 === 0) return ['boss_dread', 'boss_dread'];
    if (w >= 15 && w % 5 === 0) return ['boss_dread', 'boss_titan', 'boss_gunner'];
    if (w >= 10 && w % 5 === 0) return ['boss_titan', 'boss_gunner', 'boss'];
    return ['boss', 'boss_gunner'];
  }
  function spawnWave() {
    waveNum++;
    announceWave();
    var bossPool = pickBossPool(waveNum);
    var liveBoss = 0;
    for (var lb = 0; lb < enemies.length; lb++) { if (enemies[lb].boss) liveBoss++; }
    var bossCount = 1;
    if (waveNum >= 8) bossCount = 2;
    if (waveNum >= 15) bossCount = 3;
    if (waveNum >= 24) bossCount = 4;
    if (bossCount > 4) bossCount = 4;
    var maxLive = 3 + Math.floor(waveNum / 8);
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
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, sp = 60 + Math.random() * 200;
      parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.4 + Math.random() * 0.5, maxLife: 0.9, r: 2 + Math.random() * 3, c: color });
    }
    fx.push({ type: 'ring', x: x, y: y, r: 4, maxR: 30 + Math.random() * 20, life: 0.4, c: color });
  }

  function textFx(x, y, txt, color) {
    fx.push({ type: 'text', x: x, y: y, txt: txt, life: 0.7, c: color });
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
        var p = { x: player.x, y: player.y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, dmg: WEAPONS.auto.dmg * (ammo.dmgMult || 1) * (player.upDmg || 1) * (critType ? 2 : 1) * (1 + 0.5 * (player.dmgBoost || 0)), r: ammo.r || 5, c: critType ? '#fff' : ammo.color, life: 1.6, splash: hasSplash, pierce: !!ammo.pierce || !!player.pierceAll, pierceHits: (ammo.pierce || player.pierceAll) ? 6 : 0, rocket: !!ammo.rocket };
        projectiles.push(p);
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
    e.hp -= dmg;
    e.hitFlash = 0.1;
    boom(e.x, e.y, '#fff', 3);
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
    }
    if (player && player.leech && player.hp < player.maxHp) { player.hp = Math.min(player.maxHp, player.hp + 3); }
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
    player.xp += v * (player.xpMul || 1);
    if (player.xp >= player.xpNeed) {
      player.xp -= player.xpNeed;
      player.lvl++;
      player.xpNeed = Math.round(player.xpNeed * 1.28 + 10);
      showLevelUp();
      if (player.lvl % 5 === 0) spawnWave();
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
    keys[e.code] = true;
    if (e.code === 'KeyP' || e.code === 'Escape') { togglePause(); }
    if (e.code === 'Space' && state === 'playing') {
      if (player.freezeUnlocked) { doFreeze(); }
    }
    e.preventDefault();
  });
  document.addEventListener('keyup', function (e) { keys[e.code] = false; });

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
    waves = []; gameTime = 0; waveNum = 0; spawnTimer = 0; kills = 0; score = 0; freezeTimer = 0; shake = 0;
    combo = 0; comboTimer = 0;
    autoTimers = {}; hasSplash = false; hasFreezeFreeze = false;

    // apply boosters (потратить 1 за матч)
    if (progress.boosters.dmg > 0) { progress.boosters.dmg--; player.skinColor = player.skinColor; WEAPONS.auto.dmg = 12; player.dmgBoost = true; }
    if (progress.boosters.hp > 0) { progress.boosters.hp--; player.maxHp = 150; player.hp = 150; }
    if (progress.boosters.speed > 0) { progress.boosters.speed--; player.speed = 235; }

    document.querySelectorAll('.menu-screen,.gameover-screen').forEach(function (el) { el.remove(); });
    addHUD();
    spawnWave();
  }

  function endGame() {
    state = 'gameover';
    stopMusic();
    var isBest = score > bestScore;
    if (isBest) { bestScore = score; try { localStorage.setItem('gs_best', bestScore); } catch (e) {} }
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
      '<button class="btn-revive" onclick="window.__revive()" style="padding:14px 48px;font-size:20px;border:none;border-radius:12px;cursor:pointer;margin:8px;font-weight:700;background:linear-gradient(135deg,#fa2,#f80);color:#fff">' + t('reviveBtn') + '</button>' +
      '<button class="btn-leaderboard" onclick="window.__lb()">' + t('lbBtn') + '</button>' +
      '<button class="btn-shop" onclick="window.__menu()">' + t('menuBtn') + '</button>';
    document.body.appendChild(scr);
    window.__restart = function () { if (SDK.inited) SDK.showInterstitial(function(){}); startGame(); };
    window.__revive = function () {
      scr.remove();
      state = 'reviving';
      if (SDK.inited) {
        SDK.showRewarded(function (ok) {
          state = 'playing';
          player.hp = player.maxHp * 0.6;
          enemies.forEach(function (e) { e.hp = Math.max(e.hp / 3, 1); });
          player.iframes = 2.5;
          fx.push({ type: 'boom', x: player.x, y: player.y, r: 200, life: 1, maxLife: 1, c: '#0f0' });
          hud(t('reviveHp'), '#0f0');
        });
      } else {
        state = 'playing';
        player.hp = player.maxHp * 0.6; player.iframes = 2.5;
        hud(t('reviveHp'), '#0f0');
      }
    };
    window.__lb = function () { SDK.showLeaderboard(function () {}); };
    window.__menu = function () { quitToMenu(); };
  }

  function fmtTime(s) {
    var m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function showMenu() {
    document.querySelectorAll('.menu-screen,.gameover-screen,.levelup-screen').forEach(function (el) { el.remove(); });
    var scr = document.createElement('div');
    scr.className = 'menu-screen';
    scr.innerHTML = '<h1>🛸 GALAXY SURVIVOR</h1>' +
      '<div class="subtitle">' + t('subtitle') + '</div>' +
      '<div class="subtitle" style="color:#4af">' + t('recordLbl') + bestScore + '</div>' +
      '<button class="btn-play" onclick="window.__play()">' + t('play') + '</button>' +
      '<button class="btn-shop" onclick="window.__shop()">' + t('shop') + '</button>' +
      '<button class="btn-leaderboard" onclick="window.__lb2()">' + t('top') + '</button>' +
      '<div class="subtitle" style="font-size:13px;color:#666;margin-top:20px">' + t('controls') + '</div>';
    document.body.appendChild(scr);
    window.__play = function () { startGame(); };
    window.__test = function () {
      var bc = 0;
      for (var ti = 0; ti < enemies.length; ti++) { if (enemies[ti].boss) bc++; }
      return { enemies: enemies.length, waveNum: waveNum, bosses: bc, diamonds: progress.diamonds, upg: progress.upg, types: enemies.map(function (e) { return e.type; }).slice(0, 10) };
    };
    window.__test.forceWave = function () { spawnWave(); return window.__test(); };
    window.__test.bp = function (w) { return pickBossPool(w); };
    window.__test.types = function () { var s = {}; for (var i = 0; i < enemies.length; i++) { s[enemies[i].type] = (s[enemies[i].type] || 0) + 1; } return s; };
    window.__test.giveDiam = function (n) { progress.diamonds += n; saveProgress(); return progress.diamonds; };
    window.__test.giveXp = function (v) { gainXp(v); return window.__test(); };
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
  function loop(ts) {
    dt = Math.min((ts - lastTime) / 1000, 0.05);
    lastTime = ts;
    if (state === 'playing') { update(); updateHUD(); }
    render();
    animFrame = requestAnimationFrame(loop);
  }

  function hitPlayer(dmgv) {
    var p = player;
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

    // flag splash
    hasSplash = p.weapons.some(function (w) { return w === 'splash'; });

    // waves
    spawnTimer -= dt;
    if (spawnTimer <= 0 && enemies.length < 240) {
      var pool = waveEnemyPool();
      var n = Math.min(22 + Math.floor(waveNum * 2.5), 55);
      for (var i = 0; i < n; i++) {
        var t = pool[Math.floor(Math.random() * pool.length)];
        spawnEnemy(t);
      }
      spawnTimer = nextWaveTime();
    }
    // дополнительные мини-волны между основными (если на поле мало врагов)
    if (enemies.length < waveNum * 4 + 10 && enemies.length < 150 && spawnTimer > 1.2) {
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
    updateNovas();

    // projectiles
    for (var i = projectiles.length - 1; i >= 0; i--) {
      var pr = projectiles[i];
      pr.x += pr.vx * dt; pr.y += pr.vy * dt; pr.life -= dt;
      var dead = pr.life <= 0;
      for (var j = enemies.length - 1; j >= 0 && !dead; j--) {
        var e = enemies[j];
        if (dist(pr, e) < e.r + pr.r) {
          damageEnemy(j, pr.dmg);
          boom(pr.x, pr.y, pr.c || '#4af', pr.rocket ? 14 : 5);
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
      var spd = en.speed * (hasFreezeFreeze ? 0.3 : 1);
      var a2 = Math.atan2(p.y - en.y, p.x - en.x);
      en.x += Math.cos(a2) * spd * dt;
      en.y += Math.sin(a2) * spd * dt;
      if (en.shoot) {
        en.shootTimer -= dt;
        if (en.shootTimer <= 0) {
          en.shootTimer = 2.2;
          var aa = Math.atan2(p.y - en.y, p.x - en.x);
          projectiles.push({ x: en.x, y: en.y, vx: Math.cos(aa) * 300, vy: Math.sin(aa) * 300, dmg: en.dmg, r: 6, c: '#f4f', life: 2, enemy: true });
        }
      }
      if (dist(en, p) < en.r + p.r) {
        if (p.iframes <= 0) {
          if (hitPlayer(en.dmg)) return;
        }
      }
    }

    // enemy projectiles
    for (var ei = projectiles.length - 1; ei >= 0; ei--) {
      var ep = projectiles[ei];
      if (!ep.enemy) continue;
      if (dist(ep, p) < ep.r + p.r && p.iframes <= 0) {
        soundPop(false);
        projectiles.splice(ei, 1);
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
      if (f.life <= 0) fx.splice(fi, 1);
    }
  }

  /* ============ RENDER ============ */
  function render() {
    ctx.fillStyle = '#05070f';
    ctx.fillRect(0, 0, W, H);

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

    // grid
    ctx.strokeStyle = 'rgba(50,70,120,0.15)';
    ctx.lineWidth = 1;
    var gs = 100;
    var x0 = Math.floor((camX - W / 2) / gs) * gs;
    var y0 = Math.floor((camY - H / 2) / gs) * gs;
    ctx.beginPath();
    for (var x = x0; x < camX + W / 2 + gs; x += gs) { ctx.moveTo(x, y0); ctx.lineTo(x, camY + H / 2); }
    for (var y = y0; y < camY + H / 2 + gs; y += gs) { ctx.moveTo(x0, y); ctx.lineTo(camX + W / 2, y); }
    ctx.stroke();

    // world border
    ctx.strokeStyle = 'rgba(100,80,255,0.3)';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, WORLD_W, WORLD_H);

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

    // gems
    for (var gi = 0; gi < gems.length; gi++) {
      var gm = gems[gi];
      ctx.save();
      ctx.fillStyle = gm.c;
      ctx.beginPath();
      ctx.arc(gm.x, gm.y, gm.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.6 + Math.sin(gameTime * 6 + gm.x) * 0.3;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(gm.x - gm.r * 0.3, gm.y - gm.r * 0.3, gm.r * 0.35, 0, Math.PI * 2);
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
      ctx.fillStyle = pt2.c;
      ctx.beginPath();
      ctx.arc(pt2.x, pt2.y, pt2.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // enemies
    for (var ej = 0; ej < enemies.length; ej++) {
      var en2 = enemies[ej];
      var dx2 = Math.abs(en2.x - camX), dy2 = Math.abs(en2.y - camY);
      if (dx2 > W / 2 + 100 || dy2 > H / 2 + 100) continue;
      var fl = en2.hitFlash > 0 ? 1 : 0;
      ctx.save();
      if (fl) ctx.globalAlpha = 1;
      // body
      ctx.fillStyle = fl ? '#fff' : en2.color;
      ctx.beginPath();
      ctx.arc(en2.x, en2.y, en2.r, 0, Math.PI * 2);
      ctx.fill();
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
      ctx.save();
      ctx.globalAlpha = blink2 ? 0.4 : 1;
      ctx.translate(player.x, player.y);
      ctx.rotate(pAng);
      ctx.shadowColor = '#4af'; ctx.shadowBlur = 20;
      // ship
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
      // engine flame
      if (player.vx !== undefined && (player.vx !== 0 || player.vy !== 0)) {
        ctx.fillStyle = '#f80';
        ctx.beginPath();
        ctx.moveTo(-8, 3);
        ctx.lineTo(-14 - Math.random() * 8, 0);
        ctx.lineTo(-8, -3);
        ctx.closePath();
        ctx.fill();
      }
      // shield
      if (player.freezeCd > 0 || freezeTimer > 0) {
        ctx.strokeStyle = 'rgba(70,220,255,0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 26 + Math.sin(gameTime * 8) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // particles
    for (var pti = 0; pti < parts.length; pti++) {
      var pa = parts[pti];
      ctx.save();
      ctx.globalAlpha = clamp(pa.life / pa.maxLife, 0, 1);
      ctx.fillStyle = pa.c;
      ctx.beginPath();
      ctx.arc(pa.x, pa.y, pa.r, 0, Math.PI * 2);
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
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(ef.txt, ef.x, ef.y - (1 - pr) * 40);
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

    // freeze overlay
    if (freezeTimer > 0) {
      ctx.fillStyle = 'rgba(70,190,255,' + (0.06 + Math.sin(gameTime * 8) * 0.03) + ')';
      ctx.fillRect(0, 0, W, H);
    }
    if (player && player.iframes > 0 && state === 'playing') {
      ctx.fillStyle = 'rgba(255,50,50,0.06)';
      ctx.fillRect(0, 0, W, H);
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