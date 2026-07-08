// Add inside your existing express configuration block in server.js:
app.use(express.json()); // Ensures express parses incoming JSON webhook payloads

/**
 * GitHub Webhook Event Receiver Route Interface
 * Listens for repository push actions and flags updates across control channels.
 */
app.post('/api/v1/shwas/github-webhook', (req, res) => {
    const payload = req.body;

    // Check that the incoming payload represents a standard branch push event
    if (payload && payload.ref) {
        const branchPath = payload.ref; // e.g., "refs/heads/feature/pmsa003i-calibration"
        const branchName = branchPath.replace('refs/heads/', '');
        const committer = payload.pusher ? payload.pusher.name : "Unknown Contributor";
        const commitMessage = payload.head_commit ? payload.head_commit.message : "No message provided.";

        console.log(`[📡 SHWAS GIT AUDIT]: Branch update detected: '${branchName}' by user: ${committer}`);
        console.log(`   -> Head Message: ${commitMessage}`);

        // If an update hits the critical staging branch, broadcast a system flag alert
        if (branchName === "staging") {
            console.warn("⚠️ ALERT: Pre-release Staging branch updated. Prepare QA test-bench calibration cycles.");
        }

        return res.status(200).json({ status: "Audit log processed successfully" });
    }

    res.status(400).json({ error: "Invalid payload layout signature" });
});

