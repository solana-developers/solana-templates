import type { UiWallet } from '@wallet-standard/react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type Props = Readonly<{
  children?: React.ReactNode
  loading?: boolean
  wallet: UiWallet
}>

export function WalletMenuItemContent({ children, loading, wallet }: Props) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className={cn('relative', loading && 'animate-pulse')}>
        <Avatar className="h-[24px] w-[24px] rounded-sm">
          <AvatarImage src={wallet.icon} alt={wallet.name} />
          <AvatarFallback className="text-xs">{wallet.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
      </div>
      <span className="truncate text-sm">{children ?? wallet.name}</span>
    </div>
  )
}
