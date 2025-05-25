import { useEffect, useState } from "react";
import blog from "../blog";
import Article from "../components/article";

const Home = () => {
    const [articles, setArticles] = useState([]);

    const getArticle = () => {
        blog.get("/blog/articles/")
            .then((res) => res.data)
            .then((data) => {
                console.log("Fetched articles:", data);
                setArticles(data);
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getArticle();
    }, []);

    return (
        <div className="home">
            <h1>Articles</h1>
            <div className="articles-container">
                {articles.map((article, index) => (
                    <Article
                        key={index}
                        title={article.title}
                        content={article.content}
                        source={article.source}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
