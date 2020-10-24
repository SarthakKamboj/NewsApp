import React, { useEffect, useState } from "react";
import API_RESPONSE_TYPE from "../api/structure";
import styles from "../styles/articleToShow.module.scss";
import Link from "next/link";

type ArticleToShowType = {
    article?: API_RESPONSE_TYPE;
};

const ArticleToShow: React.FC<ArticleToShowType> = React.memo(({ article }) => {
    const [body, setBody] = useState<JSX.Element>();
    useEffect(() => {
        const createArticleBody = (article: API_RESPONSE_TYPE) => {
            const {
                author,
                description,
                publishedAt,
                source: { name },
                title,
                url,
                urlToImage,
            } = article;
            return (
                <div className={styles.container}>
                    <div className={styles.thumbnail}>
                        <img src={urlToImage} alt="Thumbnail" />
                    </div>
                    <div className={styles.content}>
                        <p className={styles.name}>{name}</p>

                        <p className={styles.title}>{title}</p>
                        <p className={styles.author}>
                            <span className={styles.preText}>AUTHOR </span>
                            {author}
                        </p>
                        <p className={styles.date}>
                            <span className={styles.preText}>DATE </span>
                            {publishedAt.split("T")[0]}
                        </p>
                        <p className={styles.description}>
                            {description || description !== "" ? (
                                <>
                                    <span className={styles.preText}>
                                        DESCRIPTION{" "}
                                    </span>
                                    {description}
                                </>
                            ) : (
                                ""
                            )}
                        </p>
                        <Link href={url}>
                            <a className={styles.link} target="_blank">
                                Read Article &rarr;
                            </a>
                        </Link>
                    </div>
                </div>
            );
        };

        if (article) {
            setBody(createArticleBody(article));
        } else {
            const body = (
                <div className={styles.noArticleSelected}>
                    Please Select An Article
                </div>
            );
            setBody(body);
        }
    }, [article]);

    return <>{body}</>;
});

export default ArticleToShow;
