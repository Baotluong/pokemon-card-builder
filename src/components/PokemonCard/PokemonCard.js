import React from 'react';
import './PokemonCard.css';
import Energy from '../Energy/Energy';
import InputSection from '../InputSection/InputSection';
import Header from '../Header/Header';
import ImageSection from '../ImageSection/ImageSection';
import Noise from '../../images/noise.png';

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

  raritySymbol = (rarity) => {
    if (rarity === 'Rare') {
      return <span>&#9733;</span>;
    } else if (rarity === 'Uncommon') {
      return <span>&#9632;</span>;
    } else {
      return <span>&#9679;</span>;
    }
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
            <div className='moves-section'>
              {this.state.pokemonCard.ability &&
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
              {this.state.pokemonCard.attacks.map((attack, index) => {
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
                      index < this.state.pokemonCard.attacks.length - 1 &&
                      <div className='moves-border'></div>
                    }
                  </>
                );
              })}
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
                  <>
                    <Energy size='35' type={this.state.pokemonCard.resistances[0].type} />
                    <span className='resistance-dmg'>
                      {this.state.pokemonCard.resistances[0].value}
                    </span>
                  </>
                }
              </div>
              <div className='retreat'>
                <div className='footer-title'>retreat cost</div>
                {this.state.pokemonCard.retreatCost &&
                  this.state.pokemonCard.retreatCost.map((cost) => {
                    return (<Energy type={cost} size='35' />);
                  })}
              </div>
              <div className='flavor-text'>
                {`This is a Pokémon. It does Pokémon things. It says Pokémon. 
                  Pokémon. Pokémon. Pokémon. Pokémon. LV. 1  
                  #${this.state.pokemonCard.nationalPokedexNumber}`}
              </div>
              <div className='bottom-stuff'>
                <div className='bottom-stuff-bold'>{`Illus. ${this.state.pokemonCard.artist}`}</div>
                <div>&copy; 1995, 96, 98, 99 Nintendo, Creatures, GAMEFREAK. &copy; 1999 Wizards.</div>
                <div className='bottom-stuff-bold'>{this.state.pokemonCard.number}/102
                  {this.raritySymbol(this.state.pokemonCard.rarity)}
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
