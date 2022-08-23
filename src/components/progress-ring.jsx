import React, { Component } from 'react';

class ProgressRing extends Component {
    static PROCESSING = "PROCESSING";
    static COMPLETE = "COMPLETE";

    render() {
        let progressRing;
        if (!this.props.state || this.props.state === ProgressRing.PROCESSING) {
            progressRing = <div className="progress-ring spin">
                <div className="core">

                </div>
            </div>;
        }
        if (this.props.state === ProgressRing.COMPLETE) {
            progressRing = <div className="progress-ring">
                <div className="core complete">

                </div>
            </div>;
        }

        return (
            <div className="progress-ring-container">
                {progressRing}
                {this.props.state ?
                    <div className="progress-state-title">
                        {this.props.state}
                    </div> : <></>}

            </div>
        );
    }
}
export default ProgressRing;