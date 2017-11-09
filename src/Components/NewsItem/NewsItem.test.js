// index.test.js
import React from 'react';
import Enzyme, { mount }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewsItem, { getPublishedTimeInCorrectFormat } from './';

Enzyme.configure({ adapter: new Adapter() });

const timeFromServer = '2017-11-04T13:48:30Z';
const expectedTime = '2017-11-04 13:48:30';
const result = mount(<NewsItem
    author = { 'author' }
    description = { 'description' }
    key = { 1 }
    publishedAt = { timeFromServer }
    source = { 'source' }
    title = { 'title' }
    url = { 'url' }
    urlToImage = { 'urlToImage' }
/>, {

});

describe('<NewsItem/> component: ', () => {
    test('Should have 1 \'Section\' element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('Should have 5 \'5\' element', () => {
        expect(result.find('p')).toHaveLength(5);
    });

    test('Should return 1 img element', () => {
        expect(result.find('img').length).toBe(1);
    });

    test('getPublishedTimeInCorrectFormat() returns value expected.', () => {
        const actualTime = result.instance().getPublishedTimeInCorrectFormat(timeFromServer);

        expect(actualTime).toEqual(expectedTime);
    });

});
