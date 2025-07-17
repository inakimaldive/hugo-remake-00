---
title: "Web Performance Optimization: A Complete Guide"
date: "2023-12-15"
author: "David Kim"
excerpt: "Learn essential techniques for optimizing web performance, from Core Web Vitals to advanced optimization strategies."
tags: ["Performance", "Web Development", "Optimization", "Core Web Vitals"]
image: "/images/web-performance-optimization.png"
---

# Web Performance Optimization: A Complete Guide

Web performance is crucial for user experience, SEO, and business success. This comprehensive guide covers everything you need to know about optimizing your website's performance.

## Why Performance Matters

Performance impacts:

- **User Experience**: Faster sites provide better UX
- **SEO Rankings**: Google uses performance as a ranking factor
- **Conversion Rates**: Every 100ms delay can reduce conversions by 1%
- **Accessibility**: Better performance helps users on slower connections

## Core Web Vitals

Google's Core Web Vitals are essential metrics:

### 1. Largest Contentful Paint (LCP)
Measures loading performance. Should occur within 2.5 seconds.

\`\`\`javascript
// Measure LCP
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP candidate:', entry.startTime, entry);
  }
}).observe({type: 'largest-contentful-paint', buffered: true});
\`\`\`

### 2. First Input Delay (FID)
Measures interactivity. Should be less than 100 milliseconds.

### 3. Cumulative Layout Shift (CLS)
Measures visual stability. Should be less than 0.1.

## Optimization Strategies

### 1. Image Optimization

\`\`\`html
<!-- Use modern formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.avif" type="image/avif">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
\`\`\`

### 2. Code Splitting

\`\`\`javascript
// Dynamic imports for code splitting
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 3. Resource Hints

\`\`\`html
<!-- Preload critical resources -->
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/hero-image.jpg" as="image">

<!-- Prefetch future resources -->
<link rel="prefetch" href="/next-page.js">
\`\`\`

## Advanced Techniques

### 1. Service Workers

\`\`\`javascript
// Cache-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
\`\`\`

### 2. Critical CSS

\`\`\`html
<style>
  /* Inline critical CSS */
  .hero { display: flex; align-items: center; }
</style>
<link rel="preload" href="/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
\`\`\`

### 3. Resource Bundling

\`\`\`javascript
// Webpack optimization
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
\`\`\`

## Monitoring and Measurement

### 1. Performance APIs

\`\`\`javascript
// Navigation Timing API
const perfData = performance.getEntriesByType('navigation')[0];
console.log('Page Load Time:', perfData.loadEventEnd - perfData.navigationStart);

// Resource Timing API
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(resource.name, resource.duration);
});
\`\`\`

### 2. Real User Monitoring (RUM)

\`\`\`javascript
// Send performance data to analytics
function sendPerformanceData() {
  const perfData = {
    lcp: getLCP(),
    fid: getFID(),
    cls: getCLS(),
    ttfb: getTTFB()
  };
  
  navigator.sendBeacon('/analytics', JSON.stringify(perfData));
}
\`\`\`

## Performance Budget

Set performance budgets to maintain standards:

\`\`\`json
{
  "budget": [
    {
      "type": "bundle",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "initial",
      "maximumWarning": "350kb",
      "maximumError": "500kb"
    }
  ]
}
\`\`\`

## Tools and Testing

### 1. Lighthouse
Use Lighthouse for comprehensive audits:

\`\`\`bash
# CLI usage
lighthouse https://example.com --output html --output-path ./report.html
\`\`\`

### 2. WebPageTest
Test from multiple locations and devices.

### 3. Chrome DevTools
Use Performance tab for detailed analysis.

## Best Practices Checklist

- [ ] Optimize images (format, size, lazy loading)
- [ ] Minimize and compress CSS/JS
- [ ] Use CDN for static assets
- [ ] Implement caching strategies
- [ ] Optimize fonts (preload, font-display)
- [ ] Minimize third-party scripts
- [ ] Use HTTP/2 or HTTP/3
- [ ] Implement service workers
- [ ] Monitor Core Web Vitals
- [ ] Set performance budgets

## Conclusion

Web Performance Optimization is an ongoing process that requires continuous monitoring and improvement. By implementing these strategies and maintaining performance budgets, you can create fast, user-friendly websites that rank well and convert better.`,
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

      const processedContent = await remark().use(html).process(content)
      const contentHtml = processedContent.toString()

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

    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

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
