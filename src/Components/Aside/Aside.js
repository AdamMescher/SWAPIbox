import React from 'react';
import PropTypes from 'prop-types';

const Aside = ({movieData}) => {
  const randomIndex = Math.floor(  Math.floor(Math.random() * movieData.length) )
  return(
    <aside className="aside scroll-down">
      <p className="aside-opening-crawl">{movieData[randomIndex].text} <br /> <strong>{movieData[randomIndex].title}</strong> <br /> {movieData[randomIndex].date}</p>
    </aside>
  )
}

export default Aside;
