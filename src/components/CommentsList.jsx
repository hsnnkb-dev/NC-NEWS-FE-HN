import { useState } from 'react';
import CommentCard from './CommentCard';

export default function CommentsList({ comments }) {
  const [ articleComments ] = useState(comments);

  return (
    <section className='CommentsList'>
      <h3>Comments</h3>
      {articleComments.map(comment => <CommentCard comment={comment} key={comment.comment_id}/>)}
    </section>
  )
}