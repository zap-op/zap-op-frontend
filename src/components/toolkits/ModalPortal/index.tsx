import {
	PropsWithChildren, //
	Dispatch,
	SetStateAction,
	createContext,
	useEffect,
} from "react";

export type TModalProps = {
	handleOpenModal: (status: boolean) => void;
};

type TModalPortalProps = TModalProps;

const ModalPortal = ({ handleOpenModal, children }: PropsWithChildren<TModalPortalProps>) => {
	const handleEscKey = (event: KeyboardEvent) => {
		event.key === "Escape" && handleOpenModal(false);
	};

	useEffect(() => {
		window.addEventListener("keydown", handleEscKey);
		return () => window.removeEventListener("keydown", handleEscKey);
	}, []);

	return (
		<div className="modal-portal-container">
			<div
				className="modal-wrap"
				onClick={() => handleOpenModal(false)}>
				<div
					className="modal-inner"
					onClick={(event) => {
						event.stopPropagation();
					}}>
					<span
						className="close-button"
						onClick={() => handleOpenModal(false)}></span>
					<div className="modal-container">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default ModalPortal;

type TModalContext = {
	isOpenModal: boolean;
	handleOpenModal: Dispatch<SetStateAction<boolean>>;
	setModalComponent: Dispatch<SetStateAction<JSX.Element | null>>;
};

const ModalContext = createContext<TModalContext | null>(null);
export { ModalContext };
