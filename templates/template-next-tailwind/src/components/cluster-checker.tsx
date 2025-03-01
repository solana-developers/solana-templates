'use client'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { useSolanaClient, useSolanaCluster } from '@wallet-ui/react'
import { ReactNode } from 'react'

export function ClusterChecker({ children }: { children: ReactNode }) {
  const { cluster } = useSolanaCluster()
  const client = useSolanaClient()
  const query = useQuery({
    queryKey: ['version', { cluster }],
    queryFn: () => client.rpc.getVersion().send(),
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
            Error connecting to cluster <strong>{cluster.label}</strong>
          </span>
          <Button onClick={() => query.refetch().catch((err) => console.log(err))}>Refresh</Button>
        </div>
      </Alert>
    )
  }
  return children
}
