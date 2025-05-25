/* eslint-disable react/no-unknown-property */

import { useCallback, useRef, useState } from "react";
import "../scss/_navbar.scss";
import Button from "@mui/material/Button";
import LoaderLink from "./loderLink/LoaderLink";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const btnmenu = useRef();

    const menuClickAnimationList = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    return (
        <div className="nav-bar">
            <LoaderLink isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="container">
                <div className="logo">
                    <div className="container-circle">
                        <div className="circle white"></div>
                        <div className="circle black"></div>
                    </div>
                    <p>InsuFi</p>
                </div>

                <div className="menuchose">
                    <Button
                        ref={btnmenu}
                        onClick={() => {
                            menuClickAnimationList();
                        }}
                        variant="container"
                        color="primary"
                        sx={{ width: "100px" }}
                    >
                        {!isOpen ? "MENU" : "CLOSE"}
                        {/*  */}
                    </Button>
                </div>
            </div>
        </div>
    );
}
