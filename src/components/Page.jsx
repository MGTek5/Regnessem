import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children }) => (
  <div className="w-screen h-full bg-gray-400 text-white">
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
