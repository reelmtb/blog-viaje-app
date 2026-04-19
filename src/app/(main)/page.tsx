import Link from "next/link"
import { ArrowRightIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllPosts, getAllCategories } from "@/lib/blog"
import { FeaturedPosts } from "@/components/blog/featured-posts"
import { PostList } from "@/components/blog/post-list"
import { CATEGORY_CONFIG, BlogCategory } from "@/types/blog"

export default async function HomePage() {
  const [featuredPosts, recentPosts, categories] = await Promise.all([
    getAllPosts({ featured: true, limit: 3 }),
    getAllPosts({ limit: 6 }),
    getAllCategories(),
  ])

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12 md:py-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Discover Your Next{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Adventure
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Travel guides, destination tips, and inspiration to help you plan
          unforgettable trips around the world.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/blog">
            <Button
              size="lg"
              className="text-lg px-8 h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30"
            >
              Explore Blog
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

    
      {/* Trip Planning Section */}
      {/*
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 md:p-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
              <MapPinIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Plan Your Group Trip</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create trips, coordinate schedules, and vote on destinations with your friends and family.
              Make planning effortless and fun.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30">
              <Link href="/trip/new">
                <UsersIcon className="h-5 w-5" />
                Start Planning
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/trip/new">
                Join a Trip
              </Link>
            </Button>
          </div>
        </div>
      </section>
      */}

      {/* Featured Posts */}
      {featuredPosts.length > 0 && <FeaturedPosts posts={featuredPosts} />}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Explore by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {(Object.keys(CATEGORY_CONFIG) as BlogCategory[]).map((cat) => {
              const config = CATEGORY_CONFIG[cat]
              const categoryData = categories.find((c) => c.category === cat)
              return (
                <Link
                  key={cat}
                  href={`/category/${cat}`}
                  className="group flex flex-col items-center p-4 rounded-xl border border-border bg-card hover:shadow-lg hover:border-blue-500/50 transition-all text-center"
                >
                  <span
                    className={`text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}
                  >
                    {config.label}
                  </span>
                  {categoryData && (
                    <span className="text-xs text-muted-foreground mt-1">
                      {categoryData.count} {categoryData.count === 1 ? "post" : "posts"}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <PostList posts={recentPosts} />
        </section>
      )}

    </div>
  )
}
