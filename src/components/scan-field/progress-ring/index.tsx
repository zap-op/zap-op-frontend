type TProgressRingProps = {
    state: string;
}

const ProgressRing = (props:TProgressRingProps) => {
    let progressRing;
    if (!props.state || props.state === ProgressRing.PROCESSING) {
        progressRing = <div className="progress-ring spin">
            <div className="core">

            </div>
        </div>;
    }
    if (props.state === ProgressRing.COMPLETE) {
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

ProgressRing.PROCESSING = "PROCESSING";
ProgressRing.COMPLETE = "COMPLETE";

export default ProgressRing;