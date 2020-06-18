import React from 'react';
import './PokemonCard.css';
import Header from '../Header/Header';
import ImageSection from '../ImageSection/ImageSection';
import Noise from '../../images/noise.png';
import MovesSection from '../MovesSection/MovesSection';
import Footer from '../Footer/Footer';

const PokemonCard = (props) => {
  return (
    <>
      <div className={`entire-card ${props.pokemonCard.types[0].toLowerCase()}`}>
        <img className='noise' src={Noise} alt='noise'/>
        <Header
          name={props.pokemonCard.name}
          hp={props.pokemonCard.hp}
          type={props.pokemonCard.types[0]}
        />
        <ImageSection
          imageUrl={props.pokemonCard.imageUrlHiRes}
          pokemon={props.pokemonCard.name}
        />
        <MovesSection
          ability={props.pokemonCard.ability}
          attacks={props.pokemonCard.attacks}
          type={props.pokemonCard.types[0]}
        />
        <Footer
          weaknesses={props.pokemonCard.weaknesses}
          resistances={props.pokemonCard.resistances}
          retreatCost={props.pokemonCard.retreatCost}
          nationalPokedexNumber={props.pokemonCard.nationalPokedexNumber}
          artist={props.pokemonCard.artist}
          number={props.pokemonCard.number}
          rarity={props.pokemonCard.rarity}
        />
      </div>
    </>
  );
}

export default PokemonCard;
