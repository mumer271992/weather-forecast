import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Card, CardContent, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import List from '../List/List';
import BarChart from '../BarChart/BarChartHOC';
import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTemp: 'metric',
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    const { fetchforecast } = this.props;
    // fetchforecast(this.state.selectedTemp);
  }

  onChangeHandler(e) {
    const selectedVal = e.target.value;
    this.setState(() => ({ selectedTemp: selectedVal }));
    const { fetchforecast } = this.props;
    fetchforecast(selectedVal);
  }

  render() {
    const { forecast } = this.props;
    const { selectedTemp } = this.state;
    console.log(forecast);
    return (
      <React.Fragment>
        <CssBaseline />
        <div>Weather Forecast App</div>
        <Container maxWidth="md" data-test="main-container">
          <Card>
            <CardContent>
              <RadioGroup data-test="radio-group" aria-label="position" name="position" value={selectedTemp} onChange={this.onChangeHandler} row>
                <FormControlLabel
                  value="metric"
                  control={<Radio color="primary" />}
                  label="Celcius"
                  labelPlacement="end"
                  data-test="celcius-handler"
                />
                <FormControlLabel
                  value="imperial"
                  control={<Radio color="primary" />}
                  label="Farenheit"
                  labelPlacement="end"
                  data-test="farenheit-handler"
                />
              </RadioGroup>
              <List list={forecast}/>
              <BarChart />
            </CardContent>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;
