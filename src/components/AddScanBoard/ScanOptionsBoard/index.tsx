import ActiveOption from "./ActiveOption";
import AjaxOption from "./AjaxOption";
import PassiveOption from "./PassiveOption";
import SpiderOption from "./SpiderOption";

const ScanOptionsBoard = () => {
	return (
		<div className="scan-options-board-container">
			<h1 className="title">Select Options</h1>
			<div
				className="table-scroll-wrap"
				style={{
					maxHeight: "50vh",
				}}>
				<SpiderOption />
				<AjaxOption />
				<PassiveOption />
				<ActiveOption />
			</div>
		</div>
	);
};

export default ScanOptionsBoard;
