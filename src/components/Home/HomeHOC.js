import { connect } from 'react-redux';

import Home from './Home';
import { fetchForecast } from '../../store/actions/forecast';

const mapStateToProps = state => {
  return {
    forecast: state && state.forecast && state.forecast.forecast ? state.forecast.forecast : [],
    temperatureUnit: state.forecast.temperatureUnit
  }
};

const mapDispatchToProps = dispatch => ({
  fetchforecast: (unit) => dispatch(fetchForecast(unit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
