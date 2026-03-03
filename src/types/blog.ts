export type BlogCategory =
  | "beach"
  | "city"
  | "adventure"
  | "mountains"
  | "cultural"
  | "food"
  | "budget"

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  category: BlogCategory
  featuredImage: string
  featuredImageAlt: string
  author?: string
  tags?: string[]
  featured?: boolean
  draft?: boolean
}

export interface Post extends PostFrontmatter {
  slug: string
  content: string
  readingTime: string
}

export const CATEGORY_CONFIG: Record<
  BlogCategory,
  {
    label: string
    color: string
    description: string
  }
> = {
  beach: {
    label: "Beach",
    color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
    description: "Sun, sand, and coastal escapes",
  },
  city: {
    label: "City",
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
    description: "Urban adventures and city breaks",
  },
  adventure: {
    label: "Adventure",
    color: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
    description: "Thrilling experiences and outdoor activities",
  },
  mountains: {
    label: "Mountains",
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    description: "Alpine retreats and highland journeys",
  },
  cultural: {
    label: "Cultural",
    color: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    description: "Heritage sites and local traditions",
  },
  food: {
    label: "Food & Drink",
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    description: "Culinary journeys and local cuisine",
  },
  budget: {
    label: "Budget",
    color: "bg-green-500/10 text-green-700 dark:text-green-300",
    description: "Travel more, spend less",
  },
}
