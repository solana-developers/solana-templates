import { useWallet } from '@solana/wallet-adapter-react'
import { ExplorerLink } from '@/components/cluster/cluster-ui'
import { WalletButton } from '@/components/solana/solana-provider'
import { AppHero } from '@/components/app-hero'
import { ellipsify } from '@/lib/utils'
import { useBasicProgram } from './basic-data-access'
import { BasicCreate, BasicProgram } from './basic-ui'

export default function BasicFeature() {
  const { publicKey } = useWallet()
  const { programId } = useBasicProgram()

  return publicKey ? (
    <div>
      <AppHero title="Basic" subtitle={'Run the program by clicking the "Run program" button.'}>
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <BasicCreate />
      </AppHero>
      <BasicProgram />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  )
}
