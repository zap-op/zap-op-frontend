import { Component, PropsWithChildren, ReactNode } from 'react';

export type TDescribeElementProps = {
    offsetTop: number;
    offsetLeft: number;
}

class DescribeElement extends Component<PropsWithChildren<TDescribeElementProps>> {
    override render(): ReactNode {
        return (
            <div className="describe-element"
                style={{
                    top: `${this.props.offsetTop}px`,
                    left: `${this.props.offsetLeft}px`
                }}>
                {this.props.children}
            </div>
        )
    }

}

export default DescribeElement;