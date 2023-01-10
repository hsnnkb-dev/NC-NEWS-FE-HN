export default function ArticleCard({ article }) {

  return (
    <section className="ArticleCard">
      <h3>{article.title}</h3>
      <p>Topic - {article.topic}</p>
      <p>User: {article.author}</p>
      <p>Comments: {article.comment_count}</p>
      <p>Votes: {article.votes}</p>
    </section>
  )
}