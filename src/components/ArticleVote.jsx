import { useState } from 'react';
import { patchArticleVote } from '../utils/api';

export default function ArticleVote({ article }) {

  const [ voteShift, setVoteShift ] = useState(0);
  const [ voteMessage, setVoteMessage ] = useState("");

  const voteArticle = (articleId, articleVote) => {
    if (!voteShift) {
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
      <button onClick={() => voteArticle(article.article_id, 1)}>upvote</button>
      <button onClick={() => voteArticle(article.article_id, -1)}>downvote</button>
      {(voteMessage) ? <p className='VoteMessage'>{voteMessage}</p> : null}
    </section>
  )
}