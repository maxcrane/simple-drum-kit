import React, { Component } from 'react';
import './Pad.css';

class Pad extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
        };

        this.padClicked = this.padClicked.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyTrigger.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyTrigger.bind(this), false);
    }

    keyTrigger(e) {
        if (e.key === this.props.trigger) {
            this.padClicked();
        }
    }

    padClicked() {
        const { context } = this.props;

        this.setState({ clicked: true });
        setTimeout(() => {
            this.setState({ clicked: false });
        }, 150);

        const source = context.createBufferSource();

        // Prepare a fetch if the file has not been cached, otherwise this will give 300 level fetch
        fetch(this.props.file).then((response) => {
          return response.arrayBuffer();
        }).then((buffer) => {
            // Take the retrieved (or cached data) and decode, then pipe to audio output
          context.decodeAudioData(buffer, (decodedData) => {
              source.buffer = decodedData;
              source.connect(context.destination);
              source.start(0);
          });
      });
    }

    render() {
        const isActive = (this.props.file && !this.state.clicked) ? 'active' : 'inactive';
        return (
            <div
                onClick={ this.padClicked }
                onKeyPress={ this.onKeyPress }
                className={ `${ isActive } pad` }>
                <p>{ this.props.title }</p>
                <p>{ this.props.trigger }</p>
            </div>
        );
    }
}

export default Pad;
