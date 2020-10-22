import React, { useEffect, useMemo, useState } from "react";
import API_RESPONSE_TYPE from "../api/structure";
import ArticleToShow from "../components/ArticleToShow";
import Dates from "../components/Dates";
import NavBar from "../components/NavBar";
import NewsSummaries from "../components/NewsSummaries";
import styles from "../styles/index.module.scss";

type HomePageType = {};

const HomePage: React.FC<HomePageType> = () => {
    const tempArticle: API_RESPONSE_TYPE = {
        author: "sarthak",
        content: "content",
        description: "description",
        publishedAt: "2020-05-07",
        source: {
            name: "name",
            id: "id",
        },
        title: "title",
        url: "https://www.google.com",
        urlToImage:
            "https://miro.medium.com/max/1042/1*9mESIE8IL4eEFZ6FIO4smA.png",
    };
    const [articleToShow, setArticleToShow] = useState<
        API_RESPONSE_TYPE | undefined
    >(tempArticle);

    const memArticleToShow = useMemo(() => articleToShow, [articleToShow]);

    return (
        <div className={styles.container}>
            <span className={styles.navBar}>
                <NavBar />
            </span>
            <span className={styles.dates}>
                <Dates />
            </span>
            <span className={styles.newsSummaries}>
                <NewsSummaries setArticleToShow={setArticleToShow} />
            </span>
            <span className={styles.article}>
                <ArticleToShow article={memArticleToShow} />
            </span>
        </div>
    );
};

export default HomePage;
