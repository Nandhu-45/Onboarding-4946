import React, { useState } from 'react';
import './step2.css';

const Step2 = ({ onNext, onBack, data }) => {
  const [personalDetails, setPersonalDetails] = useState({
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!personalDetails.name) newErrors.name = 'Name is required';
    if (!personalDetails.email || !/\S+@\S+\.\S+/.test(personalDetails.email))
      newErrors.email = 'Valid email is required';
    if (!personalDetails.phone || !/^\d{10}$/.test(personalDetails.phone))
      newErrors.phone = 'Valid phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNext(personalDetails);
    }
  };

  return (
    <div className="step2-container">
      <h2 className="step2-title">Step 2: Enter Personal Details</h2>
      <form className="step2-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="step2-input"
          value={personalDetails.name}
          onChange={handleChange}
        />
        {errors.name && <p className="step2-error">{errors.name}</p>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="step2-input"
          value={personalDetails.email}
          onChange={handleChange}
        />
        {errors.email && <p className="step2-error">{errors.email}</p>}

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="step2-input"
          value={personalDetails.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="step2-error">{errors.phone}</p>}

        <div className="step2-button-group">
          <button type="button" className="step2-button" onClick={onBack}>Back</button>
          <button type="submit" className="step2-button">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Step2;