-- migrations/001_create_feedback.sql
-- Apply in Neon SQL editor: neon.tech → your project → SQL Editor
-- UP
CREATE TABLE IF NOT EXISTS feedback (
  id BIGSERIAL PRIMARY KEY,
  name_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_feedback_created ON feedback (created_at DESC);

-- DOWN
-- DROP INDEX IF EXISTS idx_feedback_created;
-- DROP TABLE IF EXISTS feedback;
