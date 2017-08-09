import React from 'react';

export default function renderField(field) {
  const className = `form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`;
  return (
    <div className={className}>
      <label htmlFor={field.label}>{field.label}
        <input
          type={!!field.label
                && field.label === 'Confirm Password'
                ? 'password'
                : field.label}
          className="form-control"
          placeholder={field.label}
          {...field.input}
        />
      </label>
      <div className="text-danger">
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </div>
  );
}

export default function renderSelectOptions(option) {
  return (
    <option key={option} value={option}>{option}</option>
  );
}
