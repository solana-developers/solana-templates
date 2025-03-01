'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { clusterDevnet, clusterLocalnet, SolanaCluster, SolanaProvider } from '@wallet-ui/react'
import { ReactQueryProvider } from './react-query-provider'

// Add your clusters here.
const clusters: SolanaCluster[] = [
  clusterDevnet({
    // Customize the clusters here
    // rpcUrl: 'https://api.devnet.solana.com',
  }),
  clusterLocalnet(),
  // Enable mainnet when it's ready.
  // You will need a custom RPC URL for mainnet as the public RPC url can't be used for production.
  // clusterMainnet(),
]

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SolanaProvider clusters={clusters}>{children}</SolanaProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
