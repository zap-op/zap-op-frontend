import { Link } from "react-router-dom";
import { useState } from "react";
import { TTarget } from "../../../submodules/utility/model";
import ContentInputField from "../../fields/content-input-field/content-input-field";
import { TModalProps } from "../../toolkits/modal/modal-portal";

type TAddIPModalProps = TModalProps & {
}

const AddIPModal = (props: TAddIPModalProps) => {
    const [nameTarget, setNameTarget] = useState<TTarget["name"]>();
    const [target, setTarget] = useState<TTarget["target"]>();

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
                        <ContentInputField type="text" placeHolder="Target name" title="Name your target" isRequired={true} handleChangeValue={setNameTarget} />
                    </div>
                    <div className="field-container ip-field">
                        <ContentInputField type="text" placeHolder={AddIPModal.PLACEHOLDER} title="Enter your IP" isRequired={true} handleChangeValue={setTarget} />
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
    );
}

AddIPModal.PLACEHOLDER = "eg. 192.158.1.24";
AddIPModal.LOCATION_STATE = "ip";

export default AddIPModal;