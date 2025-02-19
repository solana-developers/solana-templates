import { ExplorerLink } from '@/components/explorer-link'
import { toast } from 'sonner'

export function useToastTransaction() {
  return (signature: string) =>
    toast('Transaction sent', {
      description: (
        <ExplorerLink path={`tx/${signature}`} label={'View Transaction'} className="btn btn-xs btn-primary" />
      ),
    })
}
