import { Component, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import withLocation, { TwithLocationProps } from "../../toolkits/withLocation";

export type TStepNodeProps = {
    title: string;
    state: string;
    startNode?: boolean;
}

class StepNode extends Component<TwithLocationProps<TStepNodeProps>> {
    override render(): ReactNode {
        let isActive: boolean = false;
        if (!this.props.location.state && this.props.startNode) {
            isActive = true;
        } else if (this.props.location.state === this.props.state) {
            isActive = true;
        }
        return (
            <div className={`step-node-container ${isActive ? "isActive" : undefined}`}>
                <div className="node-container">
                    <NavLink
                        to=""
                        state={this.props.state}
                        draggable="false">
                        <div className="node">
                        </div>
                    </NavLink>
                </div>
                <div className="title-container">
                    <h4>
                        {this.props.title}
                    </h4>
                </div>
            </div>
        );
    }
}

export default withLocation<TStepNodeProps>(StepNode);