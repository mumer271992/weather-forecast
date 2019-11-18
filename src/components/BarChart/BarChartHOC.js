import { connect } from 'react-redux';

import BarChart from './BarChart';

const mapStateToProps = state => {
  let selectedItem = {};
  if (state.forecast.forecast && state.forecast.forecast.length > 0) {
    selectedItem = state.forecast.forecast[state.forecast.selectedIndex];
  }
  const { data } = selectedItem;
  let tempSeries = [];
  let timeSeries = [];
  if (data) {
    data.forEach((segment) => {
      if (segment && segment.main && segment.main.temp) {
        tempSeries.push(segment.main.temp);
        timeSeries.push(segment.dt_txt.split(' ').pop());
      }
    });
  }
  var colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];
  const options = {
    chart: {
      events: {
        click: function (chart, w, e) {
          console.log(chart, w, e)
        }
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '5%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: timeSeries,
      labels: {
        style: {
          colors: colors,
          fontSize: '14px'
        }
      }
    }
  }
  const series = [{
    data: tempSeries
  }]
  return {
    options,
    series,
    selectedItem,
  }
};

export default connect(mapStateToProps, null)(BarChart);
