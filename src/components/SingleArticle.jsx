import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteArticle, fetchArticleById, fetchComments } from '../utils/api';
import CommentsList from './CommentsList';
import PostArticleCard from './PostArticleCard';
import ArticleVote from './ArticleVote';
import deleteIcon from "../images/control-icons/delete.png"
import { UserContext } from '../contexts/UserContext';

export default function SingleArticle() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ isArticleDeleted, setIsArticleDeleted ] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [ article, setArticle ] = useState({});
  const [ comments, setComments ] = useState([]);
  const { article_id: articleId } = useParams();

  const handleDelete = (event) => {
    event.preventDefault();
    setIsDisabled(true);
    deleteArticle(articleId)
      .then(() => {
        setIsArticleDeleted(true);
      })
      .catch((error => {
        console.log(error);
        setIsDisabled(false);
      }))
  }

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
  
  if (isError) return <p className="Error">404 - Article not found</p>
  if (isLoading) return <p className="Loading">Loading content</p>
  if (isArticleDeleted) return (
    <section className='DeletedArticle'>
      <p>Successfully deleted the article. You can navigate to more content using the links above!</p>
      <p id="or">OR</p>
      <PostArticleCard></PostArticleCard>
    </section>
  )

  return (
    <main>
      <section className='SingleArticle'>
        <h3>{article.title}</h3>
        <p id='topic'>{article.topic}</p>
        <p id='author'>By {article.author}</p>
        <p id='content'>{article.body}</p>
        <ArticleVote article={article}/>
        {(currentUser.username === article.author) ? 
        <img 
        disabled={isDisabled}
        className="DeleteImage"
        onClick={(event) => handleDelete(event)}
        src={deleteIcon} 
        alt="Delete article"
        /> : null 
        }
      </section>
      <CommentsList comments={comments} setComments={setComments} articleId={article.article_id}/> 
    </main>
  )
}