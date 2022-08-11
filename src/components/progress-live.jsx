import React, { Component } from 'react';

class ProgressLive extends Component {
    static PROCESSING = "PROCESSING";
    static COMPLETE = "COMPLETE";

    render() {
        let progressRing;
        if (this.props.status) {
            if (this.props.status === ProgressLive.PROCESSING) {
                progressRing = <div className="progress-ring spin">
                    <div className="core">

                    </div>
                </div>;
            }
            if (this.props.status === ProgressLive.COMPLETE) {
                progressRing = <div className="progress-ring">
                    <div className="core complete">

                    </div>
                </div>;
            }
        }
        return (
            <div className="progress-ring-container">
                {progressRing}
                <div className="progress-status">
                    {this.props.status}
                </div>
            </div>
        );
    }
}
export default ProgressLive;