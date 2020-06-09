import React from 'react';
import './PokemonCard.css';
import Energy from '../Energy/Energy';
import InputSection from '../InputSection/InputSection';
import Header from '../Header/Header';
import ImageSection from '../ImageSection/ImageSection';
import Noise from '../../images/noise.png';
import MovesSection from '../MovesSection/MovesSection';
import Footer from '../Footer/Footer';

class PokemonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      pokemonCard: '',
      error: '',
    };
  }

  handleChange = event => {
    const input = event.target.value;
    this.setState(() => ({ input }));
  }

  handleClick = () => {
    if (!this.state.input) {
      this.setState(() => ({ error: 'You didnt enter anything!' }));
      return;
    }
    fetch(`https://api.pokemontcg.io/v1/cards?name=${this.state.input}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const pokemonCard = data.cards.find((card) => {
          return card.setCode === 'base1' && card.supertype === "Pokémon";
        });
        if (pokemonCard) {
          this.setState(() => ({ pokemonCard, error: '', input: '' }));
        } else {
          this.setState(() => ({ error: 'The pokemon you entered does not have a card!' }));
        }
      })
      .catch((error) => {
        this.setState(() => ({ error: 'Something went wrong!' }));
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <InputSection
          error={this.state.error}
          handleChange={this.handleChange}
          value={this.state.input}
          handleClick={this.handleClick}
        />
        {this.state.pokemonCard &&
          <div className={'entire-card' + ` ${this.state.pokemonCard.types[0].toLowerCase()}`}>
            <img className='noise' src={Noise} />
            <Header
              name={this.state.pokemonCard.name}
              hp={this.state.pokemonCard.hp}
              type={this.state.pokemonCard.types[0]}
            />
            <ImageSection
              imageUrl={this.state.pokemonCard.imageUrlHiRes}
              pokemon={this.state.pokemonCard.name}
            />
            <MovesSection
              ability={this.state.pokemonCard.ability}
              attacks={this.state.pokemonCard.attacks}
            />
            <Footer
              weaknesses={this.state.pokemonCard.weaknesses}
              resistances={this.state.pokemonCard.resistances}
              retreatCost={this.state.pokemonCard.retreatCost}
              nationalPokedexNumber={this.state.pokemonCard.nationalPokedexNumber}
              artist={this.state.pokemonCard.artist}
              number={this.state.pokemonCard.number}
              rarity={this.state.pokemonCard.rarity}
            />
          </div>
        }
      </div>
    );
  }
}

export default PokemonCard;
