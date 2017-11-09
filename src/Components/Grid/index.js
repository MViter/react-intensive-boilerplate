// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';
import StylesForMobile from './stylesForMobile.scss';
import StylesForTablet from './stylesForTablet.scss';
import MediaQuery from 'react-responsive';

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
            this.setState(({ sources }) => ({

                sources:              [...sources, targetSource],
                filteredBySearchNews: []
            }), this._getNewsForAllSources)
            : this.setState(({ sources, news }) => ({
                sources:              sources.filter((source) => source !== targetSource),
                news:                 news.filter((item) => item.source !== targetSource),
                filteredBySearchNews: []
            }));
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

        this.setState(() => ({
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

        const { sources, searchCriteria, filteredBySearchNews } = this.state;
        const { api } = this.props;

        return (
            <section>
                <MediaQuery query = '(min-device-width: 870px)'>
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
                </MediaQuery>

                <MediaQuery query = '(max-device-width: 869px)'>
                    <section className = { StylesForTablet.container } >
                        <Header />
                        <div className = { StylesForTablet.filterBlockWrap } >
                            <Filter
                                api = { api }
                                getNews = { this.getNews }
                                getNewsFromDefinedSources = { this.getNewsFromDefinedSources }
                                sources = { sources }
                            />
                        </div>
                        <div className = { StylesForTablet.contentWrap }>
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
                </MediaQuery>

                <MediaQuery query = '(max-device-width: 479px)'>
                    <section className = { StylesForMobile.container } >
                        <Header />
                        <div className = { StylesForMobile.filterBlockWrap } >
                            <Filter
                                api = { api }
                                getNews = { this.getNews }
                                getNewsFromDefinedSources = { this.getNewsFromDefinedSources }
                                sources = { sources }
                            />
                        </div>
                        <div className = { StylesForMobile.contentWrap }>
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
                </MediaQuery>
            </section>
        );
    }
}
