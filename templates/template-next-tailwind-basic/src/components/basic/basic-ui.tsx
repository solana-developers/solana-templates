'use client'

import { UiWalletAccount } from '@wallet-ui/react'
import { useBasicProgram } from './basic-data-access'
import { Button } from '@/components/ui/button'

export function BasicCreate({ account }: { account: UiWalletAccount }) {
  const { greet } = useBasicProgram({ account })

  return (
    <Button onClick={() => greet.mutateAsync()} disabled={greet.isPending}>
      Run program{greet.isPending && '...'}
    </Button>
  )
}

export function BasicProgram({ account }: { account: UiWalletAccount }) {
  const { getProgramAccount } = useBasicProgram({ account })

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      <pre>{JSON.stringify(getProgramAccount.data.value.data, null, 2)}</pre>
    </div>
  )
}
