import { useNavigate } from "react-router-dom";

export default function ArticleCard({ article }) {
  const navigate = useNavigate();
  const navigateToArticle = ({article_id}) => navigate(`/articles/id/${article_id}`)
  
  return (
    <section className="ArticleCard"  onClick={() => navigateToArticle(article)}>
      <h3>{article.title}</h3>
      <p>Topic - {article.topic}</p>
      <p>User: {article.author}</p>
      <p>Comments: {article.comment_count}</p>
      <p>Votes: {article.votes}</p>
    </section>
  )
}