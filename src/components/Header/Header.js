import React from 'react';
import Energy from '../Energy/Energy';
import './Header.css';

const Header = (props) => {
  return (
    <div className='header'>
      <div className='left-header'>
        {props.name}
      </div>
      <div className='right-header'>
        <span className='HP'>{props.hp} HP</span>
        <Energy size='50' type={props.type} />
      </div>
    </div>
  );
};

export default Header;
