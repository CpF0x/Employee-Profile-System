/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否有效
 */
export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * 验证密码强度
 * @param password 密码
 * @returns 密码强度评级 (0-4)
 */
export const validatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  // 长度检查
  if (password.length >= 8) strength += 1;
  
  // 包含小写字母
  if (/[a-z]/.test(password)) strength += 1;
  
  // 包含大写字母
  if (/[A-Z]/.test(password)) strength += 1;
  
  // 包含数字
  if (/[0-9]/.test(password)) strength += 1;
  
  // 包含特殊字符
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  
  return strength;
};

/**
 * 获取密码强度描述
 * @param strength 密码强度评级 (0-4)
 * @returns 密码强度描述
 */
export const getPasswordStrengthText = (strength: number): string => {
  switch (strength) {
    case 0:
      return '非常弱';
    case 1:
      return '弱';
    case 2:
      return '中等';
    case 3:
      return '强';
    case 4:
    case 5:
      return '非常强';
    default:
      return '未知';
  }
};

/**
 * 表单验证
 * @param formData 表单数据
 * @returns 验证结果和错误信息
 */
export const validateLoginForm = (email: string, password: string): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  // 验证邮箱
  if (!email) {
    errors.email = '请输入邮箱地址';
  } else if (!validateEmail(email)) {
    errors.email = '请输入有效的邮箱地址';
  }
  
  // 验证密码
  if (!password) {
    errors.password = '请输入密码';
  } else if (password.length < 6) {
    errors.password = '密码长度至少为6个字符';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
