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

const animationTime = 0.6;

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

const thumbnailChangeX = 1500;
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
        scale: 0,
    },
    animate: {
        scale: 1,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
    exit: {
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
        },
    },
    exit: {
        opacity: 0,
        x: dateChangeX,
        transition: {
            duration: animationTime,
        },
    },
};

const noArticleSelectedVariant: genericAnimationType = {
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

const baseNoArticleSelectedStyle: { readonly [key: string]: boolean } = {
    [styles.noArticleSelected]: true,
};

const isValid = (s: string) => s !== undefined && s !== null && s !== "";

const ArticleToShow: React.FC<ArticleToShowType> = React.memo(
    ({ article, sourcesInfo }) => {
        if (article === null || article === undefined) {
            return (
                <AnimatedComponent
                    baseClassNames={baseNoArticleSelectedStyle}
                    content={"Please Select an Article"}
                    dependency={article}
                    variant={noArticleSelectedVariant}
                    animationTime={animationTime}
                    TypeComponentToDisplay={motion.p}
                />
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

        const titleMaxCharacters = 70;

        return (
            <AnimateSharedLayout>
                <motion.div
                    className={classnames({
                        [styles.container]: true,
                    })}
                >
                    <AnimatedComponent
                        TypeComponentToDisplay={motion.h1}
                        baseClassNames={baseThumbnailStyle}
                        variant={thumbnailVariant}
                        animationTime={animationTime}
                        dependency={article}
                        content={
                            <img
                                src={
                                    isValid(urlToImage)
                                        ? urlToImage
                                        : "defaultArticleImg.jpg"
                                }
                                alt="Thumbnail"
                            />
                        }
                    />
                    <div className={styles.content}>
                        <AnimatedComponent
                            TypeComponentToDisplay={motion.div}
                            variant={baseNameVariant}
                            animationTime={animationTime}
                            baseClassNames={baseNameStyle}
                            dependency={article}
                            content={<p className={styles.name}>{name}</p>}
                        />

                        {/* <AnimatedComponent
                            TypeComponentToDisplay={motion.h1}
                            variant={waterMarkVariant}
                            animationTime={animationTime}
                            content={name}
                            dependency={article}
                            baseClassNames={baseWaterMarkStyles}
                        /> */}
                        <AnimatedComponent
                            TypeComponentToDisplay={motion.h1}
                            variant={titleVariant}
                            content={`${title.substring(
                                0,
                                titleMaxCharacters
                            )}...`}
                            animationTime={animationTime}
                            baseClassNames={baseTitleStyle}
                            dependency={title}
                        />
                        <AnimatedComponent
                            TypeComponentToDisplay={motion.h1}
                            baseClassNames={baseAuthorStyle}
                            dependency={author}
                            variant={authorVariant}
                            animationTime={animationTime}
                            content={author}
                        />
                        <AnimatedComponent
                            TypeComponentToDisplay={motion.h1}
                            baseClassNames={baseDateStyle}
                            dependency={publishedAt}
                            variant={dateVariant}
                            animationTime={animationTime}
                            content={publishedAt.split("T")[0]}
                        />
                        <AnimatedComponent
                            TypeComponentToDisplay={motion.h1}
                            baseClassNames={baseDescriptionStyle}
                            animationTime={animationTime}
                            variant={descriptionVariant}
                            dependency={article}
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
                        <AnimatedComponent
                            TypeComponentToDisplay={motion.h1}
                            baseClassNames={baseLinkStyle}
                            variant={linkVariant}
                            animationTime={animationTime}
                            dependency={article}
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
