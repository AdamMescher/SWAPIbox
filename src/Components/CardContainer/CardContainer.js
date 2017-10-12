import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import dataBuilder from '../../helper';

const cardFavoriteChecker = (favoritesArray, card) => {
  if (favoritesArray.find( favorite => card.url === favorite)) {
    return 'favorite'
  }
}

const CardContainer = ( { nounObjects, onCardClick, favoritesArray, displayArrayType } ) => {
  const mappedCards = nounObjects.map( (noun, index) => {
    noun = dataBuilder(noun);
    return (
      <li
        key={`${noun.name}:${index}`}>
        <Card
          name={noun.name}
          url={noun.url}
          displayData={noun.displayData}
          key={noun.name}
          onCardClick={onCardClick}
          isFavorite={cardFavoriteChecker(favoritesArray, noun)}/>
      </li>
    )
  })

  return (
    <div className="card-container">
      <h2 className="card-container-title">{displayArrayType.toUpperCase()}</h2>
      <ul className="card-container-card-list">
        {mappedCards}
      </ul>
    </div>
  )
}

CardContainer.propTypes = {
  nounObjects: PropTypes.array,
  onCardClick: PropTypes.func,
  favoritesArray: PropTypes.array,
  displayArrayType: PropTypes.string
}

export default CardContainer;
