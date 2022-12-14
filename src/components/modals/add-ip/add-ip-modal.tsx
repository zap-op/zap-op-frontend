import { ObjectId } from "bson";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAddTargetMutation } from "../../../services/targetApi";
import { RootState } from "../../../store/store";
import { TTarget } from "../../../submodules/utility/model";
import { TStatusResponse } from "../../../submodules/utility/status";
import ContentInputField from "../../fields/content-input-field/content-input-field";
import { TModalProps } from "../../toolkits/modal/modal-portal";

type TAddIPModalProps = TModalProps & {
}

const AddIPModal = (props: TAddIPModalProps) => {
    const userId = useSelector((state: RootState) => state.auth.userId);
    const [addTarget] = useAddTargetMutation();

    const location = useLocation();

    const [nameTarget, setNameTarget] = useState<TTarget["name"]>();
    const [isDisplayErrorMessageNameTargetField, setIsDisplayErrorMessageNameTargetField] = useState<boolean>();
    const [target, setTarget] = useState<TTarget["target"]>();
    const [isDisplayErrorMessageTargetField, setIsDisplayErrorMessageTargetField] = useState<boolean>();

    const handleAddTarget = () => {
        const toastId = toast.loading("Adding target");
        if (!nameTarget || !target) {
            if (!nameTarget) {
                setIsDisplayErrorMessageNameTargetField(true);
            } else {
                setIsDisplayErrorMessageNameTargetField(false);
            }
            if (!target) {
                setIsDisplayErrorMessageTargetField(true);
            } else {
                setIsDisplayErrorMessageTargetField(false);
            }
            return;
        }
        let newTarget: TTarget = {
            userId: (userId as unknown) as ObjectId,
            name: nameTarget,
            target: target,
        }
        location.state = "";
        props.handleOpenModal(false);
        addTarget(newTarget)
            .unwrap()
            .then((result) => {
                if (result.statusCode > 0) {
                    toast.success(`${nameTarget} ${result.msg}`, {
                        id: toastId,
                    });
                } else {
                    toast.error(result.msg, {
                        id: toastId,
                    });
                }
            })
            .catch((error) => {
                if (!error.data) {
                    toast.error("Something went wrong", {
                        id: toastId,
                    });
                    return;
                }
                toast.error((error.data as TStatusResponse).msg, {
                    id: toastId,
                });
            })
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
                        <ContentInputField type="text" placeHolder="Target name" title="Name your target" isRequired={true} handleChangeValue={setNameTarget} errorMessage="Name target is required" isDisplayErrorMessage={isDisplayErrorMessageNameTargetField} />
                    </div>
                    <div className="field-container ip-field">
                        <ContentInputField type="text" placeHolder={AddIPModal.PLACEHOLDER} title="Enter your IP" isRequired={true} handleChangeValue={setTarget} errorMessage="Target is required" isDisplayErrorMessage={isDisplayErrorMessageTargetField} />
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