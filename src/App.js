import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ArticlesList from './components/ArticlesList';
import SingleArticle from './components/SingleArticle';

function App() {
  const [ user, setUser ] = useState("weegembump");
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }} >
        <div className="App">
          <Header />
          <Navigation />
          <Routes>
            <Route path="/"/>
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/articles/topic/:topic" element={<ArticlesList />} />
            <Route path="/articles/id/:article_id" element={<SingleArticle />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
