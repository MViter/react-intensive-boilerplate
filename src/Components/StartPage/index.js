// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';


export default class Grid extends Component {

    render () {

        return (
            <section className = { Styles.container } >

                <div className = { Styles.startPage } >
                    <h1>Set sources to fill this grid with news</h1>
                </div>
            </section>
        );

    }
}
