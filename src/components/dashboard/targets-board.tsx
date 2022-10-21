import { Component, ReactNode } from "react";
import SearchBar from "../search-bar";
import TargetsTable from "../tables/targets-table";
import TABLEROW_Targets, { TTABLEROW_Targets_Props } from "../table-assets/targets-table/tr-targets";

type TTargetsBoardProps = {
    listTarget: TTABLEROW_Targets_Props[];
}

type TTargetsBoardState = {

}

class TargetsBoard extends Component<TTargetsBoardProps, TTargetsBoardState> {
    constructor(props: TTargetsBoardProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="targets-board-container">
                <div className="action-container">
                    <SearchBar placeholder="Search target" />
                    <div className="add-target-button button primary-button">
                        New target
                    </div>
                </div>
                <div className="targets-board_targets-table-container">
                    <TargetsTable tableBody={this.props.listTarget.map((item, index) => {
                        return <TABLEROW_Targets key={index} name={item.name} url={item.url} tag={item.tag} firstSeen={item.firstSeen} lastSeen={item.lastSeen} />
                    })} />
                </div>
            </div>
        )
    }
}

export default TargetsBoard;