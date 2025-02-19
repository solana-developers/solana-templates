import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WalletIllustrationProps {
  className?: string
  circleColors?: [string, string, string, string]
  currentStep: number
}

interface AnimatedEllipseProps {
  cx: string
  cy: string
  rx: string
  ry: string
  transform: string
  fill: string
  filter: string
}

export const WalletIllustration: React.FC<WalletIllustrationProps> = ({
  className = '',
  circleColors = ['#5B48AD', '#DC1FFF', '#00FFA3', '#FECA1A'],
  currentStep,
}) => {
  const springTransition = {
    type: 'spring',
    stiffness: 150,
    damping: 19,
    mass: 1.2,
  }

  const svgVariants = {
    initial: {
      y: 50,
      rotate: -20,
      scale: 0,
    },
    step1: {
      y: 0,
      rotate: 20,
      scale: 1,
      transition: {
        springTransition,
      },
    },
    step2: {
      y: -44,
      x: -115,
      rotate: 360,
      scale: 0.2,
      transition: {
        springTransition,
      },
    },
    step3: {
      y: 0,
      x: 0,
      rotate: 0,
      scale: 0.6,
      transition: {
        ...springTransition,
      },
    },
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const ellipseVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        springTransition,
        delay: 0.2,
      },
    },
  }

  const circleVariants = {
    visible: { scale: 1, opacity: 1, x: 0 },
    hidden: { scale: 0, opacity: 0, x: -100 },
  }

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { ...springTransition } },
    step3: { opacity: 1, scale: 1, transition: { ...springTransition } },
  }

  const tokenVariants = {
    hidden: { scale: 0, opacity: 0, x: -100 },
    btcStep0: {
      x: 10,
      y: -120,
      scale: 0.8,
      rotate: -5,
      opacity: 1,
      transition: { springTransition, delay: 0.2 },
    },
    btcStep1: {
      x: -150,
      y: -22,
      scale: 0.23,
      rotate: -13,
      opacity: 1,
      transition: { springTransition },
    },
    ethStep0: {
      x: 48,
      y: 27,
      scale: 0.7,
      rotate: 0,
      opacity: 1,
      transition: { springTransition, delay: 0.3 },
    },
    ethStep1: {
      x: -150,
      y: 10,
      scale: 0.23,
      rotate: 0,
      opacity: 1,
      transition: { springTransition },
    },
    solStep0: {
      x: -150,
      y: -30,
      scale: 0.6,
      rotate: -15,
      opacity: 1,
      transition: { springTransition, delay: 0.4 },
    },
    solStep1: {
      x: -150,
      y: 42,
      scale: 0.23,
      rotate: 0,
      opacity: 1,
      transition: { springTransition },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { springTransition },
    },
  }

  const AnimatedEllipse: React.FC<AnimatedEllipseProps> = ({ cx, cy, rx, ry, transform, fill, filter }) => (
    <motion.g filter={filter} variants={ellipseVariants}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} transform={transform} fill={fill} />
    </motion.g>
  )

  return (
    <AnimatePresence>
      <div className={`flex justify-center relative w-full h-[200px] max-w-[364px] mx-auto my-0 ${className}`}>
        {currentStep === 0 && (
          <>
            <div className="absolute top-0 bottom-0 left-0 w-0">
              <motion.div
                className="absolute w-[50px] h-[50px] rounded-full opacity-70"
                style={{
                  backgroundColor: circleColors[0],
                  top: '0%',
                  left: '50px',
                  width: '45px',
                  height: '45px',
                }}
                variants={circleVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ springTransition, delay: 0.2 }}
              />
              <motion.div
                className="absolute w-[50px] h-[50px] rounded-full opacity-70"
                style={{
                  backgroundColor: circleColors[1],
                  bottom: '10%',
                  left: '80px',
                  width: '20px',
                  height: '20px',
                }}
                variants={circleVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ springTransition, delay: 0.3 }}
              />
            </div>
            <div className="absolute top-0 bottom-0 right-0 w-0">
              <motion.div
                className="absolute w-[50px] h-[50px] rounded-full opacity-70"
                style={{
                  backgroundColor: circleColors[2],
                  top: '45%',
                  right: '19px',
                  width: '30px',
                  height: '30px',
                }}
                variants={circleVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ springTransition, delay: 0.4 }}
              />
              <motion.div
                className="absolute w-[50px] h-[50px] rounded-full opacity-70"
                style={{
                  backgroundColor: circleColors[3],
                  bottom: '65%',
                  right: '75px',
                  width: '10px',
                  height: '10px',
                }}
                variants={circleVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ springTransition, delay: 0.5 }}
              />
            </div>
          </>
        )}
        {currentStep === 1 && (
          <>
            <motion.svg
              className="w-full h-full"
              width="904"
              height="636"
              viewBox="0 0 904 636"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              variants={backgroundVariants}
              initial="hidden"
              animate="visible"
            >
              <path
                d="M0 606C0 622.569 13.4315 636 30 636H874C890.569 636 904 622.569 904 606V66H0V606Z"
                fill="url(#paint0_linear_22_93)"
              />
              <path d="M41.5 408H864.5" stroke="#414141" />
              <path d="M41.5 302H864.5" stroke="#414141" />
              <path d="M41.5 509H864.5" stroke="#414141" />
              <ellipse
                cx="86.6078"
                cy="177.608"
                rx="52.2014"
                ry="52.2014"
                transform="rotate(78.5154 86.6078 177.608)"
                fill="#5B48AD"
              />
              <rect x="503" y="136" width="366" height="89" rx="33" fill="#565656" />
              <rect x="127" y="332" width="117" height="19" rx="9.5" fill="#565656" />
              <rect x="752" y="332" width="117" height="19" rx="9.5" fill="#565656" />
              <rect x="752" y="436" width="117" height="19" rx="9.5" fill="#565656" />
              <rect x="752" y="535" width="117" height="19" rx="9.5" fill="#565656" />
              <rect x="127" y="436" width="117" height="19" rx="9.5" fill="#565656" />
              <rect x="127" y="535" width="117" height="19" rx="9.5" fill="#565656" />
              <rect x="127" y="359" width="51" height="19" rx="9.5" fill="#3F3F3F" />
              <rect x="818" y="359" width="51" height="19" rx="9.5" fill="#3F3F3F" />
              <rect x="818" y="463" width="51" height="19" rx="9.5" fill="#3F3F3F" />
              <rect x="818" y="562" width="51" height="19" rx="9.5" fill="#3F3F3F" />
              <rect x="127" y="463" width="51" height="19" rx="9.5" fill="#3F3F3F" />
              <rect x="127" y="562" width="51" height="19" rx="9.5" fill="#3F3F3F" />
              <path d="M0 29C0 12.9837 12.9837 0 29 0H875C891.016 0 904 12.9837 904 29V67H0V29Z" fill="#565656" />
              <circle cx="41" cy="35" r="15" fill="#E54033" />
              <circle cx="93" cy="35" r="15" fill="#FECA1A" />
              <circle cx="145" cy="35" r="15" fill="#AFD803" />
              <defs>
                <linearGradient
                  id="paint0_linear_22_93"
                  x1="452"
                  y1="307"
                  x2="452"
                  y2="636"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#373737" />
                  <stop offset="1" stopColor="#2B2B2B" />
                </linearGradient>
              </defs>
            </motion.svg>
            <motion.div
              className="text-white z-[3] text-xs font-bold absolute top-[48px] left-[62%]"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              Connected
            </motion.div>
          </>
        )}
        {currentStep === 2 && (
          <>
            {/* New Background SVG for Step 3 */}
            <motion.svg
              className="w-[90%] h-[100%]"
              width="1149"
              height="628"
              viewBox="0 0 1149 628"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              variants={backgroundVariants}
              initial="hidden"
              animate="step3"
              exit="hidden"
              transition={{ ...springTransition }}
            >
              <motion.g variants={containerVariants} initial="hidden" animate="visible">
                <AnimatedEllipse
                  cx="283.316"
                  cy="42.4392"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(78.5154 283.316 42.4392)"
                  fill="#F7931A"
                  filter="url(#filter0_b_41_39)"
                />
                <AnimatedEllipse
                  cx="868.516"
                  cy="42.4392"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(78.5154 868.516 42.4392)"
                  fill="#F7931A"
                  filter="url(#filter1_b_41_39)"
                />
                <AnimatedEllipse
                  cx="283.316"
                  cy="585.777"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(78.5154 283.316 585.777)"
                  fill="#2775CA"
                  filter="url(#filter2_b_41_39)"
                />
                <AnimatedEllipse
                  cx="212.674"
                  cy="298.845"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(78.5154 212.674 298.845)"
                  fill="#E54033"
                  filter="url(#filter3_b_41_39)"
                />
                <AnimatedEllipse
                  cx="936.542"
                  cy="297.973"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(-101.485 936.542 297.973)"
                  fill="#24DCB3"
                  filter="url(#filter4_b_41_39)"
                />
                <AnimatedEllipse
                  cx="41.7361"
                  cy="121.803"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(78.5154 41.7361 121.803)"
                  fill="#5B48AD"
                  filter="url(#filter5_b_41_39)"
                />
                <AnimatedEllipse
                  cx="1107.48"
                  cy="475.016"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(-101.485 1107.48 475.016)"
                  fill="#2775CA"
                  filter="url(#filter6_b_41_39)"
                />
                <AnimatedEllipse
                  cx="41.7361"
                  cy="456.701"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(78.5154 41.7361 456.701)"
                  fill="#00FFA3"
                  filter="url(#filter7_b_41_39)"
                />
                <AnimatedEllipse
                  cx="1107.48"
                  cy="140.118"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(-101.485 1107.48 140.118)"
                  fill="#E54033"
                  filter="url(#filter8_b_41_39)"
                />
                <AnimatedEllipse
                  cx="868.516"
                  cy="585.777"
                  rx="35.214"
                  ry="35.214"
                  transform="rotate(78.5154 868.516 585.777)"
                  fill="#F5AC37"
                  filter="url(#filter9_b_41_39)"
                />
              </motion.g>
              <path
                d="M387.807 132.425L328.492 81M762.449 132.425L827.433 81M803.882 301.515H874.536M275.283 301.515H346.374M387.807 498.498L328.492 546M762.449 498.498L827.433 546M86 161.623L172.791 258.371M86 427.898L172.791 333.329M1066 179.491L980.953 258.371M1066 427.898L980.953 333.329"
                stroke="#3D3D3D"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <path
                d="M575.386 521.581C397.87 521.581 370.871 486.991 370.871 317.066C370.871 147.142 399.717 112.552 575.386 112.552C751.055 112.552 779.901 151.118 779.901 317.066C779.9 483.014 752.902 521.581 575.386 521.581Z"
                fill="#3C3C3C"
              />
              <defs>
                <filter
                  id="filter0_b_41_39"
                  x="194.095"
                  y="-46.7817"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter1_b_41_39"
                  x="779.295"
                  y="-46.7817"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter2_b_41_39"
                  x="194.095"
                  y="496.556"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter3_b_41_39"
                  x="123.453"
                  y="209.625"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter4_b_41_39"
                  x="847.321"
                  y="208.752"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter5_b_41_39"
                  x="-47.4848"
                  y="32.582"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter6_b_41_39"
                  x="1018.26"
                  y="385.795"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter7_b_41_39"
                  x="-47.4848"
                  y="367.48"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter8_b_41_39"
                  x="1018.26"
                  y="50.897"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
                <filter
                  id="filter9_b_41_39"
                  x="779.295"
                  y="496.556"
                  width="178.442"
                  height="178.442"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_41_39" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_41_39" result="shape" />
                </filter>
              </defs>
            </motion.svg>
          </>
        )}
        <motion.svg
          className="z-[1] w-[100px] h-auto absolute top-[30%]"
          width="364"
          height="286"
          viewBox="0 0 364 286"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={svgVariants}
          initial="initial"
          animate={currentStep === 0 ? 'step1' : currentStep === 1 ? 'step2' : 'step3'}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.3313 4.76639e-05C25.8291 -0.0402403 0.258863 25.4646 0.218576 56.9668L4.76637e-05 227.84C-0.0402403 259.342 25.4647 284.912 56.9669 284.952L305.892 285.271C337.394 285.311 362.964 259.806 363.004 228.304L363.223 57.4311C363.263 25.9289 337.758 0.358684 306.256 0.318396L57.3313 4.76639e-05ZM61.4111 10.1439C59.1431 10.1439 56.9108 10.2917 54.723 10.578C53.6232 10.722 52.6149 9.94706 52.4709 8.84721C52.327 7.74735 53.1019 6.73906 54.2018 6.59512C56.5619 6.28624 58.9683 6.127 61.4111 6.127H69.9687C71.0779 6.127 71.9771 7.02621 71.9771 8.13544C71.9771 9.24467 71.0779 10.1439 69.9687 10.1439H61.4111ZM85.0754 8.13544C85.0754 7.02621 85.9746 6.127 87.0839 6.127H104.199C105.308 6.127 106.207 7.02621 106.207 8.13544C106.207 9.24467 105.308 10.1439 104.199 10.1439H87.0839C85.9746 10.1439 85.0754 9.24467 85.0754 8.13544ZM119.306 8.13544C119.306 7.02621 120.205 6.127 121.314 6.127H138.429C139.539 6.127 140.438 7.02621 140.438 8.13544C140.438 9.24467 139.539 10.1439 138.429 10.1439H121.314C120.205 10.1439 119.306 9.24467 119.306 8.13544ZM153.536 8.13544C153.536 7.02621 154.435 6.127 155.545 6.127H172.66C173.769 6.127 174.668 7.02621 174.668 8.13544C174.668 9.24467 173.769 10.1439 172.66 10.1439H155.545C154.435 10.1439 153.536 9.24467 153.536 8.13544ZM187.766 8.13544C187.766 7.02621 188.666 6.127 189.775 6.127H206.89C207.999 6.127 208.899 7.02621 208.899 8.13544C208.899 9.24467 207.999 10.1439 206.89 10.1439H189.775C188.666 10.1439 187.766 9.24467 187.766 8.13544ZM221.997 8.13544C221.997 7.02621 222.896 6.127 224.005 6.127H241.12C242.23 6.127 243.129 7.02621 243.129 8.13544C243.129 9.24467 242.23 10.1439 241.12 10.1439H224.005C222.896 10.1439 221.997 9.24467 221.997 8.13544ZM256.227 8.13544C256.227 7.02621 257.126 6.127 258.236 6.127H275.351C276.46 6.127 277.359 7.02621 277.359 8.13544C277.359 9.24467 276.46 10.1439 275.351 10.1439H258.236C257.126 10.1439 256.227 9.24467 256.227 8.13544ZM290.458 8.13544C290.458 7.02621 291.357 6.127 292.466 6.127H301.024C303.449 6.127 305.839 6.28411 308.184 6.58896C309.284 6.73197 310.06 7.73961 309.917 8.83958C309.774 9.93956 308.766 10.7153 307.666 10.5723C305.493 10.2897 303.276 10.1439 301.024 10.1439H292.466C291.357 10.1439 290.458 9.24467 290.458 8.13544ZM319.398 11.3652C319.822 10.34 320.996 9.85228 322.021 10.2758C326.484 12.1191 330.65 14.5319 334.43 17.4232C335.311 18.0971 335.479 19.3576 334.805 20.2387C334.131 21.1197 332.87 21.2876 331.989 20.6137C328.484 17.9325 324.622 15.6963 320.488 13.9884C319.463 13.5648 318.975 12.3904 319.398 11.3652ZM42.9034 11.4139C43.3296 12.4379 42.845 13.6137 41.821 14.0399C37.6628 15.7708 33.7823 18.0366 30.2655 20.7516C29.3875 21.4295 28.1262 21.2672 27.4483 20.3892C26.7705 19.5112 26.9328 18.2499 27.8108 17.572C31.6032 14.6442 35.7894 12.1996 40.2773 10.3315C41.3014 9.90522 42.4771 10.3898 42.9034 11.4139ZM341.762 27.1594C342.64 26.4808 343.901 26.642 344.58 27.5194C347.491 31.2838 349.926 35.4372 351.793 39.8893C352.222 40.9122 351.741 42.0892 350.718 42.5182C349.695 42.9472 348.518 42.4657 348.089 41.4428C346.359 37.3177 344.102 33.4677 341.402 29.9769C340.724 29.0994 340.885 27.838 341.762 27.1594ZM20.4613 27.4136C21.3429 28.0868 21.5119 29.3472 20.8388 30.2288C18.1425 33.7601 15.8975 37.6525 14.1888 41.8199C13.768 42.8463 12.5949 43.3371 11.5686 42.9163C10.5423 42.4955 10.0514 41.3224 10.4722 40.2961C12.3164 35.7982 14.7386 31.5991 17.6461 27.7911C18.3193 26.9095 19.5797 26.7405 20.4613 27.4136ZM353.294 51.9859C354.393 51.837 355.405 52.6074 355.554 53.7066C355.871 56.0498 356.041 58.4391 356.054 60.8648L356.097 68.9791C356.103 70.0883 355.209 70.9923 354.1 70.9982C352.991 71.0042 352.087 70.1097 352.081 69.0005L352.037 60.8862C352.025 58.6341 351.868 56.4177 351.573 54.2457C351.425 53.1465 352.195 52.1348 353.294 51.9859ZM9.053 52.4975C10.1536 52.6355 10.9339 53.6397 10.7958 54.7403C10.5212 56.9295 10.3853 59.1626 10.3974 61.4306L10.4406 69.5449C10.4466 70.6541 9.55215 71.5581 8.44294 71.564C7.33372 71.5699 6.42972 70.6755 6.42381 69.5663L6.38052 61.452C6.36749 59.0093 6.51389 56.602 6.81017 54.2403C6.94824 53.1397 7.95239 52.3594 9.053 52.4975ZM354.165 83.21C355.274 83.2041 356.178 84.0985 356.184 85.2077L356.271 101.436C356.277 102.545 355.382 103.449 354.273 103.455C353.164 103.461 352.26 102.567 352.254 101.458L352.167 85.2291C352.161 84.1199 353.056 83.2159 354.165 83.21ZM8.50808 83.7758C9.6173 83.7698 10.5213 84.6642 10.5272 85.7735L10.6138 102.002C10.6197 103.111 9.7253 104.015 8.61608 104.021C7.50686 104.027 6.60287 103.133 6.59695 102.023L6.51038 85.7949C6.50446 84.6857 7.39886 83.7817 8.50808 83.7758ZM354.338 115.667C355.447 115.661 356.351 116.556 356.357 117.665L356.444 133.893C356.45 135.003 355.555 135.907 354.446 135.913C353.337 135.918 352.433 135.024 352.427 133.915L352.34 117.686C352.334 116.577 353.229 115.673 354.338 115.667ZM8.68123 116.233C9.79044 116.227 10.6944 117.121 10.7004 118.231L10.7869 134.459C10.7928 135.568 9.89845 136.472 8.78923 136.478C7.68001 136.484 6.77602 135.59 6.7701 134.481L6.68352 118.252C6.67761 117.143 7.57201 116.239 8.68123 116.233ZM354.511 148.124C355.62 148.118 356.524 149.013 356.53 150.122L356.617 166.351C356.623 167.46 355.728 168.364 354.619 168.37C353.51 168.376 352.606 167.481 352.6 166.372L352.513 150.143C352.508 149.034 353.402 148.13 354.511 148.124ZM8.85437 148.69C9.96359 148.684 10.8676 149.579 10.8735 150.688L10.9601 166.916C10.966 168.026 10.0716 168.93 8.96237 168.936C7.85316 168.941 6.94916 168.047 6.94324 166.938L6.85667 150.709C6.85075 149.6 7.74516 148.696 8.85437 148.69ZM354.684 180.582C355.794 180.576 356.698 181.47 356.703 182.579L356.79 198.808C356.796 199.917 355.902 200.821 354.792 200.827C353.683 200.833 352.779 199.938 352.773 198.829L352.687 182.601C352.681 181.491 353.575 180.587 354.684 180.582ZM9.02752 181.147C10.1367 181.141 11.0407 182.036 11.0467 183.145L11.1332 199.374C11.1391 200.483 10.2447 201.387 9.13552 201.393C8.0263 201.399 7.12231 200.504 7.11639 199.395L7.02982 183.166C7.0239 182.057 7.9183 181.153 9.02752 181.147ZM354.857 213.039C355.967 213.033 356.871 213.927 356.877 215.036L356.92 223.151C356.933 225.593 356.786 228.001 356.49 230.362C356.352 231.463 355.348 232.243 354.247 232.105C353.147 231.967 352.366 230.963 352.505 229.862C352.779 227.673 352.915 225.44 352.903 223.172L352.86 215.058C352.854 213.949 353.748 213.045 354.857 213.039ZM9.20067 213.604C10.3099 213.599 11.2139 214.493 11.2198 215.602L11.2631 223.716C11.2751 225.969 11.4328 228.185 11.727 230.357C11.8758 231.456 11.1054 232.468 10.0062 232.617C8.90705 232.766 7.89528 231.995 7.74641 230.896C7.42905 228.553 7.25919 226.164 7.24625 223.738L7.20296 215.624C7.19705 214.514 8.09145 213.61 9.20067 213.604ZM351.732 241.686C352.758 242.107 353.249 243.28 352.828 244.307C350.984 248.804 348.562 253.004 345.654 256.812C344.981 257.693 343.721 257.862 342.839 257.189C341.957 256.516 341.788 255.255 342.462 254.374C345.158 250.843 347.403 246.95 349.112 242.783C349.532 241.756 350.705 241.266 351.732 241.686ZM12.5824 242.084C13.6054 241.655 14.7824 242.137 15.2114 243.16C16.9413 247.285 19.1981 251.135 21.8979 254.626C22.5766 255.503 22.4154 256.765 21.5379 257.443C20.6605 258.122 19.3991 257.961 18.7205 257.083C15.8091 253.319 13.3741 249.166 11.507 244.713C11.078 243.69 11.5595 242.513 12.5824 242.084ZM335.852 264.213C336.53 265.092 336.368 266.353 335.49 267.031C331.697 269.958 327.511 272.403 323.023 274.271C321.999 274.697 320.823 274.213 320.397 273.189C319.971 272.165 320.455 270.989 321.479 270.563C325.638 268.832 329.518 266.566 333.035 263.851C333.913 263.173 335.174 263.335 335.852 264.213ZM28.4957 264.364C29.1696 263.483 30.4302 263.315 31.3112 263.989C34.8164 266.67 38.6784 268.906 42.8127 270.614C43.8379 271.038 44.3256 272.212 43.9021 273.237C43.4786 274.263 42.3042 274.75 41.279 274.327C36.8169 272.484 32.6506 270.071 28.8707 267.18C27.9897 266.506 27.8218 265.245 28.4957 264.364ZM310.829 275.755C310.973 276.855 310.198 277.864 309.099 278.008C306.738 278.316 304.332 278.476 301.889 278.476H293.332C292.222 278.476 291.323 277.576 291.323 276.467C291.323 275.358 292.222 274.459 293.332 274.459H301.889C304.157 274.459 306.39 274.311 308.577 274.025C309.677 273.881 310.685 274.656 310.829 275.755ZM53.3834 275.763C53.5264 274.663 54.534 273.887 55.634 274.03C57.8075 274.313 60.0248 274.459 62.2769 274.459H70.8345C71.9437 274.459 72.8429 275.358 72.8429 276.467C72.8429 277.576 71.9437 278.476 70.8345 278.476H62.2769C59.8511 278.476 57.4609 278.319 55.1161 278.014C54.0161 277.871 53.2403 276.863 53.3834 275.763ZM85.9412 276.467C85.9412 275.358 86.8404 274.459 87.9497 274.459H105.065C106.174 274.459 107.073 275.358 107.073 276.467C107.073 277.576 106.174 278.476 105.065 278.476H87.9497C86.8404 278.476 85.9412 277.576 85.9412 276.467ZM120.172 276.467C120.172 275.358 121.071 274.459 122.18 274.459H139.295C140.404 274.459 141.304 275.358 141.304 276.467C141.304 277.576 140.404 278.476 139.295 278.476H122.18C121.071 278.476 120.172 277.576 120.172 276.467ZM154.402 276.467C154.402 275.358 155.301 274.459 156.41 274.459H173.526C174.635 274.459 175.534 275.358 175.534 276.467C175.534 277.576 174.635 278.476 173.526 278.476H156.41C155.301 278.476 154.402 277.576 154.402 276.467ZM188.632 276.467C188.632 275.358 189.531 274.459 190.641 274.459H207.756C208.865 274.459 209.764 275.358 209.764 276.467C209.764 277.576 208.865 278.476 207.756 278.476H190.641C189.531 278.476 188.632 277.576 188.632 276.467ZM222.863 276.467C222.863 275.358 223.762 274.459 224.871 274.459H241.986C243.095 274.459 243.995 275.358 243.995 276.467C243.995 277.576 243.095 278.476 241.986 278.476H224.871C223.762 278.476 222.863 277.576 222.863 276.467ZM257.093 276.467C257.093 275.358 257.992 274.459 259.101 274.459H276.217C277.326 274.459 278.225 275.358 278.225 276.467C278.225 277.576 277.326 278.476 276.217 278.476H259.101C257.992 278.476 257.093 277.576 257.093 276.467ZM57.692 28.6475C46.0599 28.6475 36.6303 38.0771 36.6303 49.7092C36.6303 61.3412 46.0599 70.7709 57.692 70.7709L105.447 70.7709C113.852 70.7709 121.345 76.2202 128.777 81.6251C133.114 84.7793 137.43 87.9182 141.894 89.9503C144.55 91.1592 147.501 91.8326 150.61 91.8326H212.556C215.664 91.8326 218.616 91.1592 221.272 89.9503C225.736 87.9182 230.052 84.7793 234.389 81.6251C241.821 76.2202 249.313 70.7709 257.719 70.7709L305.477 70.7709C317.109 70.7709 326.538 61.3412 326.538 49.7092C326.538 38.0771 317.109 28.6475 305.477 28.6475H57.692Z"
            fill="white"
          />
        </motion.svg>
        <motion.svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] w-[66px] h-[66px]"
          width="124"
          height="124"
          viewBox="0 0 124 124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={tokenVariants}
          initial="hidden"
          animate={currentStep === 0 ? 'btcStep0' : currentStep === 1 ? 'btcStep1' : 'hidden'}
          exit="hidden"
        >
          <path
            d="M61.667 123.334C95.7248 123.334 123.334 95.7248 123.334 61.667C123.334 27.6093 95.7248 0 61.667 0C27.6093 0 0 27.6093 0 61.667C0 95.7248 27.6093 123.334 61.667 123.334Z"
            fill="#F7931A"
          />
          <path
            d="M89.3756 54.0351C90.5858 45.9567 84.4307 41.6131 76.0208 38.7147L78.7496 27.7688L72.0895 26.1115L69.4302 36.7683C67.6804 36.329 65.8843 35.9204 64.0921 35.5119L66.7708 24.7857L60.1107 23.1245L57.382 34.0666C55.9328 33.7351 54.5067 33.4113 53.1269 33.0645L53.1346 33.0298L43.9463 30.7365L42.1733 37.8514C42.1733 37.8514 47.1183 38.9845 47.0142 39.0539C49.7121 39.7284 50.1978 41.5128 50.1168 42.9312L47.0103 55.3995C47.1953 55.4457 47.4343 55.5151 47.7041 55.6192L46.9988 55.4457L42.6435 72.9129C42.3121 73.73 41.4757 74.9595 39.5872 74.4931C39.6566 74.5895 34.7463 73.2868 34.7463 73.2868L31.4394 80.9104L40.1113 83.0726C41.7224 83.4772 43.3026 83.9012 44.8558 84.2982L42.1001 95.3674L48.7563 97.0247L51.4851 86.0788C53.3042 86.5683 55.0694 87.0231 56.7961 87.4548L54.0751 98.3544L60.7351 100.012L63.4908 88.9656C74.853 91.1162 83.3939 90.249 86.9898 79.9738C89.8882 71.7027 86.8472 66.9274 80.8694 63.817C85.2246 62.8149 88.5007 59.9513 89.3756 54.0351V54.0351ZM74.1515 75.3796C72.0973 83.6545 58.1644 79.1798 53.6473 78.0583L57.3087 63.3931C61.8258 64.5223 76.306 66.7539 74.1515 75.3796ZM76.2135 53.9156C74.3365 61.4428 62.7431 57.6156 58.9853 56.6791L62.2999 43.3821C66.0577 44.3187 78.1715 46.0646 76.2135 53.9156Z"
            fill="white"
          />
        </motion.svg>
        <motion.svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] w-[66px] h-[66px]"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={tokenVariants}
          initial="hidden"
          animate={currentStep === 0 ? 'ethStep0' : currentStep === 1 ? 'ethStep1' : 'hidden'}
          exit="hidden"
        >
          <path
            d="M49.667 99.334C77.0973 99.334 99.334 77.0973 99.334 49.667C99.334 22.2367 77.0973 0 49.667 0C22.2367 0 0 22.2367 0 49.667C0 77.0973 22.2367 99.334 49.667 99.334Z"
            fill="#627EEA"
          />
          <path d="M51.2143 12.4194V39.9536L74.4864 50.3526L51.2143 12.4194Z" fill="white" fillOpacity="0.602" />
          <path d="M51.213 12.4189L27.9378 50.3521L51.213 39.9531V12.4189Z" fill="white" />
          <path d="M51.2143 68.194V86.9029L74.5019 54.6846L51.2143 68.194Z" fill="white" fillOpacity="0.602" />
          <path d="M51.2136 86.9029V68.1909L27.9384 54.6846L51.2136 86.9029Z" fill="white" />
          <path d="M51.2143 63.8653L74.4864 50.3528L51.2143 39.96V63.8653Z" fill="white" fillOpacity="0.2" />
          <path d="M27.9384 50.3528L51.2136 63.8653V39.96L27.9384 50.3528Z" fill="white" fillOpacity="0.602" />
        </motion.svg>
        <motion.svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] w-[66px] h-[66px]"
          width="121"
          height="121"
          viewBox="0 0 121 121"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={tokenVariants}
          initial="hidden"
          animate={currentStep === 0 ? 'solStep0' : currentStep === 1 ? 'solStep1' : 'hidden'}
          exit="hidden"
        >
          <path
            d="M60.3375 120.675C93.7747 120.675 120.675 93.7748 120.675 60.3375C120.675 26.9003 93.7747 0 60.3375 0C26.9002 0 -6.10352e-05 26.9003 -6.10352e-05 60.3375C-6.10352e-05 93.7748 26.9002 120.675 60.3375 120.675Z"
            fill="#FFFCFB"
          />
          <path
            d="M120.175 60.3375C120.175 93.4987 93.4986 120.175 60.3375 120.175C27.1764 120.175 0.499939 93.4987 0.499939 60.3375C0.499939 27.1764 27.1764 0.5 60.3375 0.5C93.4986 0.5 120.175 27.1764 120.175 60.3375Z"
            stroke="url(#paint0_linear_23_285)"
            strokeOpacity="0.39"
          />
          <mask
            id="mask0_23_285"
            style={{ maskType: 'alpha' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="121"
            height="121"
          >
            <path
              d="M60.3375 120.675C93.7748 120.675 120.675 93.7748 120.675 60.3375C120.675 26.9003 93.7748 0 60.3375 0C26.9003 0 0 26.9003 0 60.3375C0 93.7748 26.9003 120.675 60.3375 120.675Z"
              fill="#2775CA"
            />
          </mask>
          <g mask="url(#mask0_23_285)">
            <g filter="url(#filter0_f_23_285)">
              <path
                d="M95.6854 12.6533C29.4265 4.70227 14.6287 67.2065 15.5121 99.4525C3.8065 82.8878 -11.7862 43.1324 19.488 16.6289C50.7622 -9.87467 83.3171 2.93538 95.6854 12.6533Z"
                fill="white"
                fillOpacity="0.6"
              />
            </g>
          </g>
          <path
            d="M35.0649 75.7085C35.5167 75.2567 36.1379 74.9932 36.7968 74.9932H96.5466C97.6385 74.9932 98.1844 76.3109 97.4126 77.0827L85.6094 88.8859C85.1576 89.3377 84.5364 89.6012 83.8775 89.6012H24.1277C23.0358 89.6012 22.4899 88.2835 23.2617 87.5117L35.0649 75.7085Z"
            fill="url(#paint1_linear_23_285)"
          />
          <path
            d="M35.0649 31.6392C35.5355 31.1874 36.1567 30.9238 36.7968 30.9238L96.5466 30.9238C97.6385 30.9238 98.1844 32.2416 97.4126 33.0134L85.6094 44.8165C85.1576 45.2683 84.5364 45.5318 83.8775 45.5318L24.1277 45.5318C23.0358 45.5318 22.4899 44.2141 23.2617 43.4423L35.0649 31.6392Z"
            fill="url(#paint2_linear_23_285)"
          />
          <path
            d="M85.6094 53.5327C85.1576 53.0809 84.5364 52.8174 83.8775 52.8174L24.1277 52.8174C23.0358 52.8174 22.4899 54.1351 23.2617 54.9069L35.0649 66.7101C35.5167 67.1619 36.1379 67.4254 36.7968 67.4254H96.5466C97.6385 67.4254 98.1844 66.1077 97.4126 65.3359L85.6094 53.5327Z"
            fill="url(#paint3_linear_23_285)"
          />
          <defs>
            <filter
              id="filter0_f_23_285"
              x="-42.8977"
              y="-43.1353"
              width="182.583"
              height="186.588"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_23_285" />
            </filter>
            <linearGradient
              id="paint0_linear_23_285"
              x1="31.2659"
              y1="8.77641"
              x2="96.5405"
              y2="120.676"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#24DCB3" />
              <stop offset="1" stopColor="#D428FC" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_23_285"
              x1="90.8388"
              y1="23.8733"
              x2="49.4869"
              y2="103.079"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00FFA3" />
              <stop offset="1" stopColor="#DC1FFF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_23_285"
              x1="72.7576"
              y1="14.4331"
              x2="31.406"
              y2="93.6381"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00FFA3" />
              <stop offset="1" stopColor="#DC1FFF" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_23_285"
              x1="81.7406"
              y1="19.1233"
              x2="40.389"
              y2="98.3284"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00FFA3" />
              <stop offset="1" stopColor="#DC1FFF" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </AnimatePresence>
  )
}
