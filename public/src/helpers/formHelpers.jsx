import React from 'react';

export function renderField(field) {
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
          size="51"
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

export function renderTextArea(field) {
  const className = `form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`;
  return (
    <div className={className}>
      <label htmlFor={field.label}>{field.label}</label>
      <textarea
        cols="50"
        rows="6"
        className="form-control"
        placeholder={field.label}
        {...field.input}
      />
      <div className="text-danger">
        {field.meta.touched ? field.meta.error : ''}
      </div>
    </div>
  );
}

function renderSelectOptions(options, prop) {
  return (
    options.map(option =>
      (
        <option
          key={option[prop]}
          value={option.id}
        >
          {option[prop]}
        </option>
      )
    )
  );
}


export function renderDropdown(field) {
  const className = `row form-group ${field.meta.touched && field.meta.error ? 'has-error' : ''}`;
  return (
    <div className={className}>
      <label htmlFor={`dropdown-basic-${field.id}`}>{field.label}</label>
      <select
        id={`dropdown-basic-${field.id}`}
        className="form-control"
        {...field.input}
      >
        <option>Select Question</option>
        {renderSelectOptions(field.options, field.keyToUse)}
      </select>
    </div>
  );
}
