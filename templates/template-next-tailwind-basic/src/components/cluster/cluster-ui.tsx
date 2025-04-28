'use client'

import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { ReactNode } from 'react'
import { getExplorerLink, GetExplorerLinkArgs } from 'gill'
import { Button } from '@/components/ui/button'
import { AppAlert } from '@/components/app-alert'
import { useWalletUi, useWalletUiCluster } from '@wallet-ui/react'

export function ExplorerLink({
  className,
  label = '',
  ...link
}: GetExplorerLinkArgs & {
  className?: string
  label: string
}) {
  return (
    <a
      href={getExplorerLink(link)}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? className : `link font-mono`}
    >
      {label}
    </a>
  )
}

export function ClusterChecker({ children }: { children: ReactNode }) {
  const { client } = useWalletUi()
  const { cluster } = useWalletUiCluster()

  const query = useQuery({
    queryKey: ['version', { cluster, endpoint: cluster.urlOrMoniker }],
    queryFn: () => client.rpc.getVersion(),
    retry: 1,
  })
  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return (
      <AppAlert
        action={
          <Button variant="outline" onClick={() => query.refetch()}>
            Refresh
          </Button>
        }
      >
        Error connecting to cluster <span className="font-bold">{cluster.label}</span>.
      </AppAlert>
    )
  }
  return children
}
