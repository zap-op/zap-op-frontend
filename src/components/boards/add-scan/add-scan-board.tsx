import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import NavStep, { TNavStepProps } from "../../navs/nav-step/nav-step";
import withLocation, { TwithLocationProps } from "../../helper/withLocation";
import SelectTargetBoard from "../select-target/select-target-board";

type TAddScanBoardProps = {
    configSteps: TNavStepProps["steps"],
}

type TAddScanBoardState = {
}

class AddScanBoard extends Component<TwithLocationProps<TAddScanBoardProps>, TAddScanBoardState> {

    constructor(props: TwithLocationProps<TAddScanBoardProps>) {
        super(props);
    }

    override render(): ReactNode {
        let previousLinkState: string = "";
        let currentLinkState: string = "";
        let currentLinkStateIndex: number = 0;
        let nextLinkState: string = "";

        if (this.props.location.state) /* === this.props.configSteps > 0 */ {
            currentLinkStateIndex = this.props.configSteps.findIndex(item => item.state === this.props.location.state);
        }

        currentLinkState = this.props.configSteps[currentLinkStateIndex].state;

        if (currentLinkStateIndex > 0) {
            previousLinkState = this.props.configSteps[currentLinkStateIndex - 1].state;
        }

        if (currentLinkStateIndex < this.props.configSteps.length - 1) {
            nextLinkState = this.props.configSteps[currentLinkStateIndex + 1].state;
        }

        const contentComponent = () => {
            switch (currentLinkState) {
                case SelectTargetBoard.NAME:
                    return <SelectTargetBoard />
                default:
                    return <></>;
            }
        }

        return (
            <div className="add-scan-board-container">
                <div className="add-scan-board_step-nav-container">
                    <NavStep steps={this.props.configSteps} />
                </div>
                <div className="add-scan-board_content-container">
                    {contentComponent()}
                </div>
                <div className="navigator-state-containter">
                    {previousLinkState
                        ?
                        <Link
                            to=""
                            state={previousLinkState}
                            className="previous-state button secondary-button"
                            draggable={false}>
                            Back
                        </Link>
                        :
                        <></>
                    }
                    {nextLinkState
                        ?
                        <Link
                            to=""
                            state={nextLinkState}
                            className="next-state button primary-button"
                            draggable={false}>
                            Next
                        </Link>
                        :
                        <div className="start-state button primary-button">
                            Start
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withLocation<TAddScanBoardProps>(AddScanBoard);