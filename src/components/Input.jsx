import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  placeholder,
  type,
  name,
  id,
  className,
  value,
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
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
};

Input.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  id: '',
  className: 'input',
  required: true,
  onBlur: () => {},
};

export default Input;
