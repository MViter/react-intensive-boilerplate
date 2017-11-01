// Core
import React, { Component } from 'react';

// Instruments
import { array } from 'prop-types';
import Styles from './styles.scss';

// Components
import NewsItem from '../NewsItem';

export default class News extends Component {

    static propTypes = {
        news: array.isRequired
    };

    render () {

        const { news } = this.props;

        let newsList = [];

        news.forEach(({ articles, source }) => {
            newsList = newsList.concat(articles.map(({ author, description, url, publishedAt, title, urlToImage }, index) => (
                <NewsItem
                    author = { author }
                    description = { description }
                    key = { index }
                    publishedAt = { publishedAt }
                    source = { source }
                    title = { title }
                    url = { url }
                    urlToImage = { urlToImage }
                />
            )));
        });

        return (
            <section className = { Styles.container }>
                { newsList }
            </section>
        );
    }
}
