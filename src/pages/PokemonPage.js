import React from 'react';
import InputSection from '../components/InputSection/InputSection';
import PokemonCard from '../components/PokemonCard/PokemonCard';

class PokemonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      pokemonCards: null,
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
        const pokemonCards = data.cards.filter((card) => {
          return (
              card.setCode === 'base1' ||
              card.setCode === 'base2' ||
              card.setCode === 'base3' ||
              card.setCode === 'base5'
            ) &&
            card.supertype === "Pokémon";
        });
        if (pokemonCards) {
          this.setState(() => ({
            pokemonCards,
            error: data.cards.length >= 100 ? 'Too many results. Please refine your search.' : '',
            input: ''
          }));
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
      <>
      <div>
        <InputSection
          error={this.state.error}
          handleChange={this.handleChange}
          value={this.state.input}
          handleClick={this.handleClick}
        />
        { this.state.pokemonCards &&
          this.state.pokemonCards.map((pokemonCard) => {
            return <PokemonCard pokemonCard={pokemonCard}/>;
          })
        }
      </div>
      </>
    );
  }
}

export default PokemonPage;
