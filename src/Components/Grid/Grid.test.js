import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render } from 'enzyme';
import Grid from './';

Enzyme.configure({ adapter: new Adapter() });

const appID = '3264416afcb24672bfe70507c20a5562';
const api = 'https://newsapi.org/';
const url = api.concat(appID);

const state = {
    news: []
};
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
    sources: ['abc-news']
}

const result = shallow(<Grid api = { api } appID = { appID } />);

window.fetch = jest.fn().mockImplementation(() => {
     return Promise.resolve(response);
    });
// const mockFn = jest.fn();

describe('NewsItem component: ', () => {
    test('<Grid /> should render <section> element for each item', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Grid setState returns state as expected', () => {
        result.instance().getNews();
        //console.log('result.state().news ', result.state().news);
        expect(result.state()).toEqual(mutatedState);



    });

});



