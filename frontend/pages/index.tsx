import React, { useEffect, useState } from "react";
import API_RESPONSE_TYPE from "../api/structure";
import Link from "next/link";
import NewsItem from "../components/NewsItem";

type HomePageType = {};

const HomePage: React.FC<HomePageType> = () => {
    const [articles, setArticles] = useState<API_RESPONSE_TYPE[] | null>(null);
    // const [a, setA] = useState([]);

    useEffect(() => {
        const makeRequest = async () => {
            const baseUrl = "http://newsapi.org/v2/top-headlines?";
            const query = "country=us&";
            const apiKey = `apiKey=${process.env.API_KEY}`;
            const res = await fetch(baseUrl + query + apiKey);
            const json = await res.json();
            return json;
        };

        const extractArticles = ({ articles }) => {
            const keys = Object.keys(articles);
            // const apiResArticles: API_RESPONSE_TYPE[] = [];
            const apiResArticles = keys.map((jsonKey) => {
                const jsonObject = articles[jsonKey];
                // return Object.entries(jsonObject);
                // return (jsonObject as API_RESPONSE_TYPE).author;
                return jsonObject as API_RESPONSE_TYPE;
                // apiResArticles.push(jsonWithAPIType);
            });
            // console.log(...apiResArticles);

            setArticles(apiResArticles);
        };

        makeRequest().then((json) => extractArticles(json));
    }, []);

    return (
        <div>
            {articles
                ? articles.map((article) => {
                      // return <div key={article.url}>{article.source}</div>;
                      console.log(article);
                      return <NewsItem newsObj={article} />;
                  })
                : "there are no articles"}
        </div>
    );
};

export default HomePage;
