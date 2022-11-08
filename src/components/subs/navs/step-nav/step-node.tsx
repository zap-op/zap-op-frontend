import { Component, ReactNode } from "react";

type TStepNodeProps = {
    title: string;
    href: string;
}

class StepNode extends Component<TStepNodeProps> {
    override render(): ReactNode {
        return (
            <div className="step-node-container">
                <div className="node-container">
                    <div className="node">
                    </div>
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