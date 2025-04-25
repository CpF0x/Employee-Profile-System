import { useState, useCallback, ChangeEvent } from 'react';
import { validateLoginForm } from '../utils/validation';
import { LoginFormData } from '../types';

interface FormErrors {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

interface UseFormReturn {
  formData: LoginFormData;
  errors: FormErrors;
  touched: Record<string, boolean>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (callback: (data: LoginFormData) => void) => (e: React.FormEvent) => void;
  isValid: boolean;
  resetForm: () => void;
}

/**
 * 表单状态管理钩子
 * @param initialValues 初始表单值
 * @returns 表单状态和处理函数
 */
export const useForm = (initialValues: LoginFormData): UseFormReturn => {
  const [formData, setFormData] = useState<LoginFormData>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  // 验证表单
  const validateForm = useCallback(() => {
    const { isValid, errors } = validateLoginForm(formData.email, formData.password);
    setErrors(errors);
    setIsValid(isValid);
    return isValid;
  }, [formData.email, formData.password]);

  // 处理输入变化
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  // 处理输入框失焦
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateForm();
  }, [validateForm]);

  // 处理表单提交
  const handleSubmit = useCallback((callback: (data: LoginFormData) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      
      // 标记所有字段为已触摸
      const allTouched = Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      
      setTouched(allTouched);
      
      // 验证表单
      const isFormValid = validateForm();
      
      // 如果表单有效，调用回调函数
      if (isFormValid) {
        callback(formData);
      }
    };
  }, [formData, validateForm]);

  // 重置表单
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setIsValid(false);
  }, [initialValues]);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    resetForm
  };
};
