// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';

// Components
import News from '../News';
import Header from '../Header';
import Search from '../Search';
import Filter from '../Filter';

export default class Grid extends Component {

    static propTypes = {
        api:   string.isRequired,
        appID: string.isRequired
    };

    constructor () {
        super();
        this.state = {
            loading: false,
            news:    [],
            sources: []
        };

        this.getSources = ::this._getSources;
        this.getNews = ::this._getNews;
    }

    componentWillMount () {

        this._getSources(this._getNews);


    }

    componentWillUnmount () {
        clearInterval(this.refetchNews);
    }

    _getSources (callback) {

        const { api } = this.props;

        this.setState({ loading: true });
        fetch(`${api}v1/sources`,
            {
                method: 'GET'
            }).then((response) => {

            if (response.status !== 200) {
                throw new Error('Sources were not loaded.');
            }

            return response.json();
        }).then((response) => {

            this.setState({ sources: response.sources, loading: false });

            this.state.sources.forEach((source) => {
                callback.call(this, source.id);
            });

        })
            .catch(({ message }) => console.log(message));
    }

    _getNews (sourceName) {

        //console.log('$$$ this.props', this.props);
        //const { sourcesIDList } = this.props;
        //const sourceName = 'usa-today';
        //const { appID, api } = this.props;

        //const appID = '3264416afcb24672bfe70507c20a5562';
        //const api = 'https://newsapi.org/';
        const { api, appID } = this.props;

        fetch(`${api}v1/articles?source=${sourceName}&apiKey=${appID}`,
            {
                method: 'GET'
            }).then((response) => {

            if (response.status !== 200) {
                throw new Error('News were not loaded.');
            }

            return response.json();
        }).then((response) => {
            this.setState(() => ({
                news: this.state.news.concat(response)
            }));
        })
            .catch(({ message }) => console.log(message));
    }

    render () {

        if (this.state.loading) {
            console.log('waiting for data');
            //return <h2>Loading...</h2>;
        }

        const { news, sources } = this.state;
        const { api } = this.props;

        return (
            <section className = { Styles.container } >
                <Header />
                <div className = { Styles.filterBlockWrap } >
                    <Filter api = { api } getNews = { this.getNews } />
                </div>
                <div className = { Styles.contentWrap }>
                    <Search />
                    <News news = { news } />
                </div>
            </section>
        );

    }
}
