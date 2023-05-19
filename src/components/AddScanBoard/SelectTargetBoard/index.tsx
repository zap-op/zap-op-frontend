import { useGetTargetQuery } from "../../../store";
import SearchBar from "../../SearchBars/SearchBar";
import SelectTargetTable from "./SelectTargetTable";

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

export default SelectTargetBoard;
