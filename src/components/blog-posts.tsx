'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { BlogPost, ResourceLink } from '@/types'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { format } from 'date-fns'
import { MessageSquare, FileText, Youtube, Link } from 'lucide-react'

function ResourceIcon({ type }: { type: ResourceLink['type'] }) {
  switch (type) {
    case 'pdf':
      return <FileText className="h-4 w-4" />
    case 'youtube':
      return <Youtube className="h-4 w-4" />
    default:
      return <Link className="h-4 w-4" />
  }
}

export function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('date', { ascending: false })
        
        if (error) throw error
        
        setPosts(data || [])
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">
              Category: {post.category}
            </div>
            <p className="line-clamp-3">{post.content}</p>
            {post.resources.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Resources:</h4>
                <ul className="space-y-1">
                  {post.resources.map((resource, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <ResourceIcon type={resource.type} />
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-2 text-primary hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className="mt-auto flex justify-between items-center">
            <div className="flex items-center text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.comments_count} comments
            </div>
            <a 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              Read more
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

