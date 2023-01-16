import { useNavigate } from "react-router-dom";

export default function PostTopicCard() {
  const navigate = useNavigate();
  const navigateToPostTopic = () => navigate(`/topic/post`)

  return (
    <section className="PostTopicCard" onClick={() => navigateToPostTopic()}>
      <h3>Post a Topic</h3>
    </section>
  )
}