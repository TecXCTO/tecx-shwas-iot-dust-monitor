#!/bin/bash
# ==============================================================================
# PROJECT SHWAS — AUTOMATED FEATURE BRANCH POST-MERGE PURGE UTILITY
# File Name: purge_merged_branches.sh
# ==============================================================================

echo "🔄 Fetching updated branch tracking layouts from remote GitHub host..."
git fetch prune

echo "🔍 Scanning for feature branches safely merged into 'main'..."

# Switch to main branch to ensure accurate tracking reference context
git checkout main
git pull origin main

# Extract list of merged branches, ignoring core structural system lines
merged_branches=$(git branch -r --merged | grep 'origin/' | grep -v 'EHEAD' | grep -v 'origin/main' | grep -v 'origin/staging' | grep -v 'origin/development' | sed 's/origin\///')

if [ -z "$merged_branches" ]; then
    echo "✨ Clean: No stale feature branches require removal."
    exit 0
fi

echo "🧹 The following merged feature branches will be deleted:"
echo "$merged_branches"
echo "--------------------------------------------------------"

for branch in $merged_branches; do
    branch=$(echo "$branch" | xargs) # Clear whitespace parameters
    
    echo "🗑️ Purging remote branch: origin/$branch"
    git push origin --delete "$branch"
    
    echo "🗑️ Purging localized branch: $branch"
    git branch -d "$branch"
done

echo "✅ Branch cleanup routine complete."

