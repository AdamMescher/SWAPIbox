import React from 'react';
import Button from '../Button/Button';

const Nav = () => {
  return(
    <nav className="main-nav">
      <Button buttonText="people" buttonClass="nav-button" buttonCallback="" />
      <Button buttonText="planets" buttonClass="nav-button" buttonCallback="" />
      <Button buttonText="vehicles" buttonClass="nav-button" buttonCallback="" />
    </nav>
  )
}

export default Nav;
