#!/bin/bash
# File Name: init_git_architecture.sh
# Purpose: Automates Project Shwas 3-Branch Git Repository Setup

echo "⚙️ Initializing local Git repository architecture..."
git init -b main

echo "📦 Staging and committing project codebase files..."
git add .
git commit -m "Initialize Project Shwas protected production core"

# NOTE: Replace the URL below with your actual corporate GitHub repository link
git remote add origin https://github.com
echo "🚀 Pushing stable production core to 'main' branch..."
git push -u origin main

echo "🟡 Branching and uploading pre-release QA space to 'staging'..."
git checkout -b staging
git push -u origin staging

echo "🔵 Branching and uploading active engineering workspace to 'development'..."
git checkout -b development
git push -u origin development

echo "✅ Git Branching Architecture Completed Successfully."
git branch -a

