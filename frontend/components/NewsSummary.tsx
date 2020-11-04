import React, { useEffect, useState } from "react";
import { ARTICLE_RESPONSE_TYPE } from "../types/apiReponseTypes";
import classnames from "classnames";
import styles from "../styles/newsSummary.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { genericAnimationType } from "../types/genericAnimationType";

type NewsSummaryType = {
    article: ARTICLE_RESPONSE_TYPE;
    onClick: () => void;
    height: number;
    lastArticleOnPagination: boolean;
};

const animatePTagVariants: genericAnimationType = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            type: "tween",
        },
    },
};

const pTagVariants: genericAnimationType = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: "tween",
            duration: 0.5,
        },
    },
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

        const titleMaxCharacters = 30;
        return (
            <motion.div
                style={{ height: `${height}rem` }}
                onClick={onClick}
                className={classnames({
                    [styles.container]: true,
                    [styles.lastArticleOnPagination]: lastArticleOnPagination,
                })}
            >
                <div className={styles.leftBorder} />
                <motion.div
                    variants={animatePTagVariants}
                    animate="animate"
                    className={styles.text}
                >
                    <motion.p
                        variants={pTagVariants}
                        initial="initial"
                        animate="animate"
                        className={styles.name}
                    >
                        {name}
                    </motion.p>
                    <motion.p
                        variants={pTagVariants}
                        initial={"initial"}
                        animate={"animate"}
                        className={styles.title}
                    >
                        {title.slice(0, titleMaxCharacters)}
                        {`${title.length > titleMaxCharacters ? "..." : ""}`}
                    </motion.p>
                    <motion.p
                        variants={pTagVariants}
                        initial="initial"
                        animate="animate"
                        className={styles.author}
                    >
                        {author}
                    </motion.p>
                    <motion.p
                        variants={pTagVariants}
                        initial="initial"
                        animate="animate"
                        className={styles.date}
                    >
                        {date}
                    </motion.p>
                    <motion.p
                        variants={pTagVariants}
                        initial="initial"
                        animate="animate"
                        className={styles.readMore}
                    >
                        Read More &rarr;
                    </motion.p>
                </motion.div>
                <div className={styles.readMoreBtn}>
                    <FontAwesomeIcon
                        className={styles.faIcon}
                        icon={"caret-right"}
                    />
                </div>
            </motion.div>
        );
    }
);

export default NewsSummary;
