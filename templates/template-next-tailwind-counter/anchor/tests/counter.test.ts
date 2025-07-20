import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Counter } from '../target/types/counter'

describe('counter', () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Counter as Program<Counter>

  const counterKeypair = anchor.web3.Keypair.generate()

  it('Initialize Counter', async () => {
    await program.methods
      .initialize()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .signers([counterKeypair])
      .rpc()

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    )
    expect(currentCount.count).toEqual(0)
  })

  it('Increment Counter', async () => {
    await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc()

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    )
    expect(currentCount.count).toEqual(1)
  })

  it('Increment Counter Again', async () => {
    await program.methods
      .increment()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc()

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    )
    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Counter', async () => {
    await program.methods
      .decrement()
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc()
    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    )
    expect(currentCount.count).toEqual(1)
  })

  it('Set counter value', async () => {
    await program.methods
      .set(5)
      .accounts({
        counter: counterKeypair.publicKey,
      })
      .rpc()

    const currentCount = await program.account.counter.fetch(
      counterKeypair.publicKey
    )
    expect(currentCount.count).toEqual(5)
  })

  it('Set close the counter account', async () => {
    await program.methods
      .close()
      .accounts({
        counter: counterKeypair.publicKey,
        payer: payer.publicKey,
      })
      .rpc()

    const closedAccount = await provider.connection.getAccountInfo(
      counterKeypair.publicKey
    )
    expect(closedAccount).toBeNull()
  })
})
