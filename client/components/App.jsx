import React from 'react';

import './App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loansData: []
    };
}

componentDidMount() {
      async function fetchAsync() {
          let response = await fetch("http://localhost:9000/json/current-loans.json");
          let data = await response.json();
          that.setState({
              loansData: data
          });
          return data;
      }

      fetchAsync();

};

  render() {
    return (
      <div className="container">
           Toms
      </div>
    );
  }
}

export default App;
