'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { UiWallet, UiWalletAccount, useConnect } from '@wallet-standard/react'
import { TriangleAlertIcon } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { ConnectWalletMenuItem } from './connect-wallet-menu-item'
import { UnconnectableWalletMenuItem } from './unconnectable-wallet-menu-item'
import { WalletMenuItemContent } from './wallet-menu-item-content'

interface WalletButtonProps {
  wallet: UiWallet
  onAccountSelect: (account: UiWalletAccount) => void
  onError: (error: unknown) => void
  setOpen: (open: boolean) => void
}

function WalletButton({ wallet, onAccountSelect, onError, setOpen }: WalletButtonProps) {
  const [, connect] = useConnect(wallet)

  const handleClick = async () => {
    try {
      const accounts = await connect()
      if (accounts?.[0]) {
        onAccountSelect(accounts[0])
        setOpen(false)
      }
    } catch (error) {
      onError(error)
    }
  }

  return (
    <Button variant="listItem" className="w-full justify-start px-4 py-6" onClick={handleClick}>
      <WalletMenuItemContent wallet={wallet} />
    </Button>
  )
}

interface WalletListProps {
  wallets: UiWallet[]
  standardWallets: UiWallet[]
  unconnectableWallets: UiWallet[]
  onAccountSelect: (account: UiWalletAccount) => void
  onDisconnect: (wallet: UiWallet) => void
  onError: (error: unknown) => void
  setOpen: (open: boolean) => void
  variant?: 'dialog' | 'dropdown'
}

export function WalletList({
  wallets,
  standardWallets,
  unconnectableWallets,
  onAccountSelect,
  onDisconnect,
  onError,
  setOpen,
  variant = 'dropdown',
}: WalletListProps) {
  if (wallets.length === 0) {
    return (
      <Alert variant="destructive" className="m-2">
        <TriangleAlertIcon className="h-4 w-4" />
        <AlertDescription>This browser has no wallets installed.</AlertDescription>
      </Alert>
    )
  }

  if (variant === 'dialog') {
    return (
      <div className="space-y-2">
        {standardWallets.map((wallet, idx) => (
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <div className="p-2">
                <UnconnectableWalletMenuItem error={error} wallet={wallet} />
              </div>
            )}
            key={`wallet:${wallet.name}-${idx}`}
          >
            <WalletButton wallet={wallet} onAccountSelect={onAccountSelect} onError={onError} setOpen={setOpen} />
          </ErrorBoundary>
        ))}
        {unconnectableWallets.length > 0 && (
          <>
            <div className="h-px bg-border my-2" />
            {unconnectableWallets.map((wallet) => (
              <ErrorBoundary
                fallbackRender={({ error }) => (
                  <div className="p-2">
                    <UnconnectableWalletMenuItem error={error} wallet={wallet} />
                  </div>
                )}
                key={`wallet:${wallet.name}`}
              >
                <Button variant="outline" className="w-full justify-start gap-2 opacity-50" disabled>
                  <WalletMenuItemContent wallet={wallet} />
                </Button>
              </ErrorBoundary>
            ))}
          </>
        )}
      </div>
    )
  }

  return (
    <>
      {standardWallets.map((wallet) => (
        <ErrorBoundary
          fallbackRender={({ error }) => <UnconnectableWalletMenuItem error={error} wallet={wallet} />}
          key={`wallet:${wallet.name}`}
        >
          <ConnectWalletMenuItem
            onAccountSelect={(account) => {
              if (account) {
                onAccountSelect(account)
                setOpen(false)
              }
            }}
            onDisconnect={onDisconnect}
            onError={onError}
            wallet={wallet}
          />
        </ErrorBoundary>
      ))}
      {unconnectableWallets.length > 0 && (
        <>
          <DropdownMenuSeparator />
          {unconnectableWallets.map((wallet) => (
            <ErrorBoundary
              fallbackRender={({ error }) => <UnconnectableWalletMenuItem error={error} wallet={wallet} />}
              key={`wallet:${wallet.name}`}
            >
              <ConnectWalletMenuItem
                onAccountSelect={(account) => {
                  if (account) {
                    onAccountSelect(account)
                    setOpen(false)
                  }
                }}
                onDisconnect={onDisconnect}
                onError={onError}
                wallet={wallet}
              />
            </ErrorBoundary>
          ))}
        </>
      )}
    </>
  )
}
