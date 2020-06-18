import React from 'react';
import './Ability.css';
import ConvertedText from '../../ConvertedText';

const Ability = (props) => {
  return (
    <>
      {props.ability &&
        <>
          <div className='ability'>
            <span className='ability-name'>
              {`${props.ability.type}: ${props.ability.name}`}
            </span>
            <span className='ability-text'> {ConvertedText(props.ability.text)}</span>
          </div>
          <div className='moves-border'></div>
        </>
      }
    </>
  )
};

export default Ability;
