import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { mount }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from './';

Enzyme.configure({ adapter: new Adapter() });
export const appID = '3264416afcb24672bfe70507c20a5562';
export const api = 'https://newsapi.org/';
const source = 'abc-news';
const getNewsMock = jest.fn();
const getNewsFromDefinedSourcesMock = jest.fn();

const result = mount(<Filter
    api = { api }
    getNews = { getNewsMock }
    getNewsFromDefinedSources = { getNewsFromDefinedSourcesMock }
    sources = { source }
/>);


const wrap = shallow(<Filter />);
test('<Filter/> should have 1 root element Section', () => {
    expect(wrap.find('section').length).toBe(1);
});
//
// test('Checking mock function will be called', () => {
//     expect(getNewsMock.mock.calls.length).toBe(2);
//     expect(getNewsFromDefinedSourcesMock.mock.calls.length).toBe(2);
// });

