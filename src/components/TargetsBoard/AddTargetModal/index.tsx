import {
	useMemo, //
	useState,
	useContext,
	createContext,
	useEffect,
} from "react";
import toast from "react-hot-toast";
import { ModalContext } from "../../toolkits/ModalPortal";
import TextField from "../../Fields/TextField";
import TagField from "../../Fields/TagField";
import {
	TTarget, //
	TStatusResponse,
} from "../../../utils/types";
import {
	useSelector, //
	useAddTargetMutation,
} from "../../../store";
import { trimAllStringInArray } from "../../../utils/helpers";

type TStateModal = "ip" | "domain" | undefined;

type TAddTargetsModalContext = {
	goBack: () => void;
};

export const AddTargetsModalContext = createContext<TAddTargetsModalContext | null>(null);

const AddTargetsModal = () => {
	const [stateModal, setStateModal] = useState<TStateModal>();
	const goBack = () => setStateModal(undefined);

	return (
		<>
			{stateModal === undefined ? (
				<div className="add-target-modal-container">
					<div className="title-container">
						<h3>Add new target</h3>
					</div>
					<div className="content-container">
						<AddTargetsModalContext.Provider value={{ goBack }}>
							<div
								className="type-option domain"
								onClick={() => setStateModal("domain")}>
								<h4 className="title">Add domain</h4>
							</div>
							<div
								className="type-option ip"
								onClick={() => setStateModal("ip")}>
								<h4 className="title">Add IP</h4>
							</div>
						</AddTargetsModalContext.Provider>
					</div>
				</div>
			) : stateModal === "ip" ? (
				<AddTargetsModalContext.Provider value={{ goBack }}>
					<AddModal typeTarget="ip" />
				</AddTargetsModalContext.Provider>
			) : stateModal === "domain" ? (
				<AddTargetsModalContext.Provider value={{ goBack }}>
					<AddModal typeTarget="domain" />
				</AddTargetsModalContext.Provider>
			) : (
				<></>
			)}
		</>
	);
};

export default AddTargetsModal;

type TAddModal = {
	typeTarget: Required<TStateModal>;
};

const AddModal = ({ typeTarget }: TAddModal) => {
	const { title, placeHolder } = useMemo<{
		title: string;
		placeHolder: string;
	}>(() => {
		if (typeTarget === "domain") {
			return {
				title: "domain",
				placeHolder: "eg. mydomain.com",
			};
		} else if (typeTarget === "ip") {
			return {
				title: "ip",
				placeHolder: "eg. 192.158.1.24",
			};
		}
		return {
			title: "",
			placeHolder: "",
		};
	}, []);

	const [addTarget] = useAddTargetMutation();
	const listDataTag = useSelector((state) => state.target.listTargetTag);
	const [listSubmitTag, setListSubmitTag] = useState<string[]>([]);

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
			name: nameTarget.trim(),
			target: target.trim(),
			tag: trimAllStringInArray(listSubmitTag),
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
		<div className="add-modal-container">
			<div className="title-container">
				<h3>{`Add ${title}`}</h3>
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
				<div className="field-container target-field">
					<TextField
						type="text"
						placeHolder={placeHolder}
						title={`Enter your ${title}`}
						isRequired={true}
						handleChangeValue={setTarget}
						errorMessage="Target is required"
						isDisplayErrorMessage={isDisplayErrorMessageTargetField}
					/>
				</div>
				<div className="field-container tag-field">
					<TagField
						id="tag-field"
						type="text"
						title="Enter target tags"
						placeHolder="Tags"
						listDataTag={listDataTag}
						listSubmitTag={listSubmitTag}
						handleChangeValue={setListSubmitTag}
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
