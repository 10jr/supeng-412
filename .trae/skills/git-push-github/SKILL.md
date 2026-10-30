---
name: git-push-github
description: Initialize git repo, commit all changes, and push to GitHub remote. Use when the user asks to commit code, push to GitHub, upload project, or save work to repository. Do not use for single-file operations or PR reviews.
---

# Git Push to GitHub

将当前项目初始化为 Git 仓库，提交所有变更，并推送到 GitHub 远程仓库。

## 远程仓库配置

- **远程地址**: `https://github.com/10jr/supeng-412.git`
- **SSH 密钥**: 已配置 ed25519 公钥，位于 `~/.ssh/id_ed25519`

## 执行步骤

### 1. 检查并初始化 Git 仓库

```powershell
# 检查是否已有 .git 目录
if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}
```

### 2. 配置远程仓库

```powershell
# 检查是否已有远程
$remoteExists = git remote 2>$null | Select-String -Pattern "origin"
if (-not $remoteExists) {
    git remote add origin https://github.com/10jr/supeng-412.git
} else {
    # 更新远程地址（确保使用正确的 URL）
    git remote set-url origin https://github.com/10jr/supeng-412.git
}
```

### 3. 添加 .gitignore（首次初始化时）

如果是首次初始化 Git 仓库，检查是否存在 `.gitignore`，不存在则创建一个基础版本，至少包含：

```
node_modules/
.env
.DS_Store
*.log
.vscode/
.idea/
dist/
build/
*.tmp
```

### 4. 暂存并提交

```powershell
# 暂存所有变更
git add -A

# 检查是否有内容可提交
$changes = git status --porcelain
if ($changes) {
    # 从用户消息中提取 commit message，或使用默认消息
    $commitMsg = if ($userCommitMsg) { $userCommitMsg } else { "feat: 更新项目代码 $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }
    git commit -m $commitMsg
} else {
    Write-Output "没有需要提交的变更"
}
```

### 5. 推送到远程

```powershell
# 推送到 main 分支
git push -u origin main
```

如果推送失败（远程已有内容），先尝试拉取合并：

```powershell
git pull origin main --rebase
git push -u origin main
```

## 注意事项

- 执行前确认当前目录是项目根目录
- 如果有未追踪的大文件或敏感信息，提醒用户检查
- 推送失败时，展示具体错误信息并协助排查
- 私有仓库需要确认 SSH 公钥已添加到 GitHub 账号

## 完整执行脚本

将以上步骤组合为单一 PowerShell 脚本顺序执行，逐步检查每一步的退出码，失败时停止并报告错误。
