import { getGreetInstruction, getGreetInstructionDataDecoder, GREET_DISCRIMINATOR } from "../src/client/js"
import * as programClient from "../src/client/js";

import { createSolanaClient, createTransaction, generateKeyPairSigner, getSignatureFromTransaction, signTransactionMessageWithSigners } from "gill"

describe('basic', () => {
  const { rpc } = createSolanaClient({ urlOrMoniker: 'localnet' })
  it('should run the program and print "GM!" to the transaction log', async () => {
    const greetInstruction = getGreetInstruction()
    const signer = await generateKeyPairSigner();
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    const tx = createTransaction({
      feePayer: signer,
      instructions: [greetInstruction],
      version: "legacy",
      latestBlockhash
    })
    const signedTransaction = await signTransactionMessageWithSigners(tx)
    let sig = getSignatureFromTransaction(signedTransaction);
    console.log("Transaction signature:", sig);
  })
})


