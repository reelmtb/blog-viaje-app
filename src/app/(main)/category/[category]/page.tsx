import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts } from "@/lib/blog"
import { PostList } from "@/components/blog/post-list"
import { BlogCategory, CATEGORY_CONFIG } from "@/types/blog"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

const validCategories = Object.keys(CATEGORY_CONFIG) as BlogCategory[]

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params

  if (!validCategories.includes(category as BlogCategory)) {
    return {}
  }

  const config = CATEGORY_CONFIG[category as BlogCategory]

  return {
    title: `${config.label} Travel Guides | Viaje`,
    description: config.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params

  if (!validCategories.includes(category as BlogCategory)) {
    notFound()
  }

  const config = CATEGORY_CONFIG[category as BlogCategory]
  const posts = await getAllPosts({ category: category as BlogCategory })

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{config.label}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {config.description}
        </p>
      </div>
      <PostList posts={posts} />
    </div>
  )
}
