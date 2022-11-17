import { Component, createRef } from 'react';
import NodeStep from './nove-step';
import { TNodeStepProps } from "./nove-step";

export type TNavStepProps = {
    steps: TNodeStepProps[];
}

type TNavStepState = {
}

class NavStep extends Component<TNavStepProps, TNavStepState> {
    private ref_self: React.RefObject<HTMLDivElement>;

    constructor(props: TNavStepProps) {
        super(props);
        this.ref_self = createRef<HTMLDivElement>();
    }

    override componentDidMount(): void {
        const stepLength = this.props.steps.length;
        const marginValue = 100 / (stepLength * 2);
        this.ref_self.current?.style.setProperty("--linker-margin-left-right", `${marginValue}%`);
    }

    override render() {
        return (
            <div className="nav-step-container" ref={this.ref_self}>
                {this.props.steps.map((item, index) => {
                    return <NodeStep key={index} title={item.title} state={item.state} startNode={index === 0 ? true : false} />
                })}
            </div>
        );
    }
}

export default NavStep;