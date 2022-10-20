import { Component, ReactNode} from "react";
import SearchBar from "../search-bar";
import TargetsTable from "../tables/targets-table";

type TTargetsBoardProps = {

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
                <SearchBar placeholder="123"/>
                <div className="targets-board_targets-table-container">
                    <TargetsTable tableBody={[<></>]}/>
                </div>
            </div>
        )
    }
}

export default TargetsBoard;