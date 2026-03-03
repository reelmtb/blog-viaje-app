import { compileMDX } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx/mdx-components"

interface PostContentProps {
  content: string
}

export async function PostContent({ content }: PostContentProps) {
  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
  })

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl">
      {mdxContent}
    </article>
  )
}
