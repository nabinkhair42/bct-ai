'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"

export function ScrapeButton() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleScrape() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/scrape')
      if (!response.ok) {
        throw new Error('Scraping failed')
      }
      toast({
        title: 'Completed',
        description: 'Scraping completed successfully',
        variant: "default" 
      })
    } catch (error) {
      console.error('Error during scraping:', error)
      toast({
        title: 'Encountered an error',
        description: 'Scraping failed to complete',
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleScrape} disabled={isLoading}>
      {isLoading ? 'Scraping...' : 'Start Scraping'}
    </Button>
  )
}

