import React from 'react';
import EnergyDictionary from '../EnergyDict';
import './Energy.css';

const Energy = (props) => { 
  return (
    <>
      <img
        className="energy"
        style={{
          width: props.size +'px',
          height: props.size +'px',
        }}
        src={EnergyDictionary[props.type.toLowerCase()]}
        alt={props.type} />
    </>
  );
}

export default Energy;
