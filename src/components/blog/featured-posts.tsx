import { Post } from "@/types/blog"
import { PostCard } from "./post-card"

interface FeaturedPostsProps {
  posts: Post[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  const [mainPost, ...otherPosts] = posts

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Featured Stories</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mainPost && <PostCard post={mainPost} variant="featured" />}
        <div className="grid gap-6">
          {otherPosts.slice(0, 2).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
