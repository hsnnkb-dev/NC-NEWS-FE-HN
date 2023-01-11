import { useState } from "react";
import { postComment } from '../utils/api';

export default function CommentAdder({comments, setComments, articleId}) {
  const [ commentText, setCommentText ] = useState("");
  const [ username, setUsername ] = useState("weegembump");
  const [ commentMessage, setCommentMessage ] = useState("");
  const [ isDisabled, setIsDisabled ] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault()

    if (commentText === "") {
      setCommentMessage(`Cannot leave comment blank`);
    } else if (username === "") {
      setCommentMessage(`You need to log-in before posting`);
    } else {
      setIsDisabled(true);
      postComment(articleId, commentText, username)
        .then(newComment => { 
          setComments(currentComments => [newComment[0], ...currentComments]);
          setCommentMessage(`Comment '${commentText}' succesfully posted!`);
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
            <input 
              value={commentText} 
              onChange={event => setCommentText(event.target.value)} 
              type="text" />
            <button disabled={isDisabled} >Add Comment</button>
      </form>
      {(commentMessage) ? <p className="CommentMessage">{commentMessage}</p> : null }
    </section>
  )
}