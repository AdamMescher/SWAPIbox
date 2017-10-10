import React from 'react';
import PropTypes from 'prop-types';

const Button = ( { buttonText, buttonClass, buttonCallback } ) => (
  <button
    className={buttonClass}
    onClick={buttonCallback}>{buttonText}
  </button>
);

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonClass: PropTypes.string,
  buttonCallback: PropTypes.func
};
