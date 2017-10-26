// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';


export default class NewsItem extends Component {

    static propTypes = {
        _id:            string.isRequired,
        author:         string.isRequired,
        title:          string.isRequired,
        description:    string.isRequired,
        url:            string.isRequired,
        urlToImage:     string.isRequired,
        publishedAt:    string.isRequired,
        status:         string.isRequired,
        source:         string.isRequired,
        sortBy:         string.isRequired
    };

    render () {

        const { source, status, author, sortBy, title, description, url, urlToImage, publishedAt } = this.props;
        console.log('urlToImage = ', urlToImage);
        console.log('url = ', url);
        console.log('autor = ', author);
        console.log('title = ', title);

        const time = publishedAt.split('T').join(' ');

        console.log('###source = ', this.context.source);
        return (
            <section className = { Styles.container }>
                <div className = { Styles.newsItem }>
                    <a href = { url } >
                        <img alt = { source } src = '`../../theme/assets/sources/${source}.png`' />
                        <img alt = 'news shortcut' src = { urlToImage } />
                        <p className = { Styles.title }> { title } </p>
                        <p className = { Styles.author }> { author } </p>
                        <p className = { Styles.description }> { description }</p>
                        <p className = { Styles.time }> { time }</p>
                    </a>
                </div>
            </section>
        );
    };
}