import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ArticlesList from './components/ArticlesList';
import SingleArticle from './components/SingleArticle';
import UsersList from './components/UsersList';
import NotFoundCard from './components/NotFoundCard';
import profile from "./images/default.jpg";

function App() {
  const [ currentUser, setCurrentUser ] = useState({ username: "Guest", name: "Guester McGuesterson", avatar_url: profile});
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }} >
        <div className="App">
          <Header />
          <Navigation />
          <Routes>
            <Route path="/"/>
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/topic/:topic" element={<ArticlesList />} />
            <Route path="/articles/id/:article_id" element={<SingleArticle />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/*" element={<NotFoundCard />} />
          </Routes>
          <ToastContainer className={"ToastContainer"}/>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
