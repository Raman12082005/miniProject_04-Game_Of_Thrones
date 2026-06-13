// ─── Chapter data ───────────────────────────────────────────
const CHAPTERS = [
  { id: 'prologue',      progress: [0, 0.12],    title: 'The Ancient Chronicles', subtitle: 'A SONG OF ICE AND FIRE',                body: 'In the beginning, there were only the words of the Maesters — secrets sealed within ancient tomes, waiting for a hand brave enough to open them.', sigil: '✦' },
  { id: 'winterfell',    progress: [0.12, 0.30], title: 'The North Remembers',    subtitle: 'HOUSE STARK — WINTERFELL',             body: 'Winter is coming. Beyond the ancient walls, the cold whispers of the North carry stories older than the Wall itself.', sigil: '⚔' },
  { id: 'westeros',      progress: [0.30, 0.52], title: 'The Seven Kingdoms',     subtitle: 'THE REALM OF WESTEROS',                body: "From the Eyrie's clouded peaks to the red sands of Dorne — seven kingdoms, one throne, a thousand reasons to bleed.", sigil: '♜' },
  { id: 'kings-landing', progress: [0.52, 0.70], title: 'Where Crowns Are Won',   subtitle: "KING'S LANDING — THE CAPITAL",         body: 'The city that swallows kings whole. Gold and treachery perfume the air. Every smile here conceals a blade.', sigil: '👑' },
  { id: 'swords',        progress: [0.70, 0.87], title: 'A Thousand Blades',      subtitle: 'FORGED IN CONQUEST',                   body: 'One thousand swords, surrendered by enemies of Aegon the Conqueror. Melted. Reshaped. Made into something terrible and magnificent.', sigil: '⚒' },
  { id: 'throne',        progress: [0.87, 1.0],  title: 'The Iron Throne',        subtitle: 'WHEN YOU PLAY THE GAME OF THRONES',    body: 'You win — or you die.', sigil: '♔' },
]

