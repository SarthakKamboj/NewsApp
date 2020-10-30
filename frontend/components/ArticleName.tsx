type ArticleNameType = {
    name: string;
};

const ArticleName: React.FC<ArticleNameType> = ({ name }) => {
    return <p>{name}</p>;
};

export default ArticleName;
