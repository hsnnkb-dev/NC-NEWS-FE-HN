import axios from 'axios';

const api = axios.create({
  baseURL: "https://yesterdays-news.onrender.com/api"
})

export const fetchArticles = (topic, sortBy, orderBy) => {
  const params = { params: 
    { topic: topic, 
      sort_by: sortBy,
      order: orderBy
    }}
  return api
          .get('/articles', params)
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

export const postComment = (articleId, commentText, username) => {
  const requestBody = { username: username, body: commentText }
  return api
          .post(`/articles/${articleId}/comments`, requestBody)
          .then(response => response.data.postedComment)
}

export const fetchTopics = () => {
  return api
          .get('/topics')
          .then(response => response.data.topics)
}

export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`)
