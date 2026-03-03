import Image from "next/image"
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react"
import { Post } from "@/types/blog"
import { CategoryBadge } from "./category-badge"

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-8">
      <div className="mb-4">
        <CategoryBadge category={post.category} asLink />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {post.title}
      </h1>
      <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
        {post.author && (
          <div className="flex items-center gap-1">
            <UserIcon className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="h-4 w-4" />
          <span>{post.readingTime}</span>
        </div>
      </div>
      {post.featuredImage && (
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-muted">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  )
}
