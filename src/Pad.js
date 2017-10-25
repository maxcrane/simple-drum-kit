import React, { Component } from 'react';
import './Pad.css';

class Pad extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
            soundPlayed: false,
            buffer: null,
            randomRGBColor: null
        };

        this.padClicked = this.padClicked.bind(this);
    }

    componentDidMount() {
        this.loadSampleBuffer();
        this.registerKeyEvents();
        this.setRandomColor();
    }

    setRandomColor() {
        this.setState({
            randomRGBColor: {
                r: this.randomRGBValue(),
                g: this.randomRGBValue(),
                b: this.randomRGBValue()
            }
        })
    }

    registerKeyEvents() {
        document.addEventListener('keydown', this.keyDahn.bind(this), false);
        document.addEventListener('keyup', this.keyUp.bind(this), false);
    }

    unregisterKeyEvents() {
        document.removeEventListener('keydown', this.keyDahn.bind(this), false);
        document.removeEventListener('keyup', this.keyUp.bind(this), false);
    }

    loadSampleBuffer(){
        if (this.props.file) {
            const { context } = this.props;
            // Prepare a fetch if the file has not been cached, otherwise this will give 300 level fetch
            fetch(this.props.file).then((response) => {
                return response.arrayBuffer();
            }).then((buffer) => {
                // Take the retrieved (or cached data) and decode, then save to state
                context.decodeAudioData(buffer, (buffer) => {
                    this.setState({buffer});
                });
            });
        }
    }

    componentWillUnmount() {
        this.unregisterKeyEvents()
    }

    keyDahn(e) {
        if (e.key === this.props.trigger && !this.state.soundPlayed) {
            this.padClicked();
        }
    }

    keyUp(e) {
        if (e.key === this.props.trigger) {
            this.toggleClicked();
        }
    }

    playSound(startOffset=0) {
        const { context } = this.props;
        const { buffer } = this.state;

        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(startOffset);
    }

    padClicked() {
        this.toggleClicked();

        if (this.state.buffer) {
            this.playSound();
        }
    }

    toggleClicked() {
        const {clicked, soundPlayed} = this.state;

        this.setState({ clicked: !clicked,
                        soundPlayed: !soundPlayed,
                        colorAlpha: clicked ? 0.1 : 1.0});
    }

    randomColorStyle() {
        return {
            backgroundColor: `rgba(${this.state.randomRGBColor.r},
                                  ${this.state.randomRGBColor.g},
                                  ${this.state.randomRGBColor.b}, 
                                  ${this.state.clicked ? 1.0 : 0.1})`
        }
    }

    //random num from 128->255
    randomRGBValue() {
        return Math.floor((Math.random() * 128) + 128);
    }

    render() {
        const noFileClass = (this.props.file && !this.state.clicked) ? 'active' : 'inactive';
        const pressedStyle = (this.props.file && this.state.randomRGBColor) ? this.randomColorStyle() : {};

        return (
            <div
                onClick={ this.padClicked }
                onKeyPress={ this.onKeyPress }
                className={`${noFileClass} pad`}
                style={pressedStyle}>
                <p>{ this.props.title }</p>
                <p>{ this.props.trigger }</p>
            </div>
        );
    }
}

export default Pad;
