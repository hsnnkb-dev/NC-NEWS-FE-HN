import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard"
import { useParams } from "react-router-dom";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic)
      .then(articlesData => {
        setArticles(articlesData);
        setIsLoading(false);
      });
  }, [topic]);

  if (isLoading) return <p className="Loading">Loading content...</p>

  return (
    <main className="ArticleList">
      {(topic) ? <h2>{topic} Articles</h2> : <h2>All Articles</h2>}
      {articles.map(article => {
        return <ArticleCard article={article} key={article.article_id} />
      })}
    </main>
  )
}