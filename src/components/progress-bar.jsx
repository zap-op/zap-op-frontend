import React, { Component } from 'react';

class ProgressBar extends Component {
    static progressBarAnimationName = "pulse";

    render() {
        return (
            <div className="progress-bar-container">
                <div className="progress-bar"
                    style={{
                        width: `${this.props.scanProgress}%`,
                        animationName: `${this.props.scanProgress === 100 ? "none" : ProgressBar.progressBarAnimationName}`
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