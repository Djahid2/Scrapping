import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../scss/_disc.scss";
import blog from "../blog";
import { useDispatch, useSelector } from "react-redux";
import {
    startFetching,
    addArticles,
} from "../store/fetchedArticles/fetchedArticles";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material/";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

export default function Discover() {
    // ################################################################
    // ################################################################
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const articles = useSelector((state) => state.articlesSlice.articles);

    // const [similiarArticles, setSimiliarArticles] = useState([]);
    const [resultOfSearch, setresultOfSearch] = useState([]);

    // #################################################################
    // #################################################################
    const getArticles = (query) => {
        dispatch(startFetching());
        blog.get(`/blog/similarities/?query=${query}`)
            .then((res) => res.data)
            .then((data) => {
                console.log("Fetched articles:", data);
                // setSimiliarArticles(data);
                dispatch(addArticles(data));
            })
            .catch((err) => alert(err));
    };
    const theform = useRef();
    useEffect(() => {
        gsap.fromTo(
            ".marquee__part",
            {
                duration: 5,
                xPercent: 0,
                repeat: -1,

                ease: "linear",
            },
            {
                repeat: -1,
                xPercent: -100,

                duration: 5,
                attr: { offset: "100%" },
                ease: "linear",
            }
        );
    }, []);
    function Handremove() {
        theform.current.value = "";
        setresultOfSearch([]);
    }

    function handSearch() {
        const query = theform.current.value;
        console.log(query);
        getArticles(query);
        navigate("/searching");
    }
    function handlChange(e) {
        if (e.target.value !== "") {
            const result = articles.filter((ele) => {
                if (ele?.title.includes(e.target.value)) {
                    return ele;
                }
            });
            setresultOfSearch(result);
        } else {
            setresultOfSearch([]);
        }
    }
    return (
        <div className="discover">
            <div className="marquee marquee1">
                <div className="marquee__inner">
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                    <div className="marquee__part">
                        get your data with insufi
                    </div>
                </div>
            </div>
            <div className="marquee marquee2">
                <div className="marquee__inner">
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                    <div className="marquee__part">be specail with as</div>
                </div>
            </div>
            <div className="marquee marquee4">
                <div className="marquee__inner">
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                    <div className="marquee__part">THE 365 DATA</div>
                </div>
            </div>
            <div className="marquee marquee3">
                <div className="marquee__inner">
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                    <div className="marquee__part">
                        if you are with us , you can
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="top">
                    <div className="search">
                        <h1>
                            {" "}
                            <span>&#123;</span> get your data{" "}
                            <span>&#125;</span>{" "}
                        </h1>
                        <form action="">
                            <div className="searchAction">
                                <input
                                    onChange={(e) => {
                                        handlChange(e);
                                    }}
                                    ref={theform}
                                    type="text"
                                    placeholder="enter what you want to know"
                                />

                                <IconButton
                                    onClick={() => {
                                        Handremove();
                                    }}
                                >
                                    <ClearOutlinedIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        handSearch();
                                    }}
                                >
                                    <SearchOutlined />
                                </IconButton>
                            </div>
                            {!(resultOfSearch.length === 0) ? (
                                <div className="result">
                                    <List>
                                        {resultOfSearch.map((ele, index) => (
                                            <ListItem
                                                key={index}
                                                sx={{ m: 0 }}
                                                disablePadding
                                                onClick={() => {
                                                    const data = ele;
                                                    navigate("/articleData", {
                                                        state: data,
                                                    });
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{ borderRadius: 2 }}
                                                >
                                                    <ListItemIcon>
                                                        <SearchOutlined />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        sx={{
                                                            overflow: "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                        }}
                                                    >
                                                        {ele?.title}
                                                    </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            ) : null}
                        </form>
                    </div>
                    <div className="topbottom">
                        <p>
                            copyright 2024 all rights <br /> reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
