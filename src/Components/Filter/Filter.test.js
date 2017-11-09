import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from './';

Enzyme.configure({ adapter: new Adapter() });
export const api = 'https://newsapi.org/';
const getNewsMock = jest.fn();
const getNewsFromDefinedSourcesMock = jest.fn();
const sources = ['abc-news'];

const result = shallow(<Filter api = { api } getNews = { getNewsMock } getNewsFromDefinedSources = { getNewsFromDefinedSourcesMock } sources = { sources } />);

const response = {
    "id"   : "abc-news-au",
    "name" :"ABC News (AU)",
    "description":"Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
    "url":"http://www.abc.net.au/news",
    "category":"general",
    "language":"en",
    "country":"au",
    "urlsToLogos":{"small":"","medium":"","large":""},
    "sortBysAvailable":["top"]
};

describe('<Filter/> component tests: ', () => {
    test('Should have 1 root element Section', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('setState in getSources() should return state as expected.', async () => {
        await result.instance().getSources();
        expect(result.state().sources[0]).toEqual(response);
    });
});

