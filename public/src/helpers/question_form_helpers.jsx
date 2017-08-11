import React from 'react';
import FieldGroup from '../components/form/field_group';
import TextArea from '../components/form/text_area';
import Dropdown from '../components/form/dropdown';
import OptionPlus from '../components/form/option_plus';

module.exports = {
  renderQuestionField(field) {
    const errorClass = `${field.meta.touched && field.meta.error ? 'has-error' : ''}`;
    return (
      <FieldGroup
        className={errorClass}
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
    const errorClass = `${field.meta.touched && field.meta.error ? 'has-error' : ''}`;
    return (
      <TextArea
        className={errorClass}
        name={field.name}
        label={field.label}
        help={field.helpText}
        placeholder={field.label}
        {...field.input}
      />
    );
  },
  renderQuestionTypeDropdown(field) {
    const errorClass = `${field.meta.touched && field.meta.error ? 'has-error' : ''}`;
    return (
      <Dropdown
        className={errorClass}
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
    const errorClass = `${field.meta.touched && field.meta.error ? 'has-error' : ''}`;
    return (
      <OptionPlus
        className={errorClass}
        type="text"
        name={`${field.name}-${field.num}`}
        label={field.label}
        help={field.helpText}
        placeholder={field.label}
        num={field.num}
        removeOnClick={field.removeOnClick}
        {...field.input}
      />
    );
  }
};
