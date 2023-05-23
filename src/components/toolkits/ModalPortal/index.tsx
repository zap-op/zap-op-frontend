import { PropsWithChildren, Dispatch, SetStateAction, createContext } from "react";

export type TModalProps = {
	handleOpenModal: (status: boolean) => void;
};

type TModalPortalProps = TModalProps;

const ModalPortal = (props: PropsWithChildren<TModalPortalProps>) => {
	return (
		<div className="modal-portal-container">
			<div
				className="modal-wrap"
				onClick={() => props.handleOpenModal(false)}>
				<div
					className="modal-inner"
					onClick={(event) => {
						event.stopPropagation();
					}}>
					<span
						className="close-button"
						onClick={() => props.handleOpenModal(false)}></span>
					<div className="modal-container">{props.children}</div>
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
