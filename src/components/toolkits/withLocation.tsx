import { ComponentType } from "react";
import { useLocation, Location } from "react-router-dom";

export type TLocationProps = {
    location: Location,
}

export type TwithLocationProps<T> =
    T &
    TLocationProps

type TComponent<T> = Omit<T, keyof TLocationProps>;

function withLocation<T>(
    Component: ComponentType<TComponent<T> & TLocationProps>
) {
    return (props: TComponent<T>) => {
        const location = useLocation();
        return (
            <Component
                location={location}
                {...props}
            />
        );
    }
}

export default withLocation;