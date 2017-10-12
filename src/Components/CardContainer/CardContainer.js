import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import dataBuilder from '../../helper';

const CardContainer = ( { nounObjects, onCardClick, favoritesArray } ) => {
  const mappedCards = nounObjects.map( noun => {
    noun = dataBuilder(noun);
    return (
      <li>
        <Card
          name={noun.name}
          url={noun.url}
          displayData={noun.displayData}
          key={noun.name}
          onCardClick={onCardClick} />
      </li>
    )
  })

  return (
    <div className="card-container">
      <h2 className="card-container-title">Type</h2>
      <ul className="card-container-card-list">
        {mappedCards}
      </ul>
    </div>
  )
}

export default CardContainer;
