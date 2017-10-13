import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from './Card';

describe( `CARD`, () => {
  let
    wrapperPerson,
    wrapperPlanet,
    wrapperVehicle,
    card;

  beforeEach( () => {
    wrapperPerson = shallow(
      <Card
        nounObject={ {
          name: 'Luke Skywalker',
          species: 'Human',
          homeworld: 'Tatooine',
          language: 'Galactic Basic',
          population: 200000
        } }
      />);

    wrapperPlanet = shallow(
      <Card
        nounObject={{
          name: 'Tatooine',
          terrain: 'desert',
          population: 200000,
          climate: 'arid',
          residents: [
            "Luke Skywalker",
            "C-3PO",
            "Darth Vader",
            "Owen Lars",
            "Beru Whitesun lars",
            "R5-D4",
            "Biggs Darklighter",
            "Anakin Skywalker",
            "Shmi Skywalker",
            "Cliegg Lars"
          ]
        }}
      />);
  });

  wrapperVehicle = shallow(
    <Card
      nounObject={ {
        name: 'Sand Crawler',
        model: 'Digger Crawler',
        class: 'wheeled',
        passengers: 30
      } }
    />);

  it( `should exist`, () => {

  });
  it( ``, () => {});
  it( ``, () => {});
  it( ``, () => {});
});
