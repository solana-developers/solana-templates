// Here we export some useful types and functions for interacting with the Anchor program.
import BasicIDL from '../target/idl/basic.json'
import type { Basic } from '../target/types/basic'
import { address } from 'gill'
import { SolanaClusterId } from '@wallet-ui/react'

// Re-export the generated IDL and type
export { Basic, BasicIDL }

// The programId is imported from the program IDL.
export const BASIC_PROGRAM_ID = address(BasicIDL.address)

// This is a helper function to get the program ID for the Basic program depending on the cluster.
export function getBasicProgramId(cluster: SolanaClusterId) {
  switch (cluster) {
    case 'solana:devnet':
    case 'solana:testnet':
      // This is the program ID for the Basic program on devnet and testnet.
      return address('6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF')
    case 'solana:mainnet':
    default:
      return BASIC_PROGRAM_ID
  }
}

export * from './client/js'
