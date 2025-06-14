import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/authSlice';

const NAV = [
  { id: 1, title: 'Departments', url: '/' },
  { id: 2, title: 'Employees', url: '/employees' },
];

export default function Header() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);

  const handleLogout = () => dispatch(logout());

  return (
    <header>
      <nav>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
          {isAuth && NAV.map(item => (
            <li key={item.id}>
              <Link className="btn btn-dark px-4" to={item.url}>{item.title}</Link>
            </li>
          ))}
          {isAuth && (
            <li>
              <button className="btn btn-dark px-4" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}