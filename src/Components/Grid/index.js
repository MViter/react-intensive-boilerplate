// Core
import React, { Component } from 'react';

// Instruments
import { string, array, object } from 'prop-types';
import Styles from './styles.scss';

// Components
import News from '../News';

export default class Grid extends Component {

    static propsTypes = {
        api:        string.isRequired,
        appID:      string.isRequired,
        url:        string.isRequired,
        articles:   array.isRequired,
        news:       object.isRequired,
        sortBy:     string.isRequired,
        sourceName: string.isRequired
    };

    constructor () {
        super();

        this.getNews = ::this._getNews;

    }

    state = {
        news: {
            articles: []
        }

    };

    /*
    state = {
        news:
             {
            "status": "ok",
            "source": "bbc-news",
            "sortBy": "top",
            "articles": [{
                    "author": "BBC News",
                    "title": "Kenya goes to polls amid unrest",
                    "description": "President Kenyatta urges people to vote in the election re-run, but his opponent wants a boycott.",
                    "url": "http://www.bbc.co.uk/news/world-africa-41757612",
                    "urlToImage": "https://ichef.bbci.co.uk/images/ic/1024x576/p05kx6zr.jpg",
                    "publishedAt": "2017-10-26T08:54:52Z"
                }, {
                    "author": "BBC News",
                    "title": "Thai king's cremation a year after his death",
                    "description": "A quarter of a million Thais line the streets of Bangkok for the funeral of King Bhumibol Adulyadej.",
                    "url": "http://www.bbc.co.uk/news/world-asia-41748220",
                    "urlToImage": "https://ichef.bbci.co.uk/images/ic/1024x576/p05l0qkj.jpg",
                    "publishedAt": "2017-10-26T07:36:03Z"
                }, {
                    "author": "BBC News",
                    "title": "Tougher US flight security steps launched",
                    "description": "The measures may include short interviews with passengers and inspections of digital devices.",
                    "url": "http://www.bbc.co.uk/news/world-us-canada-41759167",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/632D/production/_97998352_hi041836381.jpg",
                    "publishedAt": "2017-10-26T08:34:26Z"
                }, {
                    "author": "BBC News",
                    "title": "Iraq spurns Kurdish independence 'freeze'",
                    "description": "The government says it will only accept the cancellation of last month's referendum result.",
                    "url": "http://www.bbc.co.uk/news/world-middle-east-41760519",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/16B8C/production/_98486039_hi042520654.jpg",
                    "publishedAt": "2017-10-26T10:37:04Z"
                }, {
                    "author": "BBC News",
                    "title": "Dozens die at Indonesia fireworks factory",
                    "description": "At least 46 die and dozens are injured after explosions at a fireworks factory near Jakarta.",
                    "url": "http://www.bbc.co.uk/news/world-asia-41760857",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/13D10/production/_98486118_fireworks.jpg",
                    "publishedAt": "2017-10-26T11:45:42Z"
                }, {
                    "author": "BBC News",
                    "title": "Weinstein 'raped actress after Baftas'",
                    "description": "The Norwegian model and actress says he attacked her after in a London hotel after the 2008 Baftas.",
                    "url": "http://www.bbc.co.uk/news/entertainment-arts-41760069",
                    "urlToImage": "https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/BFAC/production/_98486094_natassia_afp.jpg",
                    "publishedAt": "2017-10-26T10:33:42Z"
                }, {
                    "author": "BBC News",
                    "title": "Drone captures WWI poem written in poppies",
                    "description": "World War One poem, In Flanders Fields, written in poppies at locations in England, Wales and France.",
                    "url": "http://www.bbc.co.uk/news/av/uk-41759999/world-war-one-poem-spelt-out-in-poppies",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/14800/production/_98486938_mediaitem98486937.jpg",
                    "publishedAt": "2017-10-26T08:57:11Z"
                }, {
                    "author": "BBC News",
                    "title": "Catalan address due amid vote speculation",
                    "description": "Catalonia's president is to give a speech as speculation mounts he will call an election.",
                    "url": "http://www.bbc.co.uk/news/world-europe-41760832",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/FE9A/production/_98487156_e302029a-16b8-4ca7-9389-e8ce42d52900.jpg",
                    "publishedAt": "2017-10-26T12:12:45Z"
                }, {
                    "author": "BBC News",
                    "title": "FBI release sketches of kidnap suspects",
                    "description": "Sherri Papini went missing while she was out running near her home in California last year.",
                    "url": "http://www.bbc.co.uk/news/world-us-canada-41759519",
                    "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/2FD8/production/_98484221_composite1.jpg",
                    "publishedAt": "2017-10-26T09:27:31Z"
                }, {
                    "author": "BBC News",
                    "title": "Ancient skull 'oldest tsunami victim'",
                    "description": "The person is likely to have died in Papua New Guinea about 6,000 years ago, scientists say.",
                    "url": "http://www.bbc.co.uk/news/world-asia-41757232",
                    "urlToImage": "https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/0468/production/_98482110_aitapeskull.jpg",
                    "publishedAt": "2017-10-26T06:34:46Z"
                }
                ]}
    }; */


