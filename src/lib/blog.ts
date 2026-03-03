import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { Post, PostFrontmatter, BlogCategory } from "@/types/blog"

const postsDirectory = path.join(process.cwd(), "content/posts")

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"))
}

export async function getAllPosts(options?: {
  category?: BlogCategory
  featured?: boolean
  limit?: number
  excludeDrafts?: boolean
}): Promise<Post[]> {
  const files = getPostFiles()
  const excludeDrafts = options?.excludeDrafts ?? process.env.NODE_ENV === "production"

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)
      const frontmatter = data as PostFrontmatter

      return {
        ...frontmatter,
        slug,
        content,
        readingTime: readingTime(content).text,
      } as Post
    })
    .filter((post) => {
      if (excludeDrafts && post.draft) return false
      if (options?.category && post.category !== options.category) return false
      if (options?.featured !== undefined && post.featured !== options.featured) return false
      return true
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (options?.limit) {
    return posts.slice(0, options.limit)
  }

  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = data as PostFrontmatter

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: readingTime(content).text,
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const files = getPostFiles()
  return files.map((file) => file.replace(/\.mdx$/, ""))
}

export async function getAllCategories(): Promise<
  { category: BlogCategory; count: number }[]
> {
  const posts = await getAllPosts()
  const categoryCounts = new Map<BlogCategory, number>()

  posts.forEach((post) => {
    const count = categoryCounts.get(post.category) || 0
    categoryCounts.set(post.category, count + 1)
  })

  return Array.from(categoryCounts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getRelatedPosts(
  currentSlug: string,
  category: BlogCategory,
  limit: number = 3
): Promise<Post[]> {
  const posts = await getAllPosts({ category })
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit)
}
