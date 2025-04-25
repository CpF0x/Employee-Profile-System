# 复制组件文件
Copy-Item -Path "src\components\theme\*.tsx" -Destination "react-app\src\components\theme\" -Force
Copy-Item -Path "src\components\form\*.tsx" -Destination "react-app\src\components\form\" -Force
Copy-Item -Path "src\components\login\*.tsx" -Destination "react-app\src\components\login\" -Force
Copy-Item -Path "src\components\particles\*.tsx" -Destination "react-app\src\components\particles\" -Force

# 复制上下文文件
Copy-Item -Path "src\context\*.tsx" -Destination "react-app\src\context\" -Force

# 复制钩子文件
Copy-Item -Path "src\hooks\*.ts" -Destination "react-app\src\hooks\" -Force

# 复制页面文件
Copy-Item -Path "src\pages\*.tsx" -Destination "react-app\src\pages\" -Force

# 复制工具函数文件
Copy-Item -Path "src\utils\*.ts" -Destination "react-app\src\utils\" -Force

# 复制类型定义文件
Copy-Item -Path "src\types\*.ts" -Destination "react-app\src\types\" -Force
Copy-Item -Path "src\types\*.d.ts" -Destination "react-app\src\types\" -Force

# 复制主应用文件
Copy-Item -Path "src\App.tsx" -Destination "react-app\src\" -Force
Copy-Item -Path "src\main.tsx" -Destination "react-app\src\" -Force

Write-Host "所有文件复制完成！"
