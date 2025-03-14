import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import '@/components/wallet-ui.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AppLayout } from '@/components/app-layout'
import { AppHeaderLink } from '@/components/app-header'
import { AppProviders } from '@/components/app-providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Scaffold',
  description: 'Description of Scaffold',
}

const links: AppHeaderLink[] = [
  { href: '/', label: 'Dashboard' },
  { href: '/account', label: 'Account' },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppProviders>
            <AppLayout links={links}>{children}</AppLayout>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
