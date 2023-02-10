import { useState } from 'react';
import { patchArticleVote } from '../utils/api';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import toast from 'react-hot-toast';
import upvoteIcon from "../images/control-icons/upvote.png"

export default function ArticleVote({ article }) {
  const { currentUser } = useContext(UserContext);
  const [ voteShift, setVoteShift ] = useState(0);
  const [ voteMessage, setVoteMessage ] = useState("");
  const toastStyle = {
    style: {
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
    }
  }

  const voteArticle = (articleId, articleVote) => {
    if (currentUser.username === "Guest") {
      toast('You need to log in first!', toastStyle);
    } else if (!voteShift && currentUser.username !== "Guest") {
      setVoteShift(currentVotes => currentVotes + articleVote);
      patchArticleVote(articleId, articleVote)
        .catch(() => {
          setVoteShift(currentVotes => currentVotes + (articleVote * -1))
          setVoteMessage("Something went wrong with voting")
        });
    } else {
      toast('You can only vote once', toastStyle);
    }
  }
  
  return (
    <section className='ArticleVote'>
      <img id="upvoteIcon" src={upvoteIcon} alt="upvote" onClick={() => voteArticle(article.article_id, 1)}/>
      <p>{article.votes + voteShift}</p>
      <img id="downvoteIcon" src={upvoteIcon} alt="downvote" onClick={() => voteArticle(article.article_id, -1)}/>
      {(voteMessage) ? <p className='VoteMessage'>{voteMessage}</p> : null}
    </section>
  )
}