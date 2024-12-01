import { supabase } from './supabaseConfig';

async function setupDatabase() {
  const { error } = await supabase.from('blog_posts').insert({
    id: 'dummy',
    title: 'Dummy Post',
    content: 'This is a dummy post to create the table.',
    url: 'https://bctengineeringnotes.blogspot.com',
    date: new Date().toISOString(),
    category: 'Dummy'
  });

  if (error) {
    console.error('Error setting up database:', error);
  } else {
    console.log('Database setup completed successfully');
  }

  // Now, let's set up the proper schema
  const { error: schemaError } = await supabase.rpc('create_blog_posts_table');

  if (schemaError) {
    console.error('Error setting up schema:', schemaError);
  } else {
    console.log('Schema setup completed successfully');
  }
}

setupDatabase();

