export default function CommentCard({ comment }) {

  return (
    <article className="CommentCard">
      <p id='content'>{comment.body}</p>
      <p>User: {comment.author}</p>
      <p>Votes: {comment.votes}</p>
    </article>
  )
}