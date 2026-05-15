/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * maria runner — engine canvas 1920×800
 * Pixel-art retro arcade. Maria (vert) saute par-dessus des objets de bureau
 * (Excel, Email, Post-its, Téléphone, Dossiers, Slack, Mail-big, Zip).
 * Boss « DASHBOARD.xlsx » à partir de score >= 1000.
 * Sons WebAudio synthétisés (pas de fichier MP3).
 */

export type RunnerCallbacks = {
  onScoreChange?: (score: number) => void
  onRecordChange?: (record: number) => void
  onBossWarn?: (visible: boolean) => void
  onBossToast?: (msg: string | null) => void
  onGameOver?: (data: { score: number; record: number; quip: string }) => void
  onStart?: () => void
}

export type RunnerOptions = {
  soundEnabled?: boolean
}

export type RunnerControls = {
  destroy: () => void
  restart: () => void
  setSound: (on: boolean) => void
  jump: () => void
}

/* ----------------------------------------------------------------------------
 * Palette pixel-art (clés ASCII → hex)
 * -------------------------------------------------------------------------- */
const PAL: Record<string, string> = {
  '.': 'transparent',
  '#': '#212121',   // contour foncé
  'k': '#0E0E0E',   // noir profond
  'w': '#FFFFFF',   // blanc
  'p': '#F4EFE7',   // paper
  's': '#E8E2D6',   // paper soft
  'b': '#999999',   // gris moyen
  'g': '#3FC163',   // vert success (maria)
  'G': '#2A9D4C',   // vert sombre
  'y': '#FEC23C',   // jaune accent
  'Y': '#E5A82A',   // jaune foncé
  'o': '#FF7A45',   // orange
  'r': '#E04646',   // rouge alerte
  'B': '#3B6BFA',   // bleu Excel-ish
  'c': '#4DB6AC',   // teal Slack
  'm': '#A66BFF',   // mauve
  'd': '#3D3D3D',   // gris bureau
  'l': '#D0CBC1',   // gris papier
  'e': '#FFD86B',   // post-it jaune clair
  'f': '#FFB3BA',   // post-it rose
}

/* ----------------------------------------------------------------------------
 * Sprites — strings (chaque ligne = une rangée de pixels)
 * -------------------------------------------------------------------------- */

// Maria — 14×22
const MARIA_RUN_A = [
  '....######....',
  '...#kkkkkk#...',
  '..#kwwwwwwk#..',
  '..#kwggggwk#..',
  '..#kwgggggk#..',
  '..#kwggggwk#..',
  '...#kkkkkk#...',
  '....######....',
  '...#gggggg#...',
  '..#ggggggGG#..',
  '.#ggggggggGG#.',
  '#gggggggggGG##',
  '#gggggggggGG#.',
  '.#ggggggggG#..',
  '..#gggggggG#..',
  '..#gg##gggG#..',
  '..#kk#..#gG#..',
  '..#kk#..#gG#..',
  '..#kk#..#gG#..',
  '..#kk#..####..',
  '..####........',
  '..............',
]

const MARIA_RUN_B = [
  '....######....',
  '...#kkkkkk#...',
  '..#kwwwwwwk#..',
  '..#kwggggwk#..',
  '..#kwgggggk#..',
  '..#kwggggwk#..',
  '...#kkkkkk#...',
  '....######....',
  '...#gggggg#...',
  '..#ggggggGG#..',
  '.#ggggggggGG#.',
  '#gggggggggGG##',
  '#gggggggggGG#.',
  '.#ggggggggG#..',
  '..#gggggggG#..',
  '..#g##ggggG#..',
  '..####..#gG#..',
  '..#kk#..#gG#..',
  '..#kk#..#gG#..',
  '..####..#gG#..',
  '........####..',
  '..............',
]

const MARIA_JUMP = [
  '....######....',
  '...#kkkkkk#...',
  '..#kwwwwwwk#..',
  '..#kwggggwk#..',
  '..#kwgggggk#..',
  '..#kwggggwk#..',
  '...#kkkkkk#...',
  '....######....',
  '...#gggggg#...',
  '..#ggggggGG#..',
  '.#ggggggggGG#.',
  '#gggggggggGG##',
  '#gggggggggGG#.',
  '.#ggggggggG#..',
  '..#gggggggG#..',
  '..#gg##gg##...',
  '..#gg#..####..',
  '..#kk#..#kk#..',
  '..#kk#..#kk#..',
  '..####..####..',
  '..............',
  '..............',
]

