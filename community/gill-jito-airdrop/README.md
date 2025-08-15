## Solana Merkle Airdrop Distributor (Gill + Codama + Anchor)

A modern, script-driven Solana airdrop template that distributes SOL to many recipients efficiently using a Merkle tree. Only the 32‑byte Merkle root is stored on-chain. The project uses Anchor for the on-chain program, Codama for a generated TypeScript client, and the modern Solana Kit ("Gill") for transactions. This README focuses on how the program works and how to use it through the provided scripts.

### Table of Contents
- [Solana Merkle Airdrop Distributor (Gill + Codama + Anchor)](#solana-merkle-airdrop-distributor-gill--codama--anchor)
  - [Table of Contents](#table-of-contents)
  - [Quick Setup](#quick-setup)
    - [Initialize the on-chain airdrop state and makes it ready for claiming:](#initialize-the-on-chain-airdrop-state-and-makes-it-ready-for-claiming)
  - [Architecture Overview](#architecture-overview)
  - [Merkle Airdrop Model](#merkle-airdrop-model)
    - [Why Merkle (root-only on-chain)](#why-merkle-root-only-on-chain)
    - [Proof format and verification flow](#proof-format-and-verification-flow)
  - [On-Chain Design](#on-chain-design)
    - [Accounts](#accounts)
    - [Instructions](#instructions)
    - [State transitions and funds flow](#state-transitions-and-funds-flow)
  - [Program Interactions](#program-interactions)
  - [Security and Safety](#security-and-safety)
  - [Testing and Validation](#testing-and-validation)
  - [Version and Compatibility Notes](#version-and-compatibility-notes)
  - [Using the Scripts](#using-the-scripts)
  - [FAQ](#faq)
  - [Glossary](#glossary)
  - [Gaps and Suggestions](#gaps-and-suggestions)
- [🎓 Key Technologies](#-key-technologies)

---

### Quick Setup
```bash
pnpm create solana-dapp@latest -t gh:solana-foundation/templates/community/gill-jito-airdrop
```

```bash
cd <your-project>
pnpm install
```

Generates the necessary TypeScript types and client code from the Solana program:

```bash
pnpm codama:generate
```

Then setup the program:

```bash
pnpm airdrop:setup
```

This single command will:

- ✅ Create deployment wallet and fund it with SOL
- ✅ Generate test wallets for airdrop recipients
- ✅ Build and deploy the Solana program
- ✅ Update all configuration files
- ✅ Generate Merkle tree for airdrop distribution

#### Initialize the on-chain airdrop state and makes it ready for claiming:

```bash
pnpm airdrop:init
```

```bash
pnpm dev
```

---

### Architecture Overview

Airdrop distribution is reduced to a single on-chain commitment (the Merkle root), with off-chain generated proofs enabling recipients to claim their exact allocation. The template provides scripts to deploy, initialize, and claim using a type-safe, generated client.

```ascii
┌──────────────────────────────────────────────────────────┐
│                   Off-chain Preparation                  │
│  recipients.json  →  Merkle Tree  →  Root + Proofs       │
└───────────────┬───────────────────────┬──────────────────┘
                │                       │
  initialize(root, totalAmount)     claim(proof, amount, index)
                │                       │
        ┌───────▼─────────┐       ┌─────▼────────────────┐
        │  Airdrop State  │       │  Claim Status (PDA)  │
        │  (root stored)  │       │  per recipient       │
        └───────┬─────────┘       └──────────┬───────────┘
                │                            │
                │ funds                      │ prevent double-claim
                │                            │
           ┌────▼──────────┐            ┌────▼──────────┐
           │ Vault (PDA)   │ ───SOL──▶  │ Recipient     │
           └───────────────┘            └───────────────┘
```

---

### Merkle Airdrop Model

#### Why Merkle (root-only on-chain)
- Storing each recipient on-chain is expensive. A Merkle tree commits to the entire set with a single 32‑byte root.
- Each recipient proves inclusion with a logarithmic-size proof. On-chain verifies the proof against the stored root.
- Benefits: smaller state, predictable compute cost, scalable to large recipient sets.

#### Proof format and verification flow
- Leaf: hash of recipient data, typically `H(pubkey || amount)`. The exact encoding must match what the generator uses.
- Proof: ordered array of sibling hashes along the path to the root.
- Verification (simplified):
  1. Compute `leaf = H(pubkey || amount)` matching the off-chain generator’s format.
  2. Fold siblings: for each proof node, `hash = H(order(left, right))` using the known left/right order (often guided by `leafIndex`).
  3. Compare computed hash to the stored Merkle root; if equal, the claim is valid.

Gotcha: Proof order and the leaf encoding must match exactly. Any mismatch yields “invalid proof.”

---

### On-Chain Design

#### Accounts
- Airdrop State PDA
  - Purpose: Stores immutable Merkle root and global airdrop parameters.
  - Example seeds: ["airdrop", authority, airdropId]
  - Data (typical):
    - `authority: Pubkey` — entity initializing the airdrop
    - `merkleRoot: [u8; 32]`
    - `totalAmount: u64` — total lamports allocated
    - `claimedAmount: u64` — cumulative claimed lamports
    - `bump: u8`
  - Space: `8 (discriminator) + 32 + 32 + 8 + 8 + 1` ≈ 89 bytes; allocate with headroom (e.g., 128 bytes)

- Vault PDA (System Account owned by program)
  - Purpose: Holds SOL to be distributed.
  - Example seeds: ["vault", airdropState]
  - Data: lamports only; no data account needed if purely a System Account
  - Property: Only the program can move lamports from this PDA.

- Claim Status PDA (per recipient)
  - Purpose: Prevents double-claim.
  - Example seeds: ["claim", airdropState, recipientPubkey]
  - Data (typical):
    - `claimed: bool`
    - `amount: u64` (optional bookkeeping of claimed amount)
    - `bump: u8`
  - Space: `8 + 1 + 8 + 1` ≈ 18 bytes; allocate with headroom (e.g., 64 bytes)

Gotcha: Seeds shown are representative. Use the seeds compiled into your program and generated client.

#### Instructions
- initializeAirdrop
  - Inputs: `merkleRoot: [u8; 32]`, `totalAmount: u64`
  - Accounts: `authority (signer)`, `airdropState (PDA)`, `vault (PDA)`, `systemProgram`
  - Effects:
    - Creates/initializes `airdropState`
    - Optionally creates `vault`
    - Records the Merkle root and total allocation
    - May assert that sufficient SOL is present or transferred to `vault`

- claimAirdrop
  - Inputs: `amount: u64`, `leafIndex: u32|u64`, `proof: [[u8; 32]]`
  - Accounts: `signer (recipient)`, `airdropState`, `claimStatus (PDA)`, `vault (PDA)`, `systemProgram`
  - Effects:
    - Verifies the Merkle proof matches `(recipient, amount, index)`
    - Ensures `claimStatus` indicates not yet claimed
    - Marks as claimed and transfers `amount` lamports from `vault` to `signer`
    - Updates `claimedAmount`

Safeguards:
- Double-claim protection via `Claim Status` PDA.
- Root immutability: once set, the airdrop membership is fixed.
- Program-owned vault: only program logic moves funds.

#### State transitions and funds flow
- Initialize: `airdropState` is created with root and totals; `vault` is established and funded for the airdrop.
- Claim: Upon proof verification, lamports flow from `vault` to the claimant; `claimStatus` is created and marked to prevent reuse.
- Completion: When `claimedAmount == totalAmount`, distribution is complete. Any remainder handling (e.g., sweep/close) depends on program design.

---

### Program Interactions

Below are concise TypeScript examples using the generated Codama client. These snippets assume the scripts have already generated and wired the client paths. Use Solana Kit ("Gill") to create and send transactions.

Initialize airdrop:
```ts
import { getInitializeAirdropInstruction } from './anchor/generated/clients/ts/instructions/initializeAirdrop';
import { address } from 'gill'; // Gill/Solana Kit address helpers
// import your client, RPC, and wallet abstractions from your app’s runtime

const initIx = getInitializeAirdropInstruction({
  airdropState: airdropStatePda,      // PDA derived by client/helpers
  authority: authorityPubkey,         // wallet pubkey
  merkleRoot: new Uint8Array(root32), // 32-byte root
  amount: BigInt(totalLamports),      // u64
});

// Use your Solana Kit transaction helpers to send:
// await sendInstructions([initIx], { payer: authority, rpc });
```

Claim airdrop:
```ts
import { getClaimAirdropInstruction } from './anchor/generated/clients/ts/instructions/claimAirdrop';
import { address } from 'gill';

const proofBytes = proofHexArray.map(h => new Uint8Array(Buffer.from(h.slice(2), 'hex')));

const claimIx = getClaimAirdropInstruction({
  airdropState: airdropStatePda,
  userClaim: claimStatusPda,      // PDA for this recipient
  signer: recipientPubkey,        // claimant wallet
  proof: proofBytes,              // [[u8; 32]]
  amount: BigInt(recipientLamports),
  leafIndex: recipientIndex,
});

// await sendInstructions([claimIx], { payer: recipient, rpc });
```

Gotcha: Ensure the proof, amount, and index fed to the instruction are exactly those used by the Merkle generator that produced the root.

---

### Security and Safety

- Common pitfalls
  - Proof mismatch: Using a different hashing or encoding than the generator yields “invalid proof.”
  - Program ID mismatch: If the deployed ID differs from what the client expects, instruction builders point to the wrong program.
  - Replay/double-claim: Prevented by `Claim Status` PDA; if missing or mismatched seeds, a second claim may slip through in theory—stick to the generated client and canonical seeds.

- Upgrade authority and immutability
  - Keep the upgrade authority secure. Consider making the program immutable after thorough testing.
  - If upgradable, document any migration strategy for vault and state.

- Limits
  - Compute budget: Proof depth increases compute cost (~O(log n)). Very deep trees need budget tuning.
  - Account sizes: Reserve adequate space for PDAs (Anchor discriminator adds 8 bytes).
  - Transaction size: Large proofs or multiple instructions may approach limits; use single-claim per transaction.

Gotcha: Root immutability means membership is fixed. Changing recipients requires a new root and a new airdrop state.

---

### Testing and Validation

The test suite validates:
- Initialization creates PDAs and records the Merkle root
- Happy-path claim transfers lamports and marks the claim
- Double-claim is rejected via `Claim Status` PDA
- Incorrect proof or wrong amount fails verification
- Aggregate `claimedAmount` reflects actual transfers

See `anchor/tests/solana-distributor-comprehensive.test.ts` for end‑to‑end coverage using the generated client and Solana Kit helpers.

---

### Version and Compatibility Notes

- Anchor CLI: 0.31.1
- Solana CLI: 2.2.20+ (2.2.x)
- Rust: 1.88.0+
- Node.js: 22+

The template and generated client target these versions for consistent behavior and type compatibility.

---

### Using the Scripts

- Run the provided scripts in order to generate the client, deploy, and initialize the airdrop; then use the app or scripts to claim.
- Environment, program IDs, recipients, and Merkle artifacts are auto-managed by the scripts and committed to the expected paths.

---

### FAQ

- Why does my claim say “Address not eligible for this airdrop”?
  - The wallet is not in the recipients set used to produce the current Merkle root, or the proof/amount/index don’t match.

- I see “Program ID mismatch.” What now?
  - Ensure your generated client and scripts reference the deployed program ID. Re-run the script that fixes IDs and regenerates the client.

- Claims fail with “invalid proof.”
  - Ensure the generator and on-chain hashing agree on leaf encoding and sibling order. Regenerate proofs after any recipients change.

- Can someone claim twice with the same wallet?
  - No. The claim creates a `Claim Status` PDA keyed by `(airdropState, recipient)`. Second attempts are rejected.

- What if the vault runs out of SOL?
  - Claims will fail. Replenishment behavior depends on your program’s design. This template expects sufficient initial funding during initialization.

- Can I rotate the authority?
  - Not by default. Authority primarily matters at initialization. Changing authorities typically requires explicit program support and migration.

---

### Glossary

- Merkle root: A 32‑byte commitment to a set. Verifies inclusion with minimal proofs.
- Merkle proof: A sequence of sibling hashes used to reconstruct the root from a leaf.
- PDA (Program Derived Address): Deterministic, program-owned address derived from seeds, not signable by a private key.
- Lamports: Smallest unit of SOL (1 SOL = 1,000,000,000 lamports).
- Discriminator: Anchor’s 8‑byte account type prefix stored in every account it manages.
- Authority: The signer that initializes the airdrop; typically controls setup, not claims.
- Vault: Program-owned System Account holding the lamports to distribute.

---

### Gaps and Suggestions

- Explicit seeds and data layouts: Document the exact PDA seeds and account layouts as compiled, including endianness and serialization formats, in `anchor/README.md` alongside the IDL.
- Hashing details: Add a dedicated note specifying the leaf encoding and hash function, including byte order and any domain separators, to eliminate proof mismatches.
- Vault lifecycle: Clarify whether the vault can be topped up, swept, or closed, and under what authority or conditions.
- Compute guidance: Provide recommended compute budget and proof depth limits for large distributions, plus tips for splitting claims if needed.
- Error catalog: Include a short table mapping common on-chain error codes to actionable fixes to speed up debugging.
- Post-initialize governance: If upgrades remain enabled, document upgrade procedures and how they affect the client and deployed state; if not, state immutability explicitly.

---

## 🎓 Key Technologies

- **[Gill](https://github.com/decalLabs/gill)**: Modern Solana JavaScript SDK
- **[@solana/kit](https://github.com/anza-xyz/kit)**
- **[Codama](https://github.com/codama-idl/codama)**: Automatic client generation
- **[Anchor Framework](https://www.anchor-lang.com/)**: Solana program development
- **[Vitest](https://vitest.dev/)**: Fast unit testing framework

---

