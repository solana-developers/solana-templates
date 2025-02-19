'use client'

import React, { useState } from 'react'
import { WalletIllustration } from './wallet-illustration'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface WalletInfoContentProps {
  onClose: () => void
}

const steps = [
  {
    title: 'What is a Wallet?',
    content:
      'Wallets let you store, receive, send, and interact with digital assets like NFTs and tokens within web apps.',
  },
  {
    title: 'Security & Ease of Use.',
    content:
      'With blockchain apps, your wallet is used as a secure and easy way to login and interact with web applications.',
  },
  {
    title: 'Decentralized & Permissionless.',
    content:
      'An essential utility for permissionless blockchain usage. Wallets let you explore and participate in the new web.',
  },
]

export const WalletInfoContent: React.FC<WalletInfoContentProps> = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="flex flex-col items-center w-full pt-4">
      <WalletIllustration
        className="wallet-info-illustration"
        circleColors={['#123456', '#789ABC', '#DEF012', '#345678']}
        currentStep={currentStep}
      />
      <div className="relative w-[90%] h-[120px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center"
          >
            <h3 className="text-md font-bold text-white">{steps[currentStep].title}</h3>
            <p className="text-sm font-normal leading-[21px] text-[#808080]">{steps[currentStep].content}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="items-center justify-center flex relative w-full h-[30px]">
        <div className="w-[110%] h-[1px] absolute bg-gradient-to-r from-foreground/10 via-foreground/10 to-foreground/10" />
        <div className="justify-center bg-background items-center h-[10px] flex absolute p-[10px]">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`cursor-pointer bg-foreground/30 border-none rounded-[20%] w-[8px] h-[8px] mx-[5px] my-0 transition-all duration-200 ease-in-out
                                hover:bg-[#575757] hover:h-[10px]
                                ${
                                  index === currentStep
                                    ? 'bg-foreground/50 !w-[30px] hover:bg-foreground/50 hover:h-[10px]'
                                    : ''
                                }`}
            />
          ))}
        </div>
      </div>

      <Button variant="secondary" className="w-full">
        Learn More
      </Button>
    </div>
  )
}
