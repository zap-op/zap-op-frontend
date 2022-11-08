import { Component, createRef, PropsWithChildren, ReactNode } from 'react';
import DescribeElement from './describeElement';
import { setDescribeElement } from "../../store/slice/toolkitSlice";
import { connect } from 'react-redux';
import { RootState } from '../../store/store';

const mapStateToProps = (state: RootState) => {
    return {
        isDescribing: state.toolkit.isDescribing,
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

type TDescribableState = {
    waiterMouseStop: NodeJS.Timeout | undefined,
}
class Describable extends Component<PropsWithChildren<TDescribableProps>, TDescribableState> {
    static readonly TIME_TO_DESCRIBABLE = 200;
    private ref_self: React.RefObject<HTMLDivElement>;

    constructor(props: TDescribableProps) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseStop = this.handleMouseStop.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.ref_self = createRef<HTMLDivElement>();
        this.state = {
            waiterMouseStop: undefined,
        }
    }

    handleMouseEnter() {
        this.ref_self.current?.addEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseMove() {
        if (this.props.isDescribing) {
            return;
        }
        clearTimeout(this.state.waiterMouseStop);
        this.setState({
            waiterMouseStop: setTimeout(this.handleMouseStop, Describable.TIME_TO_DESCRIBABLE),
        })
    }

    handleMouseStop() {
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
        clearTimeout(this.state.waiterMouseStop);
        this.ref_self.current?.removeEventListener("mousemove", this.handleMouseMove);
        this.props.setDescribeElement({ describeElement: null })
    }

    override render(): ReactNode {
        return (
            <div className="describable-wrap" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} ref={this.ref_self}>
                {this.props.children}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Describable);