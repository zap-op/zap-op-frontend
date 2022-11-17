import { ComponentType } from "react";
import { useLocation, Location } from "react-router-dom";

export type TLocationProps = {
    location: Location,
    setStateLocation: (state: string | null) => void;
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
        const setStateLocation: TLocationProps["setStateLocation"] = (state) => {
            location.state = state;
        }
        return (
            <Component
                location={location}
                setStateLocation={setStateLocation}
                {...props}
            />
        );
    }
}

export default withLocation;