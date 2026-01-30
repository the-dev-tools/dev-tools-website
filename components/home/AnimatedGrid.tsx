"use client"

import { useEffect, useRef, useCallback } from 'react'
import { animate } from 'motion'

const GRID_COLS = 14
const GRID_ROWS = 12
const TOTAL_CELLS = GRID_COLS * GRID_ROWS
const BASE_DELAY = 0.0015

function getCenter(element: HTMLElement) {
  const { x, y, width, height } = element.getBoundingClientRect()
  return { x: x + width / 2, y: y + height / 2 }
}

export default function AnimatedGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const cellsRef = useRef<HTMLDivElement[]>([])


  const runAnimation = useCallback(() => {
    const cells = cellsRef.current
    if (cells.length === 0) return

    const originIndex = Math.floor(Math.random() * TOTAL_CELLS)
    const originCell = cells[originIndex]
    const originPoint = getCenter(originCell)

    const delays: number[] = []
    for (let i = 0; i < TOTAL_CELLS; i++) {
      const cellPoint = getCenter(cells[i])
      const distance = Math.sqrt(
        (cellPoint.x - originPoint.x) ** 2 + (cellPoint.y - originPoint.y) ** 2
      )
      delays.push(distance * BASE_DELAY)
    }

    animate(
      cells,
      { opacity: [0, 1] },
      {
        type: 'spring',
        stiffness: 600,
        damping: 20,
        delay: (i: number) => (i === originIndex ? 0 : delays[i]),
      }
    )
  }, [])

  const updateCellProximity = useCallback((mouseX: number, mouseY: number) => {
    const cells = cellsRef.current
    const grid = gridRef.current
    if (!grid || cells.length === 0) return

    const rect = grid.getBoundingClientRect()
    const cellWidth = rect.width / GRID_COLS
    const cellHeight = rect.height / GRID_ROWS
    const maxDistance = cellWidth * 3 // Radius of effect

    for (let i = 0; i < TOTAL_CELLS; i++) {
      const col = i % GRID_COLS
      const row = Math.floor(i / GRID_COLS)
      const cellCenterX = rect.left + col * cellWidth + cellWidth / 2
      const cellCenterY = rect.top + row * cellHeight + cellHeight / 2

      const distance = Math.sqrt(
        (mouseX - cellCenterX) ** 2 + (mouseY - cellCenterY) ** 2
      )

      const intensity = Math.max(0, 1 - distance / maxDistance)
      const bgAlpha = 0.03 + intensity * 0.06
      const borderAlpha = 0.08 + intensity * 0.15
      const neonMix = intensity * 0.4

      const r = Math.round(255 * (1 - neonMix) + 77 * neonMix)
      const g = Math.round(255 * (1 - neonMix) + 225 * neonMix)
      const b = Math.round(255 * (1 - neonMix) + 255 * neonMix)

      cells[i].style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${bgAlpha})`
      cells[i].style.borderColor = `rgba(${r}, ${g}, ${b}, ${borderAlpha})`
    }
  }, [])

  const resetCells = useCallback(() => {
    const cells = cellsRef.current
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = 'rgba(255, 255, 255, 0.03)'
      cells[i].style.borderColor = 'rgba(255, 255, 255, 0.08)'
    }
  }, [])

  useEffect(() => {
    runAnimation()

    const handleMouseMove = (e: MouseEvent) => {
      updateCellProximity(e.clientX, e.clientY)
    }

    const handleMouseLeave = () => {
      resetCells()
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [runAnimation, updateCellProximity, resetCells])

  return (
    <div
      ref={gridRef}
      className="pointer-events-none fixed inset-0 -z-10 grid w-screen opacity-30"
      style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cellsRef.current[i] = el
          }}
          className="rounded-sm opacity-0"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        />
      ))}
    </div>
  )
}
