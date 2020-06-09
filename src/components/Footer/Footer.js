import React from 'react';
import Energy from '../Energy/Energy';

const raritySymbol = (rarity) => {
  if (rarity === 'Rare') {
    return <span>&#9733;</span>;
  } else if (rarity === 'Uncommon') {
    return <span>&#9632;</span>;
  } else {
    return <span>&#9679;</span>;
  }
}

const Footer = (props) => {
  return (
    <div className='footer'>
      <div className='moves-border'></div>
      <div className='weaknesses'>
        <div className='footer-title'>weakness</div>
        {props.weaknesses &&
          <Energy size='35' type={props.weaknesses[0].type} />
        }
      </div>
      <div className='resistance'>
        <div className='footer-title'>resistance</div>
        {props.resistances &&
          <>
            <Energy size='35' type={props.resistances[0].type} />
            <span className='resistance-dmg'>
              {props.resistances[0].value}
            </span>
          </>
        }
      </div>
      <div className='retreat'>
        <div className='footer-title'>retreat cost</div>
        {props.retreatCost &&
          props.retreatCost.map((cost) => {
            return (<Energy type={cost} size='35' />);
          })}
      </div>
      <div className='flavor-text'>
        {`This is a Pokémon. It does Pokémon things. It says Pokémon. 
          Pokémon. Pokémon. Pokémon. Pokémon. LV. 1  
          #${props.nationalPokedexNumber}`}
      </div>
      <div className='bottom-stuff'>
        <div className='bottom-stuff-bold'>{`Illus. ${props.artist}`}</div>
        <div>&copy; 1995, 96, 98, 99 Nintendo, Creatures, GAMEFREAK. &copy; 1999 Wizards.</div>
        <div className='bottom-stuff-bold'>{props.number}/102
          {raritySymbol(props.rarity)}
        </div>
      </div>
    </div>
  )
};

export default Footer;
