import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ARTICLE_RESPONSE_TYPE,
    SOURCES_RESPONSE_TYPE,
} from "../types/apiReponseTypes";
import styles from "../styles/articleToShow.module.scss";
import Link from "next/link";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import classnames from "classnames";
import { genericAnimationType } from "../types/genericAnimationType";
import AnimatedComponent from "./AnimatedComponent";

type ArticleToShowType = {
    article?: ARTICLE_RESPONSE_TYPE;
    sourcesInfo?: SOURCES_RESPONSE_TYPE[];
};

const animationTime = 1;

const titleYChange = 500;
const titleVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        y: titleYChange,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animationTime,
        },
    },
    exit: {
        opacity: 0,
        y: titleYChange,
        transition: {
            duration: animationTime,
        },
    },
};

const waterMarkVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        scale: 2,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: animationTime,
        },
    },
    exit: {
        opacity: 0,
        // x: -100,
        scale: 2,
        transition: {
            duration: animationTime,
        },
    },
};

const authorChangeX = -120;
const authorVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        x: authorChangeX,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: animationTime,
        },
    },
    exit: {
        opacity: 0,
        x: authorChangeX,
        transition: {
            duration: animationTime,
        },
    },
};

const nameChangeY = -120;
const baseNameVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        y: nameChangeY,
        transition: {
            duration: animationTime,
        },
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
    exit: {
        opacity: 0,
        y: nameChangeY,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
};

const maxDescriptionCharacters = 140;
const descriptionYChange = -200;
const descriptionVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        y: descriptionYChange,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
    exit: {
        opacity: 0,
        y: descriptionYChange,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
};

const thumbnailChangeX = 1300;
const thumbnailVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        x: thumbnailChangeX,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: animationTime,
        },
    },
    exit: {
        x: thumbnailChangeX,
        transition: {
            duration: animationTime,
        },
    },
};

const linkVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
};

const dateChangeX = -120;
const dateVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        x: dateChangeX,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: animationTime,
            // type: "tween",
        },
    },
    exit: {
        opacity: 0,
        x: dateChangeX,
        transition: {
            duration: animationTime,
            // type: "tween",
        },
    },
};

const baseWaterMarkStyles: { readonly [key: string]: boolean } = {
    [styles.waterMarkName]: true,
};

const baseNameStyle: { readonly [key: string]: boolean } = {
    [styles.name]: true,
};

const baseAuthorStyle: { readonly [key: string]: boolean } = {
    [styles.author]: true,
};

const baseDescriptionStyle: { readonly [key: string]: boolean } = {
    [styles.description]: true,
};

const baseThumbnailStyle: { readonly [key: string]: boolean } = {
    [styles.thumbnail]: true,
};

const baseLinkStyle: { readonly [key: string]: boolean } = {
    [styles.link]: true,
};

const baseDateStyle: { readonly [key: string]: boolean } = {
    [styles.date]: true,
};

const baseTitleStyle: { readonly [key: string]: boolean } = {
    [styles.title]: true,
};

const isValid = (s: string) => s !== undefined && s !== null;