    componentWillMount () {

        this._getNews();

        this.refetchNews = setInterval(
            () => this.getNews(), 10000
        );
    }

    componentWillUnmount () {
        clearInterval(this.refetchNews);
    }

    _getNews () {

        const { appID, api, sourceName, sortBy } = this.props;

        console.log('URL = ', `${api}v1/articles?source=${sourceName}&apiKey=${appID}`);

        fetch(`${api}v1/articles?source=${sourceName}&apiKey=${appID}`,
            {
                method: 'GET'
            }).then((response) => {

            // console.log(response.status); // 200
            // console.log(response.json());

            if (response.status !== 200) {
                throw new Error('News were not loaded.');
            }

            return response.json();
        }).then(({ response }) =>
            this.setState(() => ({
                news: response.json()
            })))
            .catch(({ message }) => console.log(message));
    }

    // {"status":"ok","source":"mtv-news","sortBy":"top",
    // "articles":[
    // {"author":"Madeline Roth","title":"Playing Camila Cabello’s Grandmother In ‘Havana’ Video Let LeJuan James Go Totally Off-Script","description":"He tells MTV News why working with Camila was 'a match made in heaven'","url":"http://www.mtv.com/news/3043585/lejuan-james-interview-camila-cabello-havana-video/","urlToImage":"https://imagesmtv-a.akamaihd.net/uri/mgid:ao:image:mtv.com:254939?quality=0.8&format=jpg&width=1440&height=810&.jpg","publishedAt":"2017-10-25T19:18:51Z"},
    // {"author":"Crystal Bell","title":"Riverdale Season 2 Is Going To Feel Like 'Zodiac In A Small-Town,' Says Creator","description":"'Riverdale' creator Roberto Aguirre-Sacasa says Season 2 is going to feel like 'Zodiac' in a small-town.","url":"http://www.mtv.com/news/3043660/riverdale-season-2-zodiac-roberto-aguirre-sacasa/","urlToImage":"https://imagesmtv-a.akamaihd.net/uri/mgid:ao:image:mtv.com:254983?quality=0.8&format=jpg&width=1440&height=810&.jpg","publishedAt":"2017-10-25T22:40:09Z"},{"author":"Valentina De Santis","title":"18 Times Drake's Mom Gave Him More Life","description":"It takes a Champagne Mommy to raise a Champagne Papi","url":"http://www.mtv.com/news/3043452/drake-mom-sandra-graham-more-life/","urlToImage":"https://imagesmtv-a.akamaihd.net/uri/mgid:ao:image:mtv.com:254974?quality=0.8&format=jpg&width=1440&height=810&.jpg","publishedAt":"2017-10-25T21:42:07Z"},
    // {"author":"Madeline Roth","title":"Selena Gomez Shares Her Honest Review Of Taylor Swift’s Reputation","description":"'She's killing it'","url":"http://aofe.alwayson.io/3043725/selena-gomez-review-taylor-swift-reputation/","urlToImage":"https://imagesmtv-a.akamaihd.net/uri/mgid:ao:image:mtv.com:255014?quality=0.8&format=jpg&width=1440&height=810&.jpg","publishedAt":"2017-10-25T23:48:15Z"},{"author":"Deepa Lakshmin","title":"Meet The Super Fan Who Followed Lorde Across A Continent","description":"MTV News spoke to Georgia Burke, Lorde's 'beautiful angel'","url":"http://www.mtv.com/news/3043164/lorde-fan-follow-europe-tour-tweet-georgia-burke-interview/","urlToImage":"https://imagesmtv-a.akamaihd.net/uri/mgid:ao:image:mtv.com:252809?quality=0.8&format=jpg&width=1440&height=810&.jpg","publishedAt":"2017-10-25T14:34:02Z"}]}

    render () {

        const { news: { status, source, sortBy, articles }}  = this.state;

        return (
            <section className = { Styles.grid }>
                <div>
                    <News articles = { articles } length = { articles.length } sortBy = { sortBy } source = { source } status = { status } />
                </div>
            </section>
        );
    }
}
