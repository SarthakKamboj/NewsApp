import React, { useEffect, useState } from "react";
import API_RESPONSE_TYPE from "../api/structure";
import classnames from "classnames";
import styles from "../styles/newsSummary.module.scss";

type NewsSummaryType = {
    article: API_RESPONSE_TYPE;
    index: number;
    onClick: () => void;
};

const NewsSummary: React.FC<NewsSummaryType> = ({
    article,
    index,
    onClick,
}) => {
    const [date, setDate] = useState<string>();

    const {
        author,
        content,
        description,
        publishedAt,
        title,
        url,
        urlToImage,
        source: { name, id },
    } = article;

    useEffect(() => {
        setDate(publishedAt.split("T")[0]);
    }, []);

    return (
        <div
            onClick={onClick}
            className={classnames({
                [styles.container]: true,
                [styles.lighterBackground]: index < 2,
            })}
        >
            <p className={styles.name}>{name}</p>
            <p className={styles.title}>{title}</p>
            <p className={styles.author}>{author}</p>
            <p className={styles.date}>{date}</p>
            <p className={styles.readMore}>Read More &rarr;</p>
        </div>
    );
};

export default NewsSummary;
