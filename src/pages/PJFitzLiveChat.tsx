
import { useEffect, useState } from 'react';
import { toZonedTime } from 'date-fns-tz';
import { getHours } from 'date-fns';

const PJFitzLiveChat = () => {
  const [isBusinessHours, setIsBusinessHours] = useState<boolean>(true);

  useEffect(() => {
    // Check if current time is within business hours (8AM-8PM Eastern Time)
    const checkBusinessHours = () => {
      // Get current date in user's local time
      const now = new Date();
      
      // Convert to Eastern Time
      const easternTime = toZonedTime(now, 'America/New_York');
      
      // Get hour in Eastern Time (0-23)
      const easternHour = getHours(easternTime);
      
      // Check if hour is between 8AM and 8PM (inclusive)
      setIsBusinessHours(easternHour >= 8 && easternHour < 20);
    };
    
    // Check business hours when component mounts
    checkBusinessHours();
    
    // Set up interval to check business hours every minute
    const interval = setInterval(checkBusinessHours, 60000);
    
    // Clean up interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dynamically load the FormCan script
    const script = document.createElement('script');
    script.src = '//static.formcan.com/assets/dist/formbuilder.js?v=20';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); 

  return (
    <div className="pjfitz-live-chat-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {!isBusinessHours && (
        <div className="outside-hours-message" style={{ 
          marginBottom: '20px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #dee2e6', 
          borderRadius: '5px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
        }}>
          <div className="message-box">
            <h3 style={{ color: '#dc3545', marginTop: 0 }}>Sorry we are unavailable at the moment</h3>
            <p style={{ color: '#495057', fontSize: '16px' }}>We will be back shortly by 8am EST, please fill the form below and an agent will reach out once available.</p>
          </div>
        </div>
      )}
      <div 
        className="plato-form-widget" 
        data-pf-id="frgxy6shd42" 
        data-pf-host="form.formcan.com/"
      />
    </div>
  )
}

export default PJFitzLiveChat
