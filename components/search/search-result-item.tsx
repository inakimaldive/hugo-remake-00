import { Calendar, User } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface SearchResultItemProps {
  post: BlogPost
  className?: string
}

export function SearchResultItem({ post, className }: SearchResultItemProps) {
  return (
    <div className={`flex flex-col gap-1 p-2 rounded-md hover:bg-accent transition-colors ${className}`}>
      <h4 className="text-sm font-medium line-clamp-2">{post.title}</h4>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {post.author}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {new Date(post.date).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
