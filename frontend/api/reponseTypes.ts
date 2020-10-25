type ARTICLE_RESPONSE_TYPE = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id?: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
};

type SOURCES_RESPONSE_TYPE = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type { ARTICLE_RESPONSE_TYPE, SOURCES_RESPONSE_TYPE };
