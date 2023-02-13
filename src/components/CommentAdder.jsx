import { useState } from "react";
import { postComment } from '../utils/api';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { toast } from 'react-hot-toast';
import commentIcon from '../images/control-icons/comment.png';

export default function CommentAdder({setComments, articleId, setMaxComments}) {
  const [ commentText, setCommentText ] = useState("");
  const { currentUser } = useContext(UserContext);
  const [ commentMessage, setCommentMessage ] = useState("");
  const [ isDisabled, setIsDisabled ] = useState(false);
  const toastStyle = {
    style: {
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (commentText === "") {
      toast('Cannot leave the comment blank', toastStyle);
    } else if (currentUser.username === "Guest") {
      toast(`You need to log-in before posting`, toastStyle)
    } else {
      setIsDisabled(true);
      setCommentMessage(`Posting comment...`);
      postComment(articleId, commentText, currentUser.username)
        .then(newComment => { 
          setComments(currentComments => [newComment[0], ...currentComments]);
          toast(`Comment '${commentText}' successfully posted!`, toastStyle);
          setCommentText("");
          setIsDisabled(false);
          setMaxComments(currentMax => currentMax + 1);
          setCommentMessage(null);
        })
        .catch(() => {
          setCommentMessage(`Failed to post '${commentText}, please try again later'`);
          setCommentText("");
          setIsDisabled(false)
        })
    }  
  }

  return (
    <section>
      <form className="CommentAdder"onSubmit={event => handleSubmit(event)}>
            <textarea
              placeholder="Comment body"
              value={commentText} 
              onChange={event => setCommentText(event.target.value)} 
              type="text" />
            <button disabled={isDisabled} ><img id="commentIcon" src={commentIcon} alt="comment" /></button>
            
      </form>
      {(commentMessage) ? <p className="CommentMessage">{commentMessage}</p> : null }
    </section>
  )
}