import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';
import { useEffect, useState } from 'react';
import { fetchPaginatedComments } from '../utils/api';

export default function CommentsList({ comments, setComments, articleId}) {
  const [ commentPages, setCommentPages ] = useState([]);
  const [ currentPage , setCurrentPage ] = useState(1);
  const [ maxComments, setMaxComments ] = useState(comments.length) 

  useEffect(() => {
    const pagesArray = [];
    const maxPages = Math.ceil(maxComments / 5) + 1; 
    for (let i = 1; i < maxPages; i++) {
     pagesArray.push(i);
    }
    setCommentPages(pagesArray);
    fetchPaginatedComments(articleId, currentPage)
      .then(commentsData => {
        setComments(commentsData);
      })
    
  }, [currentPage, maxComments]);

  const handlePageChange = (event) => {
    setCurrentPage(event.target.value);
  }

  return (
    <section className='CommentsList'>
      <h3>Comments: {maxComments}</h3>
      <CommentAdder comments={comments} setComments={setComments} articleId={articleId} setMaxComments={setMaxComments}/>
      {(comments.length) ? 
        comments.map(comment => <CommentCard setCurrentPage={setCurrentPage} setComments={setComments} comment={comment} key={comment.comment_id} setMaxComments={setMaxComments}/>) : 
        <p className='NoComments'>No comments yet. Be the First to comment!</p>
      }
      <section className='PageNumbers'>
        <h4>pages</h4>
        {(comments.length) ? commentPages.map(page => {
            return <button onClick={(event) => handlePageChange(event)} value={page} disabled={parseInt(currentPage) === page}>{page}</button>
          }) : <button onClick={(event) => handlePageChange(event)} value={1} disabled={true}>1</button>}
      </section>
    </section>
  )
}