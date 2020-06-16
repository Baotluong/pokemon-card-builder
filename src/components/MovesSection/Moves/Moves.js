import React from 'react';
import Energy from '../../Energy/Energy';
import './Moves.css';
import ConvertedText from '../../ConvertedText';

const Moves = (props) => {
  return (
    <>
      {props.attacks.map((attack, index) => {
        return (
          <>
            <div className='move'>
              <div className='move-costs'>
                {attack.cost.map((cost) => {
                  return (
                    <Energy size='30' type={cost} />
                  );
                })}
              </div>
              <div className='move-text'>
                {attack.text ?
                  <>
                    <span className='move-name'>
                      {attack.name + ' '}
                    </span>
                    <span className='move-desc'>
                      {ConvertedText(attack.text, props.type)}
                    </span>
                  </>
                  :
                  <div className='move-name-large'>
                    {attack.name + ' '}
                  </div>
                }
              </div>
              <div className='move-dmg'>
                {attack.damage}
              </div>
            </div>
            {
              index < props.attacks.length - 1 &&
              <div className='moves-border'></div>
            }
          </>
        );
      })}
    </>
  );
};

export default Moves;
