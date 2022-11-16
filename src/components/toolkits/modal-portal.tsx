import { Component, PropsWithChildren, ReactNode } from 'react';

type TModalPortalProps = {
    handleOpenModal: (status: boolean) => void;
}

class ModalPortal extends Component<PropsWithChildren<TModalPortalProps>> {

    constructor(props: TModalPortalProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="modal-portal-container">
                <div className="modal-wrap" onClick={() => this.props.handleOpenModal(false)}>
                    <div className="modal-inner" onClick={(event) => { event.stopPropagation() }}>
                        <span className="close-button" onClick={() => this.props.handleOpenModal(false)}>
                        </span>
                        <div className="modal-container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalPortal;