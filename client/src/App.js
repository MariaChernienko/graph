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

  async callAPI() {
    const res = await fetch("/api/passwords");
    const rand = await res.json();

    this.setState(prevState => ({
      data: [...prevState.data, Math.ceil(rand * 100)],
      step: prevState.step + 1
    }));
  }

  componentDidMount() {
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
        <div className="vertical">
          <span>0</span>
          <span>0.2</span>
          <span>0.4</span>
          <span>0.6</span>
          <span>0.8</span>
          <span>1</span>
        </div>

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
              >
                <span className="box_diagram-el-num">{key + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
