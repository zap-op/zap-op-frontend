import { Component, ReactNode} from "react";
import SearchBar from "../../search-bars/search-bar/search-bar";
import TABLEROW_SelectTarget from "../../tables/select-target-table/tr-select-target";
import SelectTargetTable from "../../tables/select-target-table/select-target-table";

type TSelectTargetBoardProps = {
}

type TSelectTargetBoardState = {

}

class SelectTargetBoard extends Component<TSelectTargetBoardProps, TSelectTargetBoardState> {
    static readonly NAME = "select-target-board";

    constructor(props: TSelectTargetBoardProps) {
        super(props);
    }

    override render(): ReactNode {
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
}

export default SelectTargetBoard;