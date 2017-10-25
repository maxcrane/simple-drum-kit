import React, { Component } from "react";
import "./Drums.css";
import Pad from "./Pad";
import { DEFAULT_CONFIG } from "./utils/constants";

class Drums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pads: DEFAULT_CONFIG,
      tempo: 140 //TODO: make pads loop to tempo if they are held down
    };
  }

  render() {
    const tempo = { tempo: this.state.tempo };

    return (
      <div className="drums">
        {this.state.pads.map((pad, index) => (
          <Pad
            {...Object.assign(tempo, pad)}
            context={this.props.context}
            key={index}
          />
        ))}
      </div>
    );
  }
}

export default Drums;
