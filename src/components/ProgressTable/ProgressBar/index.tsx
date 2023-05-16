type TProgressBarProps = {
	scanProgress: number;
};

const ProgressBar = (props: TProgressBarProps) => {
	return (
		<div className="progress-bar-container">
			<div
				className="progress-bar"
				style={{
					width: `${props.scanProgress}%`,
					animationName: `${props.scanProgress === 100 ? "none" : ProgressBar.progressBarAnimationName}`,
				}}>
				<span className="percent">{`${props.scanProgress}%`}</span>
			</div>
		</div>
	);
};

ProgressBar.progressBarAnimationName = "pulse";

export default ProgressBar;
