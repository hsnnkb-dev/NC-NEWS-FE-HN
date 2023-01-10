import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../utils/api';

export default function SingleArticle() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  const [ article, setArticle ] = useState({});
  const { article_id: articleId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchArticleById(articleId)
      .then(data => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch(() => setIsError(true))
  }, 
  [])

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
        <p>Votes: {article.votes}</p>
      </section>
    </main>
  )
}