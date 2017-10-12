import React from 'react';
import Button from '../Button/Button'

const Header = () => {
  return (
    <header>
      <div></div>
      <h1 className="header-title">SWAPIbox</h1>
      <Button buttonText="Show Favorites" buttonClass="show-favorites" buttonCallback="" />
    </header>
  )
}

export default Header;
