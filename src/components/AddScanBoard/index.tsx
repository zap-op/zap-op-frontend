import { Link, useLocation, useNavigate } from "react-router-dom";
import NavStep, { TNavStepProps } from "./NavStep";
import SelectTargetBoard from "./SelectTargetBoard";
import ScanOptionsBoard from "./ScanOptionsBoard";
import { useDigestTargetsWithOptions } from "../../hooks";
import ScanConfigBoard from "./ScanConfigBoard";

export enum AddScanBoardLinkState {
	SelectTarget = "select-target",
	ScanOptions = "scan-options",
	ScanConfig = "scan-config",
}

const CONFIG_STEPS = [
	{
		title: "Select Targets",
		state: AddScanBoardLinkState.SelectTarget,
	},
	{
		title: "Select Options",
		state: AddScanBoardLinkState.ScanOptions,
	},
	{
		title: "Configure Options",
		state: AddScanBoardLinkState.ScanConfig,
	},
];

const AddScanBoard = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { digest } = useDigestTargetsWithOptions();
	let previousLinkState: string = "";
	let currentLinkState: string = "";
	let currentLinkStateIndex: number = 0;
	let nextLinkState: string = "";

	const handleStartScanWithOptions = () => {
		digest().then(() => {
			navigate("../results");
		});
	};

	if (location.state) {
		/* === this.props.configSteps > 0 */
		currentLinkStateIndex = CONFIG_STEPS.findIndex((item) => item.state === location.state);
	}

	currentLinkState = CONFIG_STEPS[currentLinkStateIndex].state;

	if (currentLinkStateIndex > 0) {
		previousLinkState = CONFIG_STEPS[currentLinkStateIndex - 1].state;
	}

	if (currentLinkStateIndex < CONFIG_STEPS.length - 1) {
		nextLinkState = CONFIG_STEPS[currentLinkStateIndex + 1].state;
	}

	const contentComponent = () => {
		switch (currentLinkState) {
			case AddScanBoardLinkState.SelectTarget:
				return <SelectTargetBoard />;
			case AddScanBoardLinkState.ScanOptions:
				return <ScanOptionsBoard />;
			case AddScanBoardLinkState.ScanConfig:
				return <ScanConfigBoard />;
			default:
				return <></>;
		}
	};

	return (
		<div className="add-scan-board-container">
			<div className="add-scan-board_step-nav-container">
				<NavStep steps={CONFIG_STEPS} />
			</div>
			<div className="add-scan-board_content-container">{contentComponent()}</div>
			<div className="navigator-state-containter">
				<div className="group-navigate-left">
					{previousLinkState ? (
						<Link
							to=""
							state={previousLinkState}
							className="previous-state button secondary-button link-button"
							draggable={false}>
							Back
						</Link>
					) : (
						<></>
					)}
				</div>
				<div className="group-navigate-right">
					{currentLinkState == AddScanBoardLinkState.ScanOptions ? <div className="start-state button primary-button">asdasd</div> : <></>}
					{nextLinkState ? (
						<Link
							to=""
							state={nextLinkState}
							className="next-state button primary-button link-button"
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
		</div>
	);
};

export default AddScanBoard;
