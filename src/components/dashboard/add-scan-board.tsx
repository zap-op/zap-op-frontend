import { Component, ReactNode } from "react";
import SearchBar from "../search-bar";
import TABLEROW_TargetAdded from "../subs/tables/add-scan/tr-target-added";
import AddScanTable from "../tables/add-scan-table";

type TAddScanBoardProps = {
}

type TAddScanBoardState = {

}

class AddScanBoard extends Component<TAddScanBoardProps, TAddScanBoardState> {
    constructor(props: TAddScanBoardProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="add-scan-board-container">
                <div className="target-selection-container">
                    <h3 className="title">
                        Select Targets
                    </h3>
                    <div className="list-selection-container">
                        <SearchBar placeholder="Search target" />
                        <AddScanTable>
                            <TABLEROW_TargetAdded key={1} name={"item.name"} url={"item.url"} tag={"item.tag"} />
                        </AddScanTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddScanBoard;