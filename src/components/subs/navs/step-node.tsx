import { Component, ReactNode } from "react";
import { NavLink } from "react-router-dom";

export type TStepNodeProps = {
    title: string;
    state: string;
}

class StepNode extends Component<TStepNodeProps> {
    override render(): ReactNode {
        return (
            <div className="step-node-container">
                <div className="node-container">
                    <NavLink to="" state={this.props.state} draggable="false">
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

export default StepNode;