const MARIA_DEAD = [
  '..............',
  '..............',
  '..............',
  '....######....',
  '...#kkkkkk#...',
  '..#kwwwwwwk#..',
  '..#kwxxxxwk#..',
  '..#kwxxxxxk#..',
  '..#kwxxxxwk#..',
  '...#kkkkkk#...',
  '....######....',
  '...#gggggg#...',
  '..#ggggggGG#..',
  '.#ggggggggGG#.',
  '#gggggggggGG##',
  '#gggggggggGG#.',
  '.#ggggggggG#..',
  '..#gggggggG#..',
  '..#gg##gg##...',
  '..####..####..',
  '..............',
  '..............',
].map((row) => row.replace(/x/g, 'r'))

/* ----------------------------------------------------------------------------
 * Obstacles — sprite strings de tailles variées
 * -------------------------------------------------------------------------- */

// OB_EXCEL — fichier Excel 26×16
const OB_EXCEL = [
  '############..............',
  '#wwwwwwwwww##.............',
  '#wwwwwwwwww#G#............',
  '#wwwwwwwwww#GG############',
  '#wBwBwBwBww#GGGGGGGGGGGGGG',
  '#wwwwwwwwww#GGGGGGGGGGGGGG',
  '#wBwBwBwBww#GwwwwwwwwwwwG#',
  '#wwwwwwwwww#GwBwBwBwBwBwG#',
  '#wBwBwBwBww#GwwwwwwwwwwwG#',
  '#wwwwwwwwww#GwBwBwBwBwBwG#',
  '#wBwBwBwBww#GwwwwwwwwwwwG#',
  '#wwwwwwwwww#GwBwBwBwBwBwG#',
  '#wBwBwBwBww#GwwwwwwwwwwwG#',
  '#wwwwwwwwww#GGGGGGGGGGGGG#',
  '############GGGGGGGGGGGGG#',
  '............#############.',
]

// OB_EMAIL — enveloppe 22×14
const OB_EMAIL = [
  '######################',
  '#wwwwwwwwwwwwwwwwwwww#',
  '#w##wwwwwwwwwwwwww##w#',
  '#ww##wwwwwwwwwww##www#',
  '#www##wwwwwwwww##wwww#',
  '#wwww##wwwwwww##wwwww#',
  '#wwwww########wwwwwww#',
  '#wwwwwwwwwwwwwwwwwwww#',
  '#wwwwwwwwwwwwwwwwwwww#',
  '#wwBwwBwwwwwwwBwwBwww#',
  '#wwwBBwwwwwwwwwwBBwww#',
  '#wwwwwwwwwwwwwwwwwwww#',
  '#wwwwwwwwwwwwwwwwwwww#',
  '######################',
]

// OB_POSTITS — pile de post-its 18×18
const OB_POSTITS = [
  '...##############.',
  '...#eeeeeeeeeeee#.',
  '...#eeeeeeeeeeee#.',
  '..##############.#',
  '..#ffffffffffff#.#',
  '..#ffffffffffff#.#',
  '..#ffffffffffff#.#',
  '##############.##.',
  '#eeeeeeeeeeee#.#..',
  '#eeeeeeeeeeee#.#..',
  '#eeeeeeeeeeee#.#..',
  '#eeeeeeeeeeee##...',
  '#eeeeeeeeeeee#....',
  '#eeeeeeeeeeee#....',
  '#eeeeeeeeeeee#....',
  '#eeeeeeeeeeee#....',
  '##############....',
  '..................',
]

// OB_PHONE — vieux combiné 22×16
const OB_PHONE = [
  '.....##########.......',
  '....#kkkkkkkkkk#......',
  '...#kdddddddddd#......',
  '..#kddddddddddd#......',
  '..#kdddddddddddk#.....',
  '..#kkkddddddddkk#.....',
  '....#kkkdddkkk#.......',
  '......#kkddk##........',
  '........###k#.........',
  '..........###.........',
  '..........#k#.........',
  '..........#k#.........',
  '........###k###.......',
  '......##kkkkkk##......',
  '....#kkkkkkkkkkk#.....',
  '....#############.....',
]

