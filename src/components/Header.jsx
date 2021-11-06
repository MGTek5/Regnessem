import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const NO_HEADER_ROUTES = ['/login'];

const Header = () => {
  const location = useLocation().pathname;
  if (NO_HEADER_ROUTES.includes(location)) return null;
  return (
    <header className="w-full h-16 bg-black text-white flex items-center justify-between text-xl">
      <div className="flex justify-evenly w-3/4">
        <Link to="/">Link 1</Link>
        <Link to="/">Link 2</Link>
        <Link to="/">Link 3</Link>
      </div>
    </header>
  );
};

export default Header;
