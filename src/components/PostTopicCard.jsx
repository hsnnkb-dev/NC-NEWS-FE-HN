import { useNavigate } from "react-router-dom";

export default function PostTopicCard() {
  const navigate = useNavigate();
  const navigateToPostTopic = () => navigate(`/topic/post`)

  return (
    <section className="PostTopicCard" onClick={() => navigateToPostTopic()}>
      <h2>Post a Topic</h2>
    </section>
  )
}