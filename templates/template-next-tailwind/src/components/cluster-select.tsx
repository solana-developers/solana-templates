'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useSolanaCluster } from '@wallet-ui/react'

export function ClusterSelect() {
  const { cluster, clusters, setCluster } = useSolanaCluster()

  if (!setCluster) {
    return null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{cluster.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {clusters.map((item) => (
          <DropdownMenuItem key={item.id} onClick={() => setCluster(item.id)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
