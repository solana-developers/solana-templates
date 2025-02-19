'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useSolanaChain } from '@wallet-ui/react'

export function ChainSelect() {
  const { chain, chains, setChain } = useSolanaChain()

  if (!setChain) {
    return null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{chain.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {chains.map((item) => (
          <DropdownMenuItem key={item.id} onClick={() => setChain(item.id)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
