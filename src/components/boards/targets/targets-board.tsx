import { useState } from "react";
import TargetsTable from "../../tables/targets-table/targets-table";
import TABLEROW_Targets from "../../tables/targets-table/tr-targets";
import CollapseSearchBar from "../../search-bars/collapse-search-bar/collapse-search-bar";
import ModalPortal from "../../toolkits/modal/modal-portal";
import AddTargetsModal from "../../modals/add-target/add-target-modal";
import AddDomainModal, { LOCATION_STATE } from "../../modals/add-domain/add-domain-modal";
import AddIPModal from "../../modals/add-ip/add-ip-modal";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

type TTargetsBoardProps = {

}

const TargetsBoard = (props: TTargetsBoardProps) => {
    const location = useLocation();

    const [isOpenModal, setIsOpenModal] = useState(false);

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
            case LOCATION_STATE:
                currentModal = <AddDomainModal />
                break;
            case AddIPModal.LOCATION_STATE:
                currentModal = <AddIPModal />
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