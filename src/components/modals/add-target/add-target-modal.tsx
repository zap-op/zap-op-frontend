import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { LOCATION_STATE } from "../add-domain/add-domain-modal";
import AddIPModal from "../add-ip/add-ip-modal";

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
                        Add new target
                    </h3>
                </div>
                <div className="content-container">
                    <Link to="" state={LOCATION_STATE} className="type-option domain">
                        <h4 className="title">
                            Add domain
                        </h4>
                    </Link>
                    <Link to="" state={AddIPModal.LOCATION_STATE} className="type-option ip">
                        <h4 className="title">
                            Add IP
                        </h4>
                    </Link>
                </div>
            </div>
        )
    }
}

export default AddTargetsModal;