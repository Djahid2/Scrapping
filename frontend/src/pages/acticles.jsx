import ArticleCard from "../components/articleCompo";
import Contentarticle from "../components/contentArticle/contentarticle";

import "../scss/_articlesgoupe.scss";
import { useSelector } from "react-redux";
import Slider from "../components/slider/Slider";
import { SwiperSlide } from "swiper/react";
const Article = () => {
    const articles = useSelector((state) => state.articlesSlice.articles);

    const theMainCotent = articles?.map((ele, i) => (
        <ArticleCard
            key={i}
            content={ele?.content}
            id={i}
            source={ele?.source}
            title={ele?.title}
        />
    ));
    const sliderArticles = [...Array(5)].map((_, i) => (
        <SwiperSlide key={i}>
            <ArticleCard
                key={i}
                content={articles[i]?.content}
                id={i}
                source={articles[i]?.source}
                title={articles[i]?.title}
            />
        </SwiperSlide>
    ));
    return (
        <div className="articlesGroupe">
            <div className="container">
                <h2>
                    the best from more us
                    <i className="fa-solid fa-arrow-trend-up"></i>
                </h2>
                <div className="top">
                    <div className="left">
                        <p>
                            Welcome to our website! We&apos;re excited to have
                            you here. Take a moment to explore our latest
                            articles, where you&apos;ll find fresh content and
                            in-depth insights on a variety of topics. <br />{" "}
                            Stay updated and enjoy discovering something new!
                        </p>
                    </div>
                    <div className="right">
                        {<Slider>{sliderArticles}</Slider>}
                    </div>
                </div>

                <Contentarticle>{theMainCotent}</Contentarticle>
            </div>
        </div>
    );
};

export default Article;
