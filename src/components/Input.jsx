import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  placeholder,
  type,
  name,
  id,
  onChange,
  onBlur,
}) => (
  <div>
    {label && (
      <label htmlFor={label} className="block text-sm font-medium text-white">
        {label}
      </label>
    )}
    <div className="my-1 relative rounded-md shadow-sm">
      <input
        type={type}
        name={name}
        id={id}
        className="block w-full p-2 border-none outline-none focus:outline-none rounded-md text-gray-600"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  name: '',
  id: '',
  onChange: () => {},
  onBlur: () => {},
};

export default Input;
