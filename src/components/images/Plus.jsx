import React from 'react';
import PropTypes from 'prop-types';

const Plus = ({
  className,
}) => (
  <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g fill="white" stroke="white" strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="10" strokeWidth="6">
      <line fill="none" stroke="white" x1="32" x2="32" y1="5" y2="59" />
      <line fill="none" stroke="white" x1="59" x2="5" y1="32" y2="32" />
    </g>
  </svg>
);

Plus.propTypes = {
  className: PropTypes.string,
};

Plus.defaultProps = {
  className: '',
};

export default Plus;
