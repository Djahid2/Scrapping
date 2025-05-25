import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import waiting from "../assets/Lotties/Animation - 1735623207749.json";
import ArticleCard from "../components/articleCompo";
import Contentarticle from "../components/contentArticle/contentarticle";
export default function Fetchedarticles() {
    const { articles, loading } = useSelector((state) => state.fetchedArticles);
    return (
        <div className="fitchedarticles">
            <div className="container">
                {!loading ? (
                    <Contentarticle>
                        {articles?.map((ele, i) => (
                            <ArticleCard
                                key={i}
                                content={ele?.content}
                                id={i}
                                source={ele?.source}
                                title={ele?.title}
                            />
                        ))}
                    </Contentarticle>
                ) : (
                    <div className="loadingLottieAnimation">
                        <Lottie animationData={waiting} />
                    </div>
                )}
            </div>
        </div>
    );
}
