/* ============================================================
 * maria — pixel art runner (light theme)
 * Canvas logique 1920×800, rendu net (no smoothing)
 * Sprites pré-bakés, palette claire, fenêtres fixes
 * Port 1:1 du JS d'origine vers TS avec pattern callbacks
 * (au lieu de document.getElementById) pour intégration React.
 * ============================================================ */

export type RunnerCallbacks = {
  onScoreChange?: (score: number) => void
  onRecordChange?: (record: number) => void
  onBossWarn?: (visible: boolean) => void
  onBossToast?: (visible: boolean) => void
  onGameOver?: (data: { score: number; record: number; isNewRecord: boolean; quip: string }) => void
  onStart?: () => void
}

export type RunnerOptions = {
  soundEnabled?: boolean
}

export type RunnerControls = {
  destroy: () => void
  restart: () => void
  setSound: (on: boolean) => void
}

// ---------- PALETTE ----------
const PAL: Record<string, string | null> = {
  '.': null,
  k: '#212121', K: '#383838',
  g: '#9A9A9A', G: '#E8E8E8', L: '#CFCFCF',
  w: '#FFFFFF', W: '#F0EFEA',
  y: '#FEC23C', Y: '#E0A82C', l: '#FFE482',
  e: '#3FC163', E: '#2A9148', f: '#B7FFCA',
  h: '#5A3A22', H: '#3D2515',
  s: '#F2D5A8', S: '#D4A576',
  p: '#1A0F08',
  m: '#B85245',
  n: '#1A2B4A', N: '#0E1A30',
  r: '#D8553E', R: '#A03725',
  b: '#C9A96E', B: '#8B6E3F',
  c: '#FFFBEE', C: '#F0E9D0',
  a: '#4A85D8', A: '#2C5DA8',
  d: '#5A4B3A', D: '#3A3026',
  x: '#5A6B85', X: '#3A4458',
  t: '#6B5B45',
  '#': '#E0E0DC',
  o: '#FF9500',
  z: '#7AB4D8',
}

// ---------- DIMENSIONS ----------
const W = 1920
const H = 800
const P = 8
const P_OBS = 6
const P_BOSS = 7
const GROUND_Y = H - 80 // 720

// ============================================================
// SPRITES PERSONNAGES (14×22 sprite px)
// ============================================================

const MARIA_RUN_A = [
  '..............',
  '....hhhhhh....',
  '...hhhhhhhh...',
  '..hhssssssh...',
  '..hsssssssss..',
  '..hssspsspss..',
  '..hsssssssss..',
  '..hssssmmsss..',
  '..hHssssssss..',
  '....sssss.....',
  '...yyyyyy.....',
  '..yyyyyyyyy...',
  '..yyyYyyyyy...',
  '.yyyYYyyyyy...',
  '.y.YYyyyyy.y..',
  '..yyyyyyyy.y..',
  '..yyyyyyyyy...',
  '...yyyyyyy....',
  '....kk..kk....',
  '....kk..kk....',
  '....kk..kk....',
  '...wwk..kww...',
]

const MARIA_RUN_B = [
  '..............',
  '....hhhhhh....',
  '...hhhhhhhh...',
  '..hhssssssh...',
  '..hsssssssss..',
  '..hssspsspss..',
  '..hsssssssss..',
  '..hssssmmsss..',
  '..hHssssssss..',
  '....sssss.....',
  '...yyyyyy.....',
  '..yyyyyyyyy...',
  '..yyyYyyyyy...',
  '.yyyYYyyyyy...',
  '.y.YYyyyyy.y..',
  '..yyyyyyyy.y..',
  '..yyyyyyyyy...',
  '...yyyyyyy....',
  '..kkk....kk...',
  '.kk......kkk..',
  '.kk.......kk..',
  'www........www',
]

const MARIA_JUMP = [
  '..............',
  '....hhhhhh....',
  '...hhhhhhhh...',
  '..hhssssssh...',
  '..hsssssssss..',
  '..hssspsspss..',
  '..hsssssssss..',
  '..hssssmmsss..',
  '..hHssssssss..',
  '....sssss.....',
  '...yyyyyy.....',
  '..yyyyyyyyyy..',
  'yyyYyyyyyyyy..',
  'yyyYYyyyyyy.y.',
  'y.yYYyyyyyy.y.',
  '..yyyyyyyyy...',
  '..yyyyyyyyy...',
  '...yyyyyyy....',
  '....kkkkkk....',
  '....kkkkkk....',
  '....kk..kk....',
  '...ww....ww...',
]

const MARIA_DEAD = [
  '..............',
  '..............',
  '..............',
  '..............',
  '..............',
  '..............',
  '..............',
  '....hhhhhh....',
  '...hhhhhhhh...',
  '..hhsssssh....',
  '..hsspsspss...',
  '..hsssssss....',
  '..hsssmmss....',
  '...HHsssss....',
  '...yyyyyyy....',
  '..yyyyyyyyyy..',
  '.yyyyyyyyyyyy.',
  'yyyyyyyyyyyyyy',
  'kkkkkkk.kkkkk.',
  'kkkkk..kkkk...',
  'ww........ww..',
  '..............',
]

