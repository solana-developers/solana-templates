'use client'
import { usePathname } from 'next/navigation'
import { AppFooter } from '@/components/app-footer'
import { AppHeader, AppHeaderProps } from '@/components/app-header'
import { AccountChecker } from '@/components/account/account-ui'
import { ClusterChecker } from '@/components/cluster/cluster-ui'

export interface AppLayoutProps extends Omit<AppHeaderProps, 'pathname'> {
  children: React.ReactNode
}

export function AppLayout({ children, ...headerProps }: AppLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col">
      <AppHeader {...headerProps} pathname={pathname} />

      <main className="flex-grow m-4 lg:mx-auto">
        <ClusterChecker>
          <AccountChecker />
        </ClusterChecker>
        {children}
      </main>
      <AppFooter />
    </div>
  )
}
