import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const NO_HEADER_ROUTES = ['/login', '/register'];

const Header = () => {
  const location = useLocation().pathname;
  if (NO_HEADER_ROUTES.includes(location)) return null;
  return (
    <header className="w-full h-16 bg-gray-900 text-white flex items-center justify-between px-8 text-xl">
      <Link to="/">
        <img src="/logo192.png" className="h-8" alt="logo" />
      </Link>
      <div className="dropdown dropdown-end dropdown-hover">
        <div className="btn btn-ghost rounded-btn">Dropdown</div>
        <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <Link to="/">Item 1</Link>
          </li>
          <li>
            <Link to="/">Item 2</Link>
          </li>
          <li>
            <Link to="/">Item 3</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
