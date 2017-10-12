const getPersonData = (person) => {
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

const getPlanetData = (planet) => {
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
}

const getVehicleData = (vehicle) => {
  return Object.assign({}, {
    name: vehicle.name,
    model: vehicle.model,
    class: vehicle.vehicle_class,
    passengers: vehicle.passengers,
    url: vehicle.url
  })
}

export { getPlanetData, getPersonData, getVehicleData };
