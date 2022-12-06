import { useState } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb, { TBreadcrumbProps } from "../../components/breadcrumb/breadcrumb";
import PanelDashboard from "../../components/boards/panel/panel-board";

const AppBoardPage = () => {
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
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AppBoardPage;