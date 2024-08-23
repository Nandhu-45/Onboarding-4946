import React, { useState } from 'react';
import './step4.css';

const Step4 = ({ onNext, onBack, data }) => {
  const [idCardDetails, setIdCardDetails] = useState({
    bloodGroup: data?.bloodGroup || '',
    photo: data?.photo || '',
    issueDate: data?.issueDate || ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!idCardDetails.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!idCardDetails.photo) newErrors.photo = 'Passport size photo is required';
    if (!idCardDetails.issueDate) newErrors.issueDate = 'Issue date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'photo') {
      setIdCardDetails({ ...idCardDetails, photo: files[0] });
    } else {
      setIdCardDetails({ ...idCardDetails, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNext({
        ...idCardDetails,
        photo: idCardDetails.photo ? idCardDetails.photo.name : null
      });
    }
  };

  return (
    <div className="step4-container">
      <div><h2 className="step4-title">Step 4: Enter ID Card Details</h2></div>
      <form className="step4-form" onSubmit={handleSubmit}>
        <label htmlFor="bloodGroup">Blood Group:</label>
        <input
          type="text"
          id="bloodGroup"
          name="bloodGroup"
          className="step4-input"
          value={idCardDetails.bloodGroup}
          onChange={handleChange}
        />
        {errors.bloodGroup && <p className="step4-error">{errors.bloodGroup}</p>}

        <label htmlFor="photo">Passport Size Photo (Image or PDF):</label>
        <input
          type="file"
          id="photo"
          name="photo"
          className="step4-input"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleChange}
        />
        {errors.photo && <p className="step4-error">{errors.photo}</p>}

        <label htmlFor="issueDate">Issue Date:</label>
        <input
          type="date"
          id="issueDate"
          name="issueDate"
          className="step4-input"
          value={idCardDetails.issueDate}
          onChange={handleChange}
        />
        {errors.issueDate && <p className="step4-error">{errors.issueDate}</p>}

        <div className="step4-button-group">
          <button type="button" className="step4-button" onClick={onBack}>Back</button>
          <button type="submit" className="step4-button">Finish</button>
        </div>
      </form>
    </div>
  );
};

export default Step4;