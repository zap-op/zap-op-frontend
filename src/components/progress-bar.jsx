import React, { Component } from 'react';

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