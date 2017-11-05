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
import StartPage from '../StartPage';

export default class Grid extends Component {

    static propTypes = {
        api:   string.isRequired,
        appID: string.isRequired
    };

    constructor () {
        super();

        this.getNews = ::this._getNews;
        this.getNewsFromDefinedSources = ::this._getNewsFromDefinedSources;
        this.getNewsFromSearch = ::this._getNewsFromSearch;
        this.handleSearchInput = ::this._handleSearchInput;
    }

    state = {
        sources:              [],
        loading:              false,
        news:                 [],
        filteredBySearchNews: [],
        searchCriteria:       ''
    };

    _getNewsFromDefinedSources (targetSource, callback, isChecked) {

        isChecked ?
            this.setState((prevState) => ({ sources: [...prevState.sources, targetSource]}), this._getNewsForAllSources)
            : this.setState((prevState) => {
                prevState.sources.splice(prevState.sources.indexOf(targetSource), 1);

                return {
                    sources: prevState.sources
                };
            }, this._getNewsForAllSources);
    }

    _getNewsFromSearch () {
        const searchCriteria = this.state.searchCriteria.toLowerCase();

        this.setState((prevValue) => {
            const filteredNews = prevValue.news.map((item) => ({
                source:   item.source,
                articles: item.articles.filter((articles) => articles.title.toLowerCase().indexOf(searchCriteria) > -1)
            }));

            return {
                filteredBySearchNews: filteredNews
            };
        });
    }

    _getNewsForAllSources () {
        this.setState(() => ({// {news}
            news: []
        }), () => {
            if (this.state.sources) {
                this.state.sources.forEach((source) => {
                    this.getNews(source);
                });
            }
        });
    }

    compareBySource (news1, news2) {
        if (news1.source < news2.source) {
            return -1;
        }
        if (news1.source > news2.source) {
            return 1;
        }

        return 0;
    }

    _handleSearchInput (value) {
        this.setState({
            searchCriteria: value
        }, this.getNewsFromSearch);
    }

    _getNews (sourceName) {

        const { api, appID } = this.props;

        fetch(`${api}v1/articles?source=${sourceName}&apiKey=${appID}`,
            {
                method: 'GET'
            }).then((response) => {

            if (response.status !== 200) {
                throw new Error('News were not loaded.');
            }

            return response.json();
        }).then(({ articles, source }) => {
            console.log('articles ', articles);
            this.setState(({ news }) => {
                /* const sortedNews = [...news, { articles, source }].sort(this.compareBySource);

                return {
                    news: sortedNews
                };*/
                return { news: articles }
            }, this.getNewsFromSearch);
        })
            .catch(({ message }) => console.log(message));
    }

    render () {
        const { sources, searchCriteria, filteredBySearchNews } = this.state;
        const { api } = this.props;

        return (
            <section className = { Styles.container } >
                <Header />
                <div className = { Styles.filterBlockWrap } >
                    <Filter
                        api = { api }
                        getNews = { this.getNews }
                        getNewsFromDefinedSources = { this.getNewsFromDefinedSources }
                        sources = { sources }
                    />
                </div>
                <div className = { Styles.contentWrap }>
                    <Search
                        api = { api }
                        getNews = { this.getNews }
                        handleSearchInput = { this.handleSearchInput }
                        searchCriteria = { searchCriteria }
                    />
                    {
                        sources.length === 0 ? <StartPage /> : <News news = { filteredBySearchNews } sources = { sources } />
                    }
                </div>
            </section>
        );
    }
}