// ─── House data ─────────────────────────────────────────────
const HOUSES = [
  { id: 'stark',     name: 'STARK',     seat: 'Winterfell',   words: '"Winter Is Coming"', region: 'The North',       sigil: 'Grey Direwolf',         accent: '#8fafc4', description: 'Wardens of the North, the Starks trace their blood to the First Men. Honour is their sword and the frozen wind their banner. They endure where others fall — patient as winter itself.', sigil_url: 'images/one.jpg',   bg: 'linear-gradient(135deg, #0d1117 0%, #1a2332 60%, #0d1117 100%)', borderColor: '#4a6380' },
  { id: 'lannister', name: 'LANNISTER', seat: 'Casterly Rock', words: '"Hear Me Roar"',     region: 'The Westerlands', sigil: 'Golden Lion',           accent: '#d4a84b', description: 'The wealthiest house in Westeros. Their lion does not merely roar — it devours. Power is their birthright, gold their language, and debt a weapon they wield with surgical precision.', sigil_url: 'images/two.jpg',   bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 60%, #1a1200 100%)', borderColor: '#7a6130' },
  { id: 'targaryen', name: 'TARGARYEN', seat: 'Dragonstone',   words: '"Fire and Blood"',   region: 'The Crownlands',  sigil: 'Three-Headed Dragon',   accent: '#c0392b', description: 'Blood of Old Valyria. They did not conquer Westeros — they burned it into submission. Dragon riders, dynasty builders, and the last of a world consumed by fire.', sigil_url: 'images/three.png', bg: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 60%, #1a0000 100%)', borderColor: '#7a1a1a' },
  { id: 'baratheon', name: 'BARATHEON', seat: "Storm's End",   words: '"Ours Is The Fury"', region: 'The Stormlands',  sigil: 'Crowned Black Stag',    accent: '#c9a84c', description: 'Born of storms, tempered by battle. The Baratheons seized the Iron Throne not through cunning but through iron will and a war hammer. Fury is not their weakness — it is their crown.', sigil_url: 'images/four.webp', bg: 'linear-gradient(135deg, #0a0a00 0%, #1f1c00 60%, #0a0a00 100%)', borderColor: '#5a5020' },
  { id: 'greyjoy',   name: 'GREYJOY',   seat: 'Pyke',          words: '"We Do Not Sow"',    region: 'The Iron Islands', sigil: 'Golden Kraken',        accent: '#b8a040', description: 'Reavers of the sea. Iron men who bow to no king but the Drowned God. What they cannot make, they take. What they cannot take, they burn. The sea is their kingdom — all else is plunder.', sigil_url: 'images/five.jpg',  bg: 'linear-gradient(135deg, #050810 0%, #0a1020 60%, #050810 100%)', borderColor: '#3a4a5a' },
  { id: 'tyrell',    name: 'TYRELL',    seat: 'Highgarden',    words: '"Growing Strong"',   region: 'The Reach',       sigil: 'Golden Rose',           accent: '#5a9e48', description: 'The richest lords of the Reach, whose roses feed the realm. Behind beauty and abundance lies a house of ruthless ambition — growing strong in gardens, and stronger still in schemes.', sigil_url: 'images/six.jpg',   bg: 'linear-gradient(135deg, #030a00 0%, #0a1800 60%, #030a00 100%)', borderColor: '#2a4a20' },
]

// ─── Element refs ───────────────────────────────────────────
const loading      = document.getElementById('loading')
const container    = document.getElementById('gotContainer')
const sticky       = document.getElementById('gotSticky')
const video        = document.getElementById('gotVideo')
const vignette     = document.getElementById('vignette')
const overlay      = document.getElementById('overlay')
const titleEl      = document.getElementById('title')
const subtitleEl   = document.getElementById('subtitle')
const bodyEl       = document.getElementById('body')
const sigilEl      = document.getElementById('sigil')
const progressEl   = document.getElementById('progress')
const chapterLabel = document.getElementById('chapterLabel')
const runeBar      = document.getElementById('runeBar')
const dotsWrap     = document.getElementById('dots')

// ─── Build dynamic bits (corners, rune ticks, dots) ─────────
const cornerSVG = `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 2 L2 20 M2 2 L20 2" stroke="#c9a84c" stroke-width="1" stroke-opacity="0.5"/>
  <path d="M2 2 L8 8" stroke="#c9a84c" stroke-width="0.5" stroke-opacity="0.4"/>
  <rect x="1" y="1" width="4" height="4" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-opacity="0.6"/>
</svg>`
document.querySelectorAll('.got-corner').forEach(c => (c.innerHTML = cornerSVG))

for (let i = 0; i < 80; i++) {
  const t = document.createElement('div')
  t.className = 'rune-tick'
  runeBar.appendChild(t)
}

CHAPTERS.forEach((_, i) => {
  const d = document.createElement('div')
  d.className = 'got-dot' + (i === 0 ? ' active' : '')
  dotsWrap.appendChild(d)
})
const dots = dotsWrap.querySelectorAll('.got-dot')

// ─── Initial chapter text ───────────────────────────────────
function setChapterText(ch) {
  titleEl.textContent    = ch.title
  subtitleEl.textContent = ch.subtitle
  bodyEl.textContent     = ch.body
  sigilEl.textContent    = ch.sigil
}
setChapterText(CHAPTERS[0])

// ─── Chapter transition (GSAP) ──────────────────────────────
let prevChapter = -1
function transitionChapter(idx) {
  if (prevChapter === idx) return
  prevChapter = idx
  const ch = CHAPTERS[idx]

  dots.forEach((d, i) => d.classList.toggle('active', i === idx))

  const tl = gsap.timeline()
  tl.to([titleEl, subtitleEl, bodyEl, sigilEl], {
    y: -24, opacity: 0, duration: 0.35, ease: 'power2.in', stagger: 0.04,
  })
  .call(() => setChapterText(ch))
  .fromTo([sigilEl, subtitleEl, titleEl, bodyEl],
    { y: 32, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.07 }
  )

  gsap.fromTo(chapterLabel, { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
  chapterLabel.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(CHAPTERS.length).padStart(2, '0')}`
}

// ─── Video ready → init scroll ──────────────────────────────
let videoReady = false
function onVideoReady() {
  if (videoReady) return
  setTimeout(() => {
    videoReady = true
    loading.classList.add('hidden')
    initScroll()
  }, 1000)
}
video.addEventListener('loadedmetadata', onVideoReady)
if (video.readyState >= 1) onVideoReady()

// ─── GSAP ScrollTrigger setup ───────────────────────────────
function initScroll() {
  const duration = video.duration || 1
  const scrollHeight = window.innerHeight * 6

  container.style.height = `${window.innerHeight * 6 + window.innerHeight}px`

  ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: `+=${scrollHeight}`,
    pin: sticky,
    pinSpacing: true,
    anticipatePin: 1,
  })

  gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: `+=${scrollHeight}`,
      scrub: 1.2,
      onUpdate: (self) => {
        const t = self.progress * duration
        if (Math.abs(video.currentTime - t) > 0.04) video.currentTime = t

        progressEl.style.width = `${self.progress * 100}%`

        const p = self.progress
        const idx = CHAPTERS.findIndex(c => p >= c.progress[0] && p < c.progress[1])
        transitionChapter(idx === -1 ? CHAPTERS.length - 1 : idx)

        vignette.style.opacity = String(0.55 + Math.sin(p * Math.PI) * 0.2)
      },
    },
  })

  gsap.to(overlay, {
    background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.0) 55%)',
    scrollTrigger: { trigger: container, start: 'top top', end: `+=${scrollHeight}`, scrub: 2 },
  })

  const ticks = runeBar.querySelectorAll('.rune-tick')
  gsap.fromTo(ticks, { scaleY: 0, opacity: 0 },
    { scaleY: 1, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'elastic.out(1,0.5)',
      scrollTrigger: { trigger: container, start: 'top 80%' } }
  )

  gsap.fromTo([sigilEl, subtitleEl, titleEl, bodyEl],
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.1, delay: 0.3 }
  )
}

// ─── SECTION 1: build house cards ───────────────────────────
const grid = document.getElementById('housesGrid')

HOUSES.forEach((house) => {
  const card = document.createElement('div')
  card.className = `house-card house-card--${house.id}`
  card.style.setProperty('--accent', house.accent)
  card.style.setProperty('--border', house.borderColor)
  card.style.background = house.bg

  card.innerHTML = `
    <span class="corner corner-tl"></span>
    <span class="corner corner-tr"></span>
    <span class="corner corner-bl"></span>
    <span class="corner corner-br"></span>
    <div class="card-glow"></div>
    <div class="house-sigil-wrap">
      <img class="house-sigil-img" src="${house.sigil_url}" alt="House ${house.name} sigil" />
      <div class="sigil-ring"></div>
    </div>
    <div class="house-content">
      <p class="house-region">${house.region}</p>
      <div class="house-divider">
        <span class="divider-line"></span>
        <span class="divider-diamond"></span>
        <span class="divider-line"></span>
      </div>
      <h2 class="house-name">HOUSE<br />${house.name}</h2>
      <p class="house-seat">${house.seat}</p>
      <p class="house-sigil-label">${house.sigil}</p>
    </div>
    <div class="house-hover-content">
      <p class="hover-words">${house.words}</p>
      <div class="house-divider hover-divider">
        <span class="divider-line"></span>
        <span class="divider-diamond"></span>
        <span class="divider-line"></span>
      </div>
      <h2 class="hover-name">HOUSE ${house.name}</h2>
      <p class="hover-desc">${house.description}</p>
    </div>
    <div class="card-accent-bar"></div>
  `
  grid.appendChild(card)

  const sigilWrap = card.querySelector('.house-sigil-wrap')
  const staticContent = card.querySelector('.house-content')
  const hoverContent  = card.querySelector('.house-hover-content')
  const sigilImg      = card.querySelector('.house-sigil-img')

  // image fallback (first letter of sigil name)
  sigilImg.addEventListener('error', () => {
    const fallback = document.createElement('div')
    fallback.className = 'house-sigil-fallback'
    fallback.textContent = house.sigil[0]
    sigilImg.replaceWith(fallback)
  })

  // hover behaviour
  card.addEventListener('mouseenter', () => {
    staticContent.classList.add('content-hidden')
    hoverContent.classList.add('hover-visible')
  })
  card.addEventListener('mouseleave', () => {
    staticContent.classList.remove('content-hidden')
    hoverContent.classList.remove('hover-visible')
    sigilWrap.style.transform = ''
  })
  // 3D sigil tilt
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14
    sigilWrap.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.06)`
  })
})

// staggered entrance for cards
const cards = grid.querySelectorAll('.house-card')
const cardObs = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const i = [...cards].indexOf(entry.target)
      setTimeout(() => entry.target.classList.add('visible'), i * 120)
      obs.unobserve(entry.target)
    }
  })
}, { threshold: 0.15 })
cards.forEach(c => cardObs.observe(c))

// header fade-up
const headerEls = document.querySelectorAll('.section1-header .fade-up')
const headerObs = new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    headerEls.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 150))
    obs.disconnect()
  }
}, { threshold: 0.2 })
if (document.getElementById('section1')) headerObs.observe(document.getElementById('section1'))
