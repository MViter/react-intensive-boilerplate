// Core
import React, { Component } from 'react';

// Instruments
import { string, array } from 'prop-types';
import Styles from './styles.scss';

// Components
import NewsItem from '../NewsItem';

export default class News extends Component {

    static propTypes = {
        _id:            string.isRequired,
        status:         string.isRequired,
        source:         string.isRequired,
        sortBy:         string.isRequired,
        articles:       array.isRequired,
        author:         string.isRequired,
        title:          string.isRequired,
        description:    string.isRequired,
        url:            string.isRequired,
        urlToImage:     string.isRequired,
        publishedAt:    string.isRequired
    };

    render () {

        const { status, source, sortBy } = this.props;
        const { articles } = this.props;
        console.log(' source ', source);
        const newsList = articles.map(({ source, author, title, description, itemUrl, urlToImage, publishedAt}, index) => (
            <NewsItem
                key = { index }
                source = { source }
                author = { articles[index].author }
                title = { articles[index].title }
                description = { articles[index].description }
                itemUrl = {articles[index].url}
                urlToImage = {articles[index].urlToImage }
                publishedAt = { articles[index].publishedAt}
            />
        ));

        return (
                <section className = {  Styles.container }>
                    { newsList }
                </section>
            );
        };


}