import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "lucide-react"
import { Post } from "@/types/blog"
import { CategoryBadge } from "./category-badge"

interface PostCardProps {
  post: Post
  variant?: "default" | "featured"
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const isFeatured = variant === "featured"

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card
        className={cn(
          "overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all hover:border-blue-500/50 cursor-pointer group h-full",
          isFeatured && "md:flex md:flex-row"
        )}
      >
        <div
          className={cn(
            "relative aspect-[16/9] overflow-hidden bg-muted",
            isFeatured && "md:w-1/2 md:aspect-auto md:min-h-[280px]"
          )}
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20" />
          )}
        </div>
        <div className={cn("flex flex-col", isFeatured && "md:w-1/2")}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge category={post.category} />
            </div>
            <CardTitle
              className={cn(
                "group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2",
                isFeatured ? "text-2xl" : "text-xl"
              )}
            >
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p className="text-muted-foreground line-clamp-2 mb-4 flex-1">
              {post.description}
            </p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
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
              <ArrowRightIcon className="h-4 w-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
