import React from 'react';
import PropTypes from 'prop-types';

const Trash = ({
  color,
  className,
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path
      fill={color}
      d="M22 5a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1
        1v1h5a1 1 0 0 1 1 1zM4.934 21.071 4 8h16l-.934 13.071a1 1 0 0 1-1 .929H5.931a1
        1 0 0 1-.997-.929zM15 18a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0zm-4 0a1 1 0 0 0 2 0v-6a1
        1 0 0 0-2 0zm-4 0a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0z"
    />
  </svg>
);

Trash.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

Trash.defaultProps = {
  className: '',
  color: 'white',
};

export default Trash;
