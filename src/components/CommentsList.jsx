import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';
import { useEffect, useState } from 'react';
import { fetchPaginatedComments } from '../utils/api';

export default function CommentsList({ comments, setComments, articleId}) {
  const [ commentPages, setCommentPages ] = useState([]);
  const [ currentPage , setCurrentPage ] = useState(1);
  const [ initialComments ] = useState(comments.length) 

  useEffect(() => {
    const pagesArray = [];
    const maxPages = Math.ceil(initialComments / 5) + 1; 
    for (let i = 1; i < maxPages; i++) {
     pagesArray.push(i);
    }
    setCommentPages(pagesArray);
    fetchPaginatedComments(articleId, currentPage)
      .then(commentsData => {
        setComments(commentsData)
      })
    
  }, [currentPage]);

  const handlePageChange = (event) => {
    setCurrentPage(event.target.value);
  }
  
  return (
    <section className='CommentsList'>
      <h3>Comments: {initialComments}</h3>
      <CommentAdder comments={comments} setComments={setComments} articleId={articleId}/>
      {(comments.length) ? 
        comments.map(comment => <CommentCard setComments={setComments} comment={comment} key={comment.comment_id}/>) : 
        <p className='NoComments'>No comments yet. Be the First to comment!</p>
      }
      {(comments.length) ? 
      <section className='PageNumbers'>
        <h4>pages</h4>
        {commentPages.map(page => {
          return <button onClick={(event) => handlePageChange(event)} value={page} disabled={parseInt(currentPage) === page}>{page}</button>
        })}
      </section> :
      null}
    </section>
  )
}