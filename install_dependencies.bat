@echo off
REM ==============================================================================
REM PROJECT SHWAS — WINDOWS BATCH PACKAGE INSTALLATION & PIPELINE AUDIT UTILITY
REM File Name: install_dependencies.bat
REM ==============================================================================
title Project Shwas — Automated Dependency Setup Ingestion

echo ===================================================================
echo 🚀 STARTING SHWAS MODULE PROCUREMENT AND RUNTIME AUDIT PIPELINE
echo ===================================================================
echo.

REM Step 1: Verify if Node.js runtime and npm are installed on the host system machine
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo ❌ CRITICAL FAULT: Node.js was not detected on this computer system.
    echo Please install Node.js from https://nodejs.org before running this setup.
    echo.
    pause
    exit /b
)

REM Step 2: Clear historical caches to prevent corrupted file installation hooks
echo 🧹 Clearing historical local npm package cache streams...
call npm cache clean --force >nul 2>&1

REM Step 3: Execute clean install matching the package.json manifest specifications exactly
echo 📦 Fetching security tracking, database, and map server libraries...
call npm install
if %errorlevel% neq 0 (
    color 0C
    echo ❌ CONFIGURATION ERROR: Dependency node installation pipeline crashed.
    pause
    exit /b
)

REM Step 4: Run the unified verification pipeline to validate software integrity
echo.
echo ===================================================================
echo 🔍 RUNNING MULTI-STAGE TESTING PIPELINE FOR AUDIT VALIDATION
echo ===================================================================
call npm test

if %errorlevel% neq 0 (
    color 0E
    echo ⚠️ AUDIT ALERT: Code syntax or framework integration unit tests failed.
    echo Check error outputs rendered in the terminal console screen.
    echo.
    pause
    exit /b
)

color 0A
echo.
echo ===================================================================
echo ✅ ENVIRONMENT READY: All components and dependencies are operational.
echo To boot your local tracking dashboard server, enter: npm start
echo ===================================================================
echo.
pause
