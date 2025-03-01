'use client'

import { useSolanaCluster } from '@wallet-ui/react'

export function ExplorerLink({ path, label, className }: { path: string; label: string; className?: string }) {
  const { cluster } = useSolanaCluster()
  const suffix = cluster.id.includes('mainnet') ? '' : `?cluster=${cluster.id.split(':')[1]}`

  return (
    <a
      href={`https://explorer.solana.com/${path}${suffix}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? className : `link font-mono`}
    >
      {label}
    </a>
  )
}
