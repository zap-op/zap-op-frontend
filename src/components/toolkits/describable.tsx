import { Component, createRef, PropsWithChildren } from 'react';
import DescribeElement from './describeElement';
import { setDescribeElement } from "../../store/slice/toolkitSlice";
import { connect } from 'react-redux';
import { RootState } from '../../store/store';

const mapStateToProps = (state: RootState) => {
    return {
        describeElement: state.toolkit.describeElement,
    }
}

const mapDispatchToProps = {
    setDescribeElement,
}

type TmapStateToProps = ReturnType<typeof mapStateToProps>;
type TmapDispatchToProps = typeof mapDispatchToProps;

type TDescribableProps =
    TmapStateToProps &
    TmapDispatchToProps & {
        dataTitle: string,
    }

class Describable extends Component<PropsWithChildren<TDescribableProps>> {
    private ref_self: React.RefObject<HTMLDivElement>;

    constructor(props: TDescribableProps) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.ref_self = createRef<HTMLDivElement>();
    }

    handleMouseEnter() {
        const presentOffsetTop = (this.ref_self.current!.offsetTop + this.ref_self.current!.offsetHeight / 2)
        const presentOffsetLeft = (this.ref_self.current!.offsetLeft + this.ref_self.current!.offsetWidth / 2)
        this.props.setDescribeElement({
            describeElement: <DescribeElement
                offsetTop={presentOffsetTop}
                offsetLeft={presentOffsetLeft} >
                {this.props.dataTitle}
            </DescribeElement>
        })
    }

    handleMouseLeave() {
        this.props.setDescribeElement({ describeElement: null })
    }

    override render() {
        return (
            <div className="describable-wrap" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} ref={this.ref_self}>
                {this.props.children}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Describable);