'use client'

import {
  clusterDevnet,
  clusterLocalnet,
  clusterTestnet,
  SolanaCluster,
  SolanaProvider,
  SolanaWalletUiDialog,
} from '@wallet-ui/react'
import React from 'react'

const clusters: SolanaCluster[] = [
  clusterDevnet(),
  // Customize the clusters here
  clusterLocalnet({ urlOrMoniker: 'http://localhost:8899' }),
  clusterTestnet(),
  // Enable mainnet when it's ready.
  // You will need a custom RPC URL for mainnet as the public RPC url can't be used for production.
  // clusterMainnet(),
]

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SolanaProvider clusters={clusters}>
      <SolanaWalletUiDialog />
      {children}
    </SolanaProvider>
  )
}
