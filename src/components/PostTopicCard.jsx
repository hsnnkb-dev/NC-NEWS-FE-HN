import { useNavigate } from "react-router-dom";

export default function PostTopicCard() {
  const navigate = useNavigate();
  const navigateToArticle = () => navigate(`/topic/post`)

  return (
    <section className="PostTopicCard" onClick={() => navigateToArticle()}>
      <h3>Post a Topic</h3>
    </section>
  )
}