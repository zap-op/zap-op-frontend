import { Component, ReactNode } from "react";

type TAddTargetsModalProps = {}

class AddTargetsModal extends Component<TAddTargetsModalProps> {
    constructor(props: TAddTargetsModalProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="add-target-modal-container">
                <div className="title-container">
                    <h3>
                        asd
                    </h3>
                </div>
                <div className="content-container">
                    
                </div>
            </div>
        )
    }
}

export default AddTargetsModal;