import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard"

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetchArticles()
      .then(data => {
        setIsLoading(false);
        setArticles(data)
      });
  }, []);

  if (isLoading) return <p className="Loading">Loading content...</p>

  return (
    <main className="ArticleList">
      <h2>Articles</h2>
      {articles.map(article => {
        return <ArticleCard article={article} key={article.article_id} />
      })}
    </main>
  )
}