import { useEffect, useState, useContext } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { fetchArticles, fetchArticlesAmount } from "../utils/api";
import ArticleCard from "./ArticleCard";
import { PageContext } from "../contexts/PageContext";
import ArticlePages from "./ArticlePages";

export default function ArticlesList() {
  const [ articles, setArticles ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const [ searchParams, setSearchParams ] = useSearchParams();
  const orderQuery = searchParams.get('order');
  const sortQuery = searchParams.get('sort_by');
  const [ sortBy, setSortBy ] = useState(sortQuery || "created_at");
  const [ orderBy, setOrderBy ] = useState(orderQuery || "desc");
  const [ pages, setPages ] = useState([]);

  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchArticlesAmount(topic, sortBy, orderBy)
      .then((totalNumber) => {
        const pagesArray = [];
        const maxPages = Math.ceil(totalNumber / 5) + 1; 
        for (let i = 1; i < maxPages; i++) {
          pagesArray.push(i);
        }
        setPages(pagesArray);
        return fetchArticles(topic, sortBy, orderBy, currentPage);
      })
      .then(articlesData => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, [topic, sortBy, orderBy, currentPage]);

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

  if (isError) return <p className="Error">404 - Articles not found</p>
  if (isLoading) return <p className="Loading">Loading content</p>

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
      {(articles.length) ? 
        articles.map(article => <ArticleCard article={article} key={article.article_id} />) :
        <p className='NoArticles'>No articles to display...</p>
      }
      <section className="PageNumbers">
        <h4>pages</h4>
         <ArticlePages setCurrentPage={setCurrentPage} currentPage={currentPage} pages={pages}/>
      </section>
    </main> 
  )
}