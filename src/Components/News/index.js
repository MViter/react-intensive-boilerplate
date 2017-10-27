// Core
import React, { Component } from 'react';

// Instruments
import { string, array } from 'prop-types';
import Styles from './styles.scss';

// Components
import NewsItem from '../NewsItem';

export default class News extends Component {

    static propTypes = {
        _id:         string.isRequired,
        articles:    array.isRequired,
        author:      string.isRequired,
        description: string.isRequired,
        publishedAt: string.isRequired,
        sortBy:      string.isRequired,
        source:      string.isRequired,
        status:      string.isRequired,
        title:       string.isRequired,
        url:         string.isRequired,
        urlToImage:  string.isRequired
    };

    render () {

        //const { status, source, sortBy } = this.props;
        const { articles } = this.props;

        const newsList = articles.map(({ source, author, title, description, itemUrl, urlToImage, publishedAt }, index) => (
            <NewsItem
                author = { articles[index].author }
                description = { articles[index].description }
                itemUrl = { articles[index].url }
                key = { index }
                publishedAt = { articles[index].publishedAt }
                source = { source }
                title = { articles[index].title }
                urlToImage = { articles[index].urlToImage }
            />
        ));

        return (
            <section className = { Styles.container }>
                { newsList }
            </section>
        );
    }
}
