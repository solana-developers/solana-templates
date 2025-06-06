'use client'

import { getBasicProgramId, getGreetInstruction } from '@project/anchor'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useTransactionToast } from '../use-transaction-toast'
import { toast } from 'sonner'
import {
  appendTransactionMessageInstruction,
  assertIsTransactionMessageWithSingleSendingSigner,
  createTransactionMessage,
  getBase58Decoder,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
} from 'gill'
import {
  UiWalletAccount,
  useWalletAccountTransactionSendingSigner,
  useWalletUi,
  useWalletUiCluster,
} from '@wallet-ui/react'

export function useBasicProgram({ account }: { account: UiWalletAccount }) {
  const { client } = useWalletUi()
  const { cluster } = useWalletUiCluster()
  const txSigner = useWalletAccountTransactionSendingSigner(account, cluster.id)
  const programId = useMemo(() => getBasicProgramId(cluster.id), [cluster])
  const transactionToast = useTransactionToast()

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => client.rpc.getAccountInfo(programId).send(),
  })

  const greet = useMutation({
    mutationKey: ['basic', 'greet', { cluster }],
    mutationFn: async () => {
      const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()
      console.log('latestBlockhash', latestBlockhash)
      const ix = getGreetInstruction({ programAddress: programId })
      const message = pipe(
        createTransactionMessage({ version: 0 }),
        (tx) => setTransactionMessageFeePayerSigner(txSigner, tx),
        (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
        (tx) => appendTransactionMessageInstruction(ix, tx),
      )

      assertIsTransactionMessageWithSingleSendingSigner(message)

      const signature = await signAndSendTransactionMessageWithSigners(message)

      return getBase58Decoder().decode(signature)
    },
    onSuccess: (signature) => {
      transactionToast(signature)
    },
    onError: () => toast.error('Failed to run program'),
  })

  return {
    programId,
    getProgramAccount,
    greet,
  }
}
