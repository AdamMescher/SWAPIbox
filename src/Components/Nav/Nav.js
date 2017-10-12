import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Nav = ( {buttonCallback} ) => {
  return (
    <nav className="main-nav">
      <Button
        buttonText="people"
        buttonClass="nav-button"
        buttonCallback={
          () => { buttonCallback( 'people' ); }
        } />
      <Button
        buttonText="planets"
        buttonClass="nav-button"
        buttonCallback={
          () => { buttonCallback( 'planets' ); }
        } />
      <Button
        buttonText="vehicles"
        buttonClass="nav-button"
        buttonCallback={
          () => { buttonCallback( 'vehicles' ); }
        } />
    </nav>
  );
};

export default Nav;

Nav.propTypes = {
  buttonCallback: PropTypes.func
};
