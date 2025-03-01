'use client'

import { useToastTransaction } from '@/hooks/use-toast-transaction'
import { getTransferSolInstruction } from 'gill/programs'
import { TOKEN_2022_PROGRAM_ADDRESS, TOKEN_PROGRAM_ADDRESS } from 'gill/programs/token'
import { useWalletAccountTransactionSendingSigner } from '@solana/react'
import type { Blockhash } from 'gill'
import {
  address,
  Address,
  appendTransactionMessageInstruction,
  assertIsTransactionMessageWithSingleSendingSigner,
  createTransactionMessage,
  getBase58Decoder,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
  TransactionSendingSigner,
} from 'gill'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UiWalletAccount } from '@wallet-standard/react'
import { SolanaClient, useSolanaClient, useSolanaCluster } from '@wallet-ui/react'
import { toast } from 'sonner'

export function useGetBalance({ address }: { address: Address }) {
  const { cluster } = useSolanaCluster()
  const client = useSolanaClient()

  return useQuery({
    queryKey: ['get-balance', { cluster, address }],
    queryFn: () =>
      client.rpc
        .getBalance(address)
        .send()
        .then((res) => res.value),
  })
}

export function useGetSignatures({ address }: { address: Address }) {
  const { cluster } = useSolanaCluster()
  const client = useSolanaClient()

  return useQuery({
    queryKey: ['get-signatures', { cluster, address }],
    queryFn: () => client.rpc.getSignaturesForAddress(address).send(),
  })
}

export function useGetTokenAccounts({ address }: { address: Address }) {
  const { cluster } = useSolanaCluster()
  const client = useSolanaClient()

  return useQuery({
    queryKey: ['get-token-accounts', { cluster, address }],
    queryFn: async () =>
      Promise.all([
        client.rpc
          .getTokenAccountsByOwner(
            address,
            { programId: TOKEN_PROGRAM_ADDRESS },
            { commitment: 'confirmed', encoding: 'jsonParsed' },
          )
          .send()
          .then((res) => res.value ?? []),
        client.rpc
          .getTokenAccountsByOwner(
            address,
            { programId: TOKEN_2022_PROGRAM_ADDRESS },
            { commitment: 'confirmed', encoding: 'jsonParsed' },
          )
          .send()
          .then((res) => res.value ?? []),
      ]).then(([tokenAccounts, token2022Accounts]) => [...tokenAccounts, ...token2022Accounts]),
  })
}

export function useTransferSol({ address, account }: { address: Address; account: UiWalletAccount }) {
  const { cluster } = useSolanaCluster()

  const toastTransaction = useToastTransaction()
  const client = useSolanaClient()
  const txSigner = useWalletAccountTransactionSendingSigner(account, cluster.id)
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['transfer-sol', { cluster, address }],
    mutationFn: async (input: { destination: Address; amount: number }) => {
      try {
        const { signature } = await createTransaction({
          txSigner,
          destination: input.destination,
          amount: input.amount,
          client,
        })

        console.log(signature)
        return signature
      } catch (error: unknown) {
        console.log('error', `Transaction failed! ${error}`)

        return
      }
    },
    onSuccess: (signature) => {
      if (signature?.length) {
        toastTransaction(signature)
      }
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get-balance', { cluster, address }],
        }),
        queryClient.invalidateQueries({
          queryKey: ['get-signatures', { cluster, address }],
        }),
      ])
    },
    onError: (error) => {
      toast.error(`Transaction failed! ${error}`)
    },
  })
}

// export function useRequestAirdrop({ address }: { address: Address }) {
//   const { cluster } = useSolanaCluster()
//   const client = useSolanaClient()
//   const queryClient = useQueryClient()
//   const toastTransaction = useToastTransaction()
//   const airdrop = airdropFactory({
//     rpc: client.rpc as RpcApi<SolanaRpcApiDevnet>,
//     rpcSubscriptions: client.rpcSubscriptions as RpcSubscriptions<SignatureNotificationsApi>,
//   })
//
//   return useMutation({
//     mutationKey: ['airdrop', { cluster, address }],
//     mutationFn: async (amount: number = 1) =>
//       airdrop({
//         commitment: 'confirmed',
//         recipientAddress: address,
//         lamports: lamports(BigInt(Math.round(amount * 1_000_000_000))),
//       }),
//     onSuccess: (signature) => {
//       toastTransaction(signature)
//       return Promise.all([
//         queryClient.invalidateQueries({ queryKey: ['get-balance', { cluster, address }] }),
//         queryClient.invalidateQueries({ queryKey: ['get-signatures', { cluster, address }] }),
//       ])
//     },
//   })
// }

async function createTransaction({
  amount,
  destination,
  client,
  txSigner,
}: {
  amount: number
  destination: Address
  client: SolanaClient
  txSigner: TransactionSendingSigner
}): Promise<{
  signature: string
  latestBlockhash: {
    blockhash: Blockhash
    lastValidBlockHeight: bigint
  }
}> {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()

  const message = pipe(
    createTransactionMessage({ version: 0 }),
    (m) => setTransactionMessageFeePayerSigner(txSigner, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
    (m) =>
      appendTransactionMessageInstruction(
        getTransferSolInstruction({
          amount,
          destination: address(destination),
          source: txSigner,
        }),
        m,
      ),
  )
  assertIsTransactionMessageWithSingleSendingSigner(message)

  const signature = await signAndSendTransactionMessageWithSigners(message)

  return {
    signature: getBase58Decoder().decode(signature),
    latestBlockhash,
  }
}
