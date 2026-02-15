-- MIGRATION: Schools Complete Schema Update
-- Addresses previous missing columns and adds new requirements (NIT, Email)

ALTER TABLE schools ADD COLUMN IF NOT EXISTS address VARCHAR(255);
ALTER TABLE schools ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE schools ADD COLUMN IF NOT EXISTS nit VARCHAR(20); -- Tax ID
ALTER TABLE schools ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255); -- School Contact Email

-- Ensure users table has what we need (already in schema.sql but good to double check via comment)
-- users table has: id, school_id, full_name, email, password_hash, role
