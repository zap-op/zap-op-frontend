import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

import TextField from "../../../Fields/TextField";

import { useAddTargetMutation } from "../../../../store";
import { TTarget, TStatusResponse } from "../../../../utils/types";
import { AddTargetsModalContext } from "..";
import { ModalContext } from "../../../toolkits/ModalPortal";

const AddDomainModal = () => {
	const [addTarget] = useAddTargetMutation();

	const addTargetsModalContext = useContext(AddTargetsModalContext);
	const modalContext = useContext(ModalContext);

	const [nameTarget, setNameTarget] = useState<TTarget["name"]>();
	const [isDisplayErrorMessageNameTargetField, setIsDisplayErrorMessageNameTargetField] = useState<boolean>();
	const [target, setTarget] = useState<TTarget["target"]>();
	const [isDisplayErrorMessageTargetField, setIsDisplayErrorMessageTargetField] = useState<boolean>();

	const handleAddTarget = async () => {
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
		const toastId = toast.loading("Adding target");
		let newTarget: TTarget = {
			name: nameTarget,
			target: target,
		};
		modalContext?.handleOpenModal(false);
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
			});
	};

	return (
		<div className="add-domain-modal-container">
			<div className="title-container">
				<h3>Add domain</h3>
			</div>
			<div className="content-container">
				<div className="field-container target-name-field">
					<TextField
						type="text"
						placeHolder="Target name"
						title="Name your target"
						isRequired={true}
						handleChangeValue={setNameTarget}
						errorMessage="Name target is required"
						isDisplayErrorMessage={isDisplayErrorMessageNameTargetField}
					/>
				</div>
				<div className="field-container domain-field">
					<TextField
						type="text"
						placeHolder={AddDomainModal.PLACEHOLDER}
						title="Enter your domain"
						isRequired={true}
						handleChangeValue={setTarget}
						errorMessage="Target is required"
						isDisplayErrorMessage={isDisplayErrorMessageTargetField}
					/>
				</div>
			</div>
			<div className="navigator-state-containter">
				<div
					className="back-state button secondary-button"
					onClick={addTargetsModalContext?.goBack}>
					Back
				</div>
				<div
					className="add button primary-button"
					onClick={handleAddTarget}>
					Add
				</div>
			</div>
		</div>
	);
};

AddDomainModal.PLACEHOLDER = "eg. mydomain.com";
AddDomainModal.LOCATION_STATE = "domain";

export default AddDomainModal;
