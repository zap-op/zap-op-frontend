import { Link } from "react-router-dom";
import { useState } from "react";
import { TTarget } from "../../../submodules/utility/model";
import ContentInputField from "../../fields/content-input-field/content-input-field";
import { TModalProps } from "../../toolkits/modal/modal-portal";

type TAddDomainModalProps = TModalProps & {
}

const AddDomainModal = (props: TAddDomainModalProps) => {
    const [nameTarget, setNameTarget] = useState<TTarget["name"]>();
    const [target, setTarget] = useState<TTarget["target"]>();

    return (
        <div className="add-domain-modal-container">
            <div className="title-container">
                <h3>
                    Add domain
                </h3>
            </div>
            <div className="content-container">
                <div className="field-container target-name-field">
                    <ContentInputField type="text" placeHolder="Target name" title="Name your target" isRequired={true} handleChangeValue={setNameTarget} />
                </div>
                <div className="field-container domain-field">
                    <ContentInputField type="text" placeHolder={AddDomainModal.PLACEHOLDER} title="Enter your domain" isRequired={true} handleChangeValue={setTarget} />
                </div>
                    <div className="add button primary-button">
            </div>
            <div className="navigator-state-containter">
                <Link to="" state={undefined} className="back-state button secondary-button">
                    Back
                </Link>
                    Add
                </div>
            </div>
        </div>
    )
}


AddDomainModal.PLACEHOLDER = "eg. mydomain.com";
AddDomainModal.LOCATION_STATE = "domain";

export default AddDomainModal;