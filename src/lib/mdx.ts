import { compileMDX } from "next-mdx-remote/rsc"
import { PostFrontmatter } from "@/types/blog"

export async function compilePostMDX(source: string) {
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  })

  return { content, frontmatter }
}
