// These specify the different styles keys I use in
// ArticleToShow.tsx (the component that renders the full information about the article)

import styles from "../styles/articleToShow.module.scss";

export const baseNameStyle: { readonly [key: string]: boolean } = {
    [styles.name]: true,
};

export const baseAuthorStyle: { readonly [key: string]: boolean } = {
    [styles.author]: true,
};

export const baseDescriptionStyle: { readonly [key: string]: boolean } = {
    [styles.description]: true,
};

export const baseThumbnailStyle: { readonly [key: string]: boolean } = {
    [styles.thumbnail]: true,
};

export const baseLinkStyle: { readonly [key: string]: boolean } = {
    [styles.link]: true,
};

export const baseDateStyle: { readonly [key: string]: boolean } = {
    [styles.date]: true,
};

export const baseTitleStyle: { readonly [key: string]: boolean } = {
    [styles.title]: true,
};

export const baseNoArticleSelectedStyle: { readonly [key: string]: boolean } = {
    [styles.noArticleSelected]: true,
};
