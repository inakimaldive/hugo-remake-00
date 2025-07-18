import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog"

interface BlogHorizontalCardProps {
  post: BlogPost
  className?: string
  style?: React.CSSProperties
}

export function BlogHorizontalCard({ post, className, style }: BlogHorizontalCardProps) {
  return (
    <Card className={`blog-card overflow-hidden ${className}`} style={style}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {/* Image Section */}
        <Link href={`/blog/${post.slug}`} className="relative h-48 md:h-full overflow-hidden block">
          <Image
            src={post.image || "/placeholder.svg?height=200&width=400"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </Link>

        {/* Content Section */}
        <div className="md:col-span-2 lg:col-span-3 p-4 flex flex-col justify-between">
          <div>
            <CardHeader className="p-0 mb-2">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-xl font-semibold hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>
            </CardHeader>
            <CardContent className="p-0 mb-4">
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
          </div>

          <CardFooter className="p-0 flex flex-col items-start gap-3">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.slice(0, 3).map((tag) => (
                <Link key={tag} href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Badge
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
