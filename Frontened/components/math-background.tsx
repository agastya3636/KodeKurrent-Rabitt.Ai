"use client"

import { useEffect, useRef } from "react"

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Mathematical symbols and expressions to draw
    const symbols = [
      "π",
      "∑",
      "∫",
      "√",
      "∞",
      "≈",
      "≠",
      "±",
      "÷",
      "×",
      "y=mx+b",
      "E=mc²",
      "a²+b²=c²",
      "f(x)",
      "dy/dx",
      "∫f(x)dx",
      "∇",
      "∆",
      "∂",
      "∮",
      "∏",
      "∀",
      "∃",
      "∈",
      "⊂",
      "⊆",
      "sin(θ)",
      "cos(θ)",
      "tan(θ)",
      "log(x)",
      "e^x",
      "lim",
    ]

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawBackground()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    function drawBackground() {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set background color
      ctx.fillStyle = "#f9e8d4" // Soft beige background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw mathematical symbols
      ctx.font = "16px 'Times New Roman', serif"
      ctx.fillStyle = "rgba(128, 90, 120, 0.1)" // Very light purple

      const symbolCount = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < symbolCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const symbol = symbols[Math.floor(Math.random() * symbols.length)]
        const rotation = (Math.random() - 0.5) * 0.8 // Random slight rotation

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)
        ctx.fillText(symbol, 0, 0)
        ctx.restore()
      }

      // Draw some grid lines
      ctx.strokeStyle = "rgba(128, 90, 120, 0.05)" // Very light purple
      ctx.lineWidth = 1

      // Vertical lines
      const verticalSpacing = 50
      for (let x = 0; x < canvas.width; x += verticalSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      const horizontalSpacing = 50
      for (let y = 0; y < canvas.height; y += horizontalSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}

