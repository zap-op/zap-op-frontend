import { PropsWithChildren } from 'react';

export type TDescribeElementProps = {
    offsetTop: number;
    offsetLeft: number;
}

const DescribeElement = (props: PropsWithChildren<TDescribeElementProps>) => {
    return (
        <div className="describe-element"
            style={{
                top: `${props.offsetTop}px`,
                left: `${props.offsetLeft}px`,
            }}>
            {props.children}
        </div>
    )
}

export default DescribeElement;