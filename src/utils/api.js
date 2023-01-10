import axios from 'axios';

const api = axios.create({
  baseURL: "https://yesterdays-news.onrender.com/api"
})

export const fetchArticles = () => {
 return api
         .get('/articles')
         .then(response => response.data.articles);
}