import React from 'react';
import Energy from '../Energy/Energy';
import './MovesSection.css';
import Ability from './Ability/Ability';
import Moves from './Moves/Moves';

// {props.attacks.map((attack, index) => {
//   const attacksArray = attack.text.split('Water');
//   const newArray = [];
//   for (let i = 0; i < attacksArray.length; i++) {
//     newArray.push(<span>{attacksArray[i]}</span>);
//     if (i < attacksArray.length - 1) newArray.push(<Energy size='20' type='Water' />);
// }

export const MakeSpan = (string) => {
  // returns Array of Jsx with energy symbols
}

const MovesSection = (props) => {
  return (
    <div className='moves-section'>
      <Ability ability={props.ability} />
      <Moves attacks={props.attacks} />
    </div>
  );
};

export default MovesSection;
