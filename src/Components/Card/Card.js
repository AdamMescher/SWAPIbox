import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Card = ( {name, url, displayData } ) => {
  const mappedNounObject = Object.keys( displayData ).map( key => {
    return ([
        <dt className="card-definition-term">{key}</dt>,
        <dd>{displayData[key]}</dd>
    ])
  });

  return (
    <div className="card">
      <section className="card-header">
        <h3 className="card-title">{name}</h3>
        <Button
        className={url} />
      </section>
      <dl className="card-definition-list">
        {mappedNounObject}
      </dl>
    </div>
  )
}

export default Card;
