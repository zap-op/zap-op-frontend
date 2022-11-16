import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import ContentInputField from "../../content-input-field";

type TAddIPModalProps = {}

class AddIPModal extends Component<TAddIPModalProps> {
    static readonly PLACEHOLDER = "eg. 192.158.1.24";
    static readonly LOCATION_STATE = "ip";

    constructor(props: TAddIPModalProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="add-ip-modal-container">
                <div className="title-container">
                    <h3>
                        Add IP
                    </h3>
                </div>
                <div className="content-container">
                    <div className="content-container">
                        <div className="field-container target-name-field">
                            <ContentInputField type="text" placeHolder="Target name" title="Name your target" isRequired={true} />
                        </div>
                        <div className="field-container ip-field">
                            <ContentInputField type="text" placeHolder={AddIPModal.PLACEHOLDER} title="Enter your IP" isRequired={true} />
                        </div>
                    </div>
                </div>
                <div className="navigator-state-containter">
                    <Link to="" state={undefined} className="back-state button secondary-button">
                        Back
                    </Link>
                    <div className="add button primary-button">
                        Add
                    </div>
                </div>
            </div>
        )
    }
}

export default AddIPModal;