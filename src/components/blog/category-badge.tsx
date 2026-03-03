import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BlogCategory, CATEGORY_CONFIG } from "@/types/blog"
import { cn } from "@/lib/utils"

interface CategoryBadgeProps {
  category: BlogCategory
  asLink?: boolean
  className?: string
}

export function CategoryBadge({
  category,
  asLink = false,
  className,
}: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category]
  const badgeContent = (
    <Badge
      variant="secondary"
      className={cn(config.color, "border-transparent", className)}
    >
      {config.label}
    </Badge>
  )

  if (asLink) {
    return (
      <Link href={`/category/${category}`} className="hover:opacity-80 transition-opacity">
        {badgeContent}
      </Link>
    )
  }

  return badgeContent
}
