'use client'

import { useSolanaChain } from '@wallet-ui/react'

export function ExplorerLink({ path, label, className }: { path: string; label: string; className?: string }) {
  const { chain } = useSolanaChain()
  const cluster = chain.id.includes('mainnet') ? '' : `?cluster=${chain.id.split(':')[1]}`

  return (
    <a
      href={`https://explorer.solana.com/${path}${cluster}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? className : `link font-mono`}
    >
      {label}
    </a>
  )
}
