import React, { useEffect, useMemo, useState } from "react";
import API_RESPONSE_TYPE from "../api/structure";
import ArticleToShow from "../components/ArticleToShow";
import Dates from "../components/Dates";
import NavBar from "../components/NavBar";
import NewsSummaries from "../components/NewsSummaries";
import styles from "../styles/index.module.scss";

type HomePageType = {};

const HomePage: React.FC<HomePageType> = () => {
    const [articleToShow, setArticleToShow] = useState<
        API_RESPONSE_TYPE | undefined
    >(undefined);

    const [query, setQuery] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const memArticleToShow = useMemo(() => articleToShow, [articleToShow]);

    return (
        <div className={styles.container}>
            <span className={styles.navBar}>
                <NavBar setQuery={setQuery} />
            </span>
            <span className={styles.dates}>
                <Dates setDate={setDate} />
            </span>
            <span className={styles.newsSummaries}>
                <NewsSummaries
                    date={date}
                    setArticleToShow={setArticleToShow}
                    query={query}
                    setQuery={setQuery}
                />
            </span>
            <span className={styles.article}>
                <ArticleToShow article={memArticleToShow} />
            </span>
        </div>
    );
};

export default HomePage;
