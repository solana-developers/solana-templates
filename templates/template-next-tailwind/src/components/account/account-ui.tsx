'use client'

import { AppModal } from '@/components/app-layout'
import { ellipsify } from '@/components/ellipsify'
import { ExplorerLink } from '@/components/explorer-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Address, address as addressUtil } from 'gill'
import { useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount } from '@wallet-standard/react'
import { useSolanaWallet } from '@wallet-ui/react'
import { RefreshCw } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useGetBalance, useGetSignatures, useGetTokenAccounts, useTransferSol } from './account-data-access'

export function AccountBalance({ address }: { address: Address }) {
  const query = useGetBalance({ address })

  return (
    <div>
      <h1 className="text-5xl font-bold cursor-pointer" onClick={() => query.refetch()}>
        {query.data ? <BalanceSol balance={query.data} /> : '...'}
      </h1>
    </div>
  )
}

// export function AccountChecker() {
//   const address = useSolanaWalletAddress()
//   if (!address) {
//     return null
//   }
//   return <AccountBalanceCheck address={address} />
// }

// export function AccountBalanceCheck({ address }: { address: Address }) {
//   const { cluster } = useSolanaCluster()
//   const mutation = useRequestAirdrop({ address })
//   const query = useGetBalance({ address })
//
//   if (query.isLoading) {
//     return 'Loading...'
//   }
//   if (query.isError || !query.data) {
//     return (
//       <Alert>
//         <div className="flex justify-between items-center">
//           <span>
//             You are connected to <strong>{cluster.label}</strong> but your account is not found on this cluster.
//           </span>
//           <Button onClick={() => mutation.mutateAsync(1).catch((err) => console.log(err))}>Request Airdrop</Button>
//         </div>
//       </Alert>
//     )
//   }
//   return null
// }

export function AccountButtons({ address }: { address: Address }) {
  // const { cluster } = useSolanaCluster()
  // const isMainnet = cluster.id === 'solana:mainnet'
  // const [airdropOpen, setAirdropOpen] = useState(false)
  const [receiveOpen, setReceiveOpen] = useState(false)
  const [sendOpen, setSendOpen] = useState(false)
  const [account] = useSolanaWallet()

  const canSend = address && account?.features.includes('solana:signAndSendTransaction')

  return (
    <div className="flex gap-2 whitespace-nowrap">
      {/*{isMainnet ? null : <ModalAirdrop address={address} open={airdropOpen} setOpen={setAirdropOpen} />}*/}
      <ModalReceive address={address} open={receiveOpen} setOpen={setReceiveOpen} />
      {account && canSend ? (
        <ModalSend address={address} open={sendOpen} setOpen={setSendOpen} account={account} />
      ) : null}
    </div>
  )
}

export function AccountTokens({ address }: { address: Address }) {
  const [showAll, setShowAll] = useState(false)
  const query = useGetTokenAccounts({ address })
  const client = useQueryClient()
  const items = useMemo(() => {
    if (showAll) return query.data
    return query.data?.slice(0, 5)
  }, [query.data, showAll])

  return (
    <div className="space-y-2">
      <div className="justify-between">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Token Accounts</h2>
          <div className="flex flex-col space-x-2">
            {query.isLoading ? (
              <span className="loading loading-spinner">Loading...</span>
            ) : (
              <Button
                variant="outline"
                disabled={query.isLoading}
                onClick={async () => {
                  await query.refetch()
                  await client.invalidateQueries({
                    queryKey: ['getTokenAccountBalance'],
                  })
                }}
              >
                <RefreshCw size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
      {query.isError && <pre className="alert alert-error">Error: {query.error?.message.toString()}</pre>}
      {query.isSuccess && (
        <div>
          {query.data.length === 0 ? (
            <div>No token accounts found.</div>
          ) : (
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Public Key</TableHead>
                  <TableHead>Mint</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items?.map(({ account, pubkey }) => (
                  <TableRow key={pubkey.toString()}>
                    <TableCell>
                      <div className="flex space-x-2">
                        <span className="font-mono">
                          <ExplorerLink label={ellipsify(pubkey.toString())} path={`account/${pubkey.toString()}`} />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <span className="font-mono">
                          <ExplorerLink
                            label={ellipsify(account.data.parsed.info.mint)}
                            path={`account/${account.data.parsed.info.mint}`}
                          />
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-mono">{account.data.parsed.info.tokenAmount?.uiAmount ?? 0}</span>
                    </TableCell>
                  </TableRow>
                ))}

                {(query.data?.length ?? 0) > 5 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                        {showAll ? 'Show Less' : 'Show All'}
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  )
}

export function AccountTransactions({ address }: { address: Address }) {
  const query = useGetSignatures({ address })
  const [showAll, setShowAll] = useState(false)

  const items = useMemo(() => {
    if (showAll) return query.data
    return query.data?.slice(0, 5)
  }, [query.data, showAll])

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="space-x-2">
          {query.isLoading ? (
            <span className="loading loading-spinner">Loading...</span>
          ) : (
            <Button variant="outline" disabled={query.isLoading} onClick={() => query.refetch()}>
              <RefreshCw size={16} />
            </Button>
          )}
        </div>
      </div>
      {query.isError && <pre className="alert alert-error">Error: {query.error?.message.toString()}</pre>}
      {query.isSuccess && (
        <div>
          {query.data.length === 0 ? (
            <div>No transactions found.</div>
          ) : (
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Signature</TableHead>
                  <TableHead className="text-right">Slot</TableHead>
                  <TableHead>Block Time</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item.signature}>
                    <TableHead className="font-mono">
                      <ExplorerLink path={`tx/${item.signature}`} label={ellipsify(item.signature, 8)} />
                    </TableHead>
                    <TableCell className="font-mono text-right">
                      <ExplorerLink path={`block/${item.slot}`} label={item.slot.toString()} />
                    </TableCell>
                    <TableCell>
                      {new Date((parseInt(item.blockTime?.toString() ?? '0') ?? 0) * 1000).toISOString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.err ? (
                        <div className="badge badge-error" title={item.err?.toString()}>
                          Failed
                        </div>
                      ) : (
                        <div className="badge badge-success">Success</div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {(query.data?.length ?? 0) > 5 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      <Button variant="outline" onClick={() => setShowAll(!showAll)}>
                        {showAll ? 'Show Less' : 'Show All'}
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  )
}

function BalanceSol({ balance }: { balance: bigint }) {
  const formattedSolValue = new Intl.NumberFormat(undefined, { maximumFractionDigits: 5 }).format(
    // @ts-expect-error This format string is 100% allowed now.
    `${balance}E-9`,
  )

  return <span>{`${formattedSolValue} \u25CE`}</span>
}

function ModalReceive({
  open,
  setOpen,
  address,
}: {
  setOpen: (open: boolean) => void
  open: boolean
  address: Address
}) {
  return (
    <AppModal
      title="Receive"
      description="Receive assets by sending them to your public key:"
      open={open}
      onOpenChange={setOpen}
    >
      <p>Receive assets by sending them to your public key:</p>
      <code>{address.toString()}</code>
    </AppModal>
  )
}

// function ModalAirdrop({
//   open,
//   setOpen,
//   address,
// }: {
//   setOpen: (open: boolean) => void
//   open: boolean
//   address: Address
// }) {
//   const mutation = useRequestAirdrop({ address })
//   const [amount, setAmount] = useState('2')
//
//   return (
//     <AppModal
//       open={open}
//       onOpenChange={setOpen}
//       title="Airdrop"
//       description="Request airdrop of SOL to your account."
//       submitDisabled={!amount || mutation.isPending}
//       submitLabel="Request Airdrop"
//       submit={() => mutation.mutateAsync(parseFloat(amount)).then(() => setOpen(false))}
//     >
//       <Input
//         disabled={mutation.isPending}
//         type="number"
//         step="any"
//         min="1"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//     </AppModal>
//   )
// }

function ModalSend({
  account,
  address,
  open,
  setOpen,
}: {
  account: UiWalletAccount
  address: Address
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const mutation = useTransferSol({ address, account })
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('1')

  const canSend = address && account?.features.includes('solana:signAndSendTransaction')

  return (
    <AppModal
      open={open}
      onOpenChange={setOpen}
      title="Send"
      disabled={!canSend}
      description="Send SOL to another account."
      submitDisabled={!destination || !amount || mutation.isPending}
      submitLabel="Send"
      submit={() => {
        mutation
          .mutateAsync({
            destination: addressUtil(destination),
            amount: parseFloat(amount),
          })
          .then(() => setOpen(false))
      }}
    >
      <Input
        disabled={mutation.isPending}
        type="text"
        placeholder="Destination"
        className="input input-bordered w-full"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <Input
        disabled={mutation.isPending}
        type="number"
        step="any"
        min="1"
        placeholder="Amount"
        className="input input-bordered w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </AppModal>
  )
}
