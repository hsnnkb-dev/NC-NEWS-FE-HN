import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteComment } from "../utils/api";

export default function CommentCard({ comment, setComments }) {
  const { currentUser } = useContext(UserContext);
  const [ isDisabled, setIsDisabled ] = useState(false);

  const handleDelete = () => {
    setIsDisabled(true)
    const currentCommentId = comment.comment_id;
    deleteComment(currentCommentId)
      .then(() => {
        setComments(currentComments => currentComments.filter(comment => {
          return (comment.comment_id !== currentCommentId) ? comment : null;
        }))
      })
      .catch(() => {
        window.alert('Error deleting comment')
        setIsDisabled(false)
      });
  }

  return (
    <article className="CommentCard">
      <p id='content'>{comment.body}</p>
      <p>User: {comment.author}</p>
      <p>Votes: {comment.votes}</p>
      {(currentUser.username === comment.author) ? 
        <button 
        disabled={isDisabled}
        className="DeleteComment"
        onClick={() => handleDelete()}
        >delete</button> : 
        null}
    </article>
  )
}