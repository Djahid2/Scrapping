import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Grid2, IconButton, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArticle, removeArticle } from "../store/localArticle/localarticles";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
export default function ArtileMoreData() {
    const dataNavigation = useLocation().state;
    const dispatch = useDispatch();
    const [isin, setisin] = useState(false);
    const data = {
        title: dataNavigation?.title,
        content: dataNavigation?.content,
        source: dataNavigation?.source,
    };
    const articles = useSelector((state) => state.localArticles.articles);
    function handleBookmarkClick() {
        setisin(!isin);
        if (!isin) {
            dispatch(addArticle(data));
        } else {
            dispatch(removeArticle(dataNavigation.title));
        }
    }
    useEffect(() => {
        const initState = () => {
            return articles.some((article) => article.title === data.title);
        };
        setisin(initState());
    }, [articles]);
    return (
        <div className="ArtileMoreData">
            <div className="container">
                <Typography variant="h3" sx={{ mb: 1 }} color="initial">
                    {dataNavigation?.title}
                </Typography>
                <hr />
                <Grid2 container spacing={1}>
                    <Grid2 size={10}>
                        <Typography
                            variant="body1"
                            sx={{ mb: 2, lineHeight: "1.8" }}
                        >
                            {dataNavigation?.content}
                        </Typography>
                    </Grid2>
                    <Grid2
                        size={2}
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                handleBookmarkClick();
                            }}
                            aria-label="settings"
                        >
                            {!isin ? (
                                <BookmarkBorderIcon />
                            ) : (
                                <BookmarkOutlinedIcon sx={{ color: "gold" }} />
                            )}
                        </IconButton>
                        <Box>
                            <a target="_blank" href={data?.source}>
                                Main Article
                            </a>
                        </Box>
                    </Grid2>
                </Grid2>
            </div>
        </div>
    );
}
