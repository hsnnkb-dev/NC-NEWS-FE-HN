import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';

export default function CommentsList({ comments, setComments, articleId}) {
  if (comments.length === 0) return <p className='No-Comments'>No Comments to display</p>

  return (
    <section className='CommentsList'>
      <h3>Comments: {comments.length}</h3>
      <CommentAdder comments={comments} setComments={setComments} articleId={articleId}/>
      {comments.map(comment => <CommentCard comment={comment} key={comment.comment_id}/>)}
    </section>
  )
}