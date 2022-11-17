import { Component, ReactNode } from "react";
import TargetsTable from "../../tables/targets-table/targets-table";
import TABLEROW_Targets, { TTABLEROW_Targets_Props } from "../../tables/targets-table/tr-targets";
import CollapseSearchBar from "../../search-bars/collapse-search-bar/collapse-search-bar";
import ModalPortal from "../../toolkits/modal/modal-portal";
import AddTargetsModal from "../../modals/add-target/add-target-modal";
import withLocation, { TwithLocationProps } from "../../helper/withLocation";
import AddDomainModal from "../../modals/add-domain/add-domain-modal";
import AddIPModal from "../../modals/add-ip/add-ip-modal";

type TTargetsBoardProps = {
    listTarget: TTABLEROW_Targets_Props[];
}

type TTargetsBoardState = {
    isOpenModal: boolean;
}
class TargetsBoard extends Component<TwithLocationProps<TTargetsBoardProps>, TTargetsBoardState> {
    constructor(props: TwithLocationProps<TTargetsBoardProps>) {
        super(props);
        this.handleAddTarget = this.handleAddTarget.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.state = {
            isOpenModal: false,
        }
    }

    handleOpenModal(status: boolean) {
        this.setState({
            isOpenModal: status,
        })
        if (status) {
            document.addEventListener("keydown", this.handleEscapeKey);
        }
    }

    handleAddTarget() {
        this.props.setStateLocation(null);
        this.handleOpenModal(true);
    }

    handleEscapeKey(event: KeyboardEvent) {
        if (event.code === "Escape") {
            this.handleOpenModal(false);
            document.removeEventListener("keydown", this.handleEscapeKey);
        }
    }

    override render(): ReactNode {
        let currentModal = undefined;
        if (this.state.isOpenModal) {
            const currentState = this.props.location.state;
            switch (currentState) {
                case AddDomainModal.LOCATION_STATE:
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
                        <div className="add-target-button button primary-button" onClick={this.handleAddTarget}>
                            New target
                        </div>
                    </div>
                    <div className="targets-board_targets-table-container">
                        <TargetsTable>
                            {this.props.listTarget.map((item, index) => {
                                return <TABLEROW_Targets key={index} name={item.name} url={item.url} tag={item.tag} firstSeen={item.firstSeen} lastSeen={item.lastSeen} />
                            })}
                        </TargetsTable>
                    </div>
                </div>
                {this.state.isOpenModal
                    ?
                    <ModalPortal handleOpenModal={this.handleOpenModal}>
                        {currentModal}
                    </ModalPortal>
                    :
                    <></>
                }
            </>
        )
    }
}

export default withLocation<TTargetsBoardProps>(TargetsBoard);