import React from "react";

export class TextInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.callbackSubmit = props.handleSubmit;
      this.label = props.label;
      this.placeHolder = props.placeHolder;
      this.getRandom = props.random;
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRandom = this.handleRandom.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.callbackSubmit(this.state.value);
      this.setState({value: ""});
      console.log(this);
    }

    handleRandom(event) {
      event.preventDefault();
      console.log(this);
      const randomValue = this.getRandom();
      this.setState({value: randomValue});

      this.callbackSubmit(randomValue);
      this.setState({value: ""});
    }

    randomContent() {
      if(this.getRandom) {
        return (
          <input onClick={this.handleRandom} type="button" value="Random" />
        );
      } else {
        return "";
      }
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label className="inputGroup">
            {this.props.label}
            <input className="formControl" placeholder={this.placeHolder} type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          {this.randomContent()}
          
        </form>
      );
    }
  }