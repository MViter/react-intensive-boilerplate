// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import StylesForMobile from './stylesForMobile.scss';
import StylesForTablet from './stylesForTablet.scss';
import logo from '../../theme/assets/newsapi-logo.png';
import MediaQuery from 'react-responsive';
//import { laptop, tablet, mobile } from '../../theme/devices';

export default class Header extends Component {

    render () {

        const menu = ['Home', 'Sources', 'About'];
        const menuItems = menu.map((item, key) => (
            <li key = { key }><a href = '#'>{ item }</a></li>
        ));

        return (
            <section>
                <MediaQuery query = '(min-device-width: 875px)'>
                    <section className = { Styles.container }>
                        <div className = { Styles.header }>
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
                </MediaQuery>

                <MediaQuery query = '(max-device-width: 874px)'>
                    <section className = { StylesForTablet.container }>
                        <div className = { StylesForTablet.header }>
                            <a className = { StylesForTablet.title } href = '#' >
                                <img alt = 'logo' className = { Styles.logo } src = { logo } />
                                <h2 className = { StylesForTablet.titleText } />
                            </a>

                            <nav className = { StylesForTablet.nav }>
                                <ul>
                                    { menuItems }
                                </ul>
                            </nav>
                        </div>
                    </section>
                </MediaQuery>

                <MediaQuery query = '(max-device-width: 479px)'>
                    <section className = { StylesForMobile.container }>
                        <div className = { StylesForMobile.header }>
                            <a className = { StylesForMobile.title } href = '#' >
                                <img alt = 'logo' className = { StylesForMobile.logo } src = { logo } />
                                <h2 className = { StylesForMobile.titleText } />
                            </a>

                            <nav className = { StylesForMobile.nav }>
                                <ul>
                                    { menuItems }
                                </ul>
                            </nav>
                        </div>
                    </section>
                </MediaQuery>
            </section>
        );
    }
}
