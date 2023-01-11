import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';

export default function CommentsList({ comments, setComments, articleId}) {
  if (!comments.length) return (
    <section className='CommentsList'>
      <h3>Comments: 0</h3>
      <CommentAdder comments={comments} setComments={setComments} articleId={articleId}/>
      <p className='NoComments'>No Comments to display...</p>
    </section>
  )

  return (
    <section className='CommentsList'>
      <h3>Comments: {comments.length}</h3>
      <CommentAdder comments={comments} setComments={setComments} articleId={articleId}/>
      {comments.map(comment => <CommentCard comment={comment} key={comment.comment_id}/>)}
    </section>
  )
}