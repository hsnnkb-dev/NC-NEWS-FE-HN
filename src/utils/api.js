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

export const fetchComments = (articleId) => {
  return api
          .get(`/articles/${articleId}/comments`)
          .then(response => response.data.comments);
}

export const patchArticleVote = (articleId, articleVote) => {
  const requestBody = { inc_votes: articleVote }
  return api
          .patch(`/articles/${articleId}`, requestBody)
          .then(response => response.data.updatedArticle);
}