import React from 'react';
import './MovesSection.css';
import Ability from './Ability/Ability';
import Moves from './Moves/Moves';

export const MakeSpan = (string) => {
  // returns Array of Jsx with energy symbols
}

const MovesSection = (props) => {
  return (
    <div className='moves-section'>
      <Ability type={props.type} ability={props.ability} />
      <Moves type={props.type} attacks={props.attacks} />
    </div>
  );
};

export default MovesSection;
