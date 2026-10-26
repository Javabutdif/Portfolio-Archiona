-- migrations/003_feedback_approval.sql
-- Apply in Neon SQL editor: neon.tech → your project → SQL Editor
-- Run this before deploying the code that hides unapproved notes.
-- Notes that are live when approved_at is first added are backfilled as
-- approved, so they stay public. Rerunning does not approve newer notes.
-- UP
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'feedback' AND column_name = 'approved_at'
  ) THEN
    ALTER TABLE feedback ADD COLUMN approved_at TIMESTAMPTZ;
    UPDATE feedback SET approved_at = created_at WHERE deleted_at IS NULL;
  END IF;
END $$;

ALTER TABLE feedback ADD COLUMN IF NOT EXISTS relationship TEXT;

CREATE INDEX IF NOT EXISTS idx_feedback_approved
  ON feedback (approved_at DESC)
  WHERE approved_at IS NOT NULL AND deleted_at IS NULL;

-- DOWN
-- Pending notes become public under the old code: delete unwanted ones first.
-- DROP INDEX IF EXISTS idx_feedback_approved;
-- ALTER TABLE feedback DROP COLUMN IF EXISTS relationship;
-- ALTER TABLE feedback DROP COLUMN IF EXISTS approved_at;