// OB_FOLDERS — chemise 20×16
const OB_FOLDERS = [
  '..####..............',
  '.#YYYY##............',
  '#YYYYYYY##..........',
  '#YYYYYYYYY#########.',
  '#yyyyyyyyyyyyyyyyy#.',
  '#yyyyyyyyyyyyyyyyy#.',
  '#yywwwwwwwwwwwwwyy#.',
  '#yywwwwwwwwwwwwwyy#.',
  '#yyyyyyyyyyyyyyyyy#.',
  '#yywwwwwwwwwwwwwyy#.',
  '#yywwwwwwwwwwwwwyy#.',
  '#yyyyyyyyyyyyyyyyy#.',
  '#yywwwwwwwwwwwwwyy#.',
  '#yyyyyyyyyyyyyyyyy#.',
  '###################.',
  '....................',
]

// OB_SLACK — logo Slack 14×14
const OB_SLACK = [
  '..............',
  '...##..####...',
  '..#cc##cccc#..',
  '..#cc#cccc##..',
  '###cc#####....',
  '#cccccc#......',
  '#cc#####.####.',
  '#cc#....#cc##.',
  '#cc#....#cccc#',
  '####....#cccc#',
  '....######cc#.',
  '...#cccccc#cc#',
  '...#cccc#####.',
  '...####.......',
]

// OB_MAIL_BIG — gros mail empilé 28×16
const OB_MAIL_BIG = [
  '############################',
  '#wwwwwwwwwwwwwwwwwwwwwwwwww#',
  '#w##wwwwwwwwwwwwwwwwwwww##w#',
  '#ww##wwwwwwwwwwwwwwwwww##ww#',
  '#www##wwwwwwwwwwwwwwww##www#',
  '#wwww##wwwwwwwwwwwwww##wwww#',
  '#wwwww##wwwwwwwwwwww##wwwww#',
  '#wwwwww################wwwww#',
  '#wwwwwwwwwwwwwwwwwwwwwwwwww#',
  '#wwBBBBwwBBBBwwBBBBwwBBBBww#',
  '#wwBwwBwwBwwBwwBwwBwwBwwBww#',
  '#wwBBBBwwBBBBwwBBBBwwBBBBww#',
  '#wwBwwwwwBwwwwwBwwwwwBwwwww#',
  '#wwBwwwwwBwwwwwBwwwwwBwwwww#',
  '#wwwwwwwwwwwwwwwwwwwwwwwwww#',
  '############################',
]

// OB_ZIP — ZIP archive 16×16
const OB_ZIP = [
  '################',
  '#YYYYYYYYYYYYYY#',
  '#YwwwwwwwwwwwwY#',
  '#YwYYYYYYYYYYwY#',
  '#YwYwwwwwwwYwY#.',
  '#YwYwYYYYwYwY#..',
  '#YwYwYwwYwYwY#..',
  '#YwYwYwwYwYwY#..',
  '#YwYwYYYYwYwY#..',
  '#YwYwwwwwwwYwY#.',
  '#YwYYYYYYYYYYwY#',
  '#YwwwwwwwwwwwwY#',
  '#YYYYYYYYYYYYYY#',
  '#kkkkkkkkkkkkkk#',
  '################',
  '................',
]

const OBSTACLES = [
  { sprite: OB_EXCEL, w: 26, h: 16, name: 'excel' },
  { sprite: OB_EMAIL, w: 22, h: 14, name: 'email' },
  { sprite: OB_POSTITS, w: 18, h: 18, name: 'postits' },
  { sprite: OB_PHONE, w: 22, h: 16, name: 'phone' },
  { sprite: OB_FOLDERS, w: 20, h: 16, name: 'folders' },
  { sprite: OB_SLACK, w: 14, h: 14, name: 'slack' },
  { sprite: OB_MAIL_BIG, w: 28, h: 16, name: 'mailbig' },
  { sprite: OB_ZIP, w: 16, h: 16, name: 'zip' },
]

/* ----------------------------------------------------------------------------
 * Boss — DASHBOARD.xlsx 40×22 (dragon-tableur)
 * -------------------------------------------------------------------------- */
const BOSS_SPRITE = [
  '......########################..........',
  '.....#kkkkkkkkkkkkkkkkkkkkkkkk#.........',
  '....#kBBBBBBBBBBBBBBBBBBBBBBBBk#........',
  '....#kBwwwwwwwwwwwwwwwwwwwwwwBk#........',
  '....#kBwDAwSHwBOwARwDwxlswxlBwBk#.......',
  '....#kBwwwwwwwwwwwwwwwwwwwwwwBk#........',
  '###.#kBBwwBwwBwwBwwBwwBwwBwwBBk#........',
  '#rr##kBwwwwwwwwwwwwwwwwwwwwwwBk#........',
  '#rrr#kBwwBwBwwBBwwBwBwwBBwwBwBk#........',
  '#rrrr#BwwwwwwwwwwwwwwwwwwwwwwBk#........',
  '#rrrr#BwwBwBwwBwBwwBwBwwBwBwwBk#........',
  '#rrrr#kBBwwBwwBwwBwwBwwBwwBwBBk#........',
  '#rrrr#kBwwwwwwwwwwwwwwwwwwwwwBk#........',
  '#rrrrr#BwwBwBwwBwBwwBwBwwBwBwBk#........',
  '##rrrr#kkkkkkkkkkkkkkkkkkkkkkk#.........',
  '.#rrrrr######################.##........',
  '..#rrrrrrrrrrrrrrrrrrrrrrrrrrrr#........',
  '...#rrrrrrrrrrrrrrrrrrrrrrrrrr#.........',
  '....#rrrrrrrrrrrrrrrrrrrrrrrr#..........',
  '.....##rrrrrrrrrrrrrrrrrrrr##...........',
  '.......####################.............',
  '........................................',
]

/* ----------------------------------------------------------------------------
 * Constantes du jeu
 * -------------------------------------------------------------------------- */
const W = 1920
const H = 800
const P = 8       // scale Maria
const P_OBS = 6   // scale obstacles
const P_BOSS = 7  // scale boss
const GROUND_Y = 720
const SPEED_START = 9
const SPEED_MAX = 22
const SPEED_STEP_SCORE = 200
const SPEED_STEP = 0.6
const JUMP_VEL = -33
const GRAVITY = 1.25
const BOSS_TRIGGER_SCORE = 1000
const BOSS_WARN_DURATION = 2000 // ms

const BOSS_QUIPS = [
  'Joli — tu vas mieux dormir.',
  'Une vraie boîte mail ne t’aurait pas survécu.',
  'On garde ce score. On en reparle en réunion.',
  'C’est presque trop facile, non ?',
  'Tu viens de battre 87 % des excels d’entreprise.',
]

/* ----------------------------------------------------------------------------
 * Bake sprite → canvas offscreen pré-rendu
 * -------------------------------------------------------------------------- */
function bake(sprite: string[], scale: number): HTMLCanvasElement {
  const w = sprite[0].length
  const h = sprite.length
  const cnv = document.createElement('canvas')
  cnv.width = w * scale
  cnv.height = h * scale
  const ctx = cnv.getContext('2d')!
  for (let y = 0; y < h; y++) {
    const row = sprite[y]
    for (let x = 0; x < w; x++) {
      const c = row[x]
      const color = PAL[c]
      if (!color || color === 'transparent') continue
      ctx.fillStyle = color
      ctx.fillRect(x * scale, y * scale, scale, scale)
    }
  }
  return cnv
}

/* ----------------------------------------------------------------------------
 * Audio — WebAudio synthétisé (aucun fichier)
 * -------------------------------------------------------------------------- */
class AudioMgr {
  private ctx: AudioContext | null = null
  enabled = false

  setEnabled(on: boolean) {
    this.enabled = on
    if (on && !this.ctx) {
      try {
        const C = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext
        this.ctx = new C()
      } catch {
        /* noop */
      }
    }
  }

