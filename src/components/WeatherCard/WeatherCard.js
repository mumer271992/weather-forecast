import React from 'react';
import { Card, CardContent } from '@material-ui/core';

import './WeatherCard.scss';

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getTemperatureUnit = this.getTemperatureUnit.bind(this);
    this.avgWindOfDay = this.avgWindOfDay.bind(this);
    this.avgHumidityOfDay = this.avgHumidityOfDay.bind(this);
    this.avgCloudinessOfDay = this.avgCloudinessOfDay.bind(this);
  }

  handleClick() {
    const { selectIndex, index } = this.props;
    selectIndex(index);
  }

  getTemperatureUnit() {
    const { temperatureUnit } = this.props;
    return temperatureUnit === 'metric' ? 'C' : 'F';
  }

  avgWindOfDay() {
    const { item } = this.props;
    let avgWind = 0;
    if (item && item.date) {
      item.data.forEach((data) => {
        avgWind = avgWind + data.wind.speed
      });
      avgWind = avgWind / item.data.length;
    }
    return Math.floor(avgWind);
  }

  avgHumidityOfDay() {
    const { item } = this.props;
    let avgHumidity = 0;
    if (item && item.date) {
      item.data.forEach((data) => {
        avgHumidity = avgHumidity + data.main.humidity
      });
      avgHumidity = avgHumidity / item.data.length;
    }
    return Math.floor(avgHumidity);
  }

  avgCloudinessOfDay() {
    const { item } = this.props;
    let avgCloudiness = 0;
    if (item && item.date) {
      item.data.forEach((data) => {
        avgCloudiness = avgCloudiness + data.clouds.all;
      });
      avgCloudiness = avgCloudiness / item.data.length;
    }
    return Math.floor(avgCloudiness);
  }

  render() {
    const { item } = this.props;
    return (
      <React.Fragment>
        <Card className="weather-card" onClick={this.handleClick}>
          <CardContent>
            <p className="temp">
              {Math.floor(item.avgTemp)}
              <span>{this.getTemperatureUnit()}</span>
            </p>
            <p>
              Cloud Cover: <small>{this.avgHumidityOfDay()} %</small>
            </p>
            <p>
              Wind: <small>{this.avgWindOfDay()} meter/sec</small>
            </p>
            <p>
              Humidity: <small>{this.avgHumidityOfDay()} %</small>
            </p>
            <p>Date: {item.date}</p>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

export default WeatherCard;
