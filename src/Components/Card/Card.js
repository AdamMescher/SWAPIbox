import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Card = ( { nounObject } ) => {
  const mappedNounObject = Object.keys( nounObject ).map( key => {
    return ([
        <dt className="card-definition-term">{key}</dt>,
        <dd>{nounObject[key]}</dd>
    ])
  });

  return (
    <div className="card">
      <section className="card-header">
        <h3 className="card-title">{nounObject[name]}</h3>
        <Button />
      </section>
      <dl className="card-definition-list">
        {mappedNounObject}
      </dl>
    </div>
  )
}

export default Card;
