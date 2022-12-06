import { PropsWithChildren } from 'react';

type TModalPortalProps = {
    handleOpenModal: (status: boolean) => void;
}

const ModalPortal = (props: PropsWithChildren<TModalPortalProps>) => {
    return (
        <div className="modal-portal-container">
            <div className="modal-wrap" onClick={() => props.handleOpenModal(false)}>
                <div className="modal-inner" onClick={(event) => { event.stopPropagation() }}>
                    <span className="close-button" onClick={() => props.handleOpenModal(false)}>
                    </span>
                    <div className="modal-container">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalPortal;