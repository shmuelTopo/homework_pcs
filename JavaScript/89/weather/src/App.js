import Navbar from './Navbar';
import React from 'react';
import { TextInput } from './TextInput';
import { getLang, getTemp} from './settings';
import CityBox from './CityBox';
import { getRandomZipCode } from './helperFunctions';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.citiesDisplay = [];
        this.handleZipSubmit = this.handleZipSubmit.bind(this);
        this.appId = '4e013f6fa12ece3b83bf10a0900c8020';
        this.cities = [];
        this.state = {
            showCities: this.citiesDisplay
        }
    }

    async handleZipSubmit(value) {
        const key = new Date().toLocaleString() + value;
        
        try {
          const link = `https://api.openweathermap.org/data/2.5/weather?zip=${value}&appid=${this.appId}&units=${getTemp()}&lang=${getLang()}`
          const response = await fetch(link);
          const data = await response.json();
        
          if(!response.ok){
            console.log('data', data);
            const message = data.cod === '404' ? `${data.message} please provide a proper zip code` : 'Something went wrong';
            throw new Error(message);
          }

          const removeCity = function() {
            this.cities = this.cities.filter(city => {
              return city.key !== key;
            })
  
            this.setState({
              showCities: this.cities
            })
          }.bind(this);
          
          this.cities.push(<CityBox data={data} zip={value} key={key} remove={removeCity} />);
          
          this.setState({
              showCities: this.cities
          });

        } catch(e){
          alert(e);
        }
    }

    render() {
      return (
        <>
          <Navbar />
          <main key="main">
            <TextInput key="zip" label="Add city: " placeHolder="Enter USA zip code" 
              handleSubmit={this.handleZipSubmit} random={getRandomZipCode} />
            <div key="cityDiv" id="citiesContainer">
              {this.state.showCities}
            </div>
          </main>
        </>
      )
    } 
}

export default App;
