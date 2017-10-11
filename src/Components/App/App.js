import React, { Component } from 'react';
// let grossFactorHomeworld;
// let grossFactorSpecies;
// let grossFactorPerson;

class App extends Component {
  constructor () {
    super();
    this.state = {
      peopleArray: [],
      planetArray: [],
    }
  }

  getPeopleData(url){
    fetch(url)
    .then(raw => raw.json())
    .then(parsedData => {
      const unresolvedPromises = parsedData.results.map( (person, index, array) => {
        // declare the object to be manipulated - this is the result after promise resolution
        let tempObject = {name: person.name};
        // Put the promise at the end of the chain into the unresolvedPromises array (line 36)
        return fetch(person.homeworld) //get the data from the current person Homeworld URL
          .then(homeworldRawData => homeworldRawData.json()) //translate raw data
          .then(homeworldData => { //add data retrieved into the object
            Object.assign(tempObject, {
              homeworld: homeworldData.name,
              homeworldPop: homeworldData.population
              //return nothing, next .then is a new thing
            })
          })
          .then(totallynewstuff => { //start a totally new process in the same chain
            //Species can be an array of URLs, let's create a promise array of all URLs in the array
            const unresolvedSpeciesPromises = person.species.map((eachSpecies) => {
              // put this promise in the array
              return fetch(eachSpecies) //grab data
              .then(speciesRawData => speciesRawData.json()) //parse data promise - this is put in the array
            })
            // let's resolve the array of species promises - this will give an array of objects
            return Promise.all(unresolvedSpeciesPromises)
            //create a promise - This promise is not resolved and is placed in the unresolvedPromises array
            .then(resolvedSpecies => Object.assign(tempObject, {species: resolvedSpecies}))
          })
      })
      Promise.all(unresolvedPromises)
        .then(promiseAllResults => {
          console.log(promiseAllResults);
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
      console.log(parsedData);
      const unresolvedPromises = parsedData.results.map( (planet, index, array) => {
        let tempObject = {
          name: planet.name,
          terrain: planet.terrain,
          population: planet.population,
          climate: planet.climate,
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
          console.log(promiseAllResults);
          this.setState({
            planetArray: promiseAllResults
          })
        })
    })
  }

  componentDidMount() {
    this.getPeopleData('https://swapi.co/api/people');
    this.getPlanetData('https://swapi.co/api/planets')

  }

  // componentDidMount() {
  //   fetch('https://swapi.co/api/people/')
  //   .then(raw => raw.json())
  //   .then(parsedData => {
  //     console.log(parsedData)
  //     const unresolvedHomeworldPromises = parsedData.results.map( (person) => {
  //       return fetch(person.homeworld)
  //       .then(homeworldRawData => homeworldRawData.json())
  //       // .then(dataOutput => {console.log(dataOutput)})
  //     });
  //     const unresolvedSpeciesPromises = parsedData.results.map( (person) => {
  //       return fetch(person.species[0])
  //       .then(speciesRawData => speciesRawData.json())
  //     })
  //
  //     Promise.all(unresolvedHomeworldPromises)
  //     .then(homeworldData => {
  //       console.log(homeworldData);
  //       grossFactorHomeworld = homeworldData;
  //     })
  //     Promise.all(unresolvedSpeciesPromises)
  //     .then(speciesData => {
  //       console.log(speciesData);
  //       grossFactorSpecies = speciesData
  //     })
  //
  //     grossFactorPerson = parsedData;
  //
  //   })

    // .then(noReturn => {
    //   console.log(
    //     grossFactorPerson.results.map( (person, index) => (
    //       Object.assign({}, {
    //         name: person.name,
    //         species: grossFactorSpecies[index].name,
    //         homeworld: grossFactorHomeworld[index].name,
    //         homeworldPop: grossFactorHomeworld[index].population
    //       })
    //       )
    //     )
    //   );
    // })


  // }



  render() {
    return (
      <div className="App">
        App
      </div>
    );
  }
}

export default App;
