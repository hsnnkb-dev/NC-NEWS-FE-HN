import { Link } from 'react-router-dom';
import Topics from './Topics';

export default function Navigation() {
  return (
    <nav className='Navigation'>
      <Link className={'Link'} to="/">Home</Link>
      <Link className={'Link'} to="/articles">All Articles</Link>
      <Link className={'Link'} to="/users">Login</Link>
      <Topics />
    </nav>
  )
}