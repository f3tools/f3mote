-- Add shortId column for tunnel subdomain (_t-{shortId}.relay.example.com)
ALTER TABLE sessions ADD COLUMN shortId TEXT;
