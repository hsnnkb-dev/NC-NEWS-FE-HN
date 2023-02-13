import { Link } from 'react-router-dom';
import Topics from './Topics';

export default function Navigation() {
  return (
    <nav className='Navigation'>
      <section className='MainLinks'>
        <Link className={'Link'} to="/">Home</Link>
        <Link className={'Link'} to="/articles">All Articles</Link>
        <Link className={'Link'} to="/users">Login</Link>
        <a className={'Link'} target="_blank" href="https://github.com/hsnnkb-dev/NC-NEWS-FE-HN/blob/main/TUTORIAL.md">Tutorial</a>
      </section>
      <Topics />
    </nav>
  )
}