import { Component, ReactNode } from "react";

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
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default AddScanBoard;