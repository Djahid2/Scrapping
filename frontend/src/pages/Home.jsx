import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// import {grained} from '../assets/grained'
import Svg1 from "../assets/photos/data-collection.svg?react";
import Svg2 from "../assets/photos/team-member-svgrepo-com.svg?react";
import Svg3 from "../assets/photos/timer-resume-svgrepo-com.svg?react";
import Svg4 from "../assets/photos/analysis-svgrepo-com.svg?react";
import Span from "../components/span";
import img1 from "../assets/photos/4da2cd9aa678b48a359f8147cd7decbe.jpg";
import img2 from "../assets/photos/download (1).jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../scss/_home.scss";

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
    const navigate = useNavigate();
    const heroone =
        "we are given a <span>solid data modules </span> based on mathematical model to assess financial risks and trends , and all base on collecting data from defferent website on internet and more...";
    const herotwo =
        "having a good understanding of <span>Web Scarapping</span> ,and apply it for defferent web site that soppurt the scarapping and all this in <span>insufi</span> plus a good data analysis";
    const herothree =
        "we have create a <span>API</span> that will help diffrent companys in the finance world , giben them the abblty ot see api custem data , and the lastes news this the Finance world";
    const [text, setText] = useState(heroone);
    const btn = useRef(null);
    // const landingGr = useRef(null)
    const pTextHero = useRef(null);
    const lis = useRef([]);
    const boxs = useRef([]);
    const cntBtn = useRef(null);
    // const {spanObj} = useContext(SpanObj)
    function functionOfAnimateTd(x, has) {
        let hasStarted = has;
        const tdani = gsap.fromTo(
            "td",
            {
                x: 40,
                y: 40,
                opacity: 0,
                ease: "power1.inOut",
            },
            {
                onStart: () => {
                    if (!hasStarted) {
                        document
                            .querySelector(".TheMainLoader")
                            .classList.add("active");
                        console.log("start");
                        hasStarted = true;
                    }
                },
                scale: 1,
                opacity: 1,
                x: 0,
                yoyo: true,
                repeat: 1,
                y: 0,
                stagger: {
                    grid: [10, 14],
                    amount: 1,
                    from: "end",
                    ease: "power3.in",
                },
                onComplete: () => {
                    tdani.reverse();
                    console.log("from complete");
                    document
                        .querySelector(".TheMainLoader")
                        .classList.remove("active");
                },
                onRepeat: () => {
                    if (hasStarted) {
                        console.log("from repeat");
                        navigate(x);
                        hasStarted = false;
                    }
                },
            }
        );
    }
    function handClickDiscover() {
        // navigate('/discover')
        functionOfAnimateTd("/discover", false);
    }
    function mouseMouve(e) {
        let { clientX, clientY } = e;
        const { width, height, left, top } =
            cntBtn.current.getBoundingClientRect();
        clientX = clientX - left;
        clientY = clientY - top;
        let x = (clientX * 100) / width;
        let y = (clientY * 100) / height;
        // console.log(x,y)
        if (x < 0 || x > 100 || y < 0 || y > 100) {
            gsap.to(btn.current, {
                left: "50%",
                top: "50%",
                duration: 2,
                ease: "power3.out",
            });
        } else {
            gsap.to(btn.current, {
                left: `${x}%`,
                top: `${y}%`,
                duration: 2,
                ease: "power3.out",
            });
        }
    }
    function mouselv() {
        gsap.to(btn.current, {
            left: "50%",
            top: "50%",
            duration: 2,
            ease: "power3.out",
        });
    }
    const listanimated = lis.current;
    animatli(listanimated);

    function animatli(e) {
        e.forEach((ele, ind) => {
            const { width } = ele.getBoundingClientRect();

            gsap.fromTo(
                ele,
                {
                    left: "100%",
                    duration: 10,
                    delay: ind * 2,
                    repeat: -1,
                    ease: "linear",
                },
                {
                    left: -width,
                    delay: ind * 2,
                    duration: 10,
                    repeat: -1,
                    ease: "linear",
                }
            );
        });
    }

    useEffect(() => {
        animatli(listanimated);
        pTextHero.current.innerHTML = text;
        // const options = {
        //     "animate": true,
        //     "patternWidth": 100,
        //     "patternHeight": 49.37,
        //     "grainOpacity": 0.09,
        //     "grainDensity": 4.82,
        //     "grainWidth": 5.65,
        //     "grainHeight": 2.24
        // }
        // grained(document.getElementById('landingGr'), options);
    }, [text, listanimated]);
    function spanHand() {
        gsap.to("span.curflow", {
            duration: 0.4,
            scale: 15,
        });
    }
    function spanHandLeav() {
        gsap.to("span.curflow", {
            duration: 0.4,
            scale: 1,
        });
    }
    function handTextTwo() {
        gsap.to(pTextHero.current, {
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
                setText(herotwo);
                gsap.to(pTextHero.current, {
                    opacity: 1,
                    delay: 0.5,
                    duration: 1,
                });
            },
        });
    }
    function handTextThree() {
        gsap.to(pTextHero.current, {
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
                setText(herothree);
                gsap.to(pTextHero.current, {
                    opacity: 1,
                    delay: 0.5,
                    duration: 1,
                });
            },
        });
    }

    function handTextOne() {
        gsap.to(pTextHero.current, {
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
                setText(heroone);
                gsap.to(pTextHero.current, {
                    opacity: 1,
                    delay: 0.5,
                    duration: 1,
                });
            },
        });
    }
    const liderD = useRef(null);
    // let listp = document.querySelectorAll('.container-bg div p')
    const pUp = useRef([]);
    useEffect(() => {
        // const tl = gsap.timeline({
        //     scrollTrigger:{
        //         trigger:liderD.current,
        //         start: "top center",
        //         end: "bottom top",
        //         markers:true
        //     }
        // })
        pUp.current.forEach((ele) => {
            gsap.set(ele, {
                opacity: 0.5,
                y: 100,
            });
        });
        pUp.current.forEach((ele) => {
            gsap.to(ele, {
                duration: 1,
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: liderD.current,
                    start: "70% bottom",
                    // end: "bottom top",
                    markers: false,
                },
            });
        });
    }, []);
    useEffect(() => {
        gsap.utils.toArray(".dataslidediv").forEach((ele, ind) => {
            gsap.fromTo(
                ele,
                {
                    delay: 2 * ind,
                    duration: 20,
                    left: "100%",
                    ease: "linear",
                    repeat: -1,
                },
                {
                    repeat: -1,
                    delay: 2 * ind,
                    duration: 20,
                    left: "-150px",
                    ease: "linear",
                }
            );
        });
    }, []);
    const footer = useRef(null);
    useEffect(() => {
        gsap.to(footer.current, {
            bottom: 0,
            // duration:3, footer
            scrollTrigger: {
                trigger: liderD.current,
                start: "90% bottom",
                end: "top 400px",
                toggleActions: "play none none reverse",
                // markers: {
                //     startColor:"purple",
                //     endColor:"purple",
                //     fontSize:"3rem"
                // },
                scrub: 1,
            },
        });
    }, []);
    return (
        <div className="home">
            <Span refs={boxs.current} />
            <div className="top">
                <div className="container">
                    <div className="top">
                        <div
                            onMouseEnter={spanHand}
                            onMouseLeave={spanHandLeav}
                            className="left"
                        >
                            <div>
                                <p>
                                    experience <span></span> a new era
                                </p>
                            </div>
                            <div>
                                <span> </span>
                                <span>
                                    <p>learn more</p>
                                    <i className="fa-solid fa-angles-right"></i>
                                </span>
                                <p>of financial</p>
                            </div>
                            <div>
                                <p>
                                    integrity with <span>insufi</span>
                                </p>
                            </div>
                        </div>
                        <div className="right">
                            <p>
                                in a world full of <span>financial</span>{" "}
                                challenges , we provide the confidence to{" "}
                                <span>protect</span> your inverstments , that
                                why we create <span>insufi </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    style={{ overflow: "visible" }}
                    id={"landingGr"}
                    className="landing"
                >
                    {/* <img src={landingImg} alt="" /> */}
                    <div
                        onMouseMove={(e) => {
                            mouseMouve(e);
                        }}
                        onMouseLeave={(e) => {
                            mouselv(e);
                        }}
                        ref={cntBtn}
                        className="cnt-btn"
                    >
                        <button ref={btn} onClick={handClickDiscover}>
                            discover
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="35px"
                                width="35px"
                                viewBox="0 -960 960 960"
                            >
                                <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="slider">
                <ul>
                    <li
                        ref={(el) => (lis.current[0] = el)}
                        className=""
                        style={{ "--p": "1" }}
                    >
                        be{" "}
                    </li>
                    <li
                        ref={(el) => (lis.current[1] = el)}
                        className=""
                        style={{ "--p": "1" }}
                    >
                        {" "}
                        referent,{" "}
                    </li>
                    <li
                        ref={(el) => (lis.current[2] = el)}
                        className=""
                        style={{ "--p": "1" }}
                    >
                        set <i className="fa-solid fa-arrow-right"></i>{" "}
                    </li>
                    <li
                        ref={(el) => (lis.current[3] = el)}
                        className=""
                        style={{ "--p": "1" }}
                    >
                        the{" "}
                    </li>
                    <li
                        ref={(el) => (lis.current[4] = el)}
                        className=""
                        style={{ "--p": "1" }}
                    >
                        standard{" "}
                    </li>
                </ul>
            </div>
            <div className="info">
                <div className="container">
                    <h2>We Strive to Innovate</h2>
                    <div className="card">
                        <div className="left">
                            <p ref={pTextHero} className="hero"></p>
                            <span>why we are speacail </span>
                            <div className="cards">
                                <div
                                    ref={(el) => (boxs.current[0] = el)}
                                    className="box"
                                >
                                    <h3>+100</h3>
                                    <p>
                                        we haved scrapped and more for
                                        collecting data more it{" "}
                                    </p>
                                    <img src={Svg1} alt="" />
                                </div>
                                <div
                                    ref={(el) => (boxs.current[1] = el)}
                                    className="box"
                                >
                                    <h3>+8</h3>
                                    <p>
                                        a membre from defferent specialty for
                                        strong team project{" "}
                                    </p>
                                    <img src={Svg2} alt="" />
                                </div>
                                <div
                                    ref={(el) => (boxs.current[2] = el)}
                                    className="box"
                                >
                                    <h3>+4</h3>
                                    <p>
                                        {" "}
                                        year of experience that includ math and
                                        ai and informatic skills , all in insuFi
                                    </p>
                                    <img src={Svg3} alt="" />
                                </div>
                                <div
                                    ref={(el) => (boxs.current[3] = el)}
                                    className="box"
                                >
                                    <h3>+10</h3>
                                    <p>
                                        type of analysing data and defferent UI
                                        for you
                                    </p>
                                    <img src={Svg4} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div
                                onClick={(e) => {
                                    e.preventDefault();
                                    handTextOne();
                                }}
                                className="big"
                            >
                                <div
                                    onClick={() => {
                                        handTextTwo();
                                    }}
                                    className="mid"
                                >
                                    <span className="hero">Scrapping</span>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handTextThree();
                                        }}
                                        className="small"
                                    >
                                        <span className="hero">Strong API</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={liderD} className="data">
                <div className="container">
                    <div className="container-bg">
                        <div>
                            <p
                                ref={(el) => {
                                    pUp.current[0] = el;
                                }}
                            >
                                Numbers don t lie
                            </p>
                        </div>
                        <div>
                            {" "}
                            <p
                                ref={(el) => {
                                    pUp.current[1] = el;
                                }}
                            >
                                so we use Data <img src={img1} alt="" />
                            </p>{" "}
                        </div>
                        <div>
                            {" "}
                            <p
                                ref={(el) => {
                                    pUp.current[2] = el;
                                }}
                            >
                                <img src={img2} alt="" /> Science-Driven
                            </p>{" "}
                        </div>
                        <div>
                            <p
                                ref={(el) => {
                                    pUp.current[3] = el;
                                }}
                            >
                                Solutions for Strategic Financial Growth
                            </p>
                        </div>
                        <div className="sliderData">
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                            <div className="dataslidediv"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={footer} className="footer">
                <div className="container">
                    <div className="logo">
                        <div className="container-circle">
                            <div className="circle white"></div>
                            <div className="circle black"></div>
                        </div>
                        <p>InsuFi</p>
                    </div>
                    <div className="content">
                        <div className="left">
                            <h1>We would love to hear from you.</h1>
                            <p>
                                Feel free to reach our if you want to
                                collaborate with us, or simply have a chat
                            </p>
                            <button
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                            >
                                scroll to top
                            </button>
                            <div className="bottomfoter">
                                made with love by TEEAM D
                            </div>
                        </div>
                        <div className="right"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
