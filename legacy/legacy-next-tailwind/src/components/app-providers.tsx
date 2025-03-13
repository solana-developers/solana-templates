'use client'

import { ReactQueryProvider } from './react-query-provider'
import { SolanaProvider } from '@/components/solana/solana-provider'
import { ClusterProvider } from '@/components/cluster/cluster-data-access'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ClusterProvider>
        <SolanaProvider>{children}</SolanaProvider>
      </ClusterProvider>
    </ReactQueryProvider>
  )
}
