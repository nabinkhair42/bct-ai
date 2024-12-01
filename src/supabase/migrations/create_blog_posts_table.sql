create table if not exists public.blog_posts (
    id text primary key,
    title text not null,
    content text,
    url text not null,
    date timestamp with time zone,
    category text,
    comments_count integer default 0,
    read_more_link text,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create indexes for better query performance
create index if not exists blog_posts_date_idx on public.blog_posts(date);
create index if not exists blog_posts_category_idx on public.blog_posts(category);

-- Enable Row Level Security
alter table public.blog_posts enable row level security;

-- Create a policy that allows all users to read
create policy "Allow public read access"
    on public.blog_posts for select
    using (true);

-- Create a policy that allows only authenticated users to insert/update
create policy "Allow authenticated users to insert/update"
    on public.blog_posts for insert
    to authenticated
    with check (true);

