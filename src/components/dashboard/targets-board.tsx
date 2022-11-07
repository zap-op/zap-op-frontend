import { Component, ReactNode } from "react";
import TargetsTable from "../tables/targets-table";
import TABLEROW_Targets, { TTABLEROW_Targets_Props } from "../subs/tables/target/tr-targets";
import CollapseSearchBar from "../collapse-search-bar";

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
                    <CollapseSearchBar placeholder="Search target" />
                    <div className="add-target-button button primary-button">
                        New target
                    </div>
                </div>
                <div className="targets-board_targets-table-container">
                    <TargetsTable>
                        {this.props.listTarget.map((item, index) => {
                            return <TABLEROW_Targets key={index} name={item.name} url={item.url} tag={item.tag} firstSeen={item.firstSeen} lastSeen={item.lastSeen} />
                        })}
                    </TargetsTable>
                </div>
            </div>
        )
    }
}

export default TargetsBoard;