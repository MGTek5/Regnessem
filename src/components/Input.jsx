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
  required,
}) => (
  <div className="form-control">
    {label && (
      <label htmlFor={label} className="label">
        <span className="label-text">{label}</span>
      </label>
    )}
    <input
      required={required}
      type={type}
      name={name}
      id={id}
      className="input"
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
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
  required: PropTypes.bool,
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  name: '',
  id: '',
  required: true,
  onChange: () => {},
  onBlur: () => {},
};

export default Input;
