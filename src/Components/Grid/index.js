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
        filteredBySearchNews: [], // think how to rework, should use only one
        searchCriteria:       ''
    };

    _getNewsFromDefinedSources (targetSource, callback, isChecked) {

        console.log('isChecked ', isChecked);

        isChecked ?
            this.setState(({ sources }) => ({

                sources: [...sources, targetSource],
                filteredBySearchNews: []
            }), this._getNewsForAllSources)
            : this.setState(({ sources, news, filteredBySearchNews }) => ({
                sources:              sources.filter((source) => source !== targetSource),
                news:                 news.filter((item) => item.source !== targetSource),
                filteredBySearchNews: []
            }));
        ;

        // isChecked ?
        //     this.setState((prevState) => ({
        //         sources: [...prevState.sources, targetSource],
        //         news: []
        //     }), this._getNewsForAllSources)
        //     : this.setState((prevState) => { // splice is not good idea, re-write with filter
        //         const newNews = prevState.news.filter((item) => {
        //             return targetSource !== item.source;
        //         });
        //
        //         console.log('newNews ', newNews);
        //         prevState.sources.splice(prevState.sources.indexOf(targetSource), 1);
        //
        //         return {
        //             sources: prevState.sources,
        //             news: newNews
        //         };
        //     }, this._getNewsForAllSources);
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

        console.log('in _getNewsForAllSources');
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

    async _getNews (sourceName) {

        console.log('in _getNews');

        if (typeof sourceName !== 'string') {
            throw new Error('sourceName should be a string.');
        }

        const { api, appID } = this.props;

        await fetch(`${api}v1/articles?source=${sourceName}&apiKey=${appID}`, {
            method: 'GET'
        })
            .then((response) => {

                if (response.status !== 200) {
                    throw new Error('News were not loaded.');
                }

                return response.json();
            })
            .then(({ articles, source }) => {

                this.setState(({ news }) => {
                    const sortedNews = [...news, { articles, source }].sort(this.compareBySource);

                    return {
                        news: sortedNews
                    };
                }, this.getNewsFromSearch);
            })
            .catch(({ message }) => console.log(message));
    }

    render () {

        console.log('this.state ', this.state);
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
