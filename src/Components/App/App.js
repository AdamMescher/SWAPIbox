import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

class App extends Component {
  constructor () {
    super();
    this.state = {
      movieArray: [],
      peopleArray: [],
      planetArray: [],
      vehicleArray: [],
      favoritesArray: []
    }
    this.cardClicked = this.cardClicked.bind(this);
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

  getFavoritesData() {

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

  getPersonData(person) {
    let tempObject = {
      name: person.name,
      url: person.url
    };
    return fetch(person.homeworld)
      .then(homeworldRawData => homeworldRawData.json())
      .then(homeworldData => {
        Object.assign(tempObject, {
          homeworld: homeworldData.name,
          homeworldPop: homeworldData.population
        })
      })
      .then(totallynewstuff => {
        const unresolvedSpeciesPromises = person.species.map((eachSpecies) => {
          return fetch(eachSpecies)
          .then(speciesRawData => speciesRawData.json())
        })
        return Promise.all(unresolvedSpeciesPromises)
        .then(resolvedSpecies => Object.assign(tempObject, {species: resolvedSpecies}))
      })
  }

  getPeopleData(url){
    fetch(url)
    .then(raw => raw.json())
    .then(parsedData => {
      const unresolvedPromises = parsedData.results.map( (person, index, array) => {
        return this.getPersonData(person)
        // let tempObject = {
        //   name: person.name,
        //   url: person.url
        // };
        // return fetch(person.homeworld)
        //   .then(homeworldRawData => homeworldRawData.json())
        //   .then(homeworldData => {
        //     Object.assign(tempObject, {
        //       homeworld: homeworldData.name,
        //       homeworldPop: homeworldData.population
        //     })
        //   })
        //   .then(totallynewstuff => {
        //     const unresolvedSpeciesPromises = person.species.map((eachSpecies) => {
        //       return fetch(eachSpecies)
        //       .then(speciesRawData => speciesRawData.json())
        //     })
        //     return Promise.all(unresolvedSpeciesPromises)
        //     .then(resolvedSpecies => Object.assign(tempObject, {species: resolvedSpecies}))
        //   })
      })
      Promise.all(unresolvedPromises)
        .then(promiseAllResults => {
          this.setState({
            peopleArray: promiseAllResults
          })
        })
    })
  }

  getPlanetData(url){
    fetch(url)
    .then(raw => raw.json())
    .then(parsedData => {
      const unresolvedPromises = parsedData.results.map( (planet, index, array) => {
        let tempObject = {
          name: planet.name,
          terrain: planet.terrain,
          population: planet.population,
          climate: planet.climate,
          url: planet.url
        };
        const unresolvedResidentPromises = planet.residents.map((eachResident) => {
          return fetch(eachResident)
          .then(speciesRawData => speciesRawData.json())
        })
        return Promise.all(unresolvedResidentPromises)
        .then(pendingResidents => Object.assign(tempObject, {residents: pendingResidents}))
          })
      Promise.all(unresolvedPromises)
        .then(promiseAllResults => {
          this.setState({
            planetArray: promiseAllResults
          })
        })
    })
  }

  getVehicleData(url) {
    fetch(url)
    .then(rawVehiclesData => rawVehiclesData.json())
    .then(vehiclesData => {
      return vehiclesData.results.map( (vehicle) => {
        return Object.assign({}, {
          name: vehicle.name,
          model: vehicle.model,
          class: vehicle.vehicle_class,
          passengers: vehicle.passengers,
          url: vehicle.url
        })

      })
    })
    .then(vehiclesResolvedPromises => {
      this.setState({
        vehicleArray: vehiclesResolvedPromises
      })
    });
  }

  componentDidMount() {
    this.getMovieData('https://swapi.co/api/films');
    this.getPeopleData('https://swapi.co/api/people');
    this.getPlanetData('https://swapi.co/api/planets');
    this.getVehicleData('https://swapi.co/api/vehicles');
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
        <CardContainer
          nounObjects={this.state.displayArray}
          onCardClick={this.cardClicked}
          favoritesArray={this.state.favoritesArray} />
      </div>
    );
  }
}

export default App;
