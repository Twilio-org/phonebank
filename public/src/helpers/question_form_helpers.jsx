import React from 'react';
import FieldGroup from '../components/form/field_group';
import TextArea from '../components/form/text_area';
import Dropdown from '../components/form/dropdown';
import OptionPlus from '../components/form/option_plus';

module.exports = {
  renderQuestionField(field) {
    let errorClass = '';
    if (field.meta.touched && field.meta.error) {
      errorClass = 'error';
    } else if (field.meta.touched) {
      errorClass = 'success';
    }
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
    let errorClass = '';
    if (field.meta.touched && field.meta.error) {
      errorClass = 'error';
    } else if (field.meta.touched) {
      errorClass = 'success';
    }
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
    let errorClass = '';
    if (field.meta.touched && field.meta.error) {
      errorClass = 'error';
    } else if (field.meta.touched) {
      errorClass = 'success';
    }
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
      <OptionPlus
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
