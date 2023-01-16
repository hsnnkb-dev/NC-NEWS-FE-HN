import { useNavigate } from "react-router-dom";

export default function PostArticleCard() {
  const navigate = useNavigate();
  const navigateToPostArticle = () => navigate(`/article/post`)

  return (
    <section className="PostArticleCard" onClick={() => navigateToPostArticle()}>
      <h3>Post an Article</h3>
    </section>
  )
}