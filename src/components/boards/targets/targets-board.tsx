import { useState } from "react";
import TargetsTable from "../../tables/targets-table/targets-table";
import CollapseSearchBar from "../../search-bars/collapse-search-bar/collapse-search-bar";
import ModalPortal from "../../toolkits/modal/modal-portal";
import AddTargetsModal from "../../modals/add-target/add-target-modal";
import AddDomainModal from "../../modals/add-domain/add-domain-modal";
import AddIPModal from "../../modals/add-ip/add-ip-modal";
import { useLocation } from "react-router-dom";

const TargetsBoard = () => {
    const location = useLocation();

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleOpenModal = (status: boolean) => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                setIsOpenModal(false);
                document.removeEventListener("keydown", handleEscapeKey);
            }
        }

        setIsOpenModal(status);
        if (status) {
            document.addEventListener("keydown", handleEscapeKey);
        }
    }

    const handleAddTarget = () => {
        location.state = null;
        handleOpenModal(true);
    }

    let currentModal = undefined;
    if (isOpenModal) {
        const currentState = location.state;
        switch (currentState) {
            case AddDomainModal.LOCATION_STATE:
                currentModal = <AddDomainModal handleOpenModal={handleOpenModal}/>
                break;
            case AddIPModal.LOCATION_STATE:
                currentModal = <AddIPModal handleOpenModal={handleOpenModal}/>
                break;
            default:
                currentModal = <AddTargetsModal />
                break;
        }
    }

    return (
        <>
            <div className="targets-board-container">
                <div className="action-container">
                    <CollapseSearchBar placeholder="Search target" />
                    <div className="add-target-button button primary-button" onClick={handleAddTarget}>
                        New target
                    </div>
                </div>
                <div className="targets-board_targets-table-container">
                    <TargetsTable>

                    </TargetsTable>
                </div>
            </div>
            {isOpenModal
                ?
                <ModalPortal handleOpenModal={handleOpenModal}>
                    {currentModal}
                </ModalPortal>
                :
                <></>
            }
        </>
    )
}

export default TargetsBoard;