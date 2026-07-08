# File Name: init_git_architecture.ps1
# Purpose: Windows PowerShell Script for Project Shwas Branching Setup

Write-Host "⚙️ Initializing local Git repository architecture..." -ForegroundColor Cyan
git init -b main

Write-Host "📦 Staging and committing project codebase files..." -ForegroundColor Cyan
git add .
git commit -m "Initialize Project Shwas protected production core"

# NOTE: Replace the URL below with your actual corporate GitHub repository link
git remote add origin https://github.com
Write-Host "🚀 Pushing stable production core to 'main' branch..." -ForegroundColor Green
git push -u origin main

Write-Host "🟡 Branching and uploading pre-release QA space to 'staging'..." -ForegroundColor Yellow
git checkout -b staging
git push -u origin staging

Write-Host "🔵 Branching and uploading active engineering workspace to 'development'..." -ForegroundColor Blue
git checkout -b development
git push -u origin development

Write-Host "✅ Git Branching Architecture Completed Successfully." -ForegroundColor Green
git branch -a

