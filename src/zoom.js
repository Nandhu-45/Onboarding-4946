import React, { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './zoom.css';
import image from './image (2).png';

const ImageZoom = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Notify MultiStepForm that the image has finished zooming
    }, 3000); // Adjust the time for the duration of the zoom effect

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="image-container">
      <LazyLoadImage
        src={image}
        alt="Zoom In"
        effect="blur"
        className="zoom-in-image"
      />
    </div>
  );
};

export default ImageZoom;
