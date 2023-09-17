import { TextFieldStyleProps, inputBoxStyle, inputBoxTextStyle } from './styles/InputField.styles';

import React, { useState } from 'react';
import { TextField } from '@fluentui/react';

interface InputFieldProps {
  setValue(MeetingUrl: string): void;
  value: string;
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  required?: boolean;
}

const InputFieldComponent = (props: InputFieldProps): JSX.Element => {
  const propsOrDefaults = (props: InputFieldProps) => {
    return {
      ...props,
      required: !props.required ? false : props.required,
      label: !props.label ? '' : props.label,
      errorMessage: !props.errorMessage ? '' : props.errorMessage,
      placeholder: !props.placeholder ? '' : props.placeholder
    };
  };

  const { setValue, value, label, errorMessage, placeholder, required } = propsOrDefaults(props);

  const [touched, setTouched] = useState(false);

  const onTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    if (newValue === undefined) {
      return;
    }
    setValue(newValue);
    if (!touched) {
      setTouched(true);
    }
  };
  return (
    <TextField
      autoComplete="off"
      value={value}
      inputClassName={inputBoxTextStyle}
      label={label}
      className={inputBoxStyle}
      onChange={onTextChange}
      placeholder={placeholder}
      styles={TextFieldStyleProps}
      errorMessage={required && !value && touched ? errorMessage : undefined}
      required={true}
    />
  );
};

export const InputField = (props: InputFieldProps): JSX.Element => <InputFieldComponent {...props} />;
