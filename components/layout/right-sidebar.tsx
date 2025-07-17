// Server Component
import Link from "next/link"
import { Clock, TrendingUp, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/lib/blog"

export async function RightSidebar() {
  const posts = await getAllPosts()
  const recent = posts.slice(0, 5)
  const popular = posts.slice(2, 7) // demo placeholder

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Recent */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recent.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
              <h4 className="text-sm font-medium group-hover:text-primary line-clamp-2">{p.title}</h4>
              <p className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString()}</p>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Popular */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popular.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
              <h4 className="text-sm font-medium group-hover:text-primary line-clamp-2">{p.title}</h4>
              <p className="text-xs text-muted-foreground">{p.readingTime} min read</p>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Reading Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Posts</span>
            <span>{posts.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Avg read</span>
            <span>5 min</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
