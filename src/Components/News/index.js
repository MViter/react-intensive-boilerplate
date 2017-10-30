// Core
import React, { Component } from 'react';

// Instruments
import { string, array } from 'prop-types';
import Styles from './styles.scss';

// Components
import NewsItem from '../NewsItem';

export default class News extends Component {

    static propTypes = {
        articles:    array.isRequired
    };

    render () {

        const { articles } = this.props;
        console.log('In \'News\', articles = ', articles );

        //console.log('&&& In News articles: ', articles[2].title);
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
