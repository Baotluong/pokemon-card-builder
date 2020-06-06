import React from 'react';
import './PokemonCard.css';
import Energy from '../Energy/Energy';
import InputSection from '../InputSection/InputSection';
import Header from '../Header/Header';
import ImageSection from '../ImageSection/ImageSection';

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
        { this.state.pokemonCard &&
          <div className={'entire-card' + ` ${this.state.pokemonCard.types[0].toLowerCase()}`}>
            <Header
              name={this.state.pokemonCard.name}
              hp={this.state.pokemonCard.hp}
              type={this.state.pokemonCard.types[0]}
            />
            <ImageSection
              imageUrl={this.state.pokemonCard.imageUrlHiRes}
            />
            <div className='moves-section'>
              { this.state.pokemonCard.ability && 
                <>
                  <div className='ability'>
                    <span className='ability-name'>
                      {this.state.pokemonCard.ability.type}: 
                      {this.state.pokemonCard.ability.name}
                    </span>
                    <span className='ability-text'> {this.state.pokemonCard.ability.text}</span>
                  </div>
                  <div className='moves-border'></div> 
                </>
              }
              <div className='moves'>
                { this.state.pokemonCard.attacks.map((attack, index) => {
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
                                {attack.text}
                              </span>
                            </>
                            : 
                            <span className='move-name-large'>
                              {attack.name + ' '} 
                            </span>
                          }
                        </div>
                        <div className='move-dmg'>
                          {attack.damage}
                        </div>
                      </div>
                      {
                        index < this.state.pokemonCard.attacks.length - 1 &&
                        <div className='moves-border'></div> 
                      }
                    </>
                  );
                })}
              </div>
            </div>
          <div className='footer'>
              <div className='moves-border'></div>  
              <div className='weaknesses'>
                <div className='footer-title'>weakness</div>
                {this.state.pokemonCard.weaknesses &&
                  <Energy size='35' type={this.state.pokemonCard.weaknesses[0].type} />
                }
              </div>
              <div className='resistance'>
                <div className='footer-title'>resistance</div>
                {this.state.pokemonCard.resistances &&
                  <div className='resistance-energy'>
                    <Energy size='35' type={this.state.pokemonCard.resistances[0].type} />
                    <span>
                      {this.state.pokemonCard.resistances[0].value}
                    </span>
                  </div>
                }
              </div>
              <div className='retreat'>
                <div className='footer-title'>retreat cost</div>
                {this.state.pokemonCard.retreatCost &&
                  this.state.pokemonCard.retreatCost.map((cost) => {
                    return (<Energy type={cost} size='35'/>);
                  })}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default PokemonCard;
