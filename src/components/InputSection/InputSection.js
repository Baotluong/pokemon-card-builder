import React from 'react';
import './InputSection.css';

const InputSection = (props) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      props.handleClick();
    }
  }

  return (
    <div className='input-section'>
      <div className='error'>{props.error}</div>
      <input
        className='input-input'
        onChange={props.handleChange}
        type='text'
        value={props.value}
        placeholder="Enter a Pokémon"
        onKeyDown={handleKeyDown}
      />
      <button
        className='input-button'
        onClick={props.handleClick}
        disabled={!props.value}
      >
        Search
      </button>
    </div>
  );
}

export default InputSection;
