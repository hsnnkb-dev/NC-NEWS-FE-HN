import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard"
import { useSearchParams, useParams } from "react-router-dom";

export default function ArticlesList() {
  const [ articles, setArticles ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const [ searchParams, setSearchParams ] = useSearchParams();
  const orderQuery = searchParams.get('order');
  const sortQuery = searchParams.get('sort_by');
  const [ sortBy, setSortBy ] = useState(sortQuery || "created_at");
  const [ orderBy, setOrderBy ] = useState(orderQuery || "desc");

  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic, sortBy, orderBy)
      .then(articlesData => {
        setArticles(articlesData);
        setIsLoading(false);
      });
  }, [topic, sortBy, orderBy]);

  const handleSort = (event) => {
    setSortBy(event.target.value)
    const params = { sort_by: event.target.value, order: orderBy };
    setSearchParams(params);
  }

  const handleOrder = (event) => {
    setOrderBy(event.target.value)
    const params = { sort_by: sortBy, order: event.target.value };
    setSearchParams(params);
  }

  if (isLoading) return <p className="Loading">Loading content...</p>

  return (
    <main className="ArticleList">
      {(topic) ? <h2>{topic} Articles</h2> : <h2>All Articles</h2>}
      <section className="SortAndOrder">
        <select 
          name="" 
          id="sort-by" 
          defaultValue={sortBy}
          onChange={(event) => handleSort(event)}>
          <option disabled>Sort By</option>
          <option value="author">User</option>
          <option value="created_at">Created At</option>
          <option value="title">Title</option>
          <option value="votes">Votes</option>
        </select>
        <select 
          name="" 
          id=""
          defaultValue={orderBy}
          onChange={(event) => handleOrder(event)}>
            <option disabled>Order By</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
      </section>
      
      {articles.map(article => {
        return <ArticleCard article={article} key={article.article_id} />
      })}
    </main>
  )
}