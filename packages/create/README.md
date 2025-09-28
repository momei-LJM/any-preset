# @momei-x/create

个人模版预设

## 安装

### 全局安装

```bash
npm install -g @momei-x/create
# 或者
yarn global add @momei-x/create
# 或者
pnpm add -g @momei-x/create
```

### 本地安装

```bash
npm install --save-dev @momei-x/create
# 或者
yarn add --dev @momei-x/create
# 或者
pnpm add -D @momei-x/create
```

## 使用方法

### 命令行界面

```bash
# 创建 ESLint 配置
mc create --eslint

# 创建 Prettier 配置
mc create --prettier

# 创建 TypeScript 配置
mc create --typescript

# 创建 Stylelint 配置
mc create --stylelint
```

### 工作原理

当你运行命令时，工具会：

1. **检查依赖**: 验证所需的包是否已安装
2. **安装缺失包**: 如果依赖缺失，会提示自动安装
3. **复制预设文件**: 将相应的配置文件复制到项目根目录
4. **包管理器检测**: 自动检测并使用合适的包管理器 (npm/yarn/pnpm)
5. **Monorepo 支持**: 处理包含工作区配置的 monorepo 项目

## 支持的预设

### ESLint

- **依赖包**: `eslint`, `@antfu/eslint-config`, `eslint-config-prettier/flat`
- **配置文件**: `eslint.config.js`
- **说明**: 使用 Anthony Fu 配置和 Prettier 集成的现代 flat 配置

### Prettier

- **依赖包**: `prettier`
- **配置文件**: `prettier.config.js`
- **说明**: 具有合理默认设置的代码格式化配置

### TypeScript

- **依赖包**: `typescript`
- **配置文件**: `tsconfig.json`
- **说明**: 现代开发的 TypeScript 编译器配置

## 使用示例

### 在新项目中设置 ESLint

```bash
$ mc create --eslint
? You have not installed eslint，install it？ › (Y/n)
? Select a package manager ›
❯ npm
  yarn
  pnpm

✅ eslint
@antfu/eslint-config
eslint-config-prettier/flat installed success！
✅ eslint.config.js created.
```

### 设置多个工具

```bash
# 设置 TypeScript
mc create --typescript

# 设置 Prettier
mc create --prettier

# 设置 ESLint
mc create --eslint
```

## 配置文件

该工具会在项目根目录创建以下配置文件：

- `eslint.config.js` - ESLint flat 配置
- `prettier.config.js` - Prettier 格式化规则
- `tsconfig.json` - TypeScript 编译选项

## 许可证

ISC

## 作者

momei-LJM
