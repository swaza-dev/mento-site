-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated reads" ON waitlist;

-- Recreate the policy to allow anyone to insert
CREATE POLICY "Enable insert for anyone"
ON waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Optional: Allow anyone to read (you can restrict this later)
CREATE POLICY "Enable read for anyone"
ON waitlist
FOR SELECT
TO anon, authenticated
USING (true);

