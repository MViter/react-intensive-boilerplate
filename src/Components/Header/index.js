// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import logo from '../../theme/assets/newsapi-logo.png';
import hamburger from '../../theme/assets/hm.png';

export default class Header extends Component {

    render () {

        const menu = ['Home', 'Filters', 'Sources', 'About'];
        const menuItems = menu.map((item, key) => (
            <li key = { key }><a href = '#'>{ item }</a></li>
        ));

        return (
            <section className = { Styles.container }>
                <div className = { Styles.header }>
                    <span className = { Styles.filtersForSmall } >
                        <button value = 'Sources'>Sources</button>
                    </span>
                    <a className = { Styles.title } href = '#' >
                        <img alt = 'logo' className = { Styles.logo } src = { logo } />
                        <h2 className = { Styles.titleText } />
                    </a>
                    <div className = { Styles.hamburger_btn }>
                        <span><img src = { hamburger } /></span>
                    </div>
                    <div className = { Styles.top_menu }>
                        <ul className = { Styles.menu }>
                            { menuItems }
                        </ul>
                    </div>
                </div>

            </section>
        );
    }
}
