import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetTargetQuery } from "../../services/targetApi";
import AddDomainModal from "./add-target-modal/add-domain-modal";
import AddIPModal from "./add-target-modal/add-ip-modal";
import AddTargetsModal from "./add-target-modal";
import CollapseSearchBar from "../search-bars/collapse-search-bar";
import TargetsTable from "./targets-table";
import TABLEROW_Targets from "./targets-table/tr-targets";
import ModalPortal from "../toolkits/modal/modal-portal";

const TargetsBoard = () => {
    const {
        data: listTarget,
    } = useGetTargetQuery();

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
                        {listTarget?.map((item, index) => {
                            return <TABLEROW_Targets key={index} _id={item._id} name={item.name} target={item.target} tag={item.tag} createdAt={item.createdAt} updatedAt={item.updatedAt} />
                        })}
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