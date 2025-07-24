// import { getCloseInstruction, getDecrementInstruction, getIncrementInstruction, getSetInstruction } from "../src/client/js"
import { createSolanaClient, createTransaction, generateKeyPairSigner, KeyPairSigner, signTransactionMessageWithSigners } from "gill"
import * as program from "../src/client/js"

describe('counter', () => {
  const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: 'localnet' })
  let payer: KeyPairSigner
  let counter: KeyPairSigner
  let value                   // TODO: add this type

  beforeAll(async () => {
    payer = await generateKeyPairSigner();
    counter = await generateKeyPairSigner();
    value = await rpc.getLatestBlockhash().send();  // We may have a bug here
  })

  it('Initialize Counter', async () => {

    const initializeInstruction = program.getInitializeInstruction({
      payer: payer,
      counter: counter
    })
    const tx = createTransaction({
      feePayer: payer,
      instructions: [initializeInstruction],
      version: "legacy",
      latestBlockhash: value
    })
    const signedTransaction = await signTransactionMessageWithSigners(tx);
    await sendAndConfirmTransaction(signedTransaction)
    const currentCounter = await program.fetchCounter(
      rpc,
      counter.address
    )
    expect(currentCounter.data.count).toEqual(0)
  })

  it.skip('Increment Counter', async () => {
    const incrementInstruction = program.getIncrementInstruction({
      counter: counter.address
    })
    const tx = createTransaction({
      feePayer: payer,
      instructions: [incrementInstruction],
      version: "legacy",
      latestBlockhash: value
    })
    const signedTransaction = await signTransactionMessageWithSigners(tx)
    await sendAndConfirmTransaction(signedTransaction)
    const currentCount = await program.fetchCounter(
      rpc,
      counter.address
    )
    expect(currentCount.data.count).toEqual(1)
  })

  it.skip('Increment Counter Again', async () => {
    const incrementInstruction = program.getIncrementInstruction({
      counter: counter.address
    })
    const tx = createTransaction({
      feePayer: payer,
      instructions: [incrementInstruction],
      version: "legacy",
      latestBlockhash: value
    })
    const signedTransaction = await signTransactionMessageWithSigners(tx)
    await sendAndConfirmTransaction(signedTransaction)
    const { data } = await program.fetchCounter(
      rpc,
      counter.address
    )
    expect(data.count).toEqual(2)
  })

  it.skip('Decrement Counter', async () => {
    const decrementInstruction = program.getDecrementInstruction({
      counter: counter.address
    })
    const tx = createTransaction({
      feePayer: payer,
      instructions: [decrementInstruction],
      version: "legacy",
      latestBlockhash: value
    })
    const signedTransaction = await signTransactionMessageWithSigners(tx)
    await sendAndConfirmTransaction(signedTransaction)
    const currentCount = await program.fetchCounter(
      rpc,
      counter.address
    )
    expect(currentCount.data.count).toEqual(1)
  })

  it.skip('Set counter value', async () => {
    const setInstruction = program.getSetInstruction({
      counter: counter.address,
      value: 42
    })
    const tx = createTransaction({
      feePayer: payer,
      instructions: [setInstruction],
      version: "legacy",
      latestBlockhash: value
    })
    const signedTransaction = await signTransactionMessageWithSigners(tx)
    await sendAndConfirmTransaction(signedTransaction)
    const currentCount = await program.fetchCounter(
      rpc,
      counter.address
    )
    expect(currentCount.data.count).toEqual(42)
  })

  it.skip('Set close the counter account', async () => {
    const closeInsturction = program.getCloseInstruction({
      payer: payer,
      counter: counter.address
    })
    const tx = createTransaction({
      feePayer: payer,
      instructions: [closeInsturction],
      version: "legacy",
      latestBlockhash: value
    })
    const signedTransaction = await signTransactionMessageWithSigners(tx)
    await sendAndConfirmTransaction(signedTransaction)
    const currentCount = await program.fetchCounter(
      rpc,
      counter.address
    ) 
    expect(currentCount).toBeNull()
  })
})
