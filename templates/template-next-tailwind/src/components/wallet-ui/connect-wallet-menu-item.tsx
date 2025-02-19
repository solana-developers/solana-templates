'use client'

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import type { UiWallet, UiWalletAccount } from '@wallet-standard/react'
import { uiWalletAccountsAreSame, useConnect, useDisconnect } from '@wallet-standard/react'
import { useSolanaWallet } from '@wallet-ui/react'
import { useCallback } from 'react'

import { WalletMenuItemContent } from './wallet-menu-item-content'

interface Props {
  onAccountSelect(account: UiWalletAccount | undefined): void

  onDisconnect(wallet: UiWallet): void

  onError(err: unknown): void

  wallet: UiWallet
}

export function ConnectWalletMenuItem({ onAccountSelect, onDisconnect, onError, wallet }: Props) {
  const [isConnecting, connect] = useConnect(wallet)
  const [isDisconnecting, disconnect] = useDisconnect(wallet)
  const isPending = isConnecting || isDisconnecting
  const isConnected = wallet.accounts.length > 0
  const [selectedWalletAccount] = useSolanaWallet()

  const handleConnectClick = useCallback(async () => {
    try {
      const existingAccounts = [...wallet.accounts]
      const nextAccounts = await connect()
      // Try to choose the first never-before-seen account
      for (const nextAccount of nextAccounts) {
        if (!existingAccounts.some((existingAccount) => uiWalletAccountsAreSame(nextAccount, existingAccount))) {
          onAccountSelect(nextAccount)
          return
        }
      }
      // Failing that, choose the first account in the list
      if (nextAccounts[0]) {
        onAccountSelect(nextAccounts[0])
      }
    } catch (e) {
      onError(e)
    }
  }, [connect, onAccountSelect, onError, wallet.accounts])

  if (!isConnected) {
    return (
      <DropdownMenuItem disabled={isPending} onSelect={handleConnectClick}>
        <WalletMenuItemContent loading={isPending} wallet={wallet}>
          Connect
        </WalletMenuItemContent>
      </DropdownMenuItem>
    )
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="w-full">
        <WalletMenuItemContent loading={isPending} wallet={wallet} />
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent>
        <DropdownMenuLabel>Accounts</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={selectedWalletAccount?.address}>
          {wallet.accounts.map((account) => (
            <DropdownMenuRadioItem
              key={account.address}
              value={account.address}
              onSelect={() => onAccountSelect(account)}
            >
              {account.address.slice(0, 8)}...
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={handleConnectClick}>Connect More</DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive focus:text-destructive focus:bg-destructive/10"
          onSelect={async (e) => {
            e.preventDefault()
            try {
              await disconnect()
              onDisconnect(wallet)
            } catch (e) {
              onError(e)
            }
          }}
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
