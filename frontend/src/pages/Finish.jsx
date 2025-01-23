import React from 'react';
import '../styles/Finish.css'

export default function ThankYouPage() {
  return (
    <div className='container'>
      <div className='card'>
        <h1 className='heading'>Thank You for Completing the Test!</h1>
        <p className='message'>
          We appreciate your time and effort in completing the test. Your responses have been recorded successfully.
        </p>
        <p className='message'>
          <strong>Your results will be emailed to you shortly</strong> at the email address you provided during registration.
        </p>
        <p className='message'>
          Please check your inbox (and spam folder) for the result notification.
        </p>
        <p className="footer">Good luck!</p>
      </div>
    </div>
  );
}

