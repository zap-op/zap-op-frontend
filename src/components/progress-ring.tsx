import { Component, ReactNode } from 'react';

type TProgressRingProps = {
    state: string;
}

class ProgressRing extends Component<TProgressRingProps> {
    static readonly PROCESSING = "PROCESSING";
    static readonly COMPLETE = "COMPLETE";

    override render(): ReactNode {
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
            </div>
        );
    }
}
export default ProgressRing;