import { Link } from "react-router-dom";
import ContentInputField from "../../fields/content-input-field/content-input-field";
import { TModalProps } from "../../toolkits/modal/modal-portal";

type TAddDomainModalProps = TModalProps & {
}

const AddDomainModal = (props: TAddDomainModalProps) => {

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


AddDomainModal.PLACEHOLDER = "eg. mydomain.com";
AddDomainModal.LOCATION_STATE = "domain";

export default AddDomainModal;