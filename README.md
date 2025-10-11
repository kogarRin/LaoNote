# LaoNote

基于 Vue 3 和 Electron 构建的个人练习桌面笔记应用

## 技术架构

- **前端框架**：Vue 3 + `<script setup>` 语法
- **构建工具**：Vite
- **桌面应用框架**：Electron
- **数据存储**：本地 JSON 文件
- **目录结构**：
  - `src/`：Vue 3 应用源代码，包含组件、路由、样式等
  - `electron/`：Electron 主进程和预加载脚本
  - `data/`：本地数据存储目录
  - `public/`：静态资源文件
  - `style.css`：全局样式定义
  - `vite.config.js`：Vite 构建配置

## 开发与运行

### 开发环境搭建

1. 确保已安装 Node.js 和 npm
2. 克隆项目仓库
3. 进入项目目录并安装依赖：
   ```bash
   npm install
   ```
4. 启动开发服务器：
   ```bash
   npm run dev
   ```

### 构建与打包

- 构建生产版本：
  ```bash
  npm run build
  ```
- 打包为桌面应用（需安装 electron-builder）：
  ```bash
  npm run electron:build
  ```


欢迎贡献代码和提出建议！请遵循以下步骤：
1. Fork 项目仓库
2. 创建新分支 (`git checkout -b feature/new-feature`)
3. 提交更改 (`git commit -m 'Add new feature'`)
4. 推送分支 (`git push origin feature/new-feature`)
5. 提交 Pull Request
