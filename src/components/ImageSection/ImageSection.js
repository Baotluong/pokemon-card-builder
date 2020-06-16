import React from 'react';
import './ImageSection.css';

const ImageSection = (props) => {
  return (
    <>
      <div className='image-section'>
        <img className='image-main' src={props.imageUrl} alt='main'/>
      </div>
      <div className='description'>
        {`${props.pokemon} Pokémon. Length: 1 Ditto, Weight: 1 Ditto`}
      </div>
    </>
  );
};

export default ImageSection;
