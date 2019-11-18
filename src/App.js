import React from 'react';
import { connect } from 'react-redux';

import Home from './components/Home/HomeHOC';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { loading } = this.props;

    return (
      <div className="App">
        <Home />
        {
          loading && (
            <div className="loader">
              <h3>loading...</h3>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.forecast.loading
  }
};

export default connect(mapStateToProps, null)(App);
