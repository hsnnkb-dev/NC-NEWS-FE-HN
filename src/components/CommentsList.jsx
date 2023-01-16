import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';

export default function CommentsList({ comments, setComments, articleId}) {

  return (
    <section className='CommentsList'>
      <h3>Comments: {comments.length}</h3>
      <CommentAdder comments={comments} setComments={setComments} articleId={articleId}/>
      {(comments.length) ? 
        comments.map(comment => <CommentCard setComments={setComments} comment={comment} key={comment.comment_id}/>) : 
        <p className='NoComments'>No comments to display...</p>
      }
    </section>
  )
}