  beep(freq: number, dur: number, type: OscillatorType = 'square', vol = 0.04) {
    if (!this.enabled || !this.ctx) return
    const ctx = this.ctx
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.value = vol
    o.connect(g).connect(ctx.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
    o.stop(ctx.currentTime + dur)
  }

  jump() { this.beep(620, 0.12, 'square', 0.05) }
  score() { this.beep(880, 0.06, 'triangle', 0.03) }
  hit() {
    this.beep(160, 0.25, 'sawtooth', 0.06)
    setTimeout(() => this.beep(110, 0.4, 'sawtooth', 0.05), 80)
  }
  bossArrive() {
    this.beep(220, 0.18, 'square', 0.06)
    setTimeout(() => this.beep(180, 0.22, 'square', 0.06), 200)
    setTimeout(() => this.beep(140, 0.4, 'sawtooth', 0.06), 420)
  }
  bossDefeat() {
    this.beep(523, 0.12, 'triangle', 0.06)
    setTimeout(() => this.beep(659, 0.12, 'triangle', 0.06), 130)
    setTimeout(() => this.beep(784, 0.12, 'triangle', 0.06), 260)
    setTimeout(() => this.beep(1046, 0.22, 'triangle', 0.07), 390)
  }
}

/* ----------------------------------------------------------------------------
 * initRunner — main entry
 * -------------------------------------------------------------------------- */
export function initRunner(
  canvas: HTMLCanvasElement,
  callbacks: RunnerCallbacks,
  opts: RunnerOptions = {},
): RunnerControls {
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false

  // Bake tous les sprites
  const baked = {
    mariaA: bake(MARIA_RUN_A, P),
    mariaB: bake(MARIA_RUN_B, P),
    mariaJump: bake(MARIA_JUMP, P),
    mariaDead: bake(MARIA_DEAD, P),
    obs: OBSTACLES.map((o) => ({ ...o, canvas: bake(o.sprite, P_OBS), bw: o.w * P_OBS, bh: o.h * P_OBS })),
    boss: bake(BOSS_SPRITE, P_BOSS),
    bossW: BOSS_SPRITE[0].length * P_BOSS,
    bossH: BOSS_SPRITE.length * P_BOSS,
  }

  const audio = new AudioMgr()
  audio.setEnabled(!!opts.soundEnabled)

  /* État du jeu */
  type Obstacle = { x: number; y: number; w: number; h: number; img: HTMLCanvasElement }
  type Boss = { x: number; y: number; w: number; h: number; hp: number }

  let score = 0
  let record = readRecord()
  callbacks.onRecordChange?.(record)
  let speed = SPEED_START
  let scoreNextSpeedStep = SPEED_STEP_SCORE
  let running = false
  let dead = false
  let bossActive = false
  let bossWarnTill = 0
  let bossWarnShown = false
  let bossTriggered = false
  let boss: Boss | null = null
  let obstacles: Obstacle[] = []
  let frame = 0
  let raf = 0

  const maria = {
    x: 220,
    y: GROUND_Y - MARIA_RUN_A.length * P,
    w: MARIA_RUN_A[0].length * P,
    h: MARIA_RUN_A.length * P,
    vy: 0,
    onGround: true,
  }

  /* Parallax buildings — pré-calculé pour éviter le flicker */
  const buildings = generateBuildings()

  /* ------------------------------- HELPERS ---------------------------------- */
  function readRecord(): number {
    try {
      const v = parseInt(localStorage.getItem('maria-runner-record') ?? '0', 10)
      return Number.isFinite(v) ? v : 0
    } catch {
      return 0
    }
  }
  function writeRecord(v: number) {
    try { localStorage.setItem('maria-runner-record', String(v)) } catch { /* noop */ }
  }

  function generateBuildings() {
    const arr: { x: number; w: number; h: number; windowsCols: number; windowsRows: number; pattern: boolean[] }[] = []
    let x = 0
    while (x < W * 2) {
      const w = 80 + Math.floor(Math.random() * 120)
      const h = 200 + Math.floor(Math.random() * 280)
      const cols = Math.max(2, Math.floor(w / 28))
      const rows = Math.max(3, Math.floor(h / 36))
      const pattern: boolean[] = []
      for (let i = 0; i < cols * rows; i++) pattern.push(Math.random() > 0.45)
      arr.push({ x, w, h, windowsCols: cols, windowsRows: rows, pattern })
      x += w + 20
    }
    return arr
  }

  function reset() {
    score = 0
    speed = SPEED_START
    scoreNextSpeedStep = SPEED_STEP_SCORE
    obstacles = []
    boss = null
    bossActive = false
    bossWarnTill = 0
    bossWarnShown = false
    bossTriggered = false
    dead = false
    frame = 0
    maria.y = GROUND_Y - maria.h
    maria.vy = 0
    maria.onGround = true
    callbacks.onScoreChange?.(0)
    callbacks.onBossWarn?.(false)
    callbacks.onBossToast?.(null)
  }

  function start() {
    if (running) return
    reset()
    running = true
    callbacks.onStart?.()
    loop()
  }

  function gameOver() {
    if (dead) return
    dead = true
    running = false
    audio.hit()
    if (score > record) {
      record = score
      writeRecord(record)
      callbacks.onRecordChange?.(record)
    }
    const quip = BOSS_QUIPS[Math.min(BOSS_QUIPS.length - 1, Math.floor(score / 250))]
    callbacks.onGameOver?.({ score, record, quip })
    cancelAnimationFrame(raf)
  }

  function jump() {
    if (!running) {
      start()
      return
    }
    if (dead) return
    if (maria.onGround) {
      maria.vy = JUMP_VEL
      maria.onGround = false
      audio.jump()
    }
  }

  /* ------------------------------ SPAWN LOGIC ------------------------------ */
  let lastObstacleAt = 0
  function maybeSpawnObstacle() {
    if (bossActive || boss) return
    const minGap = Math.max(40, 90 - Math.floor(speed * 2))
    if (frame - lastObstacleAt < minGap) return
    if (Math.random() < 0.025) {
      const def = baked.obs[Math.floor(Math.random() * baked.obs.length)]
      obstacles.push({
        x: W + 40,
        y: GROUND_Y - def.bh,
        w: def.bw,
        h: def.bh,
        img: def.canvas,
      })
      lastObstacleAt = frame
    }
  }

  function spawnBoss() {
    boss = {
      x: W + 100,
      y: GROUND_Y - baked.bossH,
      w: baked.bossW,
      h: baked.bossH,
      hp: 1,
    }
    bossActive = true
    audio.bossArrive()
  }

  /* ------------------------------ COLLISION -------------------------------- */
  function aabb(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
    // hitbox réduite (15% marge) pour fairness
    const m = 0.15
    const ax = a.x + a.w * m
    const ay = a.y + a.h * m
    const aw = a.w * (1 - 2 * m)
    const ah = a.h * (1 - 2 * m)
    const bx = b.x + b.w * m
    const by = b.y + b.h * m
    const bw = b.w * (1 - 2 * m)
    const bh = b.h * (1 - 2 * m)
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
  }

  /* ------------------------------ DRAW ------------------------------------- */
  function drawBackground() {
    // Ciel paper
    ctx.fillStyle = '#F4EFE7'
    ctx.fillRect(0, 0, W, H)

    // Soleil discret
    ctx.fillStyle = '#FEC23C'
    ctx.globalAlpha = 0.18
    ctx.beginPath()
    ctx.arc(1480, 220, 110, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1

    // Buildings parallax — défilent à ~30% de la vitesse du sol
    const offset = (frame * speed * 0.3) % (W)
    for (const b of buildings) {
      const bx = b.x - offset
      const bx2 = bx + W * 2 // boucle
      drawBuilding(bx, b)
      drawBuilding(bx2, b)
    }

    // Sol
    ctx.fillStyle = '#E8E2D6'
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y)
    ctx.fillStyle = '#D0CBC1'
    ctx.fillRect(0, GROUND_Y, W, 4)
  }

  function drawBuilding(bx: number, b: { x: number; w: number; h: number; windowsCols: number; windowsRows: number; pattern: boolean[] }) {
    if (bx + b.w < 0 || bx > W) return
    const top = GROUND_Y - b.h
    ctx.fillStyle = '#D0CBC1'
    ctx.fillRect(bx, top, b.w, b.h)
    // toit
    ctx.fillStyle = '#999999'
    ctx.fillRect(bx, top, b.w, 6)
    // fenêtres
    const padX = 8
    const padY = 12
    const cellW = (b.w - padX * 2) / b.windowsCols
    const cellH = (b.h - padY - 10) / b.windowsRows
    const winW = Math.max(2, cellW - 8)
    const winH = Math.max(2, cellH - 8)
    for (let r = 0; r < b.windowsRows; r++) {
      for (let c = 0; c < b.windowsCols; c++) {
        const on = b.pattern[r * b.windowsCols + c]
        ctx.fillStyle = on ? '#FEC23C' : '#3D3D3D'
        ctx.fillRect(
          bx + padX + c * cellW + 4,
          top + padY + r * cellH + 4,
          winW,
          winH,
        )
      }
    }
  }

  function drawMaria() {
    let img: HTMLCanvasElement
    if (dead) img = baked.mariaDead
    else if (!maria.onGround) img = baked.mariaJump
    else img = (Math.floor(frame / 6) % 2 === 0) ? baked.mariaA : baked.mariaB
    ctx.drawImage(img, maria.x, maria.y)
  }

  function drawObstacles() {
    for (const o of obstacles) ctx.drawImage(o.img, o.x, o.y)
  }

  function drawBoss() {
    if (!boss) return
    ctx.drawImage(baked.boss, boss.x, boss.y)
    // label DASHBOARD.xlsx
    ctx.fillStyle = '#212121'
    ctx.font = 'bold 20px monospace'
    ctx.fillText('DASHBOARD.xlsx', boss.x + 30, boss.y - 12)
  }

  /* ------------------------------ LOOP ------------------------------------- */
  function loop() {
    if (!running) return
    frame++

    // physique Maria
    if (!maria.onGround) {
      maria.vy += GRAVITY
      maria.y += maria.vy
      if (maria.y >= GROUND_Y - maria.h) {
        maria.y = GROUND_Y - maria.h
        maria.vy = 0
        maria.onGround = true
      }
    }

    // score + vitesse
    score += 1
    if (score % 10 === 0) callbacks.onScoreChange?.(score)
    if (score >= scoreNextSpeedStep && speed < SPEED_MAX) {
      speed = Math.min(SPEED_MAX, speed + SPEED_STEP)
      scoreNextSpeedStep += SPEED_STEP_SCORE
      audio.score()
    }

    // boss trigger
    if (!bossTriggered && score >= BOSS_TRIGGER_SCORE) {
      bossTriggered = true
      bossWarnShown = true
      bossWarnTill = performance.now() + BOSS_WARN_DURATION
      callbacks.onBossWarn?.(true)
    }
    if (bossWarnShown && performance.now() >= bossWarnTill) {
      bossWarnShown = false
      callbacks.onBossWarn?.(false)
      spawnBoss()
    }

    // spawn obstacles
    maybeSpawnObstacle()

    // move obstacles
    for (const o of obstacles) o.x -= speed
    obstacles = obstacles.filter((o) => o.x + o.w > -20)

    // move boss
    if (boss) {
      boss.x -= speed * 0.55
      if (boss.x + boss.w < -40) {
        // boss vaincu (sauté)
        const beaten = boss
        boss = null
        bossActive = false
        audio.bossDefeat()
        const quip = BOSS_QUIPS[Math.min(BOSS_QUIPS.length - 1, Math.floor(score / 250))]
        callbacks.onBossToast?.(quip)
        setTimeout(() => callbacks.onBossToast?.(null), 2800)
        // reset boss trigger pour repop plus tard
        scoreNextSpeedStep = score + SPEED_STEP_SCORE
        bossTriggered = false
        void beaten
      }
    }

    // collisions
    for (const o of obstacles) if (aabb(maria, o)) { gameOver(); break }
    if (boss && aabb(maria, boss)) gameOver()

    // draw
    drawBackground()
    drawObstacles()
    drawBoss()
    drawMaria()

    raf = requestAnimationFrame(loop)
  }

  /* ------------------------------ INPUT ------------------------------------ */
  function onKey(e: KeyboardEvent) {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault()
      jump()
    }
  }
  function onPointer(e: PointerEvent) {
    e.preventDefault()
    jump()
  }

  window.addEventListener('keydown', onKey)
  canvas.addEventListener('pointerdown', onPointer)

  // Premier dessin idle (Maria au sol, attendant l'input)
  drawBackground()
  drawMaria()

  return {
    destroy() {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', onPointer)
    },
    restart() {
      cancelAnimationFrame(raf)
      reset()
      running = true
      callbacks.onStart?.()
      loop()
    },
    setSound(on: boolean) { audio.setEnabled(on) },
    jump,
  }
}
