import SearchBar from "../search-bars/search-bar";
import SelectTargetTable from "./select-target-table";

const SelectTargetBoard = () => {
	return (
		<div className="select-target-container">
			<h1 className="title">Select Targets</h1>
			<div className="list-selection-container">
				<SearchBar placeholder="Search target" />
				<SelectTargetTable>

				</SelectTargetTable>
			</div>
		</div>
	);
};

SelectTargetBoard.NAME = "select-target-board";

export default SelectTargetBoard;
