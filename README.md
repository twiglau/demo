# 笔记

## 环境配置

- prettier 配置
- husky 配置
  > 用prettier规则覆盖eslint部分规则 （eslint-config-prettier）
- 规范git提交格式 commitlint 库

## Mock 数据

- json-server 库： `npm i json-server -g`
- 创建文件： db.json
- 监听： `npx json-server db.json`

## CSS-in-JS

## 如何在打包后，本地运行生产包

```sh
npm run build

# 安装本地 serve
npm i serve

# 启动打包后文件
# 如果全局安装，直接使用
serve -s build
# 如果项目中安装，使用 npx 启动
npx serve -s build
```
