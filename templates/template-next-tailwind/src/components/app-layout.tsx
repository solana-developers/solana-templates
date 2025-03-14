'use client'
import { usePathname } from 'next/navigation'
import { AppHeader, AppHeaderProps } from './app-header'
import { AppFooter } from '@/components/app-footer'

export interface AppLayoutProps extends Omit<AppHeaderProps, 'pathname'> {
  children: React.ReactNode
}

export function AppLayout({ children, ...headerProps }: AppLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col">
      <AppHeader {...headerProps} pathname={pathname} />
      <main className="flex-grow m-4 lg:mx-auto">{children}</main>
      <AppFooter />
    </div>
  )
}
