import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CardHeader,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { addArticle, removeArticle } from "../store/localArticle/localarticles";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
const ArticleCard = ({ title, content, source, id, showit = true }) => {
    const articles = useSelector((state) => state.localArticles.articles);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isin, setisin] = useState(false);
    const data = {
        title,
        content,
        source,
    };
    function handleclickCard() {
        navigate("/articleData", { state: data });
    }
    function handleBookmarkClick() {
        setisin(!isin);
        if (!isin) {
            dispatch(addArticle({ title, content, source }));
        } else {
            dispatch(removeArticle(title));
        }
    }
    function handlBookMarkClickLaize() {
        setisin(!isin);
        setTimeout(() => {
            if (isin) {
                dispatch(removeArticle(title));
            } else {
                dispatch(addArticle({ title, content, source }));
            }
        }, 700);
    }
    useEffect(() => {
        const initState = () => {
            return articles.some((article) => article.title === title);
        };
        setisin(initState());
    }, [articles]);
    return (
        <Card data-id={id} sx={{ mb: 2, borderRadius: 2 }}>
            <CardActionArea>
                {/* {showit ? ( */}
                <CardHeader
                    sx={{ m: 0, p: 0, pr: 2, mt: 2, mb: -2 }}
                    action={
                        <IconButton
                            onClick={() => {
                                showit
                                    ? handleBookmarkClick()
                                    : handlBookMarkClickLaize();
                            }}
                            aria-label="settings"
                        >
                            {!isin ? (
                                <BookmarkBorderIcon />
                            ) : (
                                <BookmarkOutlinedIcon sx={{ color: "gold" }} />
                            )}
                        </IconButton>
                    }
                />
                {/* ) : null} */}

                <CardContent onClick={() => handleclickCard()}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <hr />
                    <Typography
                        variant="subtitle1"
                        sx={{
                            mt: 1,
                            color: "text.secondary",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: "3",
                            WebkitBoxLineBreak: "anywhere",
                        }}
                    >
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ArticleCard;
