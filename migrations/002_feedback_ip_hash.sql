-- migrations/002_feedback_ip_hash.sql
-- Apply in Neon SQL editor: neon.tech → your project → SQL Editor
-- Run this before deploying the code that writes ip_hash.
-- UP
ALTER TABLE feedback ADD COLUMN IF NOT EXISTS ip_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_feedback_ip_recent ON feedback (ip_hash, created_at DESC);

-- DOWN
-- DROP INDEX IF EXISTS idx_feedback_ip_recent;
-- ALTER TABLE feedback DROP COLUMN IF EXISTS ip_hash;
