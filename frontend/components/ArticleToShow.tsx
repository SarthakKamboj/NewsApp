import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ARTICLE_RESPONSE_TYPE,
    SOURCES_RESPONSE_TYPE,
} from "../api/reponseTypes";
import styles from "../styles/articleToShow.module.scss";
import Link from "next/link";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import classnames from "classnames";

type ArticleToShowType = {
    article?: ARTICLE_RESPONSE_TYPE;
    sourcesInfo?: SOURCES_RESPONSE_TYPE[];
};

const containerVariants = {
    initial: {
        x: "100%",
    },
    animate: {
        x: "0",
    },
};

const titleVariants = {
    initial: {
        y: "20vh",
    },
    animate: {
        y: 0,
    },
    exit: {
        y: "20vh",
    },
};

const ArticleToShow: React.FC<ArticleToShowType> = React.memo(
    ({ article, sourcesInfo }) => {
        const [body, setBody] = useState<JSX.Element>();

        useEffect(() => {
            // setInvisible(true);
            const createArticleBody = (
                article: ARTICLE_RESPONSE_TYPE
            ): JSX.Element => {
                const {
                    author,
                    description,
                    publishedAt,
                    source: { name },
                    title,
                    content,
                    url,
                    urlToImage,
                } = article;
                const titleMaxCharacters = 30;

                const titleArr = title.split("");
                const checkIfValidImgPic = (img) => {
                    return img !== null && img !== "";
                };

                return (
                    <>
                        <motion.div
                            className={classnames({
                                [styles.container]: true,
                            })}
                        >
                            <div className={styles.thumbnail}>
                                <img
                                    src={
                                        checkIfValidImgPic(urlToImage)
                                            ? urlToImage
                                            : "defaultArticleImg.jpg"
                                    }
                                    alt="Thumbnail"
                                />
                            </div>
                            <div className={styles.content}>
                                <p className={styles.name}>{name}</p>
                                <h1 className={styles.waterMarkName}>{name}</h1>
                                <AnimatePresence>
                                    <motion.p
                                        variants={titleVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        onLoad={(e) => alert("dummy render")}
                                        layout
                                        className={styles.title}
                                    >
                                        {`${titleArr
                                            .slice(0, titleMaxCharacters)
                                            .join("")}${
                                            titleArr.length > titleMaxCharacters
                                                ? "..."
                                                : ""
                                        }`}
                                    </motion.p>
                                </AnimatePresence>
                                <p className={styles.author}>{author}</p>
                                <p className={styles.date}>
                                    {publishedAt.split("T")[0]}
                                </p>
                                <p className={styles.description}>
                                    {description !== null &&
                                    description !== "" ? (
                                        <> {description} </>
                                    ) : content !== null && content !== "" ? (
                                        <>{content}</>
                                    ) : (
                                        <>
                                            {
                                                sourcesInfo?.find((s) => {
                                                    return s.name === name;
                                                }).description
                                            }
                                        </>
                                    )}
                                </p>
                                <div className={styles.link}>
                                    <Link href={url}>
                                        <a target="_blank">
                                            <span>Read Article</span>
                                            <FontAwesomeIcon icon="external-link-alt" />
                                            {/* &rarr; */}
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
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
    }
);

export default ArticleToShow;
