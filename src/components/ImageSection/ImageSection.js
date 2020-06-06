import React from 'react';
import './ImageSection.css';

const ImageSection = (props) => {
  return (
    <div className='image-section'>
      <img className='image-main' src={props.imageUrl} />
    </div>
  );
};

export default ImageSection;
