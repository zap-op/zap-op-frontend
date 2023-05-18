import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { TModalProps } from "../../../toolkits/ModalPortal";
import { useSelector, useAddTargetMutation } from "../../../../store";
import TextField from "../../../Fields/TextField";
import { TStatusResponse, TTarget } from "../../../../utils/types";

type TAddIPModalProps = TModalProps & {};

const AddIPModal = (props: TAddIPModalProps) => {
	const userId = useSelector((state) => state.auth.userId);
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
			name: nameTarget,
			target: target,
		};
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
			});
	};

	return (
		<div className="add-ip-modal-container">
			<div className="title-container">
				<h3>Add IP</h3>
			</div>
			<div className="content-container">
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
					<div className="field-container ip-field">
						<TextField
							type="text"
							placeHolder={AddIPModal.PLACEHOLDER}
							title="Enter your IP"
							isRequired={true}
							handleChangeValue={setTarget}
							errorMessage="Target is required"
							isDisplayErrorMessage={isDisplayErrorMessageTargetField}
						/>
					</div>
				</div>
			</div>
			<div className="navigator-state-containter">
				<Link
					to=""
					state={undefined}
					className="back-state button secondary-button">
					Back
				</Link>
				<div
					className="add button primary-button"
					onClick={handleAddTarget}>
					Add
				</div>
			</div>
		</div>
	);
};

AddIPModal.PLACEHOLDER = "eg. 192.158.1.24";
AddIPModal.LOCATION_STATE = "ip";

export default AddIPModal;
