import { Component } from 'react';

type TProgressBarProps = {
    scanProgress: number;
}

class ProgressBar extends Component<TProgressBarProps> {
    static readonly progressBarAnimationName = "pulse";
    override render() {
        return (
            <div className="progress-bar-container">
                <div className="progress-bar"
                    style={{
                        width: `${this.props.scanProgress}%`,
                        animationName: `${this.props.scanProgress === 100 ? "none" : ProgressBar.progressBarAnimationName}`
                    }}>
                    <span className="percent">
                        {`${this.props.scanProgress}%`}
                    </span>
                </div>
            </div>
        );
    }
}

export default ProgressBar;