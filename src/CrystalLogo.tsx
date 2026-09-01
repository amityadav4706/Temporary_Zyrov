import { useEffect, useRef } from 'react'

type Crystal = {
  angle: number
  orbit: number
  size: number
  speed: number
  phase: number
  depth: number
  sides: number
  warmth: number
}

function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

function createCrystals(count: number) {
  const random = seededRandom(9417)
  return Array.from({ length: count }, (_, index): Crystal => ({
    angle: (index / count) * Math.PI * 2 + (random() - 0.5) * 0.13,
    orbit: 0.78 + random() * 0.23,
    size: 3.5 + random() * 9.5,
    speed: 0.025 + random() * 0.045,
    phase: random() * Math.PI * 2,
    depth: 0.45 + random() * 0.55,
    sides: 3 + Math.floor(random() * 4),
    warmth: random(),
  }))
}

export default function CrystalLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const stage = stageRef.current!
    const context = canvas.getContext('2d')!
    if (!canvas || !stage || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let crystals: Crystal[] = []
    let frameId = 0
    let stageWidth = 0
    let stageHeight = 0
    let startTime = performance.now()

    function resize() {
      const bounds = stage.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      stageWidth = bounds.width
      stageHeight = bounds.height
      canvas.width = Math.round(stageWidth * pixelRatio)
      canvas.height = Math.round(stageHeight * pixelRatio)
      canvas.style.width = `${stageWidth}px`
      canvas.style.height = `${stageHeight}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      crystals = createCrystals(stageWidth < 500 ? 52 : 82)
      draw(performance.now(), false)
    }

    function drawCrystal(crystal: Crystal, x: number, y: number, rotation: number, pulse: number) {
      const crystalSize = crystal.size * (0.72 + crystal.depth * 0.46) * pulse
      const alpha = 0.48 + crystal.depth * 0.48
      const warm = crystal.warmth > 0.38
      const brightColor = warm ? `rgba(255, 226, 150, ${alpha})` : `rgba(225, 232, 228, ${alpha})`
      const darkColor = warm ? `rgba(112, 72, 24, ${alpha * 0.68})` : `rgba(66, 70, 68, ${alpha * 0.68})`

      context.save()
      context.translate(x, y)
      context.rotate(rotation)
      context.beginPath()
      for (let side = 0; side < crystal.sides; side += 1) {
        const sideAngle = (side / crystal.sides) * Math.PI * 2
        const radius = crystalSize * (side % 2 === 0 ? 1 : 0.72)
        const pointX = Math.cos(sideAngle) * radius
        const pointY = Math.sin(sideAngle) * radius * 0.78
        if (side === 0) context.moveTo(pointX, pointY)
        else context.lineTo(pointX, pointY)
      }
      context.closePath()
      const gradient = context.createLinearGradient(-crystalSize, -crystalSize, crystalSize, crystalSize)
      gradient.addColorStop(0, brightColor)
      gradient.addColorStop(0.45, darkColor)
      gradient.addColorStop(1, brightColor)
      context.fillStyle = gradient
      context.shadowColor = warm ? 'rgba(238, 181, 78, .58)' : 'rgba(215, 224, 219, .36)'
      context.shadowBlur = crystalSize * 1.35
      context.fill()

      context.beginPath()
      context.moveTo(-crystalSize * 0.35, -crystalSize * 0.22)
      context.lineTo(crystalSize * 0.45, crystalSize * 0.15)
      context.strokeStyle = `rgba(255, 255, 245, ${alpha * 0.72})`
      context.lineWidth = 0.65
      context.stroke()
      context.restore()
    }

    function draw(timestamp: number, continueAnimation = true) {
      const elapsed = reducedMotion ? 0 : (timestamp - startTime) / 1000
      pointer.x += (pointer.targetX - pointer.x) * 0.035
      pointer.y += (pointer.targetY - pointer.y) * 0.035
      context.clearRect(0, 0, stageWidth, stageHeight)

      const centerX = stageWidth / 2
      const centerY = stageHeight / 2
      const orbitX = stageWidth * 0.405
      const orbitY = stageHeight * 0.39

      crystals.forEach((crystal) => {
        const currentAngle = crystal.angle + elapsed * crystal.speed
        const drift = Math.sin(elapsed * 0.7 + crystal.phase) * stageWidth * 0.012
        const shimmer = 0.82 + Math.sin(elapsed * 1.8 + crystal.phase) * 0.18
        const x = centerX + Math.cos(currentAngle) * orbitX * crystal.orbit + drift + pointer.x * crystal.depth * 9
        const y = centerY + Math.sin(currentAngle) * orbitY * crystal.orbit + Math.cos(elapsed * 0.55 + crystal.phase) * 5 + pointer.y * crystal.depth * 9
        drawCrystal(crystal, x, y, currentAngle + crystal.phase, shimmer)
      })

      if (!reducedMotion && continueAnimation) frameId = requestAnimationFrame(draw)
    }

    function movePointer(event: PointerEvent) {
      const bounds = stage.getBoundingClientRect()
      pointer.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      pointer.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      draw(performance.now(), false)
    }

    function resetPointer() {
      pointer.targetX = 0
      pointer.targetY = 0
      draw(performance.now(), false)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stage)
    stage.addEventListener('pointermove', movePointer)
    stage.addEventListener('pointerleave', resetPointer)
    resize()
    startTime = performance.now()
    draw(startTime)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      stage.removeEventListener('pointermove', movePointer)
      stage.removeEventListener('pointerleave', resetPointer)
    }
  }, [])

  return (
    <div className="crystal-stage" ref={stageRef}>
      <canvas className="crystal-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="logo-aura" aria-hidden="true" />
      <img className="membership-logo" src="/zyrov-gold-logo.png" alt="ZYROV — Comfort. Style. You." />
    </div>
  )
}