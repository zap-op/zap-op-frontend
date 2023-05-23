import AddDomainModal from "./AddDomainModal";
import AddIPModal from "./AddIPModal";
import { createContext, useState } from "react";

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
					<AddIPModal />
				</AddTargetsModalContext.Provider>
			) : stateModal === "domain" ? (
				<AddTargetsModalContext.Provider value={{ goBack }}>
					<AddDomainModal />
				</AddTargetsModalContext.Provider>
			) : (
				<></>
			)}
		</>
	);
};

export default AddTargetsModal;
