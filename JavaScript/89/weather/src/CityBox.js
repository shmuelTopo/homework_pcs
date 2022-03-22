import React, { Component } from 'react'
import { getSymbol } from './settings'
import './style/cityCards.css';

export default class CityBox extends Component {
    constructor(props) {
        super(props);
        this.data = props.data;
        this.zip = props.zip;
        this.remove = props.remove;
        this.key = new Date().toLocaleString();
        console.log('data', this.data);
    }

    render() {
        return (
            <div key={this.key} className="card">
                <button key="1" onClick={this.remove} className="x">❌</button>
                <h3 key="2">{this.data.name}</h3>
                <h4 key="3">Zip Code: {this.zip}</h4>
                <img key="4" alt='weather status' src={"https://openweathermap.org/img/wn/" + this.data.weather[0].icon + "@2x.png"} />
                <p key="5">{this.data.weather[0].description}</p>
                <p key="6">{Math.round(this.data.main.temp * 10) / 10} {getSymbol()}</p>
            </div>
        )
    }
}

