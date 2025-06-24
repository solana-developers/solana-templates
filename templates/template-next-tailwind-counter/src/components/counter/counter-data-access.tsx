import {
  CounterAccount,
  getCloseInstruction,
  getCounterProgramAccounts,
  getCounterProgramId,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '@project/anchor'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { generateKeyPairSigner } from 'gill'
import { useWalletUi } from '@wallet-ui/react'
import { useWalletTransactionSignAndSend } from '../solana/use-wallet-transaction-sign-and-send'
import { useClusterVersion } from '@/components/cluster/use-cluster-version'
import { toastTx } from '@/components/toast-tx'
import { useWalletUiSigner } from '@/components/solana/use-wallet-ui-signer'
import { install as installEd25519 } from '@solana/webcrypto-ed25519-polyfill'

// polyfill ed25519 for browsers (to allow `generateKeyPairSigner` to work)
installEd25519()

export function useCounterProgramId() {
  const { cluster } = useWalletUi()
  return useMemo(() => getCounterProgramId(cluster.id), [cluster])
}

export function useCounterProgram() {
  const { client, cluster } = useWalletUi()
  const programId = useCounterProgramId()
  const query = useClusterVersion()

  return useQuery({
    retry: false,
    queryKey: ['get-program-account', { cluster, clusterVersion: query.data }],
    queryFn: () => client.rpc.getAccountInfo(programId).send(),
  })
}

export function useCounterInitializeMutation() {
  const { cluster } = useWalletUi()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner()
  const signAndSend = useWalletTransactionSignAndSend()

  return useMutation({
    mutationFn: async () => {
      const counter = await generateKeyPairSigner()
      return await signAndSend(getInitializeInstruction({ payer: signer, counter }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await queryClient.invalidateQueries({ queryKey: ['counter', 'accounts', { cluster }] })
    },
    onError: () => toast.error('Failed to run program'),
  })
}

export function useCounterDecrementMutation({ counter }: { counter: CounterAccount }) {
  const invalidateAccounts = useCounterAccountsInvalidate()
  const signer = useWalletUiSigner()
  const signAndSend = useWalletTransactionSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ counter: counter.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

export function useCounterIncrementMutation({ counter }: { counter: CounterAccount }) {
  const invalidateAccounts = useCounterAccountsInvalidate()
  const signAndSend = useWalletTransactionSignAndSend()
  const signer = useWalletUiSigner()

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ counter: counter.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

export function useCounterSetMutation({ counter }: { counter: CounterAccount }) {
  const invalidateAccounts = useCounterAccountsInvalidate()
  const signAndSend = useWalletTransactionSignAndSend()
  const signer = useWalletUiSigner()

  return useMutation({
    mutationFn: async (value: number) =>
      await signAndSend(
        getSetInstruction({
          counter: counter.address,
          value,
        }),
        signer,
      ),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

export function useCounterCloseMutation({ counter }: { counter: CounterAccount }) {
  const invalidateAccounts = useCounterAccountsInvalidate()
  const signAndSend = useWalletTransactionSignAndSend()
  const signer = useWalletUiSigner()

  return useMutation({
    mutationFn: async () => {
      return await signAndSend(getCloseInstruction({ payer: signer, counter: counter.address }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

export function useCounterAccountsQuery() {
  const { client } = useWalletUi()

  return useQuery({
    queryKey: useCounterAccountsQueryKey(),
    queryFn: async () => await getCounterProgramAccounts(client.rpc),
  })
}

function useCounterAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useCounterAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}

function useCounterAccountsQueryKey() {
  const { cluster } = useWalletUi()

  return ['counter', 'accounts', { cluster }]
}
