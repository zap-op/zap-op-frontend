import { Component, ReactNode, createRef } from "react";
import SearchBar from "../search-bar";
import TABLEROW_SelectTarget from "../subs/tables/select-target/tr-select-target";
import AddScanTable from "../tables/select-target-table";

type TSelectTargetBoardProps = {
}

type TSelectTargetBoardState = {

}

class SelectTargetBoard extends Component<TSelectTargetBoardProps, TSelectTargetBoardState> {

    constructor(props: TSelectTargetBoardProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
                <div className="select-target-container">
                    <h3 className="title">
                        Select Targets
                    </h3>
                    <div className="list-selection-container">
                        <SearchBar placeholder="Search target" />
                        <AddScanTable>
                            <TABLEROW_SelectTarget key={1} name={"item.name"} url={"item.url"} tag={"item.tag"} />
                        </AddScanTable>
                    </div>
                </div>
        )
    }
}

export default SelectTargetBoard;