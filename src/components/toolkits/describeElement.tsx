export type TDescribeElementProps = {
    content: string;
    offsetTop: number;
    offsetLeft: number;
}

function DescribeElement({ content, offsetTop, offsetLeft }: TDescribeElementProps) {
    return (
        <div className="describe-element"
            style={{
                top: `${offsetTop}px`,
                left: `${offsetLeft}px`
            }}>
            {content}
        </div>
    )
}

export default DescribeElement;