import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AppLayout } from '@/components/app-layout'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Placeholder',
  description: 'Description of placeholder',
}

const links: { label: string; path: string }[] = [
  // More links...
  { label: 'Account', path: '/account' },
]

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <AppLayout links={links}>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  )
}
