import { Component } from 'react';
import { Link } from 'react-router-dom';
import StepNode from './subs/navs/step-nav/step-node';

type TStepNavProps = {
    steps: {
        title: string;
        href: string;
    }[];
}

type TStepNavState = {

}

class StepNav extends Component<TStepNavProps> {
    override render() {
        return (
            <div className="step-nav-container">
                <div className="step-panel-container">
                    {this.props.steps.map((item, index) => {
                        return <StepNode key={index} title={item.title} href={item.href} />
                    })}
                </div>
                <div className="content-container">
                    
                </div>
            </div>
        );
    }
}

export default StepNav;