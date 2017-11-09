import React from 'react';
import FilterItem from './';
import dom from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
const getNewsMock = jest.fn();
const getNewsFromDefinedSourcesMock = jest.fn();

Enzyme.configure({ adapter: new Adapter() });

const renderTree = dom.create(
    <FilterItem getNews = { getNewsMock } getNewsFromDefinedSources = { getNewsFromDefinedSourcesMock } sourceID = 'abc-news' />
).toJSON();

const result = shallow(<FilterItem getNews = { getNewsMock } getNewsFromDefinedSources = { getNewsFromDefinedSourcesMock } sourceID = 'abc-news' />);

describe('<FilterItem/> component tests: ', () => {
    it('Component should be equal to its snapshot', () => {
        expect(renderTree).toMatchSnapshot();
    });

    test('Should have 1 input elenemt', () => {
        expect(result.find('input').length).toBe(1);
    });
});
