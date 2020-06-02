import React from 'react';

import colorless from '../../images/colorless.png';
import lightning from '../../images/lightning.png';
import fighting from '../../images/fighting.png';
import fire from '../../images/fire.png';
import grass from '../../images/grass.png';
import psychic from '../../images/psychic.png';
import water from '../../images/water.png';
import './Energy.css';

const energyDictionary = {
  colorless, lightning, fighting, fire, grass, psychic, water,
}

const Energy = (props) => {
  return (
    <>
      <img
        className="large-symbol"
        src={energyDictionary[props.type.toLowerCase()]}
        alt={props.type} />
    </>
  );
}

export default Energy;
