// Load environment variables from .env file
import 'dotenv/config'
// Colors and prompts, yay!
import c from 'kleur'
import prompts from 'prompts'

// Solana Client SDK
import { Address, createSolanaClient, getMonikerFromGenesisHash, isAddress, lamportsToSol } from 'gill'
// Solana Client SDK (Node.js)
import { loadKeypairSignerFromFile } from 'gill/node'

// Get the Solana RPC endpoint from the environment variable or default to devnet
const urlOrMoniker = process.env.SOLANA_RPC_ENDPOINT || 'devnet'
const client = createSolanaClient({ urlOrMoniker })

// Load the keypair from the .env file or use the default (~/.config/solana/id.json)
const signer = await loadKeypairSignerFromFile(process.env.SOLANA_SIGNER_PATH)

// BELOW IS AN EXAMPLE, YOU CAN REMOVE IT AND REPLACE IT WITH YOUR OWN CODE

// Get the balance of the provided address and print it to the console
async function showBalance(address: Address) {
  const balance = await client.rpc.getBalance(address).send()
  console.log(c.gray(`Address : ${c.magenta(address)}`))
  console.log(c.gray(`Balance : ${c.magenta(lamportsToSol(balance.value))} SOL`))
}

// Welcome message
console.log(c.green(c.bold('Gm! Say hi to your new Solana script!')))

// Show the endpoint and cluster
console.log(c.gray(`Endpoint: ${urlOrMoniker.split('?')[0]}`))
const cluster = getMonikerFromGenesisHash(await client.rpc.getGenesisHash().send())
console.log(c.gray(`Cluster : ${c.white(cluster)}`))

// Show the signer's address and balance
console.log(c.magenta(c.bold('Signer Keypair')))
await showBalance(signer.address)

// Prompt the user for an address
const res = await prompts({ type: 'text', name: 'address', message: 'Check another address', validate: isAddress })
if (!res.address) {
  console.log(c.red('No address provided'))
  process.exit(1)
}
// Show the address and balance
await showBalance(res.address)

// And we're done!
console.log(c.green(`Now go build something awesome!`))
