import { ObjectId } from "bson";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAddTargetMutation } from "../../../services/targetApi";
import { RootState } from "../../../store/store";
import { TTarget } from "../../../submodules/utility/model";
import ContentInputField from "../../fields/content-input-field/content-input-field";
import { TModalProps } from "../../toolkits/modal/modal-portal";

type TAddDomainModalProps = TModalProps & {
}

const AddDomainModal = (props: TAddDomainModalProps) => {
    const userId = useSelector((state: RootState) => state.auth.userId);
    const [addTarget, result] = useAddTargetMutation();

    const location = useLocation();

    const [nameTarget, setNameTarget] = useState<TTarget["name"]>();
    const [target, setTarget] = useState<TTarget["target"]>();

    const handleAddTarget = () => {
        if (!nameTarget || !target) {
            // Error warning
            return;
        }
        let newTarget: TTarget = {
            userId: (userId as unknown) as ObjectId,
            name: nameTarget,
            target: target,
        }

        addTarget(newTarget);
        location.state = "";
        props.handleOpenModal(false);
    }

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
            </div>
            <div className="navigator-state-containter">
                <Link to="" state={undefined} className="back-state button secondary-button">
                    Back
                </Link>
                <div className="add button primary-button" onClick={handleAddTarget}>
                    Add
                </div>
            </div>
        </div>
    )
}

AddDomainModal.PLACEHOLDER = "eg. mydomain.com";
AddDomainModal.LOCATION_STATE = "domain";

export default AddDomainModal;