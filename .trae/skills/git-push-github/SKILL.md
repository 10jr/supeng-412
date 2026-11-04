---
name: git-push-github
description: Initialize git repo, commit all changes, and push to GitHub remote. Use when the user asks to commit code, push to GitHub, upload project, or save work to repository. Do not use for single-file operations or PR reviews.
---

# Git Push to GitHub

将当前项目初始化为 Git 仓库，提交所有变更，并推送到 GitHub 远程仓库。

## 远程仓库配置

- **远程地址 (SSH)**: `git@github.com:10jr/supeng-412.git`
- **SSH 密钥**: ed25519，位于 `C:\Users\苏鹏\.ssh\id_ed25519`
- **GitHub 账号**: 10jr

## Windows SSH 环境（已配置）

| 组件 | 值 |
|------|------|
| SSH Config | `C:\Users\苏鹏\.ssh\config` |
| 远程端口 | Port 443（绕过防火墙对 22 端口的阻挡） |
| Git SSH 命令 | `C:/Windows/System32/OpenSSH/ssh.exe`（已通过 `git config --global core.sshCommand` 设置） |

SSH Config 内容：
```
Host github.com
  HostName ssh.github.com
  Port 443
  User git
  IdentityFile C:\Users\苏鹏\.ssh\id_ed25519
  UserKnownHostsFile C:\Users\苏鹏\.ssh\known_hosts
  GlobalKnownHostsFile NUL
  StrictHostKeyChecking accept-new
  IdentitiesOnly yes
```

## 执行步骤

### 1. 检查并初始化 Git 仓库

```powershell
if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}
```

### 2. 配置远程仓库

```powershell
$remoteExists = git remote 2>$null | Select-String -Pattern "origin"
if (-not $remoteExists) {
    git remote add origin git@github.com:10jr/supeng-412.git
} else {
    git remote set-url origin git@github.com:10jr/supeng-412.git
}
```

### 3. 添加 .gitignore（首次初始化时）

如果是首次初始化 Git 仓库，检查是否存在 `.gitignore`，不存在则创建。至少包含：

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
git add -A
$changes = git status --porcelain
if ($changes) {
    $commitMsg = if ($userCommitMsg) { $userCommitMsg } else { "feat: 更新项目代码 $(Get-Date -Format 'yyyy-MM-dd HH:mm')" }
    git commit -m $commitMsg
} else {
    Write-Output "没有需要提交的变更"
}
```

### 5. 推送到远程

```powershell
git push -u origin main
```

如果推送失败（远程已有内容），先拉取合并：
```powershell
git pull origin main --rebase
git push -u origin main
```

## 故障排查

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| `ssh: connect to host github.com port 22: Connection refused` | 防火墙阻挡 22 端口 | 确认 SSH config 中 `Port 443` 且 `HostName ssh.github.com` |
| `fatal: Permission denied (publickey)` | 密钥未加载或公钥未添加 | 确认 `ssh -T git@github.com` 返回 "Hi 10jr!" |
| `Could not read from remote repository` | Git 使用了 MSYS2 ssh 而非系统 ssh | 运行 `git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"` |
| 中文路径乱码 `\313\325\305\364` | OpenSSH 路径编码问题 | 确保 SSH config 使用 Windows 反斜杠路径 `C:\Users\苏鹏\...` |

## 前置检查

执行前先运行：`ssh -T git@github.com` — 应返回 `Hi 10jr!` 表示认证正常。
