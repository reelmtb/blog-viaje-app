import { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import { PostList } from "@/components/blog/post-list"

export const metadata: Metadata = {
  title: "Travel Blog | Viaje",
  description:
    "Discover travel guides, tips, and inspiration for your next adventure.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Travel Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Discover destination guides, travel tips, and inspiration for your
          next adventure.
        </p>
      </div>
      <PostList posts={posts} />
    </div>
  )
}
