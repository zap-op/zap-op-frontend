import { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import StepNode from './subs/navs/step-node';

type TStepNavProps = {
    steps: {
        title: string;
        href: string;
    }[];
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
        //     selfWidth: this.ref_self.current!.clientWidth,
    }

    override render() {
        return (
            <div className="step-nav-container" ref={this.ref_self}>
                {this.props.steps.map((item, index) => {
                    return <StepNode key={index} title={item.title} state={item.href} />
                })}
            </div>
        );
    }
}

export default StepNav;