import axios from 'axios';

const api = axios.create({
  baseURL: "https://yesterdays-news.onrender.com/api"
})

export const fetchArticlesAmount = (topic, sortBy, orderBy) => {
  const params = { params: 
    { topic: topic, 
      sort_by: sortBy,
      order: orderBy,
    }
  }
  return api
          .get('/articles', params)
          .then(response => response.data.total_count);
}

export const fetchArticles = (topic, sortBy, orderBy, pageNumber) => {
  const params = { params: 
    { topic: topic, 
      sort_by: sortBy,
      order: orderBy,
      limit: 5,
      p: pageNumber
    }
  }
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

export const fetchPaginatedComments = (articleId, pageNumber) => {
  const params = { params: 
    { 
      limit: 5,
      p: pageNumber
    }
  }
  return api
          .get(`/articles/${articleId}/comments`, params)
          .then(response => response.data.comments);
}

export const patchArticleVote = (articleId, articleVote) => {
  const requestBody = { inc_votes: articleVote }
  return api
          .patch(`/articles/${articleId}`, requestBody)
          .then(response => response.data.updatedArticle);
}

export const patchCommentVote = (commentId, commentVote) => {
  const requestBody = { inc_votes: commentVote }
  return api
          .patch(`/comments/${commentId}`, requestBody)
          .then(response => response.data.updatedComment);
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

export const fetchUsers = () => {
  return api
          .get(`/users`)
          .then(response => response.data.users)
}

export const postTopic = (topicTitle, topicDescription) => {
  const requestBody = { slug: topicTitle, description: topicDescription }
  return api
          .post(`/topics`, requestBody)
          .then(response => response.data.postedTopic)
}

export const postArticle = (articleTitle, articleTopic, articleBody, username) => {
  const requestBody = { 
    author: username,
    title: articleTitle,
    body: articleBody,
    topic: articleTopic
  }
  
  return api
          .post(`/articles`, requestBody)
          .then(response => response.data.postedArticle)
}

export const deleteArticle = (articleId) => {
  return api
          .delete(`/articles/${articleId}`)
          .then(response => console.log(response + "article deleted"));
}