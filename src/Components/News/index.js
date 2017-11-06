// Core
import React, { Component } from 'react';

// Instruments
import { array } from 'prop-types';
import Styles from './styles.scss';
import moment from 'moment';

// Components
import NewsItem from '../NewsItem';
import { getUniqueID } from '../../helpers';

export default class News extends Component {

    static propTypes = {
        news: array.isRequired
    }

    render () {

        const { news } = this.props;

        let newsList = [];

        news.forEach(({ articles, source }) => {
            newsList = newsList.concat(articles.map(({ author, description, url, publishedAt, title, urlToImage }) => (

                <NewsItem
                    author = { author ? author : source }
                    description = { description }
                    key = { getUniqueID(10) }
                    publishedAt = { publishedAt ? publishedAt : moment().format('MMMM D h:mm:ss a') }
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
