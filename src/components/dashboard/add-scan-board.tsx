import { Component, ReactNode } from "react";
import StepNav, { TStepNavProps } from "../step-nav";
import withLocation, { TwithLocationProps } from "../toolkits/withLocation";

type TAddScanBoardProps = {
    configSteps: TStepNavProps["steps"],
}

type TAddScanBoardState = {

}

class AddScanBoard extends Component<TwithLocationProps<TAddScanBoardProps>, TAddScanBoardState> {

    constructor(props: TwithLocationProps<TAddScanBoardProps>) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="add-scan-board-container">
                <div className="add-scan-board_step-nav-container">
                    <StepNav steps={this.props.configSteps} />
                </div>
                <div className="add-scan-board_content-container">
                </div>
            </div>
        )
    }
}

export default withLocation<TAddScanBoardProps>(AddScanBoard);