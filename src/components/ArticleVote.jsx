import { useState } from 'react';
import { patchArticleVote } from '../utils/api';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function ArticleVote({ article }) {
  const { currentUser } = useContext(UserContext);
  const [ voteShift, setVoteShift ] = useState(0);
  const [ voteMessage, setVoteMessage ] = useState("");

  const voteArticle = (articleId, articleVote) => {
    if (currentUser.username === "Guest") {
      setVoteMessage("You need to log in first!")
    } else if (!voteShift && currentUser.username !== "Guest") {
      setVoteShift(currentVotes => currentVotes + articleVote);
      patchArticleVote(articleId, articleVote)
        .catch(() => {
          setVoteShift(currentVotes => currentVotes + (articleVote * -1))
          setVoteMessage("Something went wrong with voting")
        });
    } else {
      setVoteMessage("You can only vote once")
    }
  }
  return (
    <section className='ArticleVote'>
      <p>Votes: {article.votes + voteShift}</p>
      <button id="upvote" onClick={() => voteArticle(article.article_id, 1)}>upvote</button>
      <button id="downvote" onClick={() => voteArticle(article.article_id, -1)}>downvote</button>
      {(voteMessage) ? <p className='VoteMessage'>{voteMessage}</p> : null}
    </section>
  )
}