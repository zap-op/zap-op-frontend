import React, { Component } from 'react';

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.ref_progressBar = React.createRef();
    }

    render() {
        return (
            <div className="progress-bar-container">
                <div className="progress-bar"
                    style={{
                        width: `${this.props.scanProgress}%`,
                        animationPlayState: `${this.props.isScanning ? "running" : "paused"}`
                    }}
                    ref={this.ref_progressBar}>
                    <span className="percent">
                        {`${this.props.scanProgress}%`}
                    </span>
                </div>
            </div>
        );
    }
}

export default ProgressBar;