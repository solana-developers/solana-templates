'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Menu } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { WalletButton } from '@/components/solana/solana-provider'
import { ClusterUiSelect } from '@/components/cluster/cluster-ui'

export interface AppHeaderLink {
  label: string
  href: string
}

export interface AppHeaderProps {
  links: AppHeaderLink[]
  pathname: string
}

function isActive({ href, pathname }: { href: string; pathname: string }) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function AppHeader({ links, pathname }: AppHeaderProps) {
  const [open, setOpen] = useState(false)

  const logo = (
    <Link href="/" className="font-bold text-xl text-indigo-900 dark:text-white" onClick={() => setOpen(false)}>
      Scaffold
    </Link>
  )

  return (
    <header className="h-16 border-b border-indigo-200 dark:border-indigo-900  sticky top-0 z-40">
      <div className="w-full h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <AppHeaderNavMobile logo={logo} links={links} pathname={pathname} open={open} setOpen={setOpen} />
          {logo}
          <AppHeaderNavDesktop links={links} pathname={pathname} />
        </div>
        <div className="flex items-center space-x-2">
          <WalletButton style={{ height: '38px' }} />
          <ClusterUiSelect />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function AppHeaderNavDesktop({ links, pathname }: AppHeaderProps) {
  return (
    <nav className="hidden sm:flex items-center space-x-2">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive({ href, pathname })
              ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-800 dark:text-white'
              : 'text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:text-white dark:hover:bg-indigo-800'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

function AppHeaderNavMobile({
  logo,
  links,
  pathname,
  open,
  setOpen,
}: AppHeaderProps & {
  logo: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="sm:hidden p-2 text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:hidden gap-0">
        <SheetHeader>
          <SheetTitle>{logo}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 p-2">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-indigo-100 text-indigo-900 dark:bg-indigo-800 dark:text-white'
                    : 'text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:text-white dark:hover:bg-indigo-800'
                }`}
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
