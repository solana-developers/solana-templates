'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { StandardConnect, StandardDisconnect } from '@wallet-standard/core'
import { uiWalletAccountBelongsToUiWallet, useWallets } from '@wallet-standard/react'
import { useSolanaWallet } from '@wallet-ui/react'
import { ChevronLeft, Info, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { ConnectedWalletContent } from './connected-wallet-content'

import { WalletErrorDialog } from './wallet-error-dialog'
import { WalletInfoContent } from './wallet-info-content'
import { WalletList } from './wallet-list'
import { WalletTrigger } from './wallet-trigger'

interface Props {
  children: React.ReactNode
}

export function ConnectWalletMenu({ children }: Props) {
  const { current: NO_ERROR } = useRef(Symbol())
  const wallets = useWallets()
  const [selectedWalletAccount, setSelectedWalletAccount] = useSolanaWallet()
  const [error, setError] = useState<symbol>(NO_ERROR)
  const [open, setOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const standardWallets = [...wallets].filter(
    (wallet) => wallet.features.includes(StandardConnect) && wallet.features.includes(StandardDisconnect),
  )
  const unconnectableWallets = [...wallets].filter(
    (wallet) => !wallet.features.includes(StandardConnect) || !wallet.features.includes(StandardDisconnect),
  )

  const handleError = (err: unknown) => {
    setError(err as symbol)
  }

  if (selectedWalletAccount) {
    const selectedWallet = [...wallets].find((wallet) =>
      wallet.accounts.some((account) => account.address === selectedWalletAccount.address),
    )
    return (
      <>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <WalletTrigger selectedWalletAccount={selectedWalletAccount} type="dropdown">
            {children}
          </WalletTrigger>

          <DropdownMenuContent align="end" className="w-[240px]">
            <ConnectedWalletContent
              account={selectedWalletAccount}
              wallet={selectedWallet!}
              onDisconnect={(wallet) => {
                if (selectedWalletAccount && uiWalletAccountBelongsToUiWallet(selectedWalletAccount, wallet)) {
                  setSelectedWalletAccount(undefined)
                }
              }}
              onError={handleError}
              setOpen={setOpen}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        {error !== NO_ERROR && <WalletErrorDialog error={error} onClose={() => setError(NO_ERROR)} />}
      </>
    )
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <WalletTrigger selectedWalletAccount={selectedWalletAccount} type="dialog">
          {children}
        </WalletTrigger>

        <DialogContent className="sm:max-w-[350px] !rounded-2xl px-4 pb-4 pt-2.5">
          <DialogHeader className="flex flex-row items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 !mt-0 rounded-full hover:bg-accent"
              onClick={() => setShowInfo(!showInfo)}
            >
              {showInfo ? (
                <ChevronLeft className="h-4 w-4 text-foreground/50 group-hover:text-foreground" />
              ) : (
                <Info className="h-4 w-4 text-foreground/50 group-hover:text-foreground" />
              )}
            </Button>
            <DialogTitle>{showInfo ? 'What is a wallet?' : 'Connect a Wallet'}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 !mt-0 rounded-full hover:bg-accent"
              onClick={() => setDialogOpen(false)}
            >
              <X className="h-4 w-4 text-foreground/50 group-hover:text-foreground" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>

          {showInfo ? (
            <WalletInfoContent onClose={() => setShowInfo(false)} />
          ) : (
            <WalletList
              wallets={[...wallets]}
              standardWallets={standardWallets}
              unconnectableWallets={unconnectableWallets}
              onAccountSelect={setSelectedWalletAccount}
              onDisconnect={(wallet) => {
                if (selectedWalletAccount && uiWalletAccountBelongsToUiWallet(selectedWalletAccount, wallet)) {
                  setSelectedWalletAccount(undefined)
                }
              }}
              onError={handleError}
              setOpen={setOpen}
              variant="dialog"
            />
          )}
        </DialogContent>
      </Dialog>

      {error !== NO_ERROR && <WalletErrorDialog error={error} onClose={() => setError(NO_ERROR)} />}
    </>
  )
}
