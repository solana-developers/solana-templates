'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { useSolanaChain, useSolanaRpc } from '@wallet-ui/react'
import { ReactNode } from 'react'

export function ChainChecker({ children }: { children: ReactNode }) {
  const { chain } = useSolanaChain()
  const { rpc } = useSolanaRpc()

  const query = useQuery({
    queryKey: ['version', { chain }],
    queryFn: () => rpc.getVersion().send(),
    retry: 1,
  })
  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <Alert>
        <div className="flex justify-between items-center">
          <span>
            Error connecting to chain <strong>{chain.label}</strong>
          </span>
          <Button onClick={() => query.refetch().catch((err) => console.log(err))}>Refresh</Button>
        </div>
      </Alert>
    )
  }
  return children
}
