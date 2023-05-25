import { Link, useLocation } from "react-router-dom";
import NavStep, { TNavStepProps } from "./NavStep";
import SelectTargetBoard from "./SelectTargetBoard";
import ScanOptionsBoard from "./ScanOptionsBoard";
import { useDigestTargetsWithOptions } from "../../hooks";

export enum AddScanBoardLinkState {
	SelectTarget = "select-target",
	ScanOptions = "scan-options",
}

type TAddScanBoardProps = {
	configSteps: TNavStepProps["steps"];
};

const AddScanBoard = (props: TAddScanBoardProps) => {
	const location = useLocation();
	const { digest } = useDigestTargetsWithOptions();
	let previousLinkState: string = "";
	let currentLinkState: string = "";
	let currentLinkStateIndex: number = 0;
	let nextLinkState: string = "";

	const handleStartScanWithOptions = () => {
		digest();
	};

	if (location.state) {
		/* === this.props.configSteps > 0 */ currentLinkStateIndex = props.configSteps.findIndex((item) => item.state === location.state);
	}

	currentLinkState = props.configSteps[currentLinkStateIndex].state;

	if (currentLinkStateIndex > 0) {
		previousLinkState = props.configSteps[currentLinkStateIndex - 1].state;
	}

	if (currentLinkStateIndex < props.configSteps.length - 1) {
		nextLinkState = props.configSteps[currentLinkStateIndex + 1].state;
	}

	const contentComponent = () => {
		switch (currentLinkState) {
			case AddScanBoardLinkState.SelectTarget:
				return <SelectTargetBoard />;
			case AddScanBoardLinkState.ScanOptions:
				return <ScanOptionsBoard />;
			default:
				return <></>;
		}
	};

	return (
		<div className="add-scan-board-container">
			<div className="add-scan-board_step-nav-container">
				<NavStep steps={props.configSteps} />
			</div>
			<div className="add-scan-board_content-container">{contentComponent()}</div>
			<div className="navigator-state-containter">
				{previousLinkState ? (
					<Link
						to=""
						state={previousLinkState}
						className="previous-state button secondary-button"
						draggable={false}>
						Back
					</Link>
				) : (
					<></>
				)}
				{nextLinkState ? (
					<Link
						to=""
						state={nextLinkState}
						className="next-state button primary-button"
						draggable={false}>
						Next
					</Link>
				) : (
					<div
						className="start-state button primary-button"
						onClick={handleStartScanWithOptions}>
						Start
					</div>
				)}
			</div>
		</div>
	);
};

export default AddScanBoard;
