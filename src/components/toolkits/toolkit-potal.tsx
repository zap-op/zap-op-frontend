import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/store';

const mapStateToProps = (state: RootState) => {
    return {
        isDescribing: state.toolkit.isDescribing,
        describeElement: state.toolkit.describeElement,
    }
}

type TmapStateToProps = ReturnType<typeof mapStateToProps>;

export type TToolkitPortalProps =
    TmapStateToProps & {

    }

class ToolkitPortal extends Component<TToolkitPortalProps> {

    override render() {
        return (
            <div className="toolkit-portal">
                {this.props.isDescribing ? this.props.describeElement : <></>}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ToolkitPortal);