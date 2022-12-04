import SearchBar from "../../search-bars/search-bar/search-bar";
import TABLEROW_SelectTarget from "../../tables/select-target-table/tr-select-target";
import SelectTargetTable from "../../tables/select-target-table/select-target-table";

type TSelectTargetBoardProps = {
}

const SelectTargetBoard = (props: TSelectTargetBoardProps) => {
    return (
        <div className="select-target-container">
            <h1 className="title">
                Select Targets
            </h1>
            <div className="list-selection-container">
                <SearchBar placeholder="Search target" />
                <SelectTargetTable>
                    <TABLEROW_SelectTarget key={1} name={"item.name"} url={"item.url"} tag={"item.tag"} />
                </SelectTargetTable>
            </div>
        </div>
    )
}

SelectTargetBoard.NAME = "select-target-board";

export default SelectTargetBoard;