import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { toast } from 'react-hot-toast';
import { deleteComment } from "../utils/api";
import deleteIcon from "../images/control-icons/delete.png";
import CommentVote from "./CommentVote"

export default function CommentCard({ comment, setComments, setMaxComments, setCurrentPage }) {
  const { currentUser } = useContext(UserContext);
  const [ isDisabled, setIsDisabled ] = useState(false);
  const toastStyle = {
    duration: 2500,
    style: {
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
    }
  }

  const handleDelete = () => {
    setIsDisabled(true)
    const currentCommentId = comment.comment_id;
    deleteComment(currentCommentId)
      .then(() => {
        setComments(currentComments => currentComments.filter(comment => {
          return (comment.comment_id !== currentCommentId) ? comment : null;
        }));
        toast('Comment Successfully deleted', toastStyle);
        setMaxComments(currentMax => currentMax - 1);
        setCurrentPage(1);
      })
      .catch(() => {
        window.alert('Error deleting comment')
        setIsDisabled(false)
      });
  }

  return (
    <article className="CommentCard">
      <p className='content'>{comment.body}</p>
      <p className='author'>By {comment.author}</p>
      <CommentVote comment={comment}/>
      {(currentUser.username === comment.author) ? 
        <img 
        disabled={isDisabled}
        className="DeleteImage"
        onClick={() => handleDelete()}
        src={deleteIcon} 
        alt="Delete comment"
        /> : null 
        }
    </article>
  )
}