const ArticleToShow: React.FC<ArticleToShowType> = React.memo(
    ({ article, sourcesInfo, children }) => {
        if (article === null || article === undefined) {
            return (
                <div className={styles.noArticleSelected}>
                    Please Select an Article
                </div>
            );
        }
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

        const sourceInfo = sourcesInfo?.find((s) => {
            return s.name === name;
        });

        const [displayTitle, setDisplayTitle] = useState(true);
        const [titleArrToDisplay, setTitleArrToDisplay] = useState<string[]>(
            title.split("")
        );

        const [displayWaterMark, setDisplayWaterMark] = useState(true);
        const [waterMarkName, setWaterMarKName] = useState<string>(name);

        useEffect(() => {
            setDisplayTitle(false);
            setDisplayWaterMark(false);

            setTimeout(() => {
                setTitleArrToDisplay(article.title.split(""));
                setDisplayTitle(true);

                setWaterMarKName(article.source.name);
                setDisplayWaterMark(true);
            }, animationTime * 1000);
        }, [article]);

        const titleMaxCharacters = 30;

        const checkIfValidImgPic = (img): boolean => {
            return img !== null && img !== "";
        };
        return (
            <AnimateSharedLayout>
                <motion.div
                    // variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    className={classnames({
                        [styles.container]: true,
                    })}
                >
                    <AnimatedComponent
                        baseClassNames={baseThumbnailStyle}
                        variant={thumbnailVariant}
                        animationTime={animationTime}
                        content={
                            <img
                                src={
                                    checkIfValidImgPic(urlToImage)
                                        ? urlToImage
                                        : "defaultArticleImg.jpg"
                                }
                                alt="Thumbnail"
                            />
                        }
                    />
                    {/* <div className={styles.thumbnail}>
                        <img
                            src={
                                checkIfValidImgPic(urlToImage)
                                    ? urlToImage
                                    : "defaultArticleImg.jpg"
                            }
                            alt="Thumbnail"
                        />
                    </div> */}
                    <div className={styles.content}>
                        {/* <p className={styles.name}>{name}</p> */}
                        <AnimatedComponent
                            variant={baseNameVariant}
                            animationTime={animationTime}
                            baseClassNames={baseNameStyle}
                            content={name}
                        />

                        <AnimatedComponent
                            variant={waterMarkVariant}
                            animationTime={animationTime}
                            content={name}
                            baseClassNames={baseWaterMarkStyles}
                        />
                        {/* <div
                            className={classnames({
                                [styles.waterMarkName]: true,
                                [styles.animationContainer]: true,
                            })}
                        >
                            <AnimatePresence>
                                {displayWaterMark && (
                                    <motion.h1
                                        variants={waterMarkVariant}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        layout
                                        className={styles.p}
                                    >
                                        {waterMarkName}
                                    </motion.h1>
                                )}
                            </AnimatePresence>
                        </div> */}
                        {/* <div
                            className={classnames({
                                [styles.title]: true,
                                [styles.animationContainer]: true,
                            })}
                        >
                            <AnimatePresence>
                                {displayTitle && (
                                    <motion.p
                                        variants={titleVariant}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className={styles.p}
                                        layout
                                    >
                                        {titleArrToDisplay
                                            .slice(0, titleMaxCharacters)
                                            .join("")}
                                        {titleArrToDisplay.length >
                                        titleMaxCharacters
                                            ? "..."
                                            : ""}
                                        `
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div> */}
                        <AnimatedComponent
                            variant={titleVariant}
                            content={title}
                            animationTime={animationTime}
                            baseClassNames={baseTitleStyle}
                        />
                        {/* <p className={styles.author}>{author}</p> */}
                        <AnimatedComponent
                            baseClassNames={baseAuthorStyle}
                            variant={authorVariant}
                            animationTime={animationTime}
                            content={author}
                        />
                        {/* <AnimatedComponent
                            baseClassNames={baseAuthorStyle}
                            variant={authorVariant}
                            animationTime={animationTime}
                            content={author}
                        /> */}
                        {/* <p className={styles.date}>
                            {publishedAt.split("T")[0]}
                        </p> */}
                        <AnimatedComponent
                            baseClassNames={baseDateStyle}
                            variant={dateVariant}
                            animationTime={animationTime}
                            content={publishedAt.split("T")[0]}
                        />
                        <AnimatedComponent
                            baseClassNames={baseDescriptionStyle}
                            animationTime={animationTime}
                            variant={descriptionVariant}
                            content={
                                isValid(description)
                                    ? `${description.substring(
                                          0,
                                          maxDescriptionCharacters
                                      )}...`
                                    : isValid(content)
                                    ? `${content.substring(
                                          0,
                                          maxDescriptionCharacters
                                      )}...`
                                    : isValid(sourceInfo.description)
                                    ? `${sourceInfo.description.substring(
                                          0,
                                          maxDescriptionCharacters
                                      )}...`
                                    : ""
                            }
                        />
                        {/* <p className={styles.description}>
                            {description !== null && description !== "" ? (
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
                        </p> */}
                        {/* <div className={styles.link}>
                            <Link href={url}>
                                <a target="_blank">
                                    <span>Read Article</span>
                                    <FontAwesomeIcon icon="external-link-alt" />
                                </a>
                            </Link>
                        </div> */}
                        <AnimatedComponent
                            baseClassNames={baseLinkStyle}
                            variant={linkVariant}
                            animationTime={animationTime}
                            content={
                                <Link href={url}>
                                    <a target="_blank">
                                        <span>Read Article</span>
                                        <FontAwesomeIcon icon="external-link-alt" />
                                    </a>
                                </Link>
                            }
                        />
                    </div>
                </motion.div>
            </AnimateSharedLayout>
        );
    }
);

export default ArticleToShow;
