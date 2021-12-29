import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children }) => (
  <div className="w-screen h-full max-h-full bg-gray-800 text-white">
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
