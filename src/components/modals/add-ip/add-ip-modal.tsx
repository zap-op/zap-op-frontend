import { ObjectId } from "bson";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAddTargetMutation } from "../../../services/targetApi";
import { RootState } from "../../../store/store";
import { TTarget } from "../../../submodules/utility/model";
import ContentInputField from "../../fields/content-input-field/content-input-field";
import { TModalProps } from "../../toolkits/modal/modal-portal";

type TAddIPModalProps = TModalProps & {
}

const AddIPModal = (props: TAddIPModalProps) => {
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
                <div className="add button primary-button" onClick={handleAddTarget}>
                    Add
                </div>
            </div>
        </div>
    );
}

AddIPModal.PLACEHOLDER = "eg. 192.158.1.24";
AddIPModal.LOCATION_STATE = "ip";

export default AddIPModal;