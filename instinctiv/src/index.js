import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';

import Highcharts from 'highcharts';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartContainer = React.createRef();
  }

  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.chartContainer.current,
      this.props.options
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div ref={this.chartContainer} />;
  }
}

class App extends Component {
  render() {
    const options = {
      title: {
        text: 'Stock Comparision',
      },
      xAxis: {
        categories: [
          'Stock 1',
          'Stock 2',
          'Stock 3',
          'Stock 4',
          'Stock 5',
        ],
      },
      yAxis: {
        title: {
          text: 'Stocks Brought',
        },
      },
      chart: {
        type: 'line',
      },
      series: [
       {
          name: 'Jane',
          data: [1, 0, 4, 0, 3],
        },
        {
          name: 'John',
          data: [5, 7, 3, 2, 4],
        },
        {
          name: 'Doe',
          data: [0, 0, 0, 1, 0],
        },
      ],
    };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Chart options={options} />
      </div>
    );
  }
}
export default App;

*/

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
    <App />
    </FirebaseContext.Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
