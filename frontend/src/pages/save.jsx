import { useSelector } from "react-redux";
import ArticleCard from "../components/articleCompo";
import Contentarticle from "../components/contentArticle/contentarticle";
import Lottie from "lottie-react";
import { Typography } from "@mui/material";
import emty from "../assets/Lotties/Animation - 1736446933117.json";

export default function Collection() {
    const articles = useSelector((state) => state.localArticles.articles);
    const theMainCotent = articles?.map((ele, i) => (
        <ArticleCard
            key={i}
            content={ele?.content}
            id={i}
            source={ele?.source}
            title={ele?.title}
            showit={false}
        />
    ));

    return (
        <div className="collection">
            <div className="container">
                {articles.length === 0 ? (
                    <div className="collectionAnimation">
                        <h2>your collection is emty</h2>
                        <Lottie animationData={emty} />
                    </div>
                ) : (
                    <div>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 4,
                                textTransform: "capitalize",
                                textAlign: "left",
                            }}
                        >
                            you have {articles.length} in your collection
                        </Typography>
                        <Contentarticle>{theMainCotent}</Contentarticle>
                    </div>
                )}
            </div>
        </div>
    );
}
