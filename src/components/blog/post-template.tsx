import { Post } from "@/types/blog"
import { PostHeader } from "./post-header"
import { PostContent } from "./post-content"
import { RelatedPosts } from "./related-posts"

interface PostTemplateProps {
  post: Post
  relatedPosts: Post[]
}

export function PostTemplate({ post, relatedPosts }: PostTemplateProps) {
  return (
    <>
      <article className="max-w-4xl mx-auto">
        <PostHeader post={post} />
        <PostContent content={post.content} />
      </article>
      <div className="max-w-6xl mx-auto">
        <RelatedPosts posts={relatedPosts} />
      </div>
    </>
  )
}
