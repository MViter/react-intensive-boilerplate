import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render, mount } from 'enzyme';
import App from './';

Enzyme.configure({ adapter: new Adapter() });

const result = mount(<App />);
describe('App container: ', () => {
    test('<App/> should have 1 root element Section', () => {
        console.log('result ', result);
        expect(result.find('section').length).toBe(1);
    });
});