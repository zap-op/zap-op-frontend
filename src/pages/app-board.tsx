import { useState } from "react";
import Breadcrumb from "../components/dashboard/breadcrumb";
import { TBreadcrumbProps } from "../components/dashboard/breadcrumb";
import PanelDashboard from "../components/dashboard/panel-dasboard";
import ResultsBoard from "../components/dashboard/results-board";
import TargetsBoard from "../components/dashboard/targets-board";
import TS_ZAP from "../entities/ts-zap";
import ZAP from "../entities/zap";

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
                        name: "Lorem",
                        url: "https://lorem.com/",
                        tag: "dev",
                        firstSeen: "2 days ago",
                        lastSeen: "5 hours ago",
                    }, {
                        name: "Isum",
                        url: "https://isum.com/",
                        tag: "product",
                        firstSeen: "20 days ago",
                        lastSeen: "1 days ago",
                    }]} />
                </div>
            </div>
        </div>
    )
}

export default AppBoard;