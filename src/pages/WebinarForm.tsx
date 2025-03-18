import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react';

const WebinarForm = () => {
  // Load Formcan script on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//static.formcan.com/assets/dist/formbuilder.js?v=20';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='bg-[#FCF8F1] min-h-screen h-full md:h-screen'>
      <div className='grid md:grid-cols-2 gap-8 h-full max-w-[1600px] mx-auto items-center justify-center md:justify-start px-4 py-8 md:py-0'>
        {/* Animation Container */}
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
          {/* Formcan Embed */}
          <div 
            className="plato-form-widget w-full h-full"
            data-pf-id="fr225tidmbp"
            data-pf-host="form.formcan.com/"
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarForm;

