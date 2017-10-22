import React, {Component} from 'react';
import './Drums.css';
import Pad from './Pad';

class Drums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pads: [{file: 'foo.wav', keyCode: ''}, {file: 'bar.wav'}, {file: 'foo.wav'}, {file: 'bar.wav'},
                {file: 'foo.wav'}, {file: 'bar.wav'}, {file: 'foo.wav'}, {file: 'bar.wav'},
                {file: 'foo.wav'}, {file: 'bar.wav'}, {file: 'foo.wav'}, {file: 'bar.wav'},
                {file: 'foo.wav'}, {file: 'bar.wav'}, {file: 'foo.wav'}, {file: 'bar.wav'}]
        };
    }

    render() {
        return (
            <div className={"drums"}>
                {
                    this.state.pads.map((pad) => <Pad data={pad}/>)
                }
            </div>
        );
    }
}

export default Drums;
