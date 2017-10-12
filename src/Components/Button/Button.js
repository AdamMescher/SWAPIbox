import React from 'react';
import PropTypes from 'prop-types';

const Button = (
  { buttonText,
    buttonClass,
    buttonCallback,
    extraContent }
) => (
  <button
    className={buttonClass}
    onClick={buttonCallback}>
    {buttonText}<span>  {extraContent}</span>
  </button>
);

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonClass: PropTypes.string,
  buttonCallback: PropTypes.func,
  extraContent: PropTypes.number
};
