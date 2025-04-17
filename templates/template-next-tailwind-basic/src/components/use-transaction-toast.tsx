import { toast } from 'sonner'
import { ExplorerLink } from './cluster/cluster-ui'

export function useTransactionToast() {
  return (signature: string) => {
    toast('Transaction sent', {
      description: <ExplorerLink transaction={signature} label="View Transaction" />,
    })
  }
}
