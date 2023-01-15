import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../utils/api';
import { TopicContext } from '../contexts/TopicContext';


export default function Topics() {
  const  { currentTopics, setCurrentTopics }  = useContext(TopicContext);
  useEffect( () => {
    fetchTopics()
      .then(topicsData => setCurrentTopics(topicsData))
  }, [])

  return (
    <section className='Topics'>
      <h3>Topics</h3>
      <article>
        {currentTopics.map( topic => {
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