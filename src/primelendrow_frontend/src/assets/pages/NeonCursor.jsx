import React, { useState, useEffect } from "react"

const NeonCursor = () => {
    const [trails, setTrails] = useState([])
    const [lastPos, setLastPos] = useState(null)
    const [explosions, setExplosions] = useState([])

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newPoint = { x: e.clientX, y: e.clientY, id: Math.random() }
            let newTrails = [newPoint, ...trails]

            if (lastPos) {
                const dx = newPoint.x - lastPos.x
                const dy = newPoint.y - lastPos.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance > 1) {
                    const steps = Math.ceil(distance / 1)
                    for (let i = 1; i < steps; i++) {
                        newTrails.unshift({
                            x: lastPos.x + (dx * i) / steps,
                            y: lastPos.y + (dy * i) / steps,
                            id: Math.random(),
                        })
                    }
                }
            }
                
            setLastPos(newPoint)
            setTrails(newTrails.slice(0, 60))
        }

        const handleClick = (e) => {
            const particles = []

            for (let i = 0; i < 15; i++) { 
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    angle: Math.random() * Math.PI * 2,
                    speed: Math.random() * 6 + 3,
                    life: 0,
                    id: Math.random(),
                })
            }
                setExplosions((prev) => [...prev, ...particles])
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("click", handleClick)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("click", handleClick)
        }
    }, [trails, lastPos])

    useEffect(() => {
        const interval = setInterval(() => {
            setExplosions((prev) =>
                prev
                .map((p) => ({
                    ...p,
                    x: p.x + Math.cos(p.angle) * p.speed,
                    y: p.y + Math.sin(p.angle) * p.speed,
                    speed: p.speed * 1,
                    life: p.life + 1,
                }))
                .filter((p) => p.life < 25)
            )
        }, 16)
    
        return () => clearInterval(interval)
    }, [])

    return (
    <>
        {trails.map((trail, index) => {
            const scale = 1 - index * 0.02
            const opacity = 1 - index * 0.8

            return (
            <div
                key={trail.id}
                className="neon-trail"
                style={{
                left: trail.x + "px",
                top: trail.y + "px",
                transform: `scale(${scale})`,
                opacity: opacity,
                }}
            />
            )
        })}

        {explosions.map((particle) => (
            <div
            key={particle.id}
            className="explosion-particle"
            style={{
                left: particle.x + "px",
                top: particle.y + "px",
                opacity: 1 - particle.life / 25,
            }}
            />
        ))}
    </>
    )
}

export default NeonCursor