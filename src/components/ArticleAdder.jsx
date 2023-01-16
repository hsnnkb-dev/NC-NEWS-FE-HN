import { useContext, useState } from 'react';
import { UserContext } from "../contexts/UserContext";
import { TopicContext } from '../contexts/TopicContext';
import { toast } from 'react-hot-toast';
import { postArticle } from '../utils/api';

export default function ArticleAdder() {
  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ articleTitle, setArticleTitle ] = useState("");
  const [ articleBody, setArticleBody ] = useState("");
  const [ articleTopic, setArticleTopic ] = useState("");
  const { currentUser } = useContext(UserContext);
  const { currentTopics } = useContext(TopicContext);
  const toastStyle = {
    style: {
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const topicSlugs = currentTopics.map(topic => topic.slug);

    if (articleTitle === "" || articleBody === "" || articleTopic === "") {
      toast('Cannot leave any fields blank', toastStyle);
    } else if (currentUser.username === "Guest") {
      toast(`You need to log-in before posting`, toastStyle);
    } else if (!topicSlugs.includes(articleTopic)) {
      toast(`Topic does not exist`, toastStyle);
    }
    else {
      setIsDisabled(true);
      postArticle(articleTitle, articleTopic, articleBody, currentUser.username)
        .then(() => {
          toast(`Successfully posted article`, toastStyle);
          setArticleTitle("");
          setArticleTopic("");
          setArticleBody("");
          setIsDisabled(false);
        })
        .catch(() => {
          toast(`Something went wrong, try posting again later`, toastStyle);
          setArticleTitle("");
          setArticleTopic("");
          setArticleBody("");
          setIsDisabled(false);
        })
    }
  } 

  return (
    <section className="ArticleAdderCard">
      <h2>Post an Article</h2>
      <form className="ArticleAdder" onSubmit={event => handleSubmit(event)}>
            <input
              placeholder="Article Title"
              value={articleTitle} 
              onChange={event => setArticleTitle(event.target.value)} 
              type="text" />
            <input
              placeholder="Article Topic"
              value={articleTopic} 
              onChange={event => setArticleTopic(event.target.value)} 
              type="text" />
            <textarea
              rows={'5'}
              placeholder="Article Body"
              value={articleBody} 
              onChange={event => setArticleBody(event.target.value)} 
              type="text" />
            <button disabled={isDisabled}>Post Article</button>
      </form>
    </section>
  )
}