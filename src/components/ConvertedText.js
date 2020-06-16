import React from 'react';
import EnergyDictionary from './EnergyDict';
import Energy from './Energy/Energy';

const ConvertedText = (text, defaultType) => {
  const newStringReplaced = text.replace(/ /gi, '** **');
  const textArray = newStringReplaced.split('**');

  return textArray.map((word, index) => {
    if (EnergyDictionary.hasOwnProperty(word.toLowerCase())) {
      return <Energy size='20' type={word.toLowerCase()} />;
    }
    if (defaultType) {
      if (word === 'Energy' && textArray[index + 2] === 'card') {
        return <> <Energy size='20' type={defaultType} /> Energy </>
      }
    }
    return word;
  });
};

export default ConvertedText;
