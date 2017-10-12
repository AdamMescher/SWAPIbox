import React from 'react';
import Button from '../Button/Button'

const Header = () => {
  return (
    <header>
      <div></div>
      <img className="header-title" src={require('../../Assets/Images/swapibox-logo.svg')} alt="swapibox logo"/>
      <Button buttonText="Show Favorites" buttonClass="show-favorites" buttonCallback="" />
    </header>
  )
}

export default Header;
