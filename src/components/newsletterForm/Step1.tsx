import React from 'react'
import { InteractiveHoverButton } from '../ui/interactive-hover-button'

interface Step1Props {
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-center md:justify-start'>
        <div className='space-y-6 px-4 md:pl-0 text-center md:text-left'>
          <h1 className='text-4xl md:text-6xl font-bold md:font-extrabold text-[#363430] leading-tight'>
            Subscribe To Our Newsletter
          </h1>
          <p className='text-base md:text-lg text-gray-800 md:pr-8'>
            Get marketing tips and strategies delivered direct to you that are proven to 3x-6x your conversion!
          </p>
          <div className='flex justify-center md:justify-start'>
            <InteractiveHoverButton 
              className='bg-[#FFC710] border-transparent px-12 py-3 md:py-4 text-base font-normal tracking-wider text-[#4E3105] flex justify-center md:justify-start w-full md:w-auto' onClick={onNext}>
              Subscribe
            </InteractiveHoverButton>
          </div>
        </div>
        

      </div>
      
    </div>
  )
}

export default Step1
