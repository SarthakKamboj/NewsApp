import React, { useEffect, useState } from "react";
import { ARTICLE_RESPONSE_TYPE } from "../api/reponseTypes";
import classnames from "classnames";
import styles from "../styles/newsSummary.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NewsSummaryType = {
    article: ARTICLE_RESPONSE_TYPE;
    onClick: () => void;
    height: number;
    lastArticleOnPagination: boolean;
};

const NewsSummary: React.FC<NewsSummaryType> = React.memo(
    ({
        height,
        lastArticleOnPagination: lastArticleOnPagination,
        article: {
            author,
            title,
            publishedAt,
            source: { name },
        },
        onClick,
    }) => {
        const [date, setDate] = useState<string>();
        useEffect(() => {
            setDate(publishedAt.split("T")[0]);
        }, []);

        const titleMaxCharacters = 100;
        return (
            <>
                <div
                    style={{ height: `${height}rem` }}
                    onClick={onClick}
                    className={classnames({
                        [styles.container]: true,
                        [styles.lastArticleOnPagination]: lastArticleOnPagination,
                    })}
                >
                    <div className={styles.text}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.title}>
                            {title.slice(0, titleMaxCharacters)}
                            {`${
                                title.length > titleMaxCharacters ? "..." : ""
                            }`}
                        </p>
                        <p className={styles.author}>{author}</p>
                        <p className={styles.date}>{date}</p>
                        <p className={styles.readMore}>Read More &rarr;</p>
                    </div>
                    <div className={styles.readMoreBtn}>
                        <FontAwesomeIcon
                            className={styles.faIcon}
                            icon={"caret-right"}
                        />
                    </div>
                </div>
            </>
        );
    }
);

export default NewsSummary;
