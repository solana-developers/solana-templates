import type { UiWalletAccount } from '@wallet-standard/react'
import { uiWalletAccountBelongsToUiWallet, useWallets } from '@wallet-standard/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface WalletAccountIconProps extends React.ComponentProps<typeof Avatar> {
  account: UiWalletAccount
}

export function WalletAccountIcon({ account, ...props }: WalletAccountIconProps) {
  const wallets = useWallets()
  let icon

  if (account.icon) {
    icon = account.icon
  } else {
    for (const wallet of wallets) {
      if (uiWalletAccountBelongsToUiWallet(account, wallet)) {
        icon = wallet.icon
        break
      }
    }
  }

  return (
    <Avatar {...props}>
      {icon && <AvatarImage src={icon} alt={account.label || 'Wallet'} />}
      <AvatarFallback>{(account.label?.[0] || 'W').toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
