import { Component, ReactNode } from "react";
import StepNav, { TStepNavProps } from "../step-nav";
import withLocation, { TwithLocationProps } from "../toolkits/withLocation";
import SelectTargetBoard from "./select-target-board";

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
        const contentComponent = () => {
            let state = this.props.location.state;
            if (!state && this.props.configSteps.length !== 0) {
                state = this.props.configSteps[0].state;
            }
            switch (state) {
                case SelectTargetBoard.NAME:
                    return <SelectTargetBoard />
                default:
                    return <></>;
            }
        }
        return (
            <div className="add-scan-board-container">
                <div className="add-scan-board_step-nav-container">
                    <StepNav steps={this.props.configSteps} />
                </div>
                <div className="add-scan-board_content-container">
                    {contentComponent()}
                </div>
            </div>
        )
    }
}

export default withLocation<TAddScanBoardProps>(AddScanBoard);