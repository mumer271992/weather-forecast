import React from 'react';
import ReactApexChart from 'react-apexcharts';

import './BarChart.scss';

const BarChart = ({ options, series, selectedItem }) => {
  return (
    <div>
      <div>Following graph shows the weather conndition break down on </div>
      <div>{ selectedItem.date }</div>
      <div id="chart">
          <ReactApexChart options={options} series={series} type="bar" height="350" />
        </div>
    </div>
  );
}

export default BarChart;
