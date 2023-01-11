import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { patchArticleVote, fetchArticleById, fetchComments } from '../utils/api';
import CommentsList from './CommentsList';

export default function SingleArticle() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  const [ article, setArticle ] = useState({});
  const [ comments, setComments ] = useState([]);
  const [ voteShift, setVoteShift ] = useState(0);
  const [ voteMessage, setVoteMessage ] = useState("");
  const { article_id: articleId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    Promise.all([fetchArticleById(articleId), fetchComments(articleId)])
      .then(([articleData, commentsData]) => {
        setArticle(articleData);
        setComments(commentsData);
        setIsLoading(false);
      })
      .catch(() => setIsError(true))}
  , []);
  
  const voteArticle = (articleId, articleVote) => {
    if (!voteShift) {
      setVoteShift(currentVotes => currentVotes + articleVote);
      patchArticleVote(articleId, articleVote)
        .catch(() => {
          setVoteShift(currentVotes => currentVotes + (articleVote * -1))
          setVoteMessage("Something went wrong with voting")
        });
    } else {
      setVoteMessage("You can only vote once")
    }
  }

  if (isError) return <p className="Error">Something went wrong 😞</p>
  if (isLoading) return <p className="Loading">Loading content...</p>

  return (
    <main>
      <section className='SingleArticle'>
        <h3>{article.title}</h3>
        <p id='content'>{article.body}</p>
        <p>Topic - {article.topic}</p>
        <p>User: {article.author}</p>
        <p>Comments: {article.comment_count}</p>
        <p>Votes: {article.votes + voteShift}</p>
        <button onClick={() => voteArticle(article.article_id, 1)}>upvote</button>
        <button onClick={() => voteArticle(article.article_id, -1)}>downvote</button>
        {(voteMessage) ? <p className='VoteMessage'>{voteMessage}</p> : null}
      </section>
      <CommentsList comments={comments} /> 
    </main>
  )
}