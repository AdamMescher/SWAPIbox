import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import { getVehicleData, getPersonData, getPlanetData } from '../../apiHelpers';
import Button from '../Button/Button';

class App extends Component {
  constructor () {
    super();
    this.state = {
      movieArray: [],
      displayArray: [],
      favoritesArray: []
    }
    this.cardClicked = this.cardClicked.bind(this);
    this.displayFavorites = this.displayFavorites.bind(this);
  }

  cardClicked(url) {
    let tempFavoritesArray = this.state.favoritesArray.filter( favorite => favorite !== url)
    if (tempFavoritesArray.length === this.state.favoritesArray.length) {
      tempFavoritesArray.push(url);
    }
    this.setState({
      favoritesArray: tempFavoritesArray
    })
  }

  displayFavorites() {
    const favoritesUnresolvedPromises = this.state.favoritesArray.map(
      (favorite) => {
        return fetch(favorite)
        .then( rawData => rawData.json())
        .then(favoriteObject => {
          if ( /^https:\/\/swapi.co\/api\/vehicle/.test(favorite) ) {
            return getVehicleData(favoriteObject)
          }
          if ( /^https:\/\/swapi.co\/api\/people/.test(favorite) ) {
            return getPersonData(favoriteObject);
          }
          if ( /^https:\/\/swapi.co\/api\/planet/.test(favorite) ) {
            return getPlanetData(favoriteObject);
          }
        })
      }
    )
    Promise.all(favoritesUnresolvedPromises)
    .then(resolvedPromiseArray => {
      this.setState({
        displayArray: resolvedPromiseArray
      })
    })
  }

  getMovieData(url){
    fetch(url)
      .then( rawData => rawData.json() )
        .then( data => data.results.map( movie => {
          return {
            title: movie.title,
            date: movie.created.slice(0, 10),
            text: movie.opening_crawl
          }
        } ) ).then( response =>  this.setState({movieArray: response}) )
  }

  getPeopleData(url){
    fetch(url)
    .then(raw => raw.json())
    .then(parsedData => {
      const unresolvedPromises = parsedData.results.map( (person) => {
        return getPersonData(person)
      })
      Promise.all(unresolvedPromises)
        .then(promiseAllResults => {
          this.setState({
            displayArray: promiseAllResults
          })
        })
    })
  }

  getPlanetsData(url){
    fetch(url)
    .then(raw => raw.json())
    .catch(err => { console.log(`danger will robinson: ${err}`);})
    .then(parsedData => {
      const unresolvedPromises = parsedData.results.map( (planet) => {
        return getPlanetData(planet);
          })
      Promise.all(unresolvedPromises)
        .then(promiseAllResults => {
          this.setState({
            displayArray: promiseAllResults
          })
        })
    })
  }

  getVehiclesData(url) {
    fetch(url)
    .then(rawVehiclesData => rawVehiclesData.json())
    .then(vehiclesData => {
      return vehiclesData.results.map( (vehicle) => {
        return getVehicleData(vehicle);
      })
    })
    .then(vehiclesResolvedPromises => {
      this.setState({
        displayArray: vehiclesResolvedPromises
      })
    });
  }

  componentDidMount() {
    // this.getMovieData('https://swapi.co/api/films');
    // this.getPlanetsData('https://swapi.co/api/planets')
    this.getVehiclesData('https://swapi.co/api/vehicles');
    // this.getPeopleData('https://swapi.co/api/people')
    // this.displayFavorites()
  }

  render() {
    if( !this.state.movieArray.length ||
        !this.state.planetArray.length ||
        !this.state.peopleArray.length ||
        !this.state.vehicleArray.length
      ){
         return(
           <div className="loading-container">
             <img className="almost-there" src={require('../../Assets/Images/almost-there.gif')} alt="Pixel art GIF of X-wing flying through the Death Star trench" />
           </div>
         )
    }

    return (
      <div className="App">
        <Aside movieData={this.state.movieArray}/>
        <Header numberOfFavorites="0"/>
        <Nav />
        <Button
          buttonClass='favorites-button'
          buttonCallback={this.displayFavorites}
          buttonText='Display Favorites'
          extraContent={this.state.favoritesArray.length}/>
        <CardContainer
          nounObjects={this.state.displayArray}
          onCardClick={this.cardClicked}
          favoritesArray={this.state.favoritesArray} />
      </div>
    );
  }
}

export default App;
