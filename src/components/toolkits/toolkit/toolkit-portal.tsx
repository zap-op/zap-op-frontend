import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/store';

const mapStateToProps = (state: RootState) => {
    return {
        isDescribing: state.describablePortal.isDescribing,
        describeElement: state.describablePortal.describeElement,
    }
}

type TmapStateToProps = ReturnType<typeof mapStateToProps>;

export type TToolkitPortalProps =
    TmapStateToProps & {

    }

class ToolkitPortal extends Component<TToolkitPortalProps> {

    override render(): ReactNode {
        return (
            <div className="toolkit-portal">
                {this.props.isDescribing ? this.props.describeElement : <></>}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ToolkitPortal);