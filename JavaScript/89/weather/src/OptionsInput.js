import React from "react";
import { changeSettings } from "./settings";

export class OptionsInput extends React.Component {
    constructor(props) {
        super(props);

        this.items = props.items;
        this.label = props.label;
        this.id = props.id;

        console.log(this.items, this.label, this.id);

        this.state = {value: this.items[0].value};
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        console.log('I am handling the changes');
        this.setState({value: event.target.value});

        console.log(this.id, this.state.value);
        changeSettings(this.id, event.target.value);
    }
    
    render() {
        return (
            <div>
                <label htmlFor={this.id}>{this.label}</label>
                <select id={this.id} value={this.state.value} onChange={this.handleChange}>
                    {this.items.map(item => <option key={item.label} value={item.value}>{item.label}</option>)}
                </select>
            </div>
        );
    }
}
