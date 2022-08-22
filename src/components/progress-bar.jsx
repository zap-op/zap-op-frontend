import React, { Component } from 'react';
import $ from 'jquery';
class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressPercent: 0, 
            isComplete: false
        }
        this.ref_progressBar = React.createRef();
    }

    componentDidMount() {
        for (let index = 0; index < 101; index++) {
            setTimeout(() => {
                this.ref_progressBar.current.style.width = `${index}%`;
            }, 100 * index);
        }
    }

    render() { 
        return ( 
            <div className="progress-bar-container">
                <div className="progress-bar" ref={this.ref_progressBar}>
                    <span className={`finish-text ${this.state.isComplete ? "" : "hidden"}`}>
                        Scan Complete!
                    </span>
                </div>
            </div>
         );
    }
}
 
export default ProgressBar;