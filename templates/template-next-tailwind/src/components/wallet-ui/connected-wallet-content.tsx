'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { UiWallet, UiWalletAccount, useDisconnect, useWallets } from '@wallet-standard/react'
import { Copy, LogOut } from 'lucide-react'
import { WalletAccountIcon } from './wallet-account-icon'
import { toast } from 'sonner'

interface ConnectedWalletContentProps {
  account: UiWalletAccount
  wallet: UiWallet
  onDisconnect: (wallet: UiWallet) => void
  onError: (error: unknown) => void
  setOpen: (open: boolean) => void
}

export function ConnectedWalletContent({
  account,
  wallet,
  onDisconnect,
  onError,
  setOpen,
}: ConnectedWalletContentProps) {
  // Get fresh wallet instances
  const wallets = useWallets()
  const currentWallet = wallets.find((w) => w.name === wallet.name)
  const [isDisconnecting, disconnect] = useDisconnect(currentWallet || wallet)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account.address)
    toast('Address copied to clipboard')
  }

  const handleDisconnect = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (!currentWallet) {
        toast('Wallet not found', {
          description: 'Failed to disconnect wallet',
        })
        toast.error('Wallet not found')
        return
      }
      await disconnect()
      onDisconnect(currentWallet)
      setOpen(false)
    } catch (error) {
      onError(error)
      toast.error('Failed to disconnect wallet')
    }
  }

  return (
    <>
      <div className="flex flex-row items-center space-x-4 px-2 w-full">
        <div className="relative">
          <WalletAccountIcon className="h-12 w-12 rounded-lg bg-foreground/10 p-2" account={account} />
        </div>
        <div className="flex flex-col justify-end items-end w-full">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="group p-0 hover:bg-transparent" onClick={handleCopy}>
              <span className="text-sm font-mono text-foreground/90 group-hover:text-foreground">
                {`${account.address.slice(0, 4)}····${account.address.slice(-4)}`}
              </span>
              <Copy className="h-4 w-4 text-foreground/50" />
            </Button>
          </div>
        </div>
      </div>
      <DropdownMenuSeparator />

      <div className="p-2">
        <Button
          variant="secondary"
          className="w-full gap-2"
          onClick={handleDisconnect}
          disabled={isDisconnecting || !currentWallet}
        >
          <LogOut className="h-4 w-4" />
          {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
        </Button>
      </div>
    </>
  )
}
