import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export type TToolkitPortalProps = {

}

const ToolkitPortal = (props: TToolkitPortalProps) => {
    const isDescribing = useSelector((state: RootState) => state.describablePortal.isDescribing);
    const describeElement = useSelector((state: RootState) => state.describablePortal.describeElement);

    return (
        <div className="toolkit-portal">
            {isDescribing ? describeElement : <></>}
        </div>
    );
}

export default ToolkitPortal;