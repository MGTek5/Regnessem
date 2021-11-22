import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  type,
  onClick,
}) => (
  <button
    className="px-8 py-2 rounded-xl bg-yellow text-gray-800 font-bold uppercase mt-2"
    // This rule should be disabled because type can't be set dynamically
    // eslint-disable-next-line react/button-has-type
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
};

export default Button;
