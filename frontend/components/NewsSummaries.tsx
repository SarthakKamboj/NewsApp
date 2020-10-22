import { useEffect, useState } from "react";
import API_RESPONSE_TYPE from "../api/structure";
import styles from "../styles/newsSummaries.module.scss";
import NewsSummary from "./NewsSummary";

type NewsSummariesType = {
    setArticleToShow: React.Dispatch<React.SetStateAction<API_RESPONSE_TYPE>>;
};

const NewsSummaries: React.FC<NewsSummariesType> = ({ setArticleToShow }) => {
    const [articles, setArticles] = useState<API_RESPONSE_TYPE[] | null>(null);

    useEffect(() => {
        const makeRequest = async () => {
            const baseUrl = "http://newsapi.org/v2/top-headlines?";
            const query = "country=us&";
            const apiKey = `apiKey=${process.env.API_KEY}`;
            const res = await fetch(baseUrl + query + apiKey);
            return await res.json();
        };

        const extractArticles = ({ articles }) => {
            const keys = Object.keys(articles);
            const apiResArticles = keys.map((jsonKey) => {
                return articles[jsonKey] as API_RESPONSE_TYPE;
            });

            setArticles(apiResArticles);
        };

        makeRequest().then((json) => extractArticles(json));
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recent News</h1>
            {articles
                ? articles.map((article, index) => {
                      return (
                          <NewsSummary
                              onClick={() => {
                                  setArticleToShow(article);
                              }}
                              key={index}
                              index={index}
                              article={article}
                          />
                      );
                  })
                : "no articles"}
        </div>
    );
};

export default NewsSummaries;
