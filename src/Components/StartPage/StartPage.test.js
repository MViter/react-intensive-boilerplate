import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import StartPage from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(<StartPage />);

describe('<StartPage/> component tests: ', () => {
    test('Should have 1 root element Section', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Should have 1 title element', () => {
        expect(result.find('h1').length).toBe(1);
    });
});