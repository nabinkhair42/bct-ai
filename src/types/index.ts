export interface ResourceLink {
  type: 'pdf' | 'youtube' | 'other'
  url: string
  title: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  url: string
  date: string
  category: string
  comments_count: number
  read_more_link: string
  resources: ResourceLink[]
}
