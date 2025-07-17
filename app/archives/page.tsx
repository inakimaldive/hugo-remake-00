import { BlogLayout } from "@/components/layout/blog-layout"
import { ArchivesList } from "@/components/blog/archives-list"
import { getAllPosts } from "@/lib/blog"

export default async function ArchivesPage() {
  const posts = await getAllPosts()

  return (
    <BlogLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Archives</h1>
          <p className="text-muted-foreground">Browse all posts by year</p>
        </div>
        <ArchivesList posts={posts} />
      </div>
    </BlogLayout>
  )
}
