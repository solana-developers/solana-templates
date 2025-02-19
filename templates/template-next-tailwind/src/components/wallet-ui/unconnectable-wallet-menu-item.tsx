'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import type { UiWallet } from '@wallet-standard/react'
import { TriangleAlertIcon } from 'lucide-react'
import { useState } from 'react'

import { WalletErrorDialog } from './wallet-error-dialog'
import { WalletMenuItemContent } from './wallet-menu-item-content'

type Props = Readonly<{
  error: unknown
  wallet: UiWallet
}>

export function UnconnectableWalletMenuItem({ error, wallet }: Props) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <DropdownMenuItem disabled onClick={() => setDialogIsOpen(true)} className="opacity-50">
        <WalletMenuItemContent wallet={wallet}>
          <span className="line-through">{wallet.name}</span>
          <TriangleAlertIcon className="ml-auto h-4 w-4 shrink-0" />
        </WalletMenuItemContent>
      </DropdownMenuItem>

      {dialogIsOpen && (
        <WalletErrorDialog error={error} onClose={() => setDialogIsOpen(false)} title="Unconnectable wallet" />
      )}
    </>
  )
}
