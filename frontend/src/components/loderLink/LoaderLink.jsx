import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
// eslint-disable-next-line react/prop-types
export default function LoaderLink({ isOpen, setIsOpen }) {
    const container = useRef();
    // const navigate = useNavigate();
    const tl = useRef();
    const tlrev = useRef();

    useGSAP(() => {
        gsap.set(".loaderLinks .container .Link_animation_New", { y: 100 });
        tlrev.current = gsap.timeline({ paused: true });
        tlrev.current.to(".loaderLinks .container .Link_animation_New", {
            stagger: 0.05,
            y: 100,
        });
        tlrev.current.to(
            container.current,
            {
                clipPath: "polygon(0% 0% , 100% 0% ,100% 0% , 0% 0%)",
                duration: 2,
                ease: "power4.out",
            },
            "-=0.5"
        );
        tl.current = gsap.timeline({ paused: true });

        tl.current.to(container.current, {
            clipPath: "polygon(0% 0% , 100% 0% , 100% 100%, 0% 100%)",
            duration: 2,
            ease: "power4.out",
        });
        tl.current.to(
            ".loaderLinks .container .Link_animation_New",
            {
                stagger: 0.05,
                y: 0,
            },
            "-=1.5"
        );
    });

    useEffect(() => {
        if (isOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isOpen]);

    const listone = [
        "home",
        "discover",
        "about",
        "Quick View",
        "Articles",
        "Collection",
    ];
    const listtwo = [
        "/",
        "/discover",
        "/about",
        "/Dashboard",
        "/Article",
        "/Collection",
    ];

    const Handlreverse = useCallback(() => {
        tl.current.reverse();
        setIsOpen(false);
    }, [tl, setIsOpen]);
    // eslint-disable-next-line no-unused-vars
    const resultArray = listone.map((ele, ind) => (
        <li key={ind}>
            <NavLink
                onClick={Handlreverse}
                className="Link_animation_New"
                to={listtwo[ind]}
            >
                {ele}
            </NavLink>
        </li>
    ));
    return (
        <div ref={container} className="loaderLinks">
            <div className="container">
                <ul>{resultArray}</ul>
            </div>
        </div>
    );
}
