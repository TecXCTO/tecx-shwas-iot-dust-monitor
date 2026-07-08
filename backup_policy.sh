#!/bin/sh# Project Shwas - Automated Data Backup & Retention Script

BACKUP_DIR="./database/backups"
DB_FILE="./database/shwas_compliance.db"
TIMESTAMP=$(date +"%Y-%m-%d_%H%M%S")

mkdir -p "$BACKUP_DIR"
sqlite3 "$DB_FILE" ".backup '$BACKUP_DIR/shwas_backup_$TIMESTAMP.db'"
gzip "$BACKUP_DIR/shwas_backup_$TIMESTAMP.db"
# Purge logs older than 180 days to manage disk space
sqlite3 "$DB_FILE" "DELETE FROM shwas_dust_logs WHERE datetime(logged_time) < datetime('now', '-180 days');"
sqlite3 "$DB_FILE" "VACUUM;"
# Delete backup artifacts older than 30 days
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +30 -delete
echo ">> Data backup and log maintenance completed successfully."
