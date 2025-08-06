// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import BasicIDL from '../target/idl/basic.json'
import type { Basic } from '../target/types/basic'

// Re-export the generated IDL and type
export { Basic, BasicIDL }

// The programId is imported from the program IDL.
export const BASIC_PROGRAM_ID = new PublicKey(BasicIDL.address)

// This is a helper function to get the Basic Anchor program.
export function getBasicProgram(provider: AnchorProvider, address?: PublicKey): Program<Basic> {
  return new Program({ ...BasicIDL, address: address ? address.toBase58() : BasicIDL.address } as Basic, provider)
}

// This is a helper function to get the program ID for the Basic program depending on the cluster.
export function getBasicProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Basic program on devnet and testnet.
      return new PublicKey('6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF')
    case 'mainnet-beta':
    default:
      return BASIC_PROGRAM_ID
  }
}
