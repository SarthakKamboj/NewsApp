import React from "react";
import API_RESPONSE_TYPE from "../api/structure";
import Link from "next/link";

type NewsItemType = {
    newsObj: API_RESPONSE_TYPE;
};
const NewsItem: React.FC<NewsItemType> = ({
    newsObj: { author, content, description, publishedAt, url },
}) => {
    return (
        <React.Fragment>
            <p>{author}</p>
            <p>{content}</p>
            <p>{description}</p>
            <p>{publishedAt}</p>
            <Link href={url}>
                <a target="_blank">link to article</a>
            </Link>
        </React.Fragment>
    );
};

export default NewsItem;
