import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import dataBuilder from '../../helper';

const CardContainer = ( {nounObjects} ) => {
  const mappedCards = nounObjects.map( noun => {
    noun = dataBuilder(noun);
    return (
      <li>
        <Card
          name={noun.name}
          url={noun.url}
          displayData={noun.displayData}
          key={noun.name} />
      </li>
    )
  })

  return (
    <div className="card-container">
      <h2 className="card-container-title">Type</h2>
      <ul>
        {mappedCards}
      </ul>
    </div>
  )
}

export default CardContainer;
