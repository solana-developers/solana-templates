'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { getWalletErrorMessage } from './get-wallet-error-message'

type Props = Readonly<{
  error: unknown
  onClose?(): false | void
  title?: string
}>

export function WalletErrorDialog({ error, onClose, title }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (!onClose || onClose() !== false) {
            setIsOpen(false)
          }
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            {title ?? 'We encountered the following error'}
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 rounded-lg border border-muted bg-muted/50 p-4">
            {getWalletErrorMessage(error, 'Unknown')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button variant="destructive">Close</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
