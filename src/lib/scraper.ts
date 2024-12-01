import axios from 'axios'
import * as cheerio from 'cheerio'
import { BlogPost, ResourceLink } from '@/types'
import { supabase } from './supabase'
import { parse } from 'date-fns'

function extractResources($: cheerio.CheerioAPI, content: string): ResourceLink[] {
  const resources: ResourceLink[] = []
  const $content = cheerio.load(content)

  // Extract PDF links
  $content('a[href$=".pdf"]').each((_, el) => {
    resources.push({
      type: 'pdf',
      url: $(el).attr('href') || '',
      title: $(el).text() || 'PDF Resource'
    })
  })

  // Extract YouTube links
  $content('a[href*="youtube.com"], a[href*="youtu.be"]').each((_, el) => {
    resources.push({
      type: 'youtube',
      url: $(el).attr('href') || '',
      title: $(el).text() || 'YouTube Resource'
    })
  })

  // Extract other links
  $content('a').not('a[href$=".pdf"], a[href*="youtube.com"], a[href*="youtu.be"]').each((_, el) => {
    resources.push({
      type: 'other',
      url: $(el).attr('href') || '',
      title: $(el).text() || 'Other Resource'
    })
  })

  return resources
}

export async function scrapeWebsite(url: string): Promise<{ posts: BlogPost[], nextPageUrl: string | null }> {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    
    const posts: BlogPost[] = []

    $('.blog-posts .post').each((_, element) => {
      const postElement = $(element)
      const title = postElement.find('.post-title a').text().trim()
      const content = postElement.find('.post-body').html() || ''
      const postUrl = postElement.find('.post-title a').attr('href') || ''
      const dateText = postElement.find('.date-header').text().trim();
      let parsedDate: string | null = null;
      try {
        const date = parse(dateText, 'MMMM d, yyyy', new Date());
        parsedDate = date.toISOString();
      } catch (dateError) {
        console.error('Error parsing date:', dateText, dateError);
      }
      const category = postElement.find('.post-labels a').first().text().trim()
      const comments_count = parseInt(postElement.find('.comment-link').text().replace(/\D/g, '') || '0')
      const read_more_link = postElement.find('.read-more').attr('href') || postUrl
      const resources = extractResources($, content)

      if (title && postUrl) {
        posts.push({
          id: postUrl,
          title,
          content,
          url: postUrl,
          date: parsedDate || dateText,
          category,
          comments_count,
          read_more_link,
          resources
        })
      }
    })

    const nextPageUrl = $('.blog-pager-older-link').attr('href') || null

    return { posts, nextPageUrl }
  } catch (error) {
    console.error('Error scraping website:', error)
    throw error
  }
}

export async function storeInSupabase(posts: BlogPost[]): Promise<void> {
  for (const post of posts) {
    try {
      let parsedDate: Date | null = null;
      try {
        // Attempt to parse the date string
        parsedDate = parse(post.date, 'MMMM d, yyyy', new Date());
      } catch (dateError) {
        console.error('Error parsing date:', post.date, dateError);
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .upsert(
          {
            id: post.id,
            title: post.title,
            content: post.content,
            url: post.url,
            date: parsedDate instanceof Date && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null,            category: post.category,
            comments_count: post.comments_count,
            read_more_link: post.read_more_link,
            resources: post.resources
          },
          {
            onConflict: 'id'
          }
        )
      
      if (error) {
        console.error('Error inserting data:', error.message);
        console.error('Failed post:', post);
      } else {
        console.log('Successfully stored post:', post.title);
      }
    } catch (error) {
      console.error('Error processing post:', error);
      console.error('Failed post:', post);
    }
  }
}

export async function scrapAllPages(startUrl: string): Promise<void> {
  let currentUrl: string | null = startUrl
  let pageCount = 1

  while (currentUrl) {
    console.log(`Scraping page ${pageCount}:`, currentUrl)
    try {
      const { posts, nextPageUrl } = await scrapeWebsite(currentUrl)
      console.log(`Found ${posts.length} posts on page ${pageCount}`)
      await storeInSupabase(posts)
      currentUrl = nextPageUrl
      pageCount++

      // Add a delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error(`Error processing page ${pageCount}:`, error)
      break
    }
  }
}

