import { useState } from "react";
import Breadcrumb from "../components/dashboard/breadcrumb";
import { TBreadcrumbProps } from "../components/dashboard/breadcrumb";
import PanelDashboard from "../components/dashboard/panel-dasboard";
import TargetsBoard from "../components/dashboard/targets-board";

function AppBoard() {
    const [listBreadcrumb, updateListBreadcrumb] = useState<TBreadcrumbProps["listBeadcrumb"]>([{
        href: "#",
        name: "Workspace name",
    }, {
        href: "#",
        name: "Current main content name",
    }])
    return (
        <div className="app-board-container">
            <PanelDashboard />
            <div className="main-board-container">
                <div className="main-board_breadcrumb-container">
                    <Breadcrumb listBeadcrumb={listBreadcrumb} />
                </div>
                <div className="main-board_content-container">
                    <TargetsBoard listTarget={[{
                        name: "1",
                        url: "1",
                        tag: "1",
                        firstSeen: "1",
                        lastSeen: "2",
                    }, {
                        name: "1",
                        url: "1",
                        tag: "1",
                        firstSeen: "1",
                        lastSeen: "2",
                    }]} />
                </div>
            </div>
        </div>
    )
}

export default AppBoard;