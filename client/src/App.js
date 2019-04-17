import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      step: 0
    };
  }

  callAPI() {
    fetch("/api/passwords")
      .then(res => {
        console.log(res);
        res.text();
      })
      .then(res =>
        this.setState(prevState => ({
          data: [...prevState.data, Math.ceil(res * 100)],
          step: prevState.step + 1
        }))
      );
  }

  componentDidMount() {
    // this.callAPI();
    this.interval = setInterval(() => this.callAPI(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data, step } = this.state;
    const shift = this.state.step - 8;
    return (
      <div className="App">
        <div className="box">
          <div
            className="box_diagram"
            style={step > 9 ? { left: -32 * shift } : { left: 0 }}
          >
            {data.map((el, key) => (
              <div
                key={key}
                className="box_diagram-el"
                style={{ height: `${2 * el}px`, opacity: `${1.2 - el / 100}` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;