import { useRef, useState } from "react";
import { FONT_SIZE } from "../../utils/styleMgr";

export type TOptionsItem = {
    name: string;
    handle?: () => void;
}

type TMoreOptionsButtonProps = {
    listOptions: TOptionsItem[],
}

const MoreOptionsButton = (props: TMoreOptionsButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const ref_self = useRef<HTMLDivElement>(null);

    const handleClickOpen = () => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref_self.current && ref_self.current.contains(event.target as Node)) {
                return;
            }
            setIsOpen(false);
            document.removeEventListener("mousedown", handleClickOutside);
        }
        if (isOpen) {
            return;
        }
        document.addEventListener("mousedown", handleClickOutside);
        setIsOpen(true);
    }

    return (
        <div className="more-options-button" ref={ref_self}>
            <div className="three-dot" onClick={(handleClickOpen)}>
                {/* ellipsis-solid.svg */}
                <svg
                    height={`${1.25 * FONT_SIZE}px`}
                    width={`${1.25 * FONT_SIZE}px`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path
                        d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z" />
                </svg>
            </div>
            {isOpen
                ?
                <div className="options">
                    {props.listOptions.map((item) => {
                        return <span key={item.name} className="option-item" onClick={item.handle}>
                            {item.name}
                        </span>
                    })}
                </div>
                :
                <></>
            }
        </div>
    )
}

export default MoreOptionsButton;