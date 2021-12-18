import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Settings from './images/Settings';

const NO_HEADER_ROUTES = ['/login', '/register', '/logout'];

const Header = () => {
  const location = useLocation().pathname;
  if (NO_HEADER_ROUTES.includes(location)) return null;
  return (
    <header className="w-full h-16 bg-gray-900 text-white flex items-center justify-between pl-8 pr-2 text-xl">
      <Link to="/">
        <img src="/logo192.png" className="h-8" alt="logo" />
      </Link>
      <div className="dropdown dropdown-end dropdown-hover">
        <button type="button" className="w-12 h-12 p-0">
          <Settings className="w-full h-full" />
        </button>
        <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/logout">Sign out</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
