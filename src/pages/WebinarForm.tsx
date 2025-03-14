import Step1 from '@/components/WebinarForm/Step1';
import { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Step2 from '@/components/WebinarForm/Step2';

const WebinarForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
    else {
      setCurrentStep(1);
    }
  }

  return (
    <div className='bg-[#FCF8F1] min-h-screen h-full md:h-screen'>
      <div className='grid md:grid-cols-2 gap-8 h-full max-w-[1600px] mx-auto items-center justify-center md:justify-start px-4 py-8 md:py-0'>
        {/* Animation Container - Always first in DOM order for mobile */}
        <div className='w-full max-w-[762px] mx-auto md:mx-0 md:mr-auto order-1 md:order-2'>
          <Player
            src="/webinar.json"
            className='w-full h-auto'
            autoplay
            loop
            speed={1}
          />
        </div>

        {/* Form Container */}
        <div className='order-2 md:order-1 w-full max-w-[600px] mx-auto md:ml-10 lg:ml-24 xl:ml-36'>
          {currentStep === 1 && <Step1 onNext={handleNext} />}
          {currentStep === 2 && <Step2 onNext={handleNext} />}
        </div>
        

      </div>
    </div>
  )
}

export default WebinarForm;


