// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import logo from '../../theme/assets/newsapi-logo.png';

export default class Header extends Component {

    render () {

        const menu = ['Home', 'Sources', 'About'];
        const menuItems = menu.map((item, key) => (
            <li key = { key }><a href = '#'>{ item }</a></li>
        ));

        return (
            <section className = { Styles.container }>
                <div className = { Styles.header }>
                    <span className = { Styles.filtersForSmall } >
                        <button value = 'Filters'>Sources</button>
                    </span>
                    <a className = { Styles.title } href = '#' >
                        <img alt = 'logo' className = { Styles.logo } src = { logo } />
                        <h2 className = { Styles.titleText } />
                    </a>

                    <nav className = { Styles.nav }>
                        <ul>
                            { menuItems }
                        </ul>
                    </nav>
                </div>

            </section>
        );
    }
}
