"use client"

import Link from "next/link"
import { X, Home, Archive, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-background border-r shadow-lg lg:hidden transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-8" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/archives"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <Archive className="h-5 w-5" />
              Archives
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
            >
              <User className="h-5 w-5" />
              About
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
