import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  tags: string[]
  image?: string
  readingTime: number
}

const postsDirectory = path.join(process.cwd(), "content/posts")

// Create sample posts in Hugo-style directories
function ensureSamplePosts() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })

    const samplePosts = [
      {
        slug: "getting-started-with-nextjs",
        title: "Getting Started with Next.js 15: A Complete Guide",
        date: "2024-01-15",
        author: "John Doe",
        excerpt:
          "Learn how to build modern web applications with Next.js 15, featuring the latest App Router, Server Components, and more.",
        tags: ["Next.js", "React", "Web Development", "JavaScript"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements that make building modern web applications easier than ever. In this comprehensive guide, we'll explore the key features and show you how to get started.

## What's New in Next.js 15

Next.js 15 introduces several groundbreaking features:

- **Improved App Router**: Enhanced routing with better performance
- **Server Components**: Better server-side rendering capabilities
- **Turbopack**: Faster build times and development experience
- **Enhanced TypeScript Support**: Better type safety and developer experience

## Setting Up Your First Project

To create a new Next.js 15 project, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

### 1. App Router
The App Router provides a more intuitive way to structure your application with file-based routing.

### 2. Server Components
Server Components allow you to render components on the server, reducing client-side JavaScript and improving performance.

### 3. Streaming
Built-in streaming support for better user experience with loading states.

## Conclusion

Next.js 15 represents a significant step forward in React development. With its powerful features and excellent developer experience, it's the perfect choice for your next project.`,
      },
      {
        slug: "mastering-tailwind-css",
        title: "Mastering Tailwind CSS: Tips and Tricks for Better Styling",
        date: "2024-01-10",
        author: "Jane Smith",
        excerpt:
          "Discover advanced Tailwind CSS techniques to create beautiful, responsive designs with utility-first CSS framework.",
        tags: ["Tailwind CSS", "CSS", "Design", "Frontend"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        content: `# Mastering Tailwind CSS

Tailwind CSS has revolutionized how we approach styling in modern web development. This utility-first framework provides unprecedented flexibility and speed in creating beautiful user interfaces.

## Why Choose Tailwind CSS?

Tailwind CSS offers several advantages:

- **Utility-First Approach**: Build complex designs with simple utility classes
- **Responsive Design**: Built-in responsive modifiers for all screen sizes
- **Customization**: Highly customizable design system
- **Performance**: Purge unused CSS for optimal bundle sizes

## Advanced Techniques

### 1. Custom Color Palettes
Create consistent color schemes across your application:

\`\`\`css
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
\`\`\`

### 2. Component Patterns
Build reusable component patterns with Tailwind:

\`\`\`html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
\`\`\`

### 3. Responsive Design
Use responsive modifiers for different screen sizes:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Grid items -->
</div>
\`\`\`

## Best Practices

1. **Use @apply for component styles**
2. **Leverage the JIT compiler**
3. **Create custom utilities when needed**
4. **Maintain consistent spacing scales**

## Conclusion

Tailwind CSS empowers developers to create stunning designs quickly and efficiently. Master these techniques to take your styling skills to the next level.`,
      },
      {
        slug: "react-server-components-explained",
        title: "React Server Components: The Future of React Development",
        date: "2024-01-05",
        author: "Mike Johnson",
        excerpt:
          "Explore React Server Components and how they're changing the way we build React applications with better performance and user experience.",
        tags: ["React", "Server Components", "Performance", "Web Development"],
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
        content: `# React Server Components: The Future of React Development

React Server Components represent a paradigm shift in how we build React applications. They enable us to render components on the server while maintaining the interactivity we love about React.

## What Are Server Components?

Server Components are React components that run on the server and send their rendered output to the client. This approach offers several benefits:

- **Reduced Bundle Size**: Server components don't add to your JavaScript bundle
- **Better Performance**: Faster initial page loads
- **Direct Database Access**: Query databases directly from components
- **Improved SEO**: Better search engine optimization

## How They Work

Server Components work by:

1. **Rendering on the Server**: Components execute on the server
2. **Serializing Output**: The rendered result is serialized
3. **Streaming to Client**: Results are streamed to the browser
4. **Hydrating Interactive Parts**: Only interactive components are hydrated

## Example Implementation

Here's a simple Server Component example:

\`\`\`jsx
// This runs on the server
async function BlogPost({ id }) {
  const post = await db.posts.findById(id)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <ClientButton postId={id} />
    </article>
  )
}
\`\`\`

## Best Practices

### 1. Separate Server and Client Logic
Keep server-only code in Server Components and interactive code in Client Components.

### 2. Use Suspense Boundaries
Implement proper loading states with Suspense:

\`\`\`jsx
<Suspense fallback={<Loading />}>
  <ServerComponent />
</Suspense>
\`\`\`

### 3. Optimize Data Fetching
Fetch data as close to where it's needed as possible.

## Challenges and Considerations

- **Learning Curve**: New mental model for React development
- **Tooling**: Still evolving ecosystem
- **Debugging**: Different debugging approaches needed

## The Future

Server Components are becoming the foundation for modern React frameworks like Next.js 13+ and are shaping the future of web development.

## Conclusion

React Server Components offer a powerful new way to build performant, scalable React applications. As the ecosystem matures, they'll become an essential tool for React developers.`,
      },
      {
        slug: "typescript-best-practices",
        title: "TypeScript Best Practices for Large-Scale Applications",
        date: "2023-12-28",
        author: "Sarah Wilson",
        excerpt:
          "Learn essential TypeScript patterns and practices for building maintainable, scalable applications with better type safety.",
        tags: ["TypeScript", "JavaScript", "Best Practices", "Development"],
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
        content: `# TypeScript Best Practices for Large-Scale Applications

TypeScript has become the go-to choice for building large-scale JavaScript applications. Its static type system helps catch errors early and improves code maintainability.

## Why TypeScript Matters

TypeScript provides several key benefits:

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Easier Refactoring**: Confident code changes

## Essential Best Practices

### 1. Use Strict Mode
Always enable strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

### 2. Prefer Interfaces Over Types
Use interfaces for object shapes:

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}
\`\`\`

### 3. Use Union Types Effectively
Leverage union types for flexible APIs:

\`\`\`typescript
type Status = 'loading' | 'success' | 'error'
type ApiResponse<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
\`\`\`

### 4. Generic Constraints
Use generic constraints for better type safety:

\`\`\`typescript
function updateEntity<T extends { id: string }>(
  entity: T, 
  updates: Partial<T>
): T {
  return { ...entity, ...updates }
}
\`\`\`

## Advanced Patterns

### 1. Mapped Types
Create flexible type transformations:

\`\`\`typescript
type Optional<T> = {
  [K in keyof T]?: T[K]
}
\`\`\`

### 2. Conditional Types
Implement type-level logic:

\`\`\`typescript
type ApiResult<T> = T extends string 
  ? { message: T } 
  : { data: T }
\`\`\`

### 3. Template Literal Types
Create dynamic string types:

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`
\`\`\`

## Project Structure

Organize your TypeScript project effectively:

\`\`\`
src/
  types/
    api.ts
    user.ts
  utils/
    helpers.ts
  components/
    Button.tsx
\`\`\`

## Testing with TypeScript

Write type-safe tests:

\`\`\`typescript
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

test('renders button with correct text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toHaveTextContent('Click me')
})
\`\`\`

## Common Pitfalls to Avoid

1. **Overusing \`any\`**: Defeats the purpose of TypeScript
2. **Ignoring strict mode**: Reduces type safety benefits
3. **Not using utility types**: Missing built-in type helpers
4. **Poor error handling**: Not typing error states properly

## Conclusion

Following these TypeScript best practices will help you build more maintainable, scalable applications with better developer experience and fewer runtime errors.`,
      },
      {
        slug: "modern-css-techniques",
        title: "Modern CSS Techniques: Grid, Flexbox, and Beyond",
        date: "2023-12-20",
        author: "Alex Chen",
        excerpt:
          "Explore cutting-edge CSS techniques including CSS Grid, Flexbox, custom properties, and modern layout methods for responsive design.",
        tags: ["CSS", "Web Design", "Frontend", "Responsive Design"],
        image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=400&fit=crop",
        content: `# Modern CSS Techniques: Grid, Flexbox, and Beyond

CSS has evolved tremendously in recent years. Modern CSS provides powerful tools for creating responsive, maintainable layouts without relying on frameworks.

## CSS Grid: The Layout Revolution

CSS Grid is a two-dimensional layout system that revolutionizes how we approach web layouts.

### Basic Grid Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### Advanced Grid Techniques

\`\`\`css
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
\`\`\`

## Flexbox: One-Dimensional Layouts

Flexbox excels at distributing space and aligning items in one dimension.

### Centering Made Easy

\`\`\`css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
\`\`\`

### Flexible Navigation

\`\`\`css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
\`\`\`

## CSS Custom Properties (Variables)

Custom properties enable dynamic, maintainable styling:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --spacing-unit: 1rem;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing-unit);
  border-radius: calc(var(--spacing-unit) / 2);
}
\`\`\`

## Container Queries

Style components based on their container size:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
}
\`\`\`

## Modern Selectors

### :has() Selector

\`\`\`css
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}
\`\`\`

### :where() and :is()

\`\`\`css
:where(h1, h2, h3) {
  margin-top: 0;
  line-height: 1.2;
}
\`\`\`

## Responsive Design Patterns

### Intrinsic Web Design

\`\`\`css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 1rem;
}
\`\`\`

### Fluid Typography

\`\`\`css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
\`\`\`

## Animation and Transitions

### Smooth Transitions

\`\`\`css
.button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
\`\`\`

### CSS Animations

\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease-out;
}
\`\`\`

## Performance Considerations

1. **Use \`transform\` and \`opacity\` for animations**
2. **Minimize layout thrashing**
3. **Leverage \`will-change\` property carefully**
4. **Optimize critical rendering path**

## Browser Support

Most modern CSS features have excellent browser support:

- CSS Grid: 96%+ global support
- Flexbox: 98%+ global support
- Custom Properties: 95%+ global support
- Container Queries: 90%+ global support

## Conclusion

Modern CSS provides powerful tools for creating responsive, maintainable layouts. By mastering these techniques, you can build beautiful, performant websites without heavy dependencies.`,
      },
    ]

    samplePosts.forEach(({ slug, title, date, author, excerpt, tags, image, content }) => {
      const postDir = path.join(postsDirectory, slug)
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true })

        const frontmatter = `---
title: "${title}"
date: "${date}"
author: "${author}"
excerpt: "${excerpt}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
image: "${image}"
---

${content}`

        fs.writeFileSync(path.join(postDir, "index.md"), frontmatter)
      }
    })
  }
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export async function getAllPosts(): Promise<BlogPost[]> {
  ensureSamplePosts()

  const postDirs = fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const allPostsData = await Promise.all(
    postDirs.map(async (slug) => {
      const postDir = path.join(postsDirectory, slug)
      const indexPath = path.join(postDir, "index.md")

      if (!fs.existsSync(indexPath)) {
        return null
      }

      const fileContents = fs.readFileSync(indexPath, "utf8")
      const { data, content } = matter(fileContents)

      const contentHtml = marked.parse(content)

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        author: data.author || "Anonymous",
        excerpt: data.excerpt || content.substring(0, 160) + "...",
        content: contentHtml,
        tags: data.tags || [],
        image: data.image,
        readingTime: calculateReadingTime(content),
      } as BlogPost
    }),
  )

  return allPostsData.filter((post): post is BlogPost => post !== null).sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    ensureSamplePosts()

    const postDir = path.join(postsDirectory, slug)
    const indexPath = path.join(postDir, "index.md")

    if (!fs.existsSync(indexPath)) {
      return null
    }

    const fileContents = fs.readFileSync(indexPath, "utf8")
    const { data, content } = matter(fileContents)

    const contentHtml = marked.parse(content)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      author: data.author || "Anonymous",
      excerpt: data.excerpt || content.substring(0, 160) + "...",
      content: contentHtml,
      tags: data.tags || [],
      image: data.image,
      readingTime: calculateReadingTime(content),
    }
  } catch (error) {
    return null
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}

export async function getArchiveYears(): Promise<number[]> {
  const posts = await getAllPosts()
  const years = new Set<number>()

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear()
    years.add(year)
  })

  return Array.from(years).sort((a, b) => b - a)
}
