import { Component, createRef } from 'react';
import StepNode from './subs/navs/step-node';
import { TStepNodeProps } from "./subs/navs/step-node";

export type TStepNavProps = {
    steps: TStepNodeProps[];
}

type TStepNavState = {
}

class StepNav extends Component<TStepNavProps, TStepNavState> {
    private ref_self: React.RefObject<HTMLDivElement>;

    constructor(props: TStepNavProps) {
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
            <div className="step-nav-container" ref={this.ref_self}>
                {this.props.steps.map((item, index) => {
                    return <StepNode key={index} title={item.title} state={item.state} startNode={index === 0 ? true : false} />
                })}
            </div>
        );
    }
}

export default StepNav;