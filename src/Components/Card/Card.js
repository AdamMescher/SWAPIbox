import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Card = ( {name, url, displayData } ) => {
  const mappedNounObject = Object.keys( displayData ).map( key => {
    return(
      <li className="card-list-item">{key.toUpperCase()}: {displayData[key]}</li>
    )
  });

  return (
    <div className="card neon">
      <section className="card-header">
        <li className="ghost"></li>
        <h3 className="card-title">{name}</h3>
        <Button
          buttonClass={`${url} card-favorite-button`}
          buttonText= '' />
      </section>
      <ul className="card-list">
        {mappedNounObject}
      </ul>
    </div>
  )
}

export default Card;
