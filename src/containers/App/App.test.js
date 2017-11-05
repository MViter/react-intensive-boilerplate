import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import App from './';

Enzyme.configure({ adapter: new Adapter() });

const result = mount(<App />);
test('<App/> should have 5 elements Section', () => {
    expect(result.find('section').length).toBe(5);
});