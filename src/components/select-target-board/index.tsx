import { useGetTargetQuery } from "../../services/targetApi";
import SearchBar from "../search-bars/search-bar";
import SelectTargetTable from "./select-target-table";

const SelectTargetBoard = () => {
	const { data: listTarget } = useGetTargetQuery();

	return (
		<div className="select-target-container">
			<h1 className="title">Select Targets</h1>
			<div className="list-selection-container">
				<SearchBar placeholder="Search target" />
				<SelectTargetTable listChild={listTarget ? listTarget : []}/>
			</div>
		</div>
	);
};

SelectTargetBoard.NAME = "select-target-board";

export default SelectTargetBoard;
