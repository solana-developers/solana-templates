'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { chainDevnet, chainLocal, SolanaChain } from '@wallet-ui/core'
import { SolanaProvider } from '@wallet-ui/react'
import { ReactQueryProvider } from './react-query-provider'

// Add your chains here.
const chains: SolanaChain[] = [
  chainDevnet({
    // Customize the chains here
    // rpcUrl: 'https://api.devnet.solana.com',
  }),
  chainLocal(),
  // Enable mainnet when it's ready.
  // You will need a custom RPC URL for mainnet as the public RPC url can't be used for production.
  // chainMainnet(),
]

export function AppProviders({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <SolanaProvider chains={chains}>{children}</SolanaProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
