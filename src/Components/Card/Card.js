import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Card = ( {name, url, displayData, onCardClick, isFavorite } ) => {
  const mappedNounObject = Object.keys( displayData ).map( key => {
    return(
      <li
        className="card-list-item"
        key={`${key}-item`}
        >{key.toUpperCase()}: {displayData[key]}</li>
    )
  });
  const appliedClasses = isFavorite === 'favorite' ? 'card neon favorite' : 'card neon'
  return (
    <div className={appliedClasses}>
      <section className="card-header">
        <li className="ghost"></li>
        <h3 className="card-title">{name}</h3>
        <Button
          buttonClass={`${url} card-favorite-button`}
          buttonCallback={ () => onCardClick(url)}/>
      </section>
      <ul className="card-list">
        {mappedNounObject}
      </ul>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  displayData: PropTypes.object,
  onCardClick: PropTypes.func,
  isFavorite: PropTypes.string
}

export default Card;
