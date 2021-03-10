import * as React from 'react';
import "../Styles/Weather.css";
const api = require('../api.json');

export interface IWeatherProps {
}

interface IWeatherState {
    name: string;
    lastUpdated: string;
    temperature: string;
    condition: string;
    image: string;
    feels: string;
}

export default class Weather extends React.Component<IWeatherProps, IWeatherState> {
    public postal: string = "V3E3J2";

    constructor(props: IWeatherProps) {
        super(props);
        this.state = {
            name: "",
            lastUpdated: "",
            temperature: "",
            condition: "",
            image: "",
            feels: ""
        };
      }

    componentDidMount() {
        fetch("http://api.weatherapi.com/v1/current.json?key=" + api["weatherapi"] + "&q=" + this.postal + "&aqi=no")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                name: result["location"]["name"],
                lastUpdated: result["current"]["last_updated"],
                temperature: result["current"]["temp_c"],
                condition: result["current"]["condition"]["text"],
                image: result["current"]["condition"]["icon"],
                feels: result["current"]["feelslike_c"],
              });
            },
            (error) => {
                // TODO: report error
            }
          )
      }

  public render() {
    return (
      <div className="weather">
        <img className="weatherImage" src={this.state.image}></img>
        <h2 className="weatherTemperature">{this.state.temperature}° C</h2>
        <h2 className="weatherCondition">{this.state.condition}</h2>
        <h2 className="weatherName">{this.state.name}</h2>
      </div>
    );
  }
}
