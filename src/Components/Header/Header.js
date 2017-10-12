import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const Header = ({numberOfFavorites, favoriteButtonClick}) => {
  return (
    <header>
      <div></div>
      <img
        className="header-title"
        src={require('../../Assets/Images/swapibox-logo.svg')}
        alt="swapibox logo"/>
      <Button
        buttonText="Show Favorites"
        buttonClass="show-favorites"
        buttonCallback={favoriteButtonClick}
        extraContent={numberOfFavorites} />
    </header>
  );
};

Header.propTypes = {
  numberOfFavorites: PropTypes.number,
  favoriteButtonClick: PropTypes.func
};

export default Header;
