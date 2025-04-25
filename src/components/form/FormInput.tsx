import React from 'react';
import { FormInputProps } from '../../types';

/**
 * 表单输入字段组件
 * 提供一个带标签的输入字段
 */
const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  required = false,
  autoComplete,
  onChange,
  value,
  ...rest
}) => {
  return (
    <div className="mb-5 text-left">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name || id}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        className="form-input"
        {...rest}
      />
    </div>
  );
};

export default FormInput;
