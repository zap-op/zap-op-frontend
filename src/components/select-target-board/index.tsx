import SearchBar from "../search-bars/search-bar";
import SelectTargetTable from "./select-target-table";
import TABLEROW_SelectTarget from "./select-target-table/tr-select-target";

const SelectTargetBoard = () => {
	return (
		<div className="select-target-container">
			<h1 className="title">Select Targets</h1>
			<div className="list-selection-container">
				<SearchBar placeholder="Search target" />
				<SelectTargetTable>
					<TABLEROW_SelectTarget
						key={1}
						name={"item.name"}
						url={"item.url"}
						tag={"item.tag"}
					/>
				</SelectTargetTable>
			</div>
		</div>
	);
};

SelectTargetBoard.NAME = "select-target-board";

export default SelectTargetBoard;
