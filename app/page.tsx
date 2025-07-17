import { BlogLayout } from "@/components/layout/blog-layout"
import { FeaturedPost } from "@/components/blog/featured-post"
import { RecentPosts } from "@/components/blog/recent-posts"
import { getAllPosts } from "@/lib/blog"

export default async function HomePage() {
  const posts = await getAllPosts()
  const featured = posts[0]
  const recent = posts.slice(1) // exclude featured

  return (
    <BlogLayout>
      <div className="space-y-8">
        {featured && <FeaturedPost post={featured} />}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <RecentPosts posts={recent} />
        </div>
      </div>
    </BlogLayout>
  )
}
