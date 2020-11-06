import React, { useEffect, useMemo, useState } from "react";
import {
    ARTICLE_RESPONSE_TYPE,
    SOURCES_RESPONSE_TYPE,
} from "../types/apiReponseTypes";
import ArticleToShow from "../components/ArticleToShow";
import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import NewsSummaries from "../components/NewsSummaries";
import styles from "../styles/index.module.scss";
import Head from "next/head";

type HomePageType = {};

const HomePage: React.FC<HomePageType> = () => {
    const [articleToShow, setArticleToShow] = useState<
        ARTICLE_RESPONSE_TYPE | undefined
    >(undefined);

    const [sourcesInfo, setSourcesInfo] = useState<SOURCES_RESPONSE_TYPE[]>([]);

    // This is a function that sets triggers a new GET request
    // whenever a term has been searched
    const [query, setQuery] = useState<string>("");

    // This is to prevent unnecessary re-renders
    const memArticleToShow = useMemo(() => articleToShow, [articleToShow]);

    useEffect(() => {
        const fetchSources = async () => {
            const res = await fetch(
                `https://newsapi.org/v2/sources?apiKey=${process.env.NEXT_PUBLIC_BUSINESS_API_KEY}`
            );
            const json = await res.json();
            return json;
        };

        const extractSources = ({ sources }) => {
            const sourcesArr = sources.map(
                (source) => source as SOURCES_RESPONSE_TYPE
            );
            setSourcesInfo(sourcesArr);
        };

        fetchSources().then((json) => extractSources(json));
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="favicon.ico" />
            </Head>
            <span className={styles.navBar}>
                <NavBar setQuery={setQuery} />
            </span>
            <span className={styles.logo}>
                <Logo />
            </span>
            <span className={styles.newsSummaries}>
                <NewsSummaries
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
