// Server Component
import Link from "next/link"
import { Calendar, Tag, User, Archive } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllTags, getArchiveYears } from "@/lib/blog"

export async function LeftSidebar() {
  const [tags, years] = await Promise.all([getAllTags(), getArchiveYears()])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Stack Blog – a modern Markdown-powered Next.js starter.</p>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {tags.slice(0, 10).map((tag) => (
            <Link key={tag} href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
              <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                {tag}
              </Badge>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Archives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Archives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {years.map((y) => (
            <Link key={y} href={`/archives?year=${y}`} className="flex items-center gap-2 text-sm hover:text-primary">
              <Calendar className="h-4 w-4" />
              {y}
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
