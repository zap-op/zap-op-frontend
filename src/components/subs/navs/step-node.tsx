import { Component, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import withLocation, { TwithLocationProps } from "../../toolkits/withLocation";

export type TStepNodeProps = {
    title: string;
    state: string;
}

class StepNode extends Component<TwithLocationProps<TStepNodeProps>> {
    override render(): ReactNode {
        return (
            <div className={`step-node-container ${this.props.location.state === this.props.state ? "isActive" : undefined}`}>
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