import React from 'react';
import styles from './FormInput.module.css';

/**
 * 表单输入字段组件
 * 提供一个带标签的输入字段
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.id - 输入字段ID
 * @param {string} props.label - 输入字段标签
 * @param {string} props.type - 输入字段类型
 * @param {string} props.name - 输入字段名称
 * @param {string} props.placeholder - 输入字段占位符
 * @param {boolean} props.required - 是否必填
 * @param {string} props.autoComplete - 自动完成属性
 * @param {function} props.onChange - 值变化时的回调函数
 * @param {string} props.value - 输入字段值
 */
const FormInput = ({
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
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name || id}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
