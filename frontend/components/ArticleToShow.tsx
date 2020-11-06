import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ARTICLE_RESPONSE_TYPE,
    SOURCES_RESPONSE_TYPE,
} from "../types/apiReponseTypes";
import styles from "../styles/articleToShow.module.scss";
import Link from "next/link";
import { motion, AnimateSharedLayout } from "framer-motion";
import classnames from "classnames";
import AnimatedComponent from "./AnimatedComponent";
import {
    authorVariant,
    dateVariant,
    descriptionVariant,
    linkVariant,
    baseNameVariant,
    noArticleSelectedVariant,
    thumbnailVariant,
    titleVariant,
    animationTime,
} from "../articleSpecifications/animationSpecifications";
import {
    baseNoArticleSelectedStyle,
    baseAuthorStyle,
    baseDateStyle,
    baseDescriptionStyle,
    baseLinkStyle,
    baseNameStyle,
    baseThumbnailStyle,
    baseTitleStyle,
} from "../articleSpecifications/stylingSpecifications";

type ArticleToShowType = {
    article?: ARTICLE_RESPONSE_TYPE;
    sourcesInfo?: SOURCES_RESPONSE_TYPE[];
};

const maxDescriptionCharacters = 100;

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

        const titleMaxCharacters = 50;

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
