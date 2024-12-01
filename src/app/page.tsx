import { BlogPosts } from '@/components/blog-posts'
import { ScrapeButton } from '@/components/scrape-button'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Engineering Notes Scraper</h1>
      <div className="mb-8">
        <ScrapeButton />
      </div>
      <BlogPosts />
    </main>
  )
}

