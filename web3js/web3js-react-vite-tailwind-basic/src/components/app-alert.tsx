import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import React from 'react'

export function AppAlert({ action, children }: { action: React.ReactNode; children: React.ReactNode }) {
  return (
    <Alert variant="warning">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{children}</AlertTitle>
      <AlertDescription className="flex justify-end">{action}</AlertDescription>
    </Alert>
  )
}
