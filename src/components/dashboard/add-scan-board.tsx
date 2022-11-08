import { Component, ReactNode, createRef } from "react";
import StepNav from "../step-nav";

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
                    <StepNav steps={[{ title: "Welcome Lorem ", href: "#" },
                    { title: "Welcome Lorem", href: "#" },
                    { title: "Welcome Lorem ", href: "#" }]} />
                </div>
            </div>
        )
    }
}

export default AddScanBoard;