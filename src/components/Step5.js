import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import './Step5.css';
const Step5 = () => {
  useEffect(() => {
    
    const timer = setTimeout(() => {
      window.close();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="completion-container">
      <Confetti />
      <h2>Your onboarding has been completed successfully!</h2>
      <p>Welcome to the team!</p>
    </div>
  );
};

export default Step5;
