'use client'

import { ExplorerLink } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import { useBasicProgram } from './basic-data-access'
import { BasicCreate, BasicProgram } from './basic-ui'
import { AppHero } from '../app-hero'
import { ellipsify } from '@/lib/utils'
import { UiWalletAccount, useWalletUi } from '@wallet-ui/react'

export default function BasicFeature() {
  const { account } = useWalletUi()

  if (!account) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="hero py-[64px]">
          <div className="hero-content text-center">
            <WalletButton />
          </div>
        </div>
      </div>
    )
  }

  return <BasicFeatureAccount account={account} />
}

function BasicFeatureAccount({ account }: { account: UiWalletAccount }) {
  const { programId } = useBasicProgram({ account })

  return (
    <div>
      <AppHero title="Basic" subtitle={'Run the program by clicking the "Run program" button.'}>
        <p className="mb-6">
          <ExplorerLink address={programId.toString()} label={ellipsify(programId.toString())} />
        </p>
        <BasicCreate account={account} />
      </AppHero>
      <BasicProgram account={account} />
    </div>
  )
}
