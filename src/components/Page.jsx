import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children }) => (
  <main className="w-screen h-full max-h-full bg-slate-800 text-white overflow-auto lg:overflow-hidden">
    {children}
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
