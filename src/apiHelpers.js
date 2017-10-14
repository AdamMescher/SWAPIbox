const getIndividualData = (individualObject) => {
  let tempObject = {
    name: individualObject.name,
    url: individualObject.url
  };

  switch (detectType(tempObject)) {
  case 'person':
    return getPersonData(individualObject, tempObject);
  case 'planet':
    return getPlanetData(individualObject, tempObject);
  case 'vehicle':
    return getVehicleData(individualObject, tempObject);
  default:
    return 'unexpected data type';
  }

};

const detectType = (tempObject) => {
  if ( /^https:\/\/swapi.co\/api\/vehicle/.test(tempObject.url) ) {
    return 'vehicle';
  }
  if ( /^https:\/\/swapi.co\/api\/people/.test(tempObject.url) ) {
    return 'person';
  }
  if ( /^https:\/\/swapi.co\/api\/planet/.test(tempObject.url) ) {
    return 'planet';
  }
};

const getPersonData = (person, tempObject) => {
  return fetch(person.homeworld)
    .then(homeworldRawData => homeworldRawData.json())
    .then(homeworldData => {
      Object.assign(tempObject, {
        homeworld: homeworldData.name,
        homeworldPop: homeworldData.population
      });
    })
    .then( () => {
      const unresolvedSpeciesPromises = person.species.map((eachSpecies) => {
        return fetch(eachSpecies)
          .then(speciesRawData => speciesRawData.json());
      });
      return Promise.all(unresolvedSpeciesPromises)
        .then(resolvedSpecies => Object.assign(
          tempObject, {species: resolvedSpecies})
        );
    });
};

const getPlanetData = (planet, tempObject) => {
  tempObject = Object.assign(tempObject, {
    terrain: planet.terrain,
    population: planet.population,
    climate: planet.climate
  });
  const unresolvedResidentPromises = planet.residents.map((eachResident) => {
    return fetch(eachResident)
      .then(speciesRawData => speciesRawData.json());
  });
  return Promise.all(unresolvedResidentPromises)
    .then(pendingResidents => Object.assign(
      tempObject, {residents: pendingResidents})
    );
};

const getVehicleData = (vehicle, tempObject) => {
  return Object.assign(tempObject, {
    model: vehicle.model,
    class: vehicle.vehicle_class,
    passengers: vehicle.passengers
  });
};

export default getIndividualData;
