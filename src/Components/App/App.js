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
      vehicleArray: []
    }
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
      const unresolvedPromises = parsedData.results.map( (person, index, array) => { //line XXXX
        // declare the object to be manipulated - this is the result after promise resolution
        let tempObject = {
          name: person.name,
          url: person.url
        };
        // Put the promise at the end of the chain into the unresolvedPromises array (Promise is on line YYYY)
        return fetch(person.homeworld) //get the data from the current person Homeworld URL
          .then(homeworldRawData => homeworldRawData.json()) //translate raw data
          .then(homeworldData => { //add data retrieved into the object
            Object.assign(tempObject, {
              homeworld: homeworldData.name,
              homeworldPop: homeworldData.population
            }) //return nothing, next .then is a new thing
          })
          .then(totallynewstuff => { //start a totally new process in the same chain
            //Species can be an array of URLs, let's create a promise array of all URLs in the array
            const unresolvedSpeciesPromises = person.species.map((eachSpecies) => {
              // put promise on line ZZZZ in the array for each species
              return fetch(eachSpecies) //grab data
              .then(speciesRawData => speciesRawData.json()) //parse data promise - this is put in the species array // Line ZZZZ
            })
            // let's resolve the array of species promises - this will give an array of objects
            return Promise.all(unresolvedSpeciesPromises) //return this promise chain to line XXXX
            //create a promise - This promise is not resolved and is placed in the unresolvedPromises array
            .then(resolvedSpecies => Object.assign(tempObject, {species: resolvedSpecies})) // line YYYY
          })
      })
      Promise.all(unresolvedPromises) // unresolved promises is currently an array of Object promises
        .then(promiseAllResults => { //resolve promises to get objects
          this.setState({
            peopleArray: promiseAllResults //put objects in state
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
          <audio preload={'auto'}>
            <source src={require('../../Assets/Audio/star-wars-opening-crawl.ogg')} type="audio/ogg" autoPlay={true} />
            <source src={require('../../Assets/Audio/star-wars-opening-crawl.mp3')} type="audio/mpeg" />
          </audio>
        <Aside movieData={this.state.movieArray}/>
        <Header numberOfFavorites="0"/>
        <Nav />
        <CardContainer nounObjects={this.state.planetArray}/>
      </div>
    );
  }
}

export default App;
