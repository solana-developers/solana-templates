import {
  isWalletStandardError,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED,
  WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED,
} from '@wallet-standard/core'
import React from 'react'

export const NO_ERROR = Symbol()

export function getWalletErrorMessage(err: unknown, fallbackMessage: React.ReactNode): React.ReactNode {
  if (isWalletStandardError(err, WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_FEATURE_UNIMPLEMENTED)) {
    return (
      <>
        This account does not support the{' '}
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">{err.context.featureName}</code> feature
      </>
    )
  } else if (isWalletStandardError(err, WALLET_STANDARD_ERROR__FEATURES__WALLET_FEATURE_UNIMPLEMENTED)) {
    return (
      <div className="flex flex-col gap-4">
        <p>
          The wallet &apos;{err.context.walletName}&apos; (
          {err.context.supportedChains.sort().map((chain, ii, { length }) => (
            <React.Fragment key={chain}>
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">{chain}</code>
              {ii === length - 1 ? null : ', '}
            </React.Fragment>
          ))}
          ) does not support the{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">{err.context.featureName}</code>{' '}
          feature.
        </p>
        <div>
          Features supported:
          <ul className="list-disc pl-5 mt-2">
            {err.context.supportedFeatures.sort().map((featureName) => (
              <li key={featureName}>
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">{featureName}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  } else if (isWalletStandardError(err, WALLET_STANDARD_ERROR__FEATURES__WALLET_ACCOUNT_CHAIN_UNSUPPORTED)) {
    return (
      <div className="flex flex-col gap-4">
        <p>
          This account does not support the chain{' '}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">{err.context.chain}</code>.
        </p>
        <div>
          Chains supported:
          <ul className="list-disc pl-5 mt-2">
            {err.context.supportedChains.sort().map((chain) => (
              <li key={chain}>
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">{chain}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  } else if (err && typeof err === 'object' && 'message' in err) {
    return String(err.message)
  }
  return fallbackMessage
}
