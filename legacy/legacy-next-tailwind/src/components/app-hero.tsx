import { ReactNode } from 'react'

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode
  title: ReactNode | string
  subtitle?: ReactNode | string
}) {
  return (
    <div className="py-[64px]">
      <div className="text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-bold">{title}</h1> : title}
          {subtitle ? typeof subtitle === 'string' ? <p className="py-6">{subtitle}</p> : subtitle : null}
          {children}
        </div>
      </div>
    </div>
  )
}
