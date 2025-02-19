'use client'

import { Button } from '@/components/ui/button'
import { ThemeSelect } from '@/components/theme-select'

export function HomeFeature() {
  return (
    <div>
      <div>HOME PAGE</div>
      <div>
        <Button
          onClick={() => {
            console.log('clicked')
          }}
        >
          Button
        </Button>

        <ThemeSelect />
      </div>
    </div>
  )
}
