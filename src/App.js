import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { TopicContext } from './contexts/TopicContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ArticleAdder from './components/ArticleAdder';
import TopicAdder from './components/TopicAdder';
import ArticlesList from './components/ArticlesList';
import SingleArticle from './components/SingleArticle';
import UsersList from './components/UsersList';
import NotFoundCard from './components/NotFoundCard';
import profile from "./images/default.jpg";

function App() {
  const [ currentUser, setCurrentUser ] = useState({ username: "Guest", name: "Guester McGuesterson", avatar_url: profile });
  const [ currentTopics, setCurrentTopics ] = useState([]);
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }} >
      <TopicContext.Provider value={{ currentTopics, setCurrentTopics }}>
        <div className="App">
          <Header />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/article/post" element={<ArticleAdder />} />
            <Route path="/topic/post" element={<TopicAdder />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/topic/:topic" element={<ArticlesList />} />
            <Route path="/articles/id/:article_id" element={<SingleArticle />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/*" element={<NotFoundCard />} />
          </Routes>
          <Toaster
          position="bottom-center"
          reverseOrder={true}/>
        </div>
      </TopicContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
