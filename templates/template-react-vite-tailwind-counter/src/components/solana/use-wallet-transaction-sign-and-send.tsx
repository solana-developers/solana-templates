import { useWalletUi } from '@wallet-ui/react'
import type { IInstruction, TransactionSendingSigner } from 'gill'
import { createTransaction, getBase58Decoder, signAndSendTransactionMessageWithSigners } from 'gill'

export function useWalletTransactionSignAndSend() {
  const { client } = useWalletUi()

  return async (ix: IInstruction, signer: TransactionSendingSigner) => {
    const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()

    const transaction = createTransaction({
      feePayer: signer,
      version: 0,
      latestBlockhash,
      instructions: [ix],
    })

    const signature = await signAndSendTransactionMessageWithSigners(transaction)

    return getBase58Decoder().decode(signature)
  }
}
