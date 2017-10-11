import React from 'react';
import PropTypes from 'prop-types';

const Aside = ({movieData}) => {
  const randomIndex = Math.floor(  Math.floor(Math.random() * movieData.length + 1) )
  return(
    <aside className="aside">
      <p className="aside-opening-crawl">{movieData[randomIndex].text}</p>
      <h4 className="aside-movie-title">{movieData[randomIndex].title}</h4>
      <p className="aside-movie-date">{movieData[randomIndex].date}</p>
    </aside>
  )
}

export default Aside;
