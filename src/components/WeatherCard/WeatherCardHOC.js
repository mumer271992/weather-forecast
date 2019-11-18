import { connect } from 'react-redux';

import WeatherCard from './WeatherCard';
import { selectIndex } from '../../store/actions/forecast';

const mapStateToProps = state => {
  return {
    temperatureUnit: state.forecast.temperatureUnit
  }
};

const mapDispatchToProps = dispatch => ({
  selectIndex: (index) => dispatch(selectIndex(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCard);
