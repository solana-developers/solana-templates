'use client'

import { AppHero } from '@/components/app-layout'
import { useSolanaWallet } from '@wallet-ui/react'

import { redirect } from 'next/navigation'
import { ConnectWalletMenu } from '../wallet-ui'

export default function AccountListFeature() {
  const [selectedWallet] = useSolanaWallet()

  if (selectedWallet?.address) {
    return redirect(`/account/${selectedWallet.address}`)
  }

  return (
    <AppHero>
      <ConnectWalletMenu>Connect Wallet</ConnectWalletMenu>
    </AppHero>
  )
}
