import React from 'react';
import FieldGroup from '../components/form/field_group';
import TextArea from '../components/form/text_area';
import Dropdown from '../components/form/dropdown';

module.exports = {
  renderQuestionField(field) {
    const errorClass = field.meta.touched && field.meta.error ? 'error' : '';
    const errorText = field.meta.touched ? field.meta.error : '';
    return (
      <FieldGroup
        errorClass={errorClass}
        errorText={errorText}
        type="text"
        name={field.name}
        label={field.label}
        help={field.helpText}
        placeholder={field.label}
        {...field.input}
      />
    );
  },
  renderQuestionTextArea(field) {
    const errorClass = field.meta.touched && field.meta.error ? 'error' : '';
    const errorText = field.meta.touched ? field.meta.error : '';
    return (
      <TextArea
        errorClass={errorClass}
        errorText={errorText}
        name={field.name}
        label={field.label}
        help={field.helpText}
        placeholder={field.label}
        {...field.input}
      />
    );
  },
  renderQuestionTypeDropdown(field) {
    const errorClass = field.meta.touched && field.meta.error ? 'error' : '';
    const errorText = field.meta.touched ? field.meta.error : '';
    return (
      <Dropdown
        errorClass={errorClass}
        errorText={errorText}
        name={field.name}
        label={field.label}
        help={field.helpText}
        placeholder={field.placeholder}
        options={field.options}
        {...field.input}
      />
    );
  },
  renderQuestionOption(field) {
    return (
      <FieldGroup
        type="text"
        name={`${field.name}-${field.num}`}
        label={`${field.label} ${field.num}`}
        help={field.helpText}
        placeholder={'ex. yes, no, maybe'}
        {...field.input}
      />
    );
  }
};
