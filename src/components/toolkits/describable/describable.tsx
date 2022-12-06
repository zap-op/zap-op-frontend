import { createRef, PropsWithChildren, useState } from 'react';
import DescribeElement from './describe-element';
import { setDescribeElement } from "../../../store/slice/toolkit/describablePortalSlice";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

type TDescribableProps = {
    dataTitle: string,
}

const Describable = (props: PropsWithChildren<TDescribableProps>) => {
    const isDescribing = useSelector((state: RootState) => state.describablePortal.isDescribing);

    const dispatch = useDispatch();

    const [waiterMouseStop, setWaiterMouseStop] = useState<NodeJS.Timeout | undefined>(undefined);

    const ref_self = createRef<HTMLDivElement>();

    const handleMouseEnter = () => {
        ref_self.current?.addEventListener("mousemove", handleMouseMove);
    }

    const handleMouseMove = () => {
        const handleMouseStop = () => {
            const presentOffsetTop = (ref_self.current!.offsetTop + ref_self.current!.offsetHeight / 2);
            const presentOffsetLeft = (ref_self.current!.offsetLeft + ref_self.current!.offsetWidth / 2);
            dispatch(setDescribeElement({
                describeElement: <DescribeElement
                    offsetTop={presentOffsetTop}
                    offsetLeft={presentOffsetLeft} >
                    {props.dataTitle}
                </DescribeElement>
            }));
        }

        if (isDescribing) {
            return;
        }
        clearTimeout(waiterMouseStop);
        setWaiterMouseStop(setTimeout(handleMouseStop, Describable.TIME_TO_DESCRIBABLE));
    }


    const handleMouseLeave = () => {
        clearTimeout(waiterMouseStop);
        ref_self.current?.removeEventListener("mousemove", handleMouseMove);
        dispatch(setDescribeElement({ describeElement: undefined }));
    }

    return (
        <div className="describable-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={ref_self}>
            {props.children}
        </div>
    );
}

Describable.TIME_TO_DESCRIBABLE = 200;

export default Describable;