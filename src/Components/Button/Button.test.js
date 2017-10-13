import React from 'react';
import Button from './Button';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import config from '../../config';

describe(`Button`, () => {
  let wrapper, button, buttonText;
  const mockFunction = jest.fn();

  beforeEach( () => {
    wrapper = shallow(
      <Button
        buttonText='Button Text'
        buttonClass='button-class'
        extraContent={4}
        buttonCallback={mockFunction} />
    );
    button = wrapper.find('button');
    buttonText = button.text();
  });

  test(`Can be created`, () => {
    expect(wrapper.exists()).toEqual(true);
  });

  test(`Receives properties`, () => {
    expect(button.type()).toEqual('button');
    expect(buttonText).toEqual('Button Text 4');
  });

  test(`receives a class`, () => {
    expect((button).hasClass('button-class')).toEqual(true);
  });

  test(`clicking the button triggers the function`, () => {
    button.simulate('click');
    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
