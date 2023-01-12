import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../utils/api';


export default function Topics() {
  const [ topics, setTopics ] = useState([]);
  useEffect( () => {
    fetchTopics()
      .then(topicsData => setTopics(topicsData))
  }, [])

  return (
    <section className='Topics'>
      <h3>Topics</h3>
      <article>
        {topics.map( topic => {
          return <Link 
              className={'Link'} 
              to={`/articles/topic/${topic.slug}`} 
              key={topic.slug}
            >{topic.slug}</Link>
        })}
      </article>
    </section>
  )
}