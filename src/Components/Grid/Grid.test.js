import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render, mount } from 'enzyme';
import Grid from './';

Enzyme.configure({ adapter: new Adapter() });

const appID = '3264416afcb24672bfe70507c20a5562';
const api = 'https://newsapi.org/';
const url = api.concat(appID);
const expectedSearchString = 'abc';

const mutatedState = {
    news: [
        {
            "author": "http://www.abc.net.au/news/henry-belot/7953986",
            "title": "Turnbull won't accept NZ offer to resettle asylum seekers 'at this time'",
            "description": "Malcolm Turnbull says he will not accept New Zealand's offer to resettle asylum seekers in offshore detention centres at this stage.",
            "url": "http://www.abc.net.au/news/2017-11-05/turnbull-wont-accept-nz-offer-to-resettle-refugees-at-this-time/9120028",
            "urlToImage": "http://www.abc.net.au/news/image/9120046-1x1-700x700.jpg",
            "publishedAt": "2017-11-05T05:14:28Z"
        }]
}

const response = {
    articles: [{
        "author": "http://www.abc.net.au/news/henry-belot/7953986",
        "title": "Turnbull won't accept NZ offer to resettle asylum seekers 'at this time'",
        "description": "Malcolm Turnbull says he will not accept New Zealand's offer to resettle asylum seekers in offshore detention centres at this stage.",
        "url": "http://www.abc.net.au/news/2017-11-05/turnbull-wont-accept-nz-offer-to-resettle-refugees-at-this-time/9120028",
        "urlToImage": "http://www.abc.net.au/news/image/9120046-1x1-700x700.jpg",
        "publishedAt": "2017-11-05T05:14:28Z"
    }],
    source: ['abc-news']
}

const response2 = {
    articles: [{
        "author": "http://www.abc.net.au/news/henry-belot/7953986",
        "title": "Turnbull won't accept NZ offer to resettle asylum seekers 'at this time'",
        "description": "Malcolm Turnbull says he will not accept New Zealand's offer to resettle asylum seekers in offshore detention centres at this stage.",
        "url": "http://www.abc.net.au/news/2017-11-05/turnbull-wont-accept-nz-offer-to-resettle-refugees-at-this-time/9120028",
        "urlToImage": "http://www.abc.net.au/news/image/9120046-1x1-700x700.jpg",
        "publishedAt": "2017-11-05T05:14:28Z"
    }],
    source: ['google-news']
}

window.fetch = jest.fn().mockImplementation((url) => {
    return Promise.resolve({
        json() {
            return response
        },
        status: 200
    });
})

const errMessage = 'sourceName should be a string.';

const result = shallow(<Grid api = { api } appID = { appID } />);

describe('Grid component tests: ', () => {
    test('<Grid /> should render <section> element for each item', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Grid setState in getNews() returns state as expected.', async () => {
        await result.instance().getNews('abc-news');
        expect(result.state().news).toEqual([response]);
    });

    test('Grid setState in handleSearchInput() returns state as expected.', async () => {

        await result.instance().handleSearchInput(expectedSearchString);
        expect(result.state().searchCriteria).toEqual(expectedSearchString);
    });

    test('Grid compareBySource() returns 0 when articles are equal.', () => {

        const resultOfComparing = result.instance().compareBySource(response, response);
        expect(resultOfComparing).toBe(0);
    });

    test('Grid compareBySource() returns -1 when 2nd article should be before 1st one.', () => {
        const resultOfComparing = result.instance().compareBySource(response, response2);
        expect(resultOfComparing).toBe(-1);
    });

    test('Grid compareBySource() returns 1 when 1st article should be before 2nd one.', () => {

        const resultOfComparing = result.instance().compareBySource(response2, response);
        expect(resultOfComparing).toBe(1);
    });

    test('Grid should throw error for wrong getNews parameter', async () => {
        await expect(result.instance().getNews(['abc-news'])).rejects.toEqual(Error(errMessage));
    });

});


