import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard"

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles()
      .then(data => setArticles(data));
  }, []);
  
  return (
    <main className="ArticleList">
      <h2>Articles</h2>
      {articles.map(article => {
        return <ArticleCard article={article} key={article.article_id} />
      })}
    </main>
  )
}