const CLIENT_RUN_A = [
  '..............',
  '....KKKKKK....',
  '...KKKKKKKK...',
  '..KKssssssK...',
  '..Kssssssss...',
  '..Kssspsspss..',
  '..Kssssssss...',
  '..Kssssmmss...',
  '..KKsssssss...',
  '....sssss.....',
  '...wwwttww....',
  '..wwwwttwww...',
  '..wwwwttwww...',
  '.wwwwwttwww...',
  '.w.wwwttwww...',
  '..wwwwttwww...',
  '...wwwttwww...',
  '...wwwttwww...',
  '....nn..nn....',
  '....nn..nn....',
  '....nn..nn....',
  '...kkn..nkk...',
]

const CLIENT_RUN_B = [
  '..............',
  '....KKKKKK....',
  '...KKKKKKKK...',
  '..KKssssssK...',
  '..Kssssssss...',
  '..Kssspsspss..',
  '..Kssssssss...',
  '..Kssssmmss...',
  '..KKsssssss...',
  '....sssss.....',
  '...wwwttww....',
  '..wwwwttwww...',
  '..wwwwttwww...',
  '.wwwwwttwww...',
  '.w.wwwttwww...',
  '..wwwwttwww...',
  '...wwwttwww...',
  '...wwwttwww...',
  '..nnn....nn...',
  '.nn......nnn..',
  '.nn.......nn..',
  'kkk........kkk',
]

const CLIENT_JUMP = [
  '..............',
  '....KKKKKK....',
  '...KKKKKKKK...',
  '..KKssssssK...',
  '..Kssssssss...',
  '..Kssspsspss..',
  '..Kssssssss...',
  '..Kssssmmss...',
  '..KKsssssss...',
  '....sssss.....',
  '...wwwttww....',
  '..wwwwttwwww..',
  'wwwwwwttwwww..',
  'wwwwwwttwwww.w',
  'w.wwwwttwww.w.',
  '..wwwwttwww...',
  '..wwwwttwww...',
  '...wwwttww....',
  '....nnnnnn....',
  '....nnnnnn....',
  '....nn..nn....',
  '...kk....kk...',
]

// ============================================================
// SPRITES OBSTACLES — HD (P_OBS = 6)
// ============================================================

const OB_EXCEL = [
  '..........................',
  'EEEEEEEEEEEEEEEEEEEEEEEEEE',
  'EEEEEEEEEEEEEEEEEEEEEEEEEE',
  'KwwwwwwwwwwwwwwwwwwwwwwwwK',
  'KwLLLLLwwwLLLLLwwwLLLLLwwK',
  'KwLLLLLwwwLLLLLwwwLLLLLwwK',
  'KwwwwwwwwwwwwwwwwwwwwwwwwK',
  'KwLLLLLwwwLLLLLwwwLLLLLwwK',
  'KwLLLLLwwwLLLLLwwwLLLLLwwK',
  'KwwwwwwwwwwwwwwwwwwwwwwwwK',
  'KwLLLLLwwwLLLLLwwwLLLLLwwK',
  'KwLLLLLwwwLLLLLwwwLLLLLwwK',
  'KwwwwwwwwwwwwwwwwwwwwwwwwK',
  'KwLLLLLwwwLLLLLwwwLLLLLwwK',
  'KwwwwwwwwwwwwwwwwwwwwwwwwK',
  'KKKKKKKKKKKKKKKKKKKKKKKKKK',
]

const OB_EMAIL = [
  '......................',
  'KKKKKKKKKKKKKKKKKKKKKK',
  'KwwwwwwwwwwwwwwwwwwwwK',
  'Kw.wwwwwwwwwwwwwwwww.K',
  'Kww.wwwwwwwwwwwwwww.wK',
  'Kwww.wwwwwwwwwwwww.wwK',
  'Kwwww.wwwwwwwwwww.wwwK',
  'Kwwwww.wwwwwwwww.wwwwK',
  'Kwwwwww.wwwwwww.wwwwwK',
  'Kwwwwwww.wwwww.wwwwwwK',
  'Kwwwwwwww.www.wwwwwwwK',
  'Kwwwwwwwww.w.wwwwwwwwK',
  'Kwwwwwwwwww.wwwwwwwwwK',
  'KKKKKKKKKKKKKKKKKKKKKK',
]

const OB_POSTITS = [
  '............................',
  '....yyyyyyyy................',
  '....yyyyyyyy....yyyyyyyy....',
  '....yyyyyyyy....yyyyyyyy....',
  '....yYYYYYYy....yYYYYYYy....',
  '....yYwwwwYy....yYwwwwYy....',
  '..yyyyyyyyyyyyyyyyyyyyyy....',
  '..yyyyyyyyyyyyyyyyyyyyyy....',
  '..yYYYYYYYYYYYYYYYYYYYYy..yy',
  'yyyyyyyyyyyyyyyyyyyyyyyyyyyy',
  'yyyyyyyyyyyyyyyyyyyyyyyyyyyy',
  'yYYYYYYYYYYYYYYYYYYYYYYYYYYy',
  'yYwwwwwwwwwwwwwwwwwwwwwwwwYy',
  'yYYYYYYYYYYYYYYYYYYYYYYYYYYy',
]

const OB_PHONE = [
  '..............',
  '.kkkkkkkkkkkk.',
  '.kKKKKKKKKKKKk',
  '.kKKKKKKKKKKKk',
  '.kKzzzzzzzzzKk',
  '.kKzwwwwwwwzKk',
  '.kKzwrrwwywzKk',
  '.kKzwrrwwywzKk',
  '.kKzwwwwwwwzKk',
  '.kKzwewwwywzKk',
  '.kKzwewwwywzKk',
  '.kKzwwwwwwwzKk',
  '.kKzzzzzzzzzKk',
  '.kKKKKkkkKKKKk',
  '.kkkkkkkkkkkk.',
]

const OB_FOLDERS = [
  '........................',
  '........................',
  '...bbbbbbb..............',
  '...BBBBBBB..............',
  'BBBBBBBBBBBBBBBBBBBBBBBB',
  'BbbbbbbbbbbbbbbbbbbbbbbB',
  'BbbbbbbbbbbbbbbbbbbbbbbB',
  'BbbbbbbbbbbbbbbbbbbbbbbB',
  'BBBBBBBBBBBBBBBBBBBBBBBB',
  '.........bbbbbbb........',
  '.........BBBBBBB........',
  'BBBBBBBBBBBBBBBBBBBBBBBB',
  'BbbbbbbbbbbbbbbbbbbbbbbB',
  'BbbbbbbbbbbbbbbbbbbbbbbB',
  'BBBBBBBBBBBBBBBBBBBBBBBB',
  '..bbbbbbb...............',
  '..BBBBBBB...............',
  'BBBBBBBBBBBBBBBBBBBBBBBB',
]

const OB_SLACK = [
  '..................',
  '..kkkkkkkkkkk.....',
  '.kKKKKKKKKKKKKk...',
  'kKwwwwwwwwwwwwKk..',
  'kKwwawwawwwwwwKk..',
  'kKwaaaaaaawwwwKk..',
  'kKwwawwawwwwwwKk..',
  'kKwaaaaaaawwwwKk..',
  'kKwwawwawwwwwwKk..',
  'kKwwwwwwwwwwwwKk..',
  '.kKKKKKKKKKKKKk...',
  '..kkkkkkkkkkk.....',
  '....kkk...........',
  '.....k............',
]

const OB_MAIL_BIG = [
  '............................',
  'KKKKKKKKKKKKKKKKKKKKKKKK....',
  'KwwwwwwwwwwwwwwwwwwwwwwK....',
  'Kw.wwwwwwwwwwwwwwwwww.wKrrrr',
  'Kww.wwwwwwwwwwwwwwww.wwKr.wr',
  'Kwww.wwwwwwwwwwwwww.wwwKrwwr',
  'Kwwww.wwwwwwwwwwww.wwwwKrwwr',
  'Kwwwww.wwwwwwwwww.wwwwwKrwwr',
  'Kwwwwww.wwwwwwww.wwwwwwKrrrr',
  'Kwwwwwww.wwwwww.wwwwwwwK....',
  'Kwwwwwwww.wwww.wwwwwwwwK....',
  'Kwwwwwwwww.ww.wwwwwwwwwK....',
  'Kwwwwwwwwww..wwwwwwwwwwK....',
  'KwwwwwwwwwwwwwwwwwwwwwwK....',
  'KKKKKKKKKKKKKKKKKKKKKKKK....',
  '............................',
  '............................',
  '............................',
]

const OB_ZIP = [
  'wwwwwwwwwwwwww....',
  'wKKKKKKKKKwwww....',
  'wK......zKwwww....',
  'wK.ZIP..zKwwww....',
  'wKKKKKKKKKwwww....',
  'wwwwwwwwwwwwww....',
  'wwwwwwwwwwwwww....',
  'wwrwwwwwwwwrww....',
  'wwwrrrwwwrrrww....',
  'wwwwwrrrrrwwww....',
  'wwwwrrwwwrrwww....',
  'wwwrrrrrrrrwww....',
  'wwwrwwwrwwwrwww...',
  'wwwwwwwwwwwwww....',
  'wwwwwwwwwwwwww....',
  '..................',
]

// BOSS — dragon-tableur (40×22 à P_BOSS=7 → 280×154)
const BOSS_SPRITE = [
  '......kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  '.....kKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKk',
  '....kKrrrrrrKKKKKKKKKKKKKKKKKKKKKKrrrrrrKk',
  '....kKrwwwwrKKKKKKKKKKKKKKKKKKKKKKrwwwwrKk',
  '....kKrwppwrKKKKKKKKKKKKKKKKKKKKKKrwppwrKk',
  '....kKrwppwrKKKKKKKKKKKKKKKKKKKKKKrwppwrKk',
  '....kKrwwwwrKKKKKKKKKKKKKKKKKKKKKKrwwwwrKk',
  '....kKrrrrrrKKKKKKKwwwwwwKKKKKKKKKrrrrrrKk',
  '....kKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKk',
  '.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  'kxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxk',
  'kxXXXXxXXXXxXXXXxXXXXxXXXXxXXXXxXXXXxXXXk',
  'kxXXXXxXXXXxXXXXxXXXXxXXXXxXXXXxXXXXxXXXk',
  'kxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxk',
  'kxRRRRxXXXXxRRRRxXXXXxRRRRxXXXXxRRRRxXXXk',
  'kxRwwRxXXXXxRwwRxXXXXxRwwRxXXXXxRwwRxXXXk',
  'kxRRRRxXXXXxRRRRxXXXXxRRRRxXXXXxRRRRxXXXk',
  'kxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxk',
  'kxXXXXxXXXXxXXXXxXXXXxXXXXxXXXXxXXXXxXXXk',
  'kxXXXXxXXXXxXXXXxXXXXxXXXXxXXXXxXXXXxXXXk',
  'kxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxk',
  '..kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
]

// ============================================================
// BAKE SPRITES (offscreen canvas)
// ============================================================
function bake(sprite: string[], scale: number): HTMLCanvasElement {
  const cols = sprite[0].length
  const rows = sprite.length
  const c = document.createElement('canvas')
  c.width = cols * scale
  c.height = rows * scale
  const cx = c.getContext('2d')!
  cx.imageSmoothingEnabled = false
  for (let r = 0; r < rows; r++) {
    const line = sprite[r]
    for (let col = 0; col < line.length; col++) {
      const ch = line[col]
      const color = PAL[ch]
      if (!color) continue
      cx.fillStyle = color
      cx.fillRect(col * scale, r * scale, scale, scale)
    }
  }
  return c
}

// ============================================================
// initRunner — main entry
// ============================================================
export function initRunner(
  canvas: HTMLCanvasElement,
  callbacks: RunnerCallbacks,
  opts: RunnerOptions = {},
): RunnerControls {
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false

  const SPR = {
    mariaA: bake(MARIA_RUN_A, P),
    mariaB: bake(MARIA_RUN_B, P),
    mariaJump: bake(MARIA_JUMP, P),
    mariaDead: bake(MARIA_DEAD, P),
    clientA: bake(CLIENT_RUN_A, P),
    clientB: bake(CLIENT_RUN_B, P),
    clientJump: bake(CLIENT_JUMP, P),
    excel: bake(OB_EXCEL, P_OBS),
    email: bake(OB_EMAIL, P_OBS),
    postits: bake(OB_POSTITS, P_OBS),
    phone: bake(OB_PHONE, P_OBS),
    folders: bake(OB_FOLDERS, P_OBS),
    slack: bake(OB_SLACK, P_OBS),
    mailbig: bake(OB_MAIL_BIG, P_OBS),
    zip: bake(OB_ZIP, P_OBS),
    boss: bake(BOSS_SPRITE, P_BOSS),
  }

  // ============================================================
  // ÉTAT
  // ============================================================
  let lastTime = 0
  let speed = 9
  const SPEED_MAX = 22
  let distance = 0
  let score = 0
  let record = readRecord()
  callbacks.onRecordChange?.(record)
  let alive = true
  let started = false
  let bossSpawned = false
  let runFrame = 0
  let runTick = 0
  let lastSpeedFlash = 0
  let shakeT = 0
  let parallaxOffset = 0
  let groundOffset = 0
  let rafId = 0

  // ---------- AUDIO ----------
  let soundOn = !!opts.soundEnabled
  let audioCtx: AudioContext | null = null
  function ensureAudio() {
    if (!audioCtx) {
      try {
        const C = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext) as typeof AudioContext
        audioCtx = new C()
      } catch {
        audioCtx = null
      }
    }
  }
  function beep(freq: number, dur: number, type: OscillatorType = 'square', vol = 0.04) {
    if (!soundOn || !audioCtx) return
    const o = audioCtx.createOscillator()
    const g = audioCtx.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.value = vol
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur)
    o.connect(g)
    g.connect(audioCtx.destination)
    o.start()
    o.stop(audioCtx.currentTime + dur)
  }

  function readRecord(): number {
    try {
      const v = parseInt(localStorage.getItem('maria_runner_record') ?? '0', 10)
      return Number.isFinite(v) ? v : 0
    } catch {
      return 0
    }
  }
  function writeRecord(v: number) {
    try { localStorage.setItem('maria_runner_record', String(v)) } catch { /* noop */ }
  }

  // ---------- maria & client ----------
  const maria = {
    x: 360,
    y: GROUND_Y,
    vy: 0,
    spriteW: MARIA_RUN_A[0].length * P,
    spriteH: MARIA_RUN_A.length * P,
    jumpVel: -33,
    gravity: 1.25,
    grounded: true,
    dead: false,
  }
  const client = {
    x: maria.x - 130,
    y: GROUND_Y,
    vy: 0,
    grounded: true,
    spriteW: CLIENT_RUN_A[0].length * P,
    spriteH: CLIENT_RUN_A.length * P,
    jumpQueueAt: -1,
  }

  // ============================================================
  // OBSTACLES
  // ============================================================
  type ObsDef = { key: string; fly: 'ground' | 'low' | 'mid'; sprite: HTMLCanvasElement; pad: number }
  const OBS_DEFS: ObsDef[] = [
    { key: 'excel',   fly: 'mid',    sprite: SPR.excel,   pad: 6 },
    { key: 'email',   fly: 'low',    sprite: SPR.email,   pad: 6 },
    { key: 'postits', fly: 'ground', sprite: SPR.postits, pad: 8 },
    { key: 'phone',   fly: 'low',    sprite: SPR.phone,   pad: 8 },
    { key: 'folders', fly: 'ground', sprite: SPR.folders, pad: 8 },
    { key: 'slack',   fly: 'mid',    sprite: SPR.slack,   pad: 6 },
    { key: 'mailbig', fly: 'ground', sprite: SPR.mailbig, pad: 10 },
    { key: 'zip',     fly: 'low',    sprite: SPR.zip,     pad: 6 },
  ]

  type Obstacle = { def: ObsDef; x: number; y: number; w: number; h: number; t: number }
  const obstacles: Obstacle[] = []
  let spawnTimer = 60
  function spawnObstacle() {
    const def = OBS_DEFS[Math.floor(Math.random() * OBS_DEFS.length)]
    const w = def.sprite.width
    const h = def.sprite.height
    let y: number
    if (def.fly === 'ground') y = GROUND_Y - h
    else if (def.fly === 'low') y = GROUND_Y - h - 110
    else y = GROUND_Y - h - 200
    obstacles.push({ def, x: W + 30, y, w, h, t: 0 })
  }

  // ---------- BOSS ----------
  const boss = {
    active: false,
    x: 0,
    y: 0,
    w: SPR.boss.width,
    h: SPR.boss.height,
    defeated: false,
  }
  let bossWarnTime = 0
  let bossToastTime = 0

  // ============================================================
  // BACKGROUND : immeubles avec fenêtres FIXES (pré-calculées)
  // ============================================================
  type Building = {
    x: number; w: number; h: number; cols: number; rows: number;
    winW: number; winH: number; gapX: number; gapY: number;
    padTop: number; padSide: number; depth: number; pattern: boolean[][]
  }
  const buildings: Building[] = []
  function buildBg() {
    buildings.length = 0
    let x = 0
    while (x < W * 2.5) {
      const cols = 3 + Math.floor(Math.random() * 4)
      const rows = 5 + Math.floor(Math.random() * 7)
      const winW = P
      const winH = P + 4
      const gapX = P
      const gapY = P + 2
      const padTop = P + 6
      const padSide = P + 4
      const w = padSide * 2 + cols * winW + (cols - 1) * gapX
      const h = padTop + 12 + rows * winH + (rows - 1) * gapY
      const pattern: boolean[][] = []
      for (let r = 0; r < rows; r++) {
        const row: boolean[] = []
        for (let c = 0; c < cols; c++) row.push(Math.random() < 0.55)
        pattern.push(row)
      }
      buildings.push({
        x, w, h, cols, rows, winW, winH, gapX, gapY, padTop, padSide,
        depth: Math.floor(Math.random() * 3),
        pattern,
      })
      x += w + 20 + Math.floor(Math.random() * 90)
    }
  }
  buildBg()

  // ============================================================
  // INPUT
  // ============================================================
  type Puff = { x: number; y: number; t: number }
  const puffs: Puff[] = []
  function jump() {
    if (!started) {
      started = true
      callbacks.onStart?.()
    }
    if (!alive) return
    if (maria.grounded) {
      maria.vy = maria.jumpVel
      maria.grounded = false
      puffs.push({ x: maria.x + maria.spriteW / 2, y: GROUND_Y, t: 0 })
      beep(880, 0.06, 'square', 0.05)
      client.jumpQueueAt = performance.now() + 250
    }
  }
  function onKey(e: KeyboardEvent) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault()
      if (!alive) { restart(); return }
      jump()
    }
  }
  function onPointer(e: PointerEvent) {
    e.preventDefault()
    ensureAudio()
    if (!alive) { restart(); return }
    jump()
  }
  window.addEventListener('keydown', onKey)
  canvas.addEventListener('pointerdown', onPointer)

  function updatePuffs() {
    for (let i = puffs.length - 1; i >= 0; i--) {
      puffs[i].t += 1
      if (puffs[i].t > 16) puffs.splice(i, 1)
    }
  }
  function drawPuffs() {
    puffs.forEach((p) => {
      const a = 1 - p.t / 16
      ctx.fillStyle = `rgba(120,100,70,${a * 0.5})`
      const t = p.t
      ctx.fillRect(Math.round(p.x - 30 - t), Math.round(p.y - t * 0.5), P, P)
      ctx.fillRect(Math.round(p.x - 22 - t * 1.2), Math.round(p.y - 2 - t * 0.4), P, P)
      ctx.fillRect(Math.round(p.x - 38 - t * 0.8), Math.round(p.y + 2 - t * 0.3), P, P)
    })
  }

  // ============================================================
  // COLLISIONS
  // ============================================================
  function aabb(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
    return !(ax + aw < bx || ax > bx + bw || ay + ah < by || ay > by + bh)
  }
  function mariaHitbox() {
    return {
      x: maria.x + 18,
      y: maria.y - maria.spriteH + 14,
      w: maria.spriteW - 36,
      h: maria.spriteH - 18,
    }
  }
  function obstacleHitbox(o: Obstacle) {
    return { x: o.x + o.def.pad, y: o.y + o.def.pad, w: o.w - o.def.pad * 2, h: o.h - o.def.pad * 2 }
  }

  function pad(n: number): number { return Math.max(0, n) }

  // ============================================================
  // UPDATE
  // ============================================================
  function update() {
    if (!alive) return
    distance += speed * 0.1
    const newScore = Math.floor(distance)
    if (newScore !== score) {
      score = newScore
      callbacks.onScoreChange?.(score)
    }
    if (score > 0 && score % 200 === 0 && score !== lastSpeedFlash) {
      lastSpeedFlash = score
      if (speed < SPEED_MAX) speed += 0.6
      beep(1320, 0.06, 'square', 0.04)
    }

    if (!maria.grounded) {
      maria.vy += maria.gravity
      maria.y += maria.vy
      if (maria.y >= GROUND_Y) { maria.y = GROUND_Y; maria.vy = 0; maria.grounded = true }
    }
    if (!client.grounded) {
      client.vy += maria.gravity
      client.y += client.vy
      if (client.y >= GROUND_Y) { client.y = GROUND_Y; client.vy = 0; client.grounded = true }
    } else if (client.jumpQueueAt > 0 && performance.now() >= client.jumpQueueAt) {
      client.vy = maria.jumpVel
      client.grounded = false
      client.jumpQueueAt = -1
    }

    runTick++
    if (runTick % Math.max(3, Math.floor(8 - speed / 3)) === 0) runFrame++

    if (!boss.active) {
      spawnTimer--
      if (spawnTimer <= 0) {
        spawnObstacle()
        spawnTimer = 60 + Math.floor(Math.random() * 50) - Math.min(20, Math.floor(speed))
      }
    }

    const mh = mariaHitbox()
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].x -= speed
      obstacles[i].t++
      if (obstacles[i].x + obstacles[i].w < -60) { obstacles.splice(i, 1); continue }
      const oh = obstacleHitbox(obstacles[i])
      if (aabb(mh.x, mh.y, mh.w, mh.h, oh.x, oh.y, oh.w, oh.h)) { die(); return }
    }

    if (!bossSpawned && score >= 1000) {
      bossSpawned = true
      bossWarnTime = performance.now() + 2000
      callbacks.onBossWarn?.(true)
      shakeT = 6
    }
    if (bossSpawned && !boss.active && !boss.defeated && performance.now() >= bossWarnTime) {
      boss.active = true
      boss.x = W + 60
      boss.y = GROUND_Y - boss.h
      callbacks.onBossWarn?.(false)
    }
    if (boss.active) {
      boss.x -= speed * 0.55
      const bh = { x: boss.x + 80, y: boss.y + 30, w: boss.w - 160, h: boss.h - 40 }
      if (aabb(mh.x, mh.y, mh.w, mh.h, bh.x, bh.y, bh.w, bh.h)) { die(); return }
      if (boss.x + boss.w < -60) {
        boss.active = false
        boss.defeated = true
        callbacks.onBossToast?.(true)
        bossToastTime = performance.now() + 1800
        beep(440, 0.12, 'square', 0.06)
        setTimeout(() => beep(660, 0.16, 'square', 0.06), 100)
      }
    }
    if (bossToastTime && performance.now() > bossToastTime) {
      callbacks.onBossToast?.(false)
      bossToastTime = 0
    }
    if (shakeT > 0) shakeT -= 0.5
    updatePuffs()

    parallaxOffset = (parallaxOffset + speed * 0.35) % (W * 4)
    groundOffset = (groundOffset + speed) % (P * 6)
  }

  // ---------- DEATH / RESTART ----------
  function die() {
    alive = false
    maria.dead = true
    beep(160, 0.3, 'sawtooth', 0.07)
    const isNewRecord = score > record
    if (isNewRecord) {
      record = score
      writeRecord(record)
      callbacks.onRecordChange?.(record)
    }
    let quip = ''
    if (boss.defeated) quip = "Vainqueur·e du tableau de bord du PDG. On vous décerne le grade de « résistant·e »."
    else if (score < 100) quip = "On a tous des journées comme ça. On réessaie ?"
    else if (score < 300) quip = "Pas mal. Mais vos vraies victoires, on les construit ensemble."
    else if (score < 800) quip = "Vous avez de la ressource. Imaginez avec les bons outils."
    else quip = "Champion·ne du quotidien. À ce niveau, vous méritez maria à plein temps."
    callbacks.onGameOver?.({ score, record, isNewRecord, quip })
  }

  function restart() {
    obstacles.length = 0
    speed = 9
    distance = 0
    score = 0
    callbacks.onScoreChange?.(0)
    alive = true
    maria.dead = false
    maria.y = GROUND_Y
    maria.vy = 0
    maria.grounded = true
    client.y = GROUND_Y
    client.vy = 0
    client.grounded = true
    bossSpawned = false
    boss.active = false
    boss.defeated = false
    callbacks.onBossWarn?.(false)
    callbacks.onBossToast?.(false)
    started = true
    callbacks.onStart?.()
    spawnTimer = 60
    lastSpeedFlash = 0
  }

  // ============================================================
  // RENDER : BACKGROUND CLAIR
  // ============================================================
  function drawBg() {
    const bands = [
      { y: 0, h: 160, c: '#FFFBEE' },
      { y: 160, h: 120, c: '#F8F0D5' },
      { y: 280, h: 120, c: '#F2E8C0' },
      { y: 400, h: 160, c: '#EDDFAA' },
      { y: 560, h: 160, c: '#E5D391' },
    ]
    bands.forEach((b) => { ctx.fillStyle = b.c; ctx.fillRect(0, b.y, W, b.h) })

    buildings.forEach((b) => {
      const baseX = ((b.x - parallaxOffset) % (W * 2.5) + W * 2.5) % (W * 2.5) - W * 0.5
      if (baseX > W || baseX < -b.w) return
      drawBuilding(Math.round(baseX), Math.round(GROUND_Y - b.h), b)
    })

    ctx.fillStyle = '#5A4030'
    ctx.fillRect(0, GROUND_Y, W, P)
    ctx.fillStyle = '#9A7848'
    ctx.fillRect(0, GROUND_Y + P, W, P)
    ctx.fillStyle = '#B89060'
    ctx.fillRect(0, GROUND_Y + P * 2, W, H - GROUND_Y - P * 2)
    ctx.fillStyle = '#7A5830'
    for (let x = -groundOffset; x < W; x += P * 6) {
      ctx.fillRect(x, GROUND_Y + P * 4, P * 2, P)
    }
  }

  function drawBuilding(x: number, y: number, b: Building) {
    const palettes = [
      { body: '#6B5340', shade: '#4A3527', lit: '#FEC23C', dim: '#3D2A1D', edge: '#3A2818' },
      { body: '#8C7257', shade: '#5E4831', lit: '#FFE482', dim: '#4D372A', edge: '#4A3320' },
      { body: '#A48A6C', shade: '#7A5E40', lit: '#FFE482', dim: '#5A4332', edge: '#5C402A' },
    ]
    const c = palettes[b.depth]
    ctx.fillStyle = c.body
    ctx.fillRect(x, y, b.w, b.h)
    ctx.fillStyle = c.shade
    ctx.fillRect(x, y, P, b.h)
    ctx.fillStyle = c.edge
    ctx.fillRect(x - P, y - P, b.w + P * 2, P)
    ctx.fillRect(x - P, y - P * 2, b.w / 3, P)

    const startX = x + b.padSide
    const startY = y + b.padTop
    for (let r = 0; r < b.rows; r++) {
      for (let col = 0; col < b.cols; col++) {
        const wx = startX + col * (b.winW + b.gapX)
        const wy = startY + r * (b.winH + b.gapY)
        const lit = b.pattern[r][col]
        ctx.fillStyle = lit ? c.lit : c.dim
        ctx.fillRect(wx, wy, b.winW, b.winH)
        if (lit) {
          ctx.fillStyle = '#FFFBEE'
          ctx.fillRect(wx, wy, Math.max(2, b.winW / 3), 2)
        }
      }
    }
  }

  // ============================================================
  // RENDER OBSTACLES
  // ============================================================
  function drawObstacles() {
    obstacles.forEach((o) => {
      let yo = 0
      if (o.def.fly === 'mid') yo = Math.sin(o.t * 0.1) * 4
      if (o.def.fly === 'low') yo = Math.sin(o.t * 0.12) * 3
      ctx.drawImage(o.def.sprite, Math.round(o.x), Math.round(o.y + yo))

      if (o.def.key === 'excel') {
        ctx.fillStyle = '#383838'
        const wf = (o.t % 8 < 4) ? 0 : P_OBS
        ctx.fillRect(Math.round(o.x - P_OBS * 3), Math.round(o.y + yo + P_OBS * 4 - wf), P_OBS * 3, P_OBS)
        ctx.fillRect(Math.round(o.x + o.w), Math.round(o.y + yo + P_OBS * 4 - wf), P_OBS * 3, P_OBS)
      }
      if (o.def.key === 'email' && (o.t % 24 < 12)) {
        ctx.fillStyle = '#D8553E'
        ctx.fillRect(Math.round(o.x + o.w - P_OBS * 5), Math.round(o.y - P_OBS * 2), P_OBS * 5, P_OBS * 5)
        ctx.fillStyle = '#FFFFFF'
        ctx.font = `700 ${P_OBS * 3}px 'DM Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('!', Math.round(o.x + o.w - P_OBS * 2.5), Math.round(o.y + yo + P_OBS * 0.5))
        ctx.textAlign = 'start'
        ctx.textBaseline = 'alphabetic'
      }
      if (o.def.key === 'slack') {
        ctx.fillStyle = '#D8553E'
        ctx.fillRect(Math.round(o.x + o.w - P_OBS * 5), Math.round(o.y + yo), P_OBS * 4, P_OBS * 4)
        ctx.fillStyle = '#FFFFFF'
        ctx.font = `700 ${P_OBS * 2.6}px 'DM Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('99+', Math.round(o.x + o.w - P_OBS * 3), Math.round(o.y + yo + P_OBS * 2))
        ctx.textAlign = 'start'
        ctx.textBaseline = 'alphabetic'
      }
      if (o.def.key === 'phone') {
        const ww = (o.t % 16 < 8)
        ctx.fillStyle = '#D8553E'
        if (ww) {
          ctx.fillRect(Math.round(o.x + o.w + P_OBS), Math.round(o.y + yo + P_OBS * 3), P_OBS, P_OBS)
          ctx.fillRect(Math.round(o.x + o.w + P_OBS * 3), Math.round(o.y + yo + P_OBS * 2), P_OBS, P_OBS)
          ctx.fillRect(Math.round(o.x - P_OBS * 2), Math.round(o.y + yo + P_OBS * 3), P_OBS, P_OBS)
        } else {
          ctx.fillRect(Math.round(o.x + o.w + P_OBS * 2), Math.round(o.y + yo + P_OBS * 3), P_OBS, P_OBS)
          ctx.fillRect(Math.round(o.x - P_OBS * 3), Math.round(o.y + yo + P_OBS * 3), P_OBS, P_OBS)
        }
      }
      if (o.def.key === 'mailbig') {
        const num = ['9487', '9488', '9489', '9490'][Math.floor(o.t / 12) % 4]
        ctx.fillStyle = '#FFFFFF'
        ctx.font = `700 ${P_OBS * 2}px 'DM Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(num, Math.round(o.x + o.w - P_OBS * 4), Math.round(o.y + yo + P_OBS * 5))
        ctx.textAlign = 'start'
        ctx.textBaseline = 'alphabetic'
      }
      if (o.def.key === 'excel') {
        ctx.fillStyle = '#FFFFFF'
        ctx.font = "700 10px 'DM Mono', monospace"
        ctx.fillText('.xlsx', Math.round(o.x + P_OBS * 2), Math.round(o.y + yo + P_OBS * 2.4))
      }
      if (o.def.key === 'zip') {
        const dx = (o.t % 6 < 3) ? -P_OBS : P_OBS
        ctx.fillStyle = '#D8553E'
        ctx.fillRect(Math.round(o.x + o.w / 2 + dx), Math.round(o.y + yo + o.h + P_OBS), P_OBS, P_OBS)
      }
    })
  }

  // ============================================================
  // RENDER BOSS
  // ============================================================
  function drawBoss() {
    if (!boss.active) return
    ctx.drawImage(SPR.boss, Math.round(boss.x), Math.round(boss.y))
    ctx.fillStyle = '#FEC23C'
    ctx.font = "700 14px 'DM Mono', monospace"
    ctx.fillText('DASHBOARD.xlsx', Math.round(boss.x + 30), Math.round(boss.y + 26))
    if (((performance.now() / 200) | 0) % 4 === 0) {
      ctx.fillStyle = '#FFFBEE'
      ctx.fillRect(Math.round(boss.x + P_BOSS * 8), Math.round(boss.y + P_BOSS * 4), P_BOSS * 2, P_BOSS)
      ctx.fillRect(Math.round(boss.x + boss.w - P_BOSS * 10), Math.round(boss.y + P_BOSS * 4), P_BOSS * 2, P_BOSS)
    }
  }

  // ============================================================
  // RENDER PERSONNAGES
  // ============================================================
  function drawMaria() {
    let spr: HTMLCanvasElement
    if (!alive) spr = SPR.mariaDead
    else if (!maria.grounded) spr = SPR.mariaJump
    else spr = (runFrame % 2 === 0) ? SPR.mariaA : SPR.mariaB
    const drawX = Math.round(maria.x)
    const drawY = Math.round(maria.y - maria.spriteH)
    if (alive) {
      ctx.fillStyle = 'rgba(33,33,33,0.30)'
      ctx.fillRect(Math.round(maria.x + 12), Math.round(GROUND_Y + P), Math.round(maria.spriteW - 24), P)
    }
    ctx.drawImage(spr, drawX, drawY)
  }
  function drawClient() {
    let spr: HTMLCanvasElement
    if (!client.grounded) spr = SPR.clientJump
    else spr = (runFrame % 2 === 0) ? SPR.clientB : SPR.clientA
    const drawX = Math.round(client.x)
    const drawY = Math.round(client.y - client.spriteH)
    ctx.fillStyle = 'rgba(33,33,33,0.26)'
    ctx.fillRect(Math.round(client.x + 12), Math.round(GROUND_Y + P), Math.round(client.spriteW - 24), P)
    ctx.drawImage(spr, drawX, drawY)
  }

  // ============================================================
  // RENDER LOOP
  // ============================================================
  function render() {
    ctx.imageSmoothingEnabled = false
    if (shakeT > 0) {
      const sx = (Math.random() - 0.5) * shakeT * 1.5
      const sy = (Math.random() - 0.5) * shakeT * 1.5
      ctx.save()
      ctx.translate(Math.round(sx), Math.round(sy))
    }

    drawBg()
    drawPuffs()
    drawObstacles()
    drawBoss()
    drawClient()
    drawMaria()

    if (shakeT > 0) ctx.restore()

    if (!started) {
      ctx.fillStyle = 'rgba(33,33,33,0.55)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#FFE482'
      ctx.font = "700 18px 'DM Mono', monospace"
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('MARIA EST PRÊTE.', W / 2, H / 2 - 100)
      ctx.fillStyle = '#FFFFFF'
      ctx.font = "600 60px 'Syne', serif"
      ctx.fillText('Appuyez sur ESPACE', W / 2, H / 2 - 20)
      ctx.fillText('ou tapez l’écran', W / 2, H / 2 + 60)
      ctx.fillStyle = '#B7FFCA'
      ctx.font = "500 18px 'DM Mono', monospace"
      ctx.fillText('// pour commencer', W / 2, H / 2 + 140)
      ctx.textAlign = 'start'
      ctx.textBaseline = 'alphabetic'
    }
  }

  function loop(t: number) {
    if (!lastTime) lastTime = t
    lastTime = t
    if (started && alive) update()
    render()
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)

  // Évite warning unused
  void pad

  return {
    destroy() {
      cancelAnimationFrame(rafId)
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('pointerdown', onPointer)
    },
    restart,
    setSound(on: boolean) {
      soundOn = on
      if (on) ensureAudio()
    },
  }
}
