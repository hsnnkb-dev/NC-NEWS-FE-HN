import axios from 'axios';

const api = axios.create({
  baseURL: "https://yesterdays-news.onrender.com/api"
})

export const fetchArticles = () => {
 return api
         .get('/articles')
         .then(response => response.data.articles);
}

export const fetchArticleById = (articleId) => {
  return api
          .get(`/articles/${articleId}`)
          .then(response => response.data.article[0]);
 }