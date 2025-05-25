import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import About from "./pages/about";
import Collection from "./pages/save";
import Discover from "./pages/discover";
import { gsap } from "gsap/gsap-core";
import { useEffect, useState } from "react";
import { useRef } from "react";
import ArtileMoreData from "./pages/artileMoreData";
import "./scss/_app.scss";
import { ScrollTrigger } from "gsap/all";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import Loader from "./components/loaderbox";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/dashboad";
import Article from "./pages/acticles";
import actGetAtricles from "./store/getArticles/actGetArticles/actGetArticles";
import Fitchedarticles from "./pages/fetchedarticles";
import {
    getrevenueData,
    getsample,
    getsample3,
    getsourceData,
} from "./store/getDashData";

gsap.registerPlugin(CSSRulePlugin);
gsap.registerPlugin(ScrollTrigger);
function App() {
    const [countH, setCounter] = useState(0);
    const countRef = useRef(null);
    const prog = useRef(null);
    const masterLoader = useRef(null);
    // const logoanimateref = useRef(null)
    // const ulanimate = useRef(null)
    const dispatch = useDispatch();
    // ###################     Dash     ####################

    const articles = useSelector((state) => state.articlesSlice.articles);
    useEffect(() => {
        dispatch(getrevenueData());
        dispatch(getsample());
        dispatch(getsample3());
        dispatch(getsourceData());
        if (articles.length === 0) {
            dispatch(actGetAtricles());
        }
    }, [dispatch]);

    // ################################
    const panimatie = document.querySelectorAll(
        ".home > .top > .container > .top > .left > div > p"
    );
    const spananimatie = document.querySelectorAll(
        ".home > .top > .container > .top > .left > div >  span"
    );
    const prightanimatie = document.querySelector(
        ".home > .top > .container > .top > .right > p"
    );
    const landingbg = document.querySelector(".home > .top > .landing");
    const lianimatie = document.querySelectorAll(
        ".nav-bar .container > ul > li"
    );
    const logoanimate = document.querySelector(".nav-bar .container .logo");
    const menuchose = document.querySelector(".nav-bar .container .menuchose");

    useEffect(() => {
        const master = gsap.timeline();
        function firstState() {
            const tl = gsap.timeline();
            spananimatie.forEach((ele) => {
                gsap.set(ele, {
                    opacity: 0,
                });
            });
            gsap.set(prightanimatie, {
                x: 500,
                opacity: 0.4,
            });
            gsap.set(menuchose, {
                y: 100,
                opacity: 0.4,
            });
            gsap.set(landingbg, {
                width: "70%",
                y: -100,
                opacity: 0,
            });
            gsap.set(logoanimate, {
                y: 100,
                opacity: 0.4,
            });
            panimatie.forEach((ele) => {
                gsap.set(ele, {
                    y: 100,
                    opacity: 0.4,
                });
            });
            lianimatie.forEach((ele) => {
                gsap.set(ele, {
                    y: 100,
                    opacity: 0.4,
                });
            });
            tl.to(
                { value: 0 },
                {
                    value: 100,
                    duration: 6,
                    ease: "power4.inOut",
                    onUpdate: function () {
                        setCounter(Math.floor(this.targets()[0].value));
                    },
                    snap: { value: 1 },
                },
                0
            );
            tl.to(
                prog.current,
                {
                    duration: 6,
                    width: "100%",
                    ease: "power4.inOut",
                },
                0
            );
            return tl;
        }
        function midleState() {
            const tl = gsap.timeline();
            tl.to(prog.current, {
                height: "100%",
                duration: 3,
                ease: "power4.out",
                onComplete: () => {
                    masterLoader.current.style.display = "none";
                },
            });
            tl.to(
                countRef.current,
                {
                    duration: 1,
                    opacity: 0,
                    onComplete: () => {
                        countRef.current.style.display = "none";
                    },
                },
                "<"
            );
            return tl;
        }
        const durFinale = 1;
        function finaleAnimt() {
            const tl = gsap.timeline();

            tl.to(logoanimate, {
                y: 0,
                opacity: 1,
                duration: durFinale,
            });
            lianimatie.forEach((ele) => {
                tl.to(
                    ele,
                    {
                        y: 0,
                        duration: durFinale,
                        opacity: 1,
                    },
                    "<"
                );
            });
            panimatie.forEach((ele) => {
                tl.to(
                    ele,
                    {
                        y: 0,
                        duration: durFinale,
                        opacity: 1,
                    },
                    "<"
                );
            });
            tl.to(
                landingbg,
                {
                    width: "100%",
                    y: 0,
                    duration: durFinale,
                    ease: "power3.out",
                    opacity: 1,
                },
                "<"
            );
            tl.to(
                prightanimatie,
                {
                    x: 0,
                    opacity: 1,
                    duration: durFinale,
                    ease: "power3.out",
                },
                "<"
            );
            spananimatie.forEach((ele) => {
                tl.to(
                    ele,
                    {
                        opacity: 1,
                        duration: durFinale,
                    },
                    "<"
                );
            });
            tl.to(
                menuchose,
                {
                    duration: durFinale,
                    y: 0,
                    opacity: 1,
                },
                "<"
            );
            return tl;
        }
        master.add(firstState());
        master.add(midleState());
        master.add(finaleAnimt(), "-=1");
        // console.log(logoanimate)
        // console.log(panimatie)
    }, [prightanimatie]);
    return (
        <BrowserRouter>
            <div className="App">
                <Loader />
                <div ref={masterLoader} className="loaderMaster">
                    <div ref={countRef} className="count">
                        {countH}%
                    </div>
                    <div ref={prog} className="prog"></div>
                </div>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/searching"
                            element={<Fitchedarticles />}
                        />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Collection" element={<Collection />} />
                        <Route path="/Article" element={<Article />} />
                        <Route
                            path="/articleData"
                            element={<ArtileMoreData />}
                        />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
