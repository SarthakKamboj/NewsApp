import React, { useEffect, useState } from "react";
import API_RESPONSE_TYPE from "../api/structure";
import styles from "../styles/articleToShow.module.scss";
import Link from "next/link";

type ArticleToShowType = {
    article?: API_RESPONSE_TYPE;
};

const ArticleToShow: React.FC<ArticleToShowType> = React.memo(({ article }) => {
    const [body, setBody] = useState<JSX.Element>();
    const [date, setDate] = useState<string | null>(null);
    useEffect(() => {
        const createArticleBody = (article: API_RESPONSE_TYPE) => {
            const {
                author,
                content,
                description,
                publishedAt,
                source: { name, id },
                title,
                url,
                urlToImage,
            } = article;
            setDate(publishedAt.split("T")[0]);
            return (
                <div className={styles.container}>
                    <img
                        className={styles.thumbnail}
                        src={urlToImage}
                        alt="Thumbnail"
                    />
                    <p className={styles.name}>{name}</p>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.author}>
                        <span className={styles.preText}>AUTHOR </span>
                        {author}
                    </p>
                    <p className={styles.date}>
                        <span className={styles.preText}>DATE </span>
                        {date}
                    </p>
                    {/* <p className={styles.content}>{content}</p> */}
                    <p className={styles.description}>
                        <span className={styles.preText}>DESCRIPTION </span>
                        {description}
                    </p>
                    <Link href={url}>
                        <a className={styles.link} target="_blank">
                            Read Article &rarr;
                        </a>
                    </Link>
                </div>
            );
        };

        if (article) {
            setBody(createArticleBody(article));
        } else {
            const body = (
                <React.Fragment>Article needs to be selected</React.Fragment>
            );
            setBody(body);
        }
    }, [article]);

    return <section className={styles.container}>{body}</section>;
});

export default ArticleToShow;
