'use client'

import { AppHero } from '@/components/app-layout'
import { ellipsify } from '@/components/ellipsify'
import { ExplorerLink } from '@/components/explorer-link'
import { address as addressFn } from 'gill'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { AccountBalance, AccountButtons, AccountTokens, AccountTransactions } from './account-ui'

export default function AccountDetailFeature() {
  const params = useParams()
  const address = useMemo(() => {
    if (!params.address) {
      return
    }
    try {
      return addressFn(params.address)
    } catch (e) {
      console.log(`Invalid public key`, e)
    }
  }, [params])

  if (!address) {
    return <div>Error loading account</div>
  }

  return (
    <div>
      <AppHero
        title={<AccountBalance address={address} />}
        subtitle={
          <div className="my-4">
            <ExplorerLink path={`account/${address}`} label={ellipsify(address.toString())} />
          </div>
        }
      >
        <div className="my-4">{<AccountButtons address={address} />}</div>
      </AppHero>

      <div className="space-y-8">
        <div>
          <AccountTokens address={address} />
        </div>
        <div>
          <AccountTransactions address={address} />
        </div>
      </div>
    </div>
  )
}
