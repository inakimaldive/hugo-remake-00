"use client"

import Link from "next/link"

import { Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect, useRef } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchResultItem } from "@/components/search/search-result-item"
import type { BlogPost } from "@/lib/blog"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onMobileNavToggle: () => void
}

export function Header({ onMobileNavToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<BlogPost[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Debounce search input and fetch results
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (searchQuery.length > 0) {
        setIsSearching(true)
        try {
          const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
          const data: BlogPost[] = await res.json()
          setSearchResults(data)
          setIsPopoverOpen(true) // Open popover when results are available
        } catch (error) {
          console.error("Failed to fetch search results:", error)
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
        setIsSearching(false)
        // Only close popover if query is empty AND it's currently open
        if (isPopoverOpen) {
          setIsPopoverOpen(false)
        }
      }
    }, 300) // 300ms debounce

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery, isPopoverOpen])

  // Focus input when popover opens
  useEffect(() => {
    if (isPopoverOpen && searchInputRef.current) {
      // Use setTimeout to ensure focus is applied after the popover has fully rendered
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 0) // A 0ms timeout defers execution until the current call stack is clear
    }
  }, [isPopoverOpen])

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsPopoverOpen(false)
    searchInputRef.current?.focus()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl">Stack Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/archives" className="text-sm font-medium hover:text-primary transition-colors">
              Archives
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <div className="relative hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    placeholder="Search posts..."
                    className="pl-8 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // Removed onMouseDown here, relying on PopoverTrigger and useEffect for focus
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                      onClick={handleClearSearch}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="end">
                {" "}
                {/* Width matches input w-64 */}
                <ScrollArea className="h-[300px]">
                  {isSearching && searchQuery.length > 0 ? (
                    <div className="p-4 text-center text-muted-foreground">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2 p-2">
                      {searchResults.map((post) => (
                        <div
                          key={post.slug}
                          className="cursor-pointer"
                          onClick={() => {
                            router.push(`/blog/${post.slug}`)
                            setIsPopoverOpen(false)
                          }}
                        >
                          <SearchResultItem post={post} />
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length > 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No results found for "{searchQuery}"</div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">Start typing to search for posts.</div>
                  )}
                </ScrollArea>
              </PopoverContent>
            </Popover>

            <ThemeToggle />

            <Button variant="ghost" size="icon" className="md:hidden" onClick={onMobileNavToggle}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
