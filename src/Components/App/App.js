import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import getIndividualData from '../../apiHelpers';

class App extends Component {
  constructor () {
    super();
    this.state = {
      movieArray: [],
      displayArray: [],
      favoritesArray: [],
      displayArrayType: ''
    };
    this.cardClicked = this.cardClicked.bind(this);
    this.displayFavorites = this.displayFavorites.bind(this);
    this.handleSectionClick = this.handleSectionClick.bind(this);
  }

  cardClicked(url) {
    let tempFavoritesArray =
      this.state.favoritesArray.filter( favorite => favorite !== url);
    if (tempFavoritesArray.length === this.state.favoritesArray.length) {
      tempFavoritesArray.push(url);
    }
    this.setState({
      favoritesArray: tempFavoritesArray
    });
  }

  displayFavorites() {
    const favoritesUnresolvedPromises = this.state.favoritesArray.map(
      (favorite) => {
        if (Object.keys(localStorage).find( (key) => key===favorite ) ) {
          return JSON.parse(localStorage[favorite]);
        } else {
          return fetch(favorite)
            .then( rawData => rawData.json())
            .then(favoriteObject => {
              return getIndividualData(favoriteObject);
            });
        }
      }
    );
    Promise.all(favoritesUnresolvedPromises)
      .then(resolvedPromiseArray => {
        resolvedPromiseArray.forEach( (favoriteObject) => {
          if (!localStorage[favoriteObject.url]) {
            localStorage.setItem(
              favoriteObject.url,
              JSON.stringify(favoriteObject)
            );
          }
        });
        this.setState({
          displayArray: resolvedPromiseArray,
          displayArrayType: 'Favorites'
        });
      });
  }

  handleSectionClick(section) {
    if ( section === "people" ) {
      this.getPeopleData('https://swapi.co/api/people/');
    }
    if ( section === "planets" ) {
      this.getPlanetsData('https://swapi.co/api/planets/');
    }
    if ( section === "vehicles" ) {
      this.getVehiclesData('https://swapi.co/api/vehicles/');
    }
  }

  getMovieData(url){
    if (Object.keys(localStorage).find( (key) => key===url ) ) {
      this.setState({
        movieArray: JSON.parse(localStorage[url])
      });
    } else {
      fetch(url)
        .then( rawData => rawData.json() )
        .then( parsedData => parsedData.results.map( movie => {
          return {
            title: movie.title,
            date: movie.created.slice(0, 10),
            text: movie.opening_crawl
          };
        } ) ).then( response =>  this.setState({movieArray: response}) );
    }
  }

  getPeopleData(url){
    if (Object.keys(localStorage).find( (key) => key===url ) ) {
      this.setState({
        displayArray: JSON.parse(localStorage[url]),
        displayArrayType: 'People'
      });
    } else {
      fetch(url)
        .then(raw => raw.json())
        .then(parsedData => {
          const unresolvedPromises = parsedData.results.map( (person) => {
            return getIndividualData(person);
          });
          Promise.all(unresolvedPromises)
            .then(promiseAllResults => {
              localStorage.setItem(url, JSON.stringify(promiseAllResults));
              this.setState({
                displayArray: promiseAllResults,
                displayArrayType: 'People'
              });
            });
        });
    }
  }

  getPlanetsData(url){
    if (Object.keys(localStorage).find( (key) => key===url ) ) {
      this.setState({
        displayArray: JSON.parse(localStorage[url]),
        displayArrayType: 'Planets'
      });
    } else {
      fetch(url)
        .then(raw => raw.json())
        .catch(error => {
          alert(`danger will robinson: ${ error }`);
        })
        .then(parsedData => {
          const unresolvedPromises = parsedData.results.map( (planet) => {
            return getIndividualData(planet);
          });
          Promise.all(unresolvedPromises)
            .then(promiseAllResults => {
              localStorage.setItem(url, JSON.stringify(promiseAllResults));
              this.setState({
                displayArray: promiseAllResults,
                displayArrayType: 'Planets'
              });
            });
        });
    }
  }

  getVehiclesData(url) {
    if (Object.keys(localStorage).find( (key) => key===url ) ) {
      this.setState({
        displayArray: JSON.parse(localStorage[url]),
        displayArrayType: 'Vehicles'
      });
    } else {
      fetch(url)
        .then(rawVehiclesData => rawVehiclesData.json())
        .then(vehiclesData => {
          return vehiclesData.results.map( (vehicle) => {
            return getIndividualData(vehicle);
          });
        })
        .then(vehiclesResolvedPromises => {
          localStorage.setItem(url, JSON.stringify(vehiclesResolvedPromises));
          this.setState({
            displayArray: vehiclesResolvedPromises,
            displayArrayType: 'Vehicles'
          });
        });
    }
  }

  componentDidMount() {
    this.getMovieData('https://swapi.co/api/films');
    this.getVehiclesData('https://swapi.co/api/vehicles');
  }

  render() {
    if ( !this.state.movieArray.length ||
        !this.state.displayArray.length
    ){
      return (
        <div className="loading-container">
          <img
            className="almost-there"
            src={require('../../Assets/Images/almost-there.gif')}
            alt={`Pixel art GIF of X-wing
              flying through the Death Star trench`} />
        </div>
      );
    }

    return (
      <div className="App">
        <Aside
          movieData={this.state.movieArray} />
        <Header
          numberOfFavorites={this.state.favoritesArray.length}
          favoriteButtonClick={this.displayFavorites} />
        <Nav
          buttonCallback={this.handleSectionClick} />
        <CardContainer
          displayArrayType={this.state.displayArrayType}
          nounObjects={this.state.displayArray}
          onCardClick={this.cardClicked}
          favoritesArray={this.state.favoritesArray} />
      </div>
    );
  }
}

export default App;
