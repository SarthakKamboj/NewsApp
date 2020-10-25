import React, { useEffect, useMemo, useState } from "react";
import {
    ARTICLE_RESPONSE_TYPE,
    SOURCES_RESPONSE_TYPE,
} from "../api/reponseTypes";
import ArticleToShow from "../components/ArticleToShow";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import NewsSummaries from "../components/NewsSummaries";
import styles from "../styles/index.module.scss";

type HomePageType = {};

const HomePage: React.FC<HomePageType> = () => {
    const [articleToShow, setArticleToShow] = useState<
        ARTICLE_RESPONSE_TYPE | undefined
    >(undefined);

    const [sourcesInfo, setSourcesInfo] = useState<SOURCES_RESPONSE_TYPE[]>([]);

    const [query, setQuery] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const memArticleToShow = useMemo(() => articleToShow, [articleToShow]);

    useEffect(() => {
        const fetchSources = async () => {
            const res = await fetch(
                "https://newsapi.org/v2/sources?apiKey=ce65482a001b41db9ec949668cb300e5"
            );
            const json = await res.json();
            return json;
        };

        const extractSources = ({ sources }) => {
            const sourcesArr = sources.map(
                (source) => source as SOURCES_RESPONSE_TYPE
            );
            console.log(sourcesArr);
            setSourcesInfo(sourcesArr);
        };

        fetchSources().then((json) => extractSources(json));
    }, []);

    return (
        <div className={styles.container}>
            <span className={styles.navBar}>
                <NavBar setQuery={setQuery} />
            </span>
            <span className={styles.logo}>
                <Logo />
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
                <ArticleToShow
                    sourcesInfo={sourcesInfo}
                    article={memArticleToShow}
                />
            </span>
        </div>
    );
};

export default HomePage;
