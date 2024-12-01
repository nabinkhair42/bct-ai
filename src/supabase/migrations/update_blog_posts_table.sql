-- Add the resources column to the blog_posts table
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS resources JSONB;

-- Create an index on the resources column for better query performance
CREATE INDEX IF NOT EXISTS blog_posts_resources_idx ON public.blog_posts USING GIN (resources);

-- Update the policy to allow authenticated users to update the resources column
CREATE OR REPLACE POLICY "Allow authenticated users to insert/update"
ON public.blog_posts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

