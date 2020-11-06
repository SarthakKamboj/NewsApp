import React from "react";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { ARTICLE_RESPONSE_TYPE } from "../types/apiReponseTypes";
import styles from "../styles/newsSummaries.module.scss";
import NewsSummary from "./NewsSummary";
import Pagination from "./Pagination";

type NewsSummariesType = {
    setArticleToShow: React.Dispatch<
        React.SetStateAction<ARTICLE_RESPONSE_TYPE>
    >;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
};

type topicsType = "sports" | "entertainment" | "technology";

const NewsSummaries: React.FC<NewsSummariesType> = React.memo(
    ({ setArticleToShow, query }) => {
        const [articles, setArticles] = useState<
            ARTICLE_RESPONSE_TYPE[] | null
        >([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [allArticles, setAllArticles] = useState<
            ARTICLE_RESPONSE_TYPE[] | null
        >([]);

        const newsSummaryHeight = 13.25;
        const minArticlesToShow = 3;
        const [paginationGroup, setPaginationGroup] = useState<number>(0);
        const [groupsOfArticles, setGroupsOfArticles] = useState<number>(0);
        const [topic, setTopic] = useState<topicsType>("sports");

        const convertDateToString = (d: Date) => {
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        };

        useEffect(() => {
            const requestAndUpdate = async () => {
                const makeRequest = async (): Promise<any> => {
                    let baseUrl;
                    let queryUrl;
                    let dateString;
                    const queryParams = query !== "" ? `&q=${query}` : "";

                    dateString = convertDateToString(new Date());

                    baseUrl = "https://newsapi.org/v2/top-headlines?";
                    queryUrl = `category=${topic}&country=us${queryParams}&from=${dateString}&to=${dateString}&`;
                    const apiKey = `apiKey=${process.env.NEXT_PUBLIC_BUSINESS_API_KEY}`;

                    const requestUrl = baseUrl + queryUrl + apiKey;
                    const res = await fetch(requestUrl);
                    return await res.json();
                };
                const extractArticles = ({ articles }) => {
                    const apiResArticles: ARTICLE_RESPONSE_TYPE[] = articles.map(
                        (article) => {
                            return article as ARTICLE_RESPONSE_TYPE;
                        }
                    );
                    setGroupsOfArticles(
                        Math.ceil(apiResArticles.length / minArticlesToShow)
                    );
                    return apiResArticles;
                };

                const json = await makeRequest();
                const articlesToRender = extractArticles(json);
                setAllArticles(articlesToRender);
                setPaginationGroup(0);
                setLoading(false);
            };
            setLoading(true);
            setAllArticles([]);
            requestAndUpdate();
        }, [topic, query]);

        useEffect(() => {
            const paginateAllArticles = async () => {
                if (allArticles) {
                    setArticles(
                        allArticles.slice(
                            paginationGroup * minArticlesToShow,
                            (paginationGroup + 1) * minArticlesToShow
                        )
                    );
                }
            };
            paginateAllArticles();
        }, [paginationGroup, allArticles]);

        const changeTopic = (t: topicsType) => {
            setTopic(t);
        };

        return (
            <div className={styles.container}>
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
                    <div className={classnames({ [styles.loader]: loading })} />
                    {articles.length !== 0
                        ? articles.map((article, index) => {
                              return (
                                  <NewsSummary
                                      lastArticleOnPagination={false}
                                      height={newsSummaryHeight}
                                      onClick={() => {
                                          setArticleToShow(article);
                                      }}
                                      key={index}
                                      article={article}
                                  />
                              );
                          })
                        : !loading && (
                              <h4 className={styles.noArticles}>
                                  No Articles Found
                              </h4>
                          )}
                </div>
                <div className={styles.paginationSection}>
                    <Pagination
                        setPaginationGroup={setPaginationGroup}
                        paginationNumber={paginationGroup}
                        groups={groupsOfArticles}
                    />
                </div>
            </div>
        );
    }
);

export default NewsSummaries;
