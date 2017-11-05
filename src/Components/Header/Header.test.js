import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Header from './';

Enzyme.configure({ adapter: new Adapter() });

const result = shallow(<Header />);
test('<Header/> should have 1 root element Section', () => {
    expect(result.find('section').length).toBe(1);
});