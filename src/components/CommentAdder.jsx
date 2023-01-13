import { useState } from "react";
import { postComment } from '../utils/api';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function CommentAdder({comments, setComments, articleId}) {
  const [ commentText, setCommentText ] = useState("");
  const { currentUser } = useContext(UserContext);
  const [ commentMessage, setCommentMessage ] = useState("");
  const [ isDisabled, setIsDisabled ] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault()

    if (commentText === "") {
      setCommentMessage(`Cannot leave comment blank`);
    } else if (currentUser.username === "Guest") {
      setCommentMessage(`You need to log-in before posting`);
    } else {
      setIsDisabled(true);
      setCommentMessage(`Posting comment...`);
      postComment(articleId, commentText, currentUser.username)
        .then(newComment => { 
          setComments(currentComments => [newComment[0], ...currentComments]);
          setCommentMessage(`Comment '${commentText}' successfully posted!`);
          setCommentText("");
          setIsDisabled(false)
        })
        .catch(() => {
          setCommentMessage(`Failed to post '${commentText}'`);
          setCommentText("");
          setIsDisabled(false)
        })
    }  
  }

  return (
    <section>
      <form className="CommentAdder"onSubmit={event => handleSubmit(event)}>
            <textarea 
              value={commentText} 
              onChange={event => setCommentText(event.target.value)} 
              type="text" />
            <button disabled={isDisabled} >Add Comment</button>
      </form>
      {(commentMessage) ? <p className="CommentMessage">{commentMessage}</p> : null }
    </section>
  )
}