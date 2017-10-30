// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';

// Components
import News from '../News';
import Sources from '../Sources';

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
        this.state = {
            sourcesOfNews: {
                sources: []
            },
            news: {
                status: '',
                source: '',
                sortBy: '',
                articles: []
            }

        };

        this.getNews = ::this._getNews;
        this.getSources = ::this._getSources;

    }

    componentWillMount () {

        this._getSources();
        this._getNews();
        this.refetchNews = setInterval(
            () => this.getNews(), 10000
        );

        this.refetchSources = setInterval(
            () => this.getSources(), 10000
        );
    }

    componentWillUnmount () {

        clearInterval(this.refetchNews);
        clearInterval(this.refetchSources);
    }

    _getNews () {

        const { appID, api, sourceName, sortBy } = this.props;


        fetch(`${api}v1/articles?source=${sourceName}&apiKey=${appID}`,
            {
                method: 'GET'
            }).then((response) => {

            if (response.status !== 200) {
                throw new Error('News were not loaded.');
            }

            return response.json();
        }).then(( response ) => {
            //console.log('response ', response);
            this.setState (() => ({
                news: response
            }));
        })
            .catch(({ message }) => console.log(message));
    }

    _getSources () {

        const { api } = this.props;


        fetch(`${api}v1/sources`,
            {
                method: 'GET'
            }).then((response) => {

            if (response.status !== 200) {
                throw new Error('Sources were not loaded.');
            }

            return response.json();
        }).then(( response ) => {
            //console.log('response ', response);
            this.setState (() => ({
                sourcesOfNews: response
            }));
        })
            .catch(({ message }) => console.log(message));
    }

    render () {

        const { news: { articles },  sourcesOfNews: { sources }, source, sortBy } = this.state;
        const { sourcesOfNews: { sources: id='usa-today' }} = this.state;

        console.log('articles: ', articles);
        console.log('sources: ', sources);
        console.log('id: ', id);

        return (
            <section className = { Styles.grid }>
                <div>
                    <News articles = { articles } />
                    <Sources sources = { sources } />
                </div>
            </section>
        );
    }
}
