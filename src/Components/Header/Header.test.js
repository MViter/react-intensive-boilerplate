import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Header from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(<Header />);

describe('<Header/> component tests: ', () => {
    test('Should have 3 img elenemts', () => {
        expect(result.find('img').length).toBe(3);
    });

    test('Should have 1 section elenemts', () => {
        expect(result.find('section').length).toBe(1);
    });
});
