import React, { Component } from 'react';
import './Pad.css';

class Pad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }

    padClicked() {
        this.setState({clicked : true});
        setTimeout(()=>{
            this.setState({clicked : false});
        }, 100);
    }

    render() {
        return (
            <div className={"pad " + (this.state.clicked ? "padClicked" : "")} onClick={this.padClicked.bind(this)}>
                <p>{this.props.data.file}</p>
            </div>
        );
    }
}

export default Pad;
