import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import ContentInputField from "../../content-input-field";

type TAddDomainModalProps = {}

class AddDomainModal extends Component<TAddDomainModalProps> {
    static readonly PLACEHOLDER = "eg. mydomain.com";
    static readonly LOCATION_STATE = "domain";

    constructor(props: TAddDomainModalProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="add-domain-modal-container">
                <div className="title-container">
                    <h3>
                        Add domain
                    </h3>
                </div>
                <div className="content-container">
                    <div className="field-container target-name-field">
                        <ContentInputField type="text" placeHolder="Target name" title="Name your target" isRequired={true} />
                    </div>
                    <div className="field-container domain-field">
                        <ContentInputField type="text" placeHolder={AddDomainModal.PLACEHOLDER} title="Enter your domain" isRequired={true} />
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

export default AddDomainModal;