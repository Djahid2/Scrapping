import { Outlet } from "react-router-dom";
import Nav from "../components/nav";

export default function Layout() {
    return (
        <div className="layout">
            <Nav/>
            <Outlet/>
        </div>
    )
}