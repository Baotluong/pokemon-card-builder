import React from 'react';
import './PokemonCard.css';
import Energy from '../Energy/Energy';

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
          this.setState(() => ({ pokemonCard, error: '' }));
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
        <div className='input-section'>
          <div className='error'>{this.state.error}</div>
          <input
            className='input-input'
            onChange={this.handleChange}
            type='text'
            value={this.state.input}
          />
          <button
            className='input-button'
            onClick={this.handleClick}
            disabled={!this.state.input}
          >
            Does the thing
          </button>
        </div>
        
        { this.state.pokemonCard &&
          <div className={'entire-card' + ` ${this.state.pokemonCard.types[0].toLowerCase()}`}>
            <div className='header'>
              <div className='left-header'>
                {this.state.pokemonCard.name}
              </div>
              <div className='right-header'>
                <span className='HP'>{this.state.pokemonCard.hp} HP</span>
                <Energy type={this.state.pokemonCard.types[0]} />
              </div>
            </div>
            <div className='image-container'>
              <img className='image-main' src={this.state.pokemonCard.imageUrlHiRes} />
            </div>
            <div className='moves-section'>
              { this.state.pokemonCard.ability && 
                <div className='ability'>
                  <span className='ability-name'>
                    {this.state.pokemonCard.ability.type}: 
                    {this.state.pokemonCard.ability.name}
                  </span>
                  <span className='ability-text'> {this.state.pokemonCard.ability.text}</span>
                </div>
              }
              <div className='moves'>
                { this.state.pokemonCard.attacks.map((attack) => {
                  return (
                    <div className='move'>
                      <div className='move-costs'>
                        {attack.cost.map((cost) => {
                          return (
                            <span className={cost}>
                              {cost[0]}
                            </span>
                          );
                        })}
                      </div>
                      <div className='move-text'>
                        <span className='move-name'>
                          {attack.name} 
                        </span>
                        <span className='move-desc'>
                          {attack.text}
                        </span>
                      </div>
                      <div className='move-dmg'>
                        {attack.damage}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='footer'>
                <div className='weaknesses'>
                  {this.state.pokemonCard.weaknesses &&
                    <div className='weaknesses-energy'>
                      <span className={this.state.pokemonCard.weaknesses[0].type}>
                        {this.state.pokemonCard.weaknesses[0].type[0]}
                      </span>
                    </div>
                  }
                </div>
                <div className='resistance'>
                  {this.state.pokemonCard.resistances &&
                    <div className='resistance-energy'>
                      <span className={this.state.pokemonCard.resistances[0].type}>
                        {this.state.pokemonCard.resistances[0].type[0]}
                      </span>
                      <span>
                        {this.state.pokemonCard.resistances[0].value}
                      </span>
                    </div>
                  }
                </div>
                <div className='retreat'>
                  {this.state.pokemonCard.retreatCost &&
                    this.state.pokemonCard.retreatCost.map((cost) => {
                      return (<span className={cost}>{cost[0]}</span>);
                    })}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default PokemonCard;
