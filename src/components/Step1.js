import React, { useState } from 'react';
import './step1.css';

const Step1 = ({ onNext, data }) => {
  const [academicDocuments, setAcademicDocuments] = useState(data?.academicDocuments || null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setAcademicDocuments(file);
      setError('');
    } else {
      setError('Please upload a PDF document.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!academicDocuments) {
      setError('Please upload your academic documents.');
      return;
    }
    onNext({ academicDocuments: academicDocuments.name });
  };

  return (
    <div className="document-upload-container">
      <div><h2 className="document-upload-title">Step 1: Upload Academic Documents</h2></div>
      <form className="document-upload-form" onSubmit={handleSubmit}>
        <label htmlFor="academicDocuments">Upload Documents (PDF only):</label>
        <input
          type="file"
          id="academicDocuments"
          accept=".pdf"
          className="document-upload-input"
          onChange={handleFileChange}
        />
        {error && <p className="error">{error}</p>}
        <button className="document-upload-button" type="submit">Next</button>
      </form>
    </div>
  );
};

export default Step1;