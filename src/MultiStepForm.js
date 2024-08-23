import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import './MultiStepForm.css';
import initialImage from './image (2).png';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [showImage, setShowImage] = useState(true);
  
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {}
  });

  useEffect(() => {
    // Load any offline data from localStorage
    const offlineData = localStorage.getItem('offlineFormData');
    if (offlineData) {
      setFormData(JSON.parse(offlineData));
    }
  }, []);

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to send data to backend');
      }
      console.log('Data sent successfully');
      // Clear offline data after successful submission
      localStorage.removeItem('offlineFormData');
    } catch (error) {
      console.error('Error sending data to backend:', error);
      // Save data offline if submission fails
      saveDataOffline(data);
    }
  };

  const saveDataOffline = (data) => {
    localStorage.setItem('offlineFormData', JSON.stringify(data));
  };

  const handleNext = (stepData) => {
    if (currentStep < steps.length - 1) {
      setDirection('forward');
      setCurrentStep(currentStep + 1);
      
      const updatedFormData = { ...formData, [`step${currentStep + 1}`]: stepData };
      setFormData(updatedFormData);

      if (currentStep === 3) {
        // Final step completed, trigger form submission
        handleSubmit(updatedFormData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (finalFormData) => {
    const dataToSubmit = {
      step1: finalFormData.step1,
      step2: finalFormData.step2,
      step3: finalFormData.step3,
      step4: finalFormData.step4

    };
    sendDataToBackend(dataToSubmit);
  };

  const steps = [
    <Step1 onNext={(data) => handleNext(data)} data={formData.step1} />,
    <Step2 onNext={(data) => handleNext(data)} onBack={handleBack} data={formData.step2} />,
    <Step3 onNext={(data) => handleNext(data)} onBack={handleBack} data={formData.step3} />,
    <Step4 onNext={(data) => handleNext(data)} onBack={handleBack} data={formData.step4} />,
    <Step5 />
  ];

  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => {
        setShowImage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="multi-step-form-container">
      {showImage && currentStep === 0 && (
        <div className="initial-image-container">
          <LazyLoadImage
            src={initialImage}
            alt="Initial Step"
            effect="blur"
            className={`initial-image ${!showImage ? 'hide' : ''}`}
          />
        </div>
      )}
      <TransitionGroup>
        <CSSTransition
          key={currentStep}
          timeout={500}
          classNames={direction === 'forward' ? 'slide-right' : 'slide-left'}
        >
          <div className="step">
            {steps[currentStep]}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default MultiStepForm;