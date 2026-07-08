#!/bin/bash
# ==============================================================================
# PROJECT SHWAS — UNIX BATCH PACKAGE INSTALLATION & PIPELINE AUDIT UTILITY
# File Name: install_dependencies.sh
# ==============================================================================

# Custom console accent hex color coding formats
RED='\033[0;31%s'
GREEN='\033[0;32%s'
YELLOW='\033[0;33%s'
NC='\033[0m' # No Color format reset

echo -e "${YELLOW}🚀 STARTING SHWAS MODULE PROCUREMENT AND RUNTIME AUDIT PIPELINE${NC}"

# Step 1: System check for installation packages tools
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ CRITICAL FAULT: Node.js runtime environment was not found.${NC}"
    echo "Please download and install Node.js from https://nodejs.org first."
    exit 1
fi

# Step 2: Clean install using the local package file tree matrix
echo "🧹 Purging cache buffers..."
npm cache clean --force &> /dev/null

echo "📦 Ingesting production data handling and storage dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ CONFIGURATION ERROR: Sourcing package dependency streams crashed.${NC}"
    exit 1
fi

# Step 3: Kickstart the automated multi-stage test pipeline script blocks
echo -e "\n${YELLOW}🔍 RUNNING MULTI-STAGE TESTING PIPELINE FOR AUDIT VALIDATION${NC}"
npm test

if [ $? -ne 0 ]; then
    echo -e "${RED}⚠️ AUDIT ALERT: Code syntax or framework integration unit tests failed.${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ ENVIRONMENT READY: All components and dependencies are operational.${NC}"
echo "To boot your local tracking dashboard server, enter: npm start"
