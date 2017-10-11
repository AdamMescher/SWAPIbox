import React, { Component } from 'react';
// let grossFactorHomeworld;
// let grossFactorSpecies;
// let grossFactorPerson;

class App extends Component {

  componentDidMount() {
    fetch('https://swapi.co/api/people')
      .then(raw => raw.json())
      .then(parsedData => {
        //fetch homeworld data
        // let tempObject = {}
        const unresolvedPromises = parsedData.results.map( (person, index, array) => {
          let tempObject = {name: person.name};
          return fetch(person.homeworld)
            .then(homeworldRawData => homeworldRawData.json())
            .then(homeworldData => {
              Object.assign(tempObject, {
                homeworld: homeworldData.name,
                homeworldPop: homeworldData.population
              })
            })
            .then(totallynewstuff => {
              return fetch(person.species[0])
                .then(speciesRawData => speciesRawData.json())
                .then(speciesData => {
                  // console.log('species ', speciesData);
                  Object.assign(tempObject, {species: speciesData.name})
                  return tempObject;
                  // console.log(thing);
                })
                // .then(donzo => {
                //   console.log(donzo)
                //   return donzo;
                // })
            })
        })
        // console.log(unresolvedPromises);
        Promise.all(unresolvedPromises)
          .then(promiseAllResults => {
            console.log(promiseAllResults);
          })
      })
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
