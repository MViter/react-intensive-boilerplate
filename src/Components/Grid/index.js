// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';

// Components
import News from '../News';

export default class Grid extends Component {

    static propsTypes = {
        api:        string.isRequired,
        appID:      string.isRequired,
        url:        string.isRequired,
        articles:   array.isRequired,
        news:       object.isRequired,
        sortBy:     string.isRequired,
        sourceName: string.isRequired
    };

    constructor () {
        super();

        this.getNews = ::this._getNews;

    }

    state = {
        news: {
            status:   '',
            source:   '',
            sortBy:   '',
            articles: []
        }

    };

    /* state = {
        news:
             {
            "status": "ok",
            "source": "bbc-news",
            "sortBy": "top",
            "articles": [{
                    "author": "BBC News",
                    "title": "Kenya goes to polls amid unrest",
                    "description": "President Kenyatta urges people to vote in the election re-run, but his opponent wants a boycott.",
                    "url": "http://www.bbc.co.uk/news/world-africa-41757612",
                    "urlToImage": "https://ichef.bbci.co.uk/images/ic/1024x576/p05kx6zr.jpg",
                    "publishedAt": "2017-10-26T08:54:52Z"
                }, {
                    "author": "BBC News",
                    "title": "Thai king's cremation a year after his death",
                    "description": "A quarter of a million Thais line the streets of Bangkok for the funeral of King Bhumibol Adulyadej.",
                    "url": "http://www.bbc.co.uk/news/world-asia-41748220",
                    "urlToImage": "https://ichef.bbci.co.uk/images/ic/1024x576/p05l0qkj.jpg",
                    "publishedAt": "2017-10-26T07:36:03Z"
                }, {
                    "author": "BBC News",
                    "title": "Tougher US flight security steps launched",
                    "description": "The measures may include short interviews with passengers and inspections of digital devices.",
                    "url": "http://www.bbc.co.uk/news/world-us-canada-41759167",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/632D/production/_97998352_hi041836381.jpg",
                    "publishedAt": "2017-10-26T08:34:26Z"
                }, {
                    "author": "BBC News",
                    "title": "Iraq spurns Kurdish independence 'freeze'",
                    "description": "The government says it will only accept the cancellation of last month's referendum result.",
                    "url": "http://www.bbc.co.uk/news/world-middle-east-41760519",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/16B8C/production/_98486039_hi042520654.jpg",
                    "publishedAt": "2017-10-26T10:37:04Z"
                }, {
                    "author": "BBC News",
                    "title": "Dozens die at Indonesia fireworks factory",
                    "description": "At least 46 die and dozens are injured after explosions at a fireworks factory near Jakarta.",
                    "url": "http://www.bbc.co.uk/news/world-asia-41760857",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/13D10/production/_98486118_fireworks.jpg",
                    "publishedAt": "2017-10-26T11:45:42Z"
                }, {
                    "author": "BBC News",
                    "title": "Weinstein 'raped actress after Baftas'",
                    "description": "The Norwegian model and actress says he attacked her after in a London hotel after the 2008 Baftas.",
                    "url": "http://www.bbc.co.uk/news/entertainment-arts-41760069",
                    "urlToImage": "https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/BFAC/production/_98486094_natassia_afp.jpg",
                    "publishedAt": "2017-10-26T10:33:42Z"
                }, {
                    "author": "BBC News",
                    "title": "Drone captures WWI poem written in poppies",
                    "description": "World War One poem, In Flanders Fields, written in poppies at locations in England, Wales and France.",
                    "url": "http://www.bbc.co.uk/news/av/uk-41759999/world-war-one-poem-spelt-out-in-poppies",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/14800/production/_98486938_mediaitem98486937.jpg",
                    "publishedAt": "2017-10-26T08:57:11Z"
                }, {
                    "author": "BBC News",
                    "title": "Catalan address due amid vote speculation",
                    "description": "Catalonia's president is to give a speech as speculation mounts he will call an election.",
                    "url": "http://www.bbc.co.uk/news/world-europe-41760832",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/FE9A/production/_98487156_e302029a-16b8-4ca7-9389-e8ce42d52900.jpg",
                    "publishedAt": "2017-10-26T12:12:45Z"
                }, {
                    "author": "BBC News",
                    "title": "FBI release sketches of kidnap suspects",
                    "description": "Sherri Papini went missing while she was out running near her home in California last year.",
                    "url": "http://www.bbc.co.uk/news/world-us-canada-41759519",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/2FD8/production/_98484221_composite1.jpg",
                    "publishedAt": "2017-10-26T09:27:31Z"
                }
                ]}
    }; */

    componentWillMount () {

        this._getNews();
        this.refetchNews = setInterval(
            () => this.getNews(), 10000
        );
    }

    componentWillUnmount () {

        clearInterval(this.refetchNews);
    }

    _getNews () {

        const { appID, api, sourceName, sortBy } = this.props;

        fetch(`${api}v1/articles?source=${sourceName}&apiKey=${appID}`,
            {
                method: 'GET'
            }).then((response) => {

            //console.log(response.json()); // Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: {…}}

            if (response.status !== 200) {
                throw new Error('News were not loaded.');
            }

            return response.json();
        }).then(({ response }) => {
            this.setState = (() => ({
                news: response
            }));
        })
            .catch(({ message }) => console.log(message));
    }


    render () {

        const { news: { articles }, status, source, sortBy }  = this.state;

        console.log('articles ', articles); // []

        return (
            <section className = { Styles.grid }>
                <div>
                    <News articles = { articles } length = { articles.length } sortBy = { sortBy } source = { source } status = { status } />
                </div>
            </section>
        );
    }
}
