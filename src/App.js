import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ArticlesList from './components/ArticlesList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/"/>
          <Route path="/articles" element={<ArticlesList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
