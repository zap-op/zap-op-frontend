import { Component, ReactNode } from "react";
import TargetsTable from "../tables/targets-table";
import TABLEROW_Targets, { TTABLEROW_Targets_Props } from "../subs/tables/target/tr-targets";
import CollapseSearchBar from "../collapse-search-bar";
import ModalPortal from "../toolkits/modal-portal";
import AddTargetsModal from "../subs/modal/add-target-modal";
import withLocation, { TwithLocationProps } from "../toolkits/withLocation";

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
        this.state = {
            isOpenModal: false,
        }
    }

    handleOpenModal(status: boolean) {
        this.setState({
            isOpenModal: status,
        })
    }

    handleAddTarget() {
        this.handleOpenModal(true);
    }

    override render(): ReactNode {
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
                        <AddTargetsModal />
                    </ModalPortal>
                    :
                    <></>
                }
            </>
        )
    }
}

export default withLocation<TTargetsBoardProps>(TargetsBoard);