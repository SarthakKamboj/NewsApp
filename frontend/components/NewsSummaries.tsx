import React, { useMemo } from "react";
import classnames from "classnames";
import { useEffect, useState } from "react";
import API_RESPONSE_TYPE from "../api/structure";
import styles from "../styles/newsSummaries.module.scss";
import NewsSummary from "./NewsSummary";

type NewsSummariesType = {
    setArticleToShow: React.Dispatch<React.SetStateAction<API_RESPONSE_TYPE>>;
    date?: Date | undefined;
};

type topicsType = "sports" | "entertainment" | "all" | "technology";

const NewsSummaries: React.FC<NewsSummariesType> = React.memo(
    ({ setArticleToShow, date }) => {
        const [articles, setArticles] = useState<API_RESPONSE_TYPE[] | null>(
            []
        );
        // const [allArticles, setAllArticles] = useState<
        //     API_RESPONSE_TYPE[] | null
        // >(null);
        // const [entertainmentArticles, setEntertainmentArticles] = useState<
        //     API_RESPONSE_TYPE[] | null
        // >(null);
        // const [techArticles, setTechArticles] = useState<
        //     API_RESPONSE_TYPE[] | null
        // >(null);
        // const [sportsArticles, setSportsArticles] = useState<
        //     API_RESPONSE_TYPE[] | null
        // >(null);
        const [topic, setTopic] = useState<topicsType>("all");

        // const mapTopicStrToVar = () => {
        //     switch (topic) {
        //         case "entertainment":
        //             return entertainmentArticles;
        //         case "sports":
        //             return sportsArticles;
        //         case "technology":
        //             return techArticles;
        //         case "all":
        //             return allArticles;
        //     }
        // };

        const convertDateToString = (d: Date) => {
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        };

        useEffect(() => {
            const requestAndUpdate = async () => {
                const makeRequest = async () => {
                    let baseUrl;
                    let query;

                    let dateString;
                    if (!date) {
                        dateString = convertDateToString(new Date());
                    } else {
                        dateString = convertDateToString(date);
                    }
                    if (topic === "all") {
                        baseUrl = "http://newsapi.org/v2/top-headlines?";
                        query = `country=us&from=${dateString}&to=${dateString}&`;
                    } else {
                        baseUrl = "http://newsapi.org/v2/everything?";
                        query = `q=${topic}&from=${dateString}&to=${dateString}&`;
                    }
                    const apiKey = `apiKey=${process.env.API_KEY}`;
                    const requestUrl = baseUrl + query + apiKey;
                    alert(requestUrl);
                    const res = await fetch(requestUrl);
                    return await res.json();
                };

                // const updateTopicArticles = (
                //     apiResArticles: API_RESPONSE_TYPE[]
                // ) => {
                //     switch (topic) {
                //         case "entertainment":
                //             setEntertainmentArticles(apiResArticles);
                //             break;
                //         case "sports":
                //             setSportsArticles(apiResArticles);
                //             break;
                //         case "technology":
                //             setTechArticles(apiResArticles);
                //             break;
                //         case "all":
                //             setAllArticles(apiResArticles);
                //             break;
                //     }
                // };
                const extractArticles = ({ articles }) => {
                    const apiResArticles: API_RESPONSE_TYPE[] = articles.map(
                        (article) => {
                            return article as API_RESPONSE_TYPE;
                        }
                    );

                    // updateTopicArticles(apiResArticles);
                    return apiResArticles;
                };

                let articlesToRender;
                // if (mapTopicStrToVar() === null) {
                const json = await makeRequest();
                articlesToRender = extractArticles(json);
                // } else {
                //     articlesToRender = mapTopicStrToVar();
                // }

                setArticles(articlesToRender);
            };
            // requestAndUpdate();
        }, [date, topic]);

        const changeTopic = (t: topicsType) => {
            if (topic === t) {
                setTopic("all");
            } else {
                setTopic(t);
            }
        };

        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Recent News</h1>
                <ul className={styles.topics}>
                    <li
                        onClick={() => changeTopic("sports")}
                        className={classnames({
                            [styles.active]: topic === "sports",
                        })}
                    >
                        Sports
                    </li>
                    <li
                        onClick={() => changeTopic("technology")}
                        className={classnames({
                            [styles.active]: topic === "technology",
                        })}
                    >
                        Technology
                    </li>
                    <li
                        onClick={() => changeTopic("entertainment")}
                        className={classnames({
                            [styles.active]: topic === "entertainment",
                        })}
                    >
                        Entertainment
                    </li>
                </ul>
                <div className={styles.articles}>
                    {articles !== []
                        ? articles.map((article) => {
                              console.log(article.publishedAt);
                              return (
                                  <NewsSummary
                                      onClick={() => {
                                          setArticleToShow(article);
                                      }}
                                      //   key={index}
                                      key={article.url}
                                      //   index={index}
                                      article={article}
                                  />
                              );
                          })
                        : "no articles"}
                </div>
            </div>
        );
    }
);

export default NewsSummaries;
