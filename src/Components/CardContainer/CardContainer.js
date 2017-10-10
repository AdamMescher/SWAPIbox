import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

const CardContainer = ( arrayOfNounObjects ) => {
  const mappedCards = arrayOfNounObjects.map( noun => {
    return (
      <li>
        <Card nounObject={noun} />
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
