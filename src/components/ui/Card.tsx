import React from "react"

interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white border shadow-sm rounded-lg p-4 mb-4 ${className}`}>
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  )
}
