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
      this.getGroupData('https://swapi.co/api/people/', 'people');
    }
    if ( section === "planets" ) {
      this.getGroupData('https://swapi.co/api/planets/', 'planets');
    }
    if ( section === "vehicles" ) {
      this.getGroupData('https://swapi.co/api/vehicles/', 'vehicle');
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

  getGroupData(url, dataType) {
    if (Object.keys(localStorage).find( (key) => key===url ) ) {
      this.setState({
        displayArray: JSON.parse(localStorage[url]),
        displayArrayType: dataType
      });
    } else {
      fetch(url)
        .then(rawGroupData => rawGroupData.json())
        .then(groupData => {
          return groupData.results.map( (individual) => {
            return getIndividualData(individual);
          });
        })
        .then(resolvedPromises => {
          localStorage.setItem(url, JSON.stringify(resolvedPromises));
          this.setState({
            displayArray: resolvedPromises,
            displayArrayType: dataType
          });
        });
    }
  }

  componentDidMount() {
    this.getMovieData('https://swapi.co/api/films');
    this.getGroupData('https://swapi.co/api/vehicles', 'vehicles');
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
