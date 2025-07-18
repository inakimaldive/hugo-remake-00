import { BlogLayout } from "@/components/layout/blog-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About - AI Automation & Application Developer",
  description: "Learn more about Alex Mondinechen, an AI automation and application developer.",
}

export default function AboutPage() {
  return (
    <BlogLayout>
      <div className="space-y-8 animate-fade-in">
        <Card>
          <CardHeader className="flex flex-col items-center text-center p-6 md:p-8">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Alex Mondinechen" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold">Alex Mondinechen</CardTitle>
            <p className="text-lg text-muted-foreground">AI Automation & Application Developer</p>
          </CardHeader>
          <CardContent className="p-6 md:p-8 pt-0 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">About Me</h2>
              <p className="text-muted-foreground leading-relaxed">
                Hello! I'm Alex Mondinechen, a passionate AI automation and application developer dedicated to building
                intelligent, efficient, and scalable solutions. With a strong foundation in software engineering and a
                keen interest in artificial intelligence, I specialize in transforming complex challenges into
                streamlined, automated workflows and intuitive applications.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                My journey in tech has been driven by a desire to leverage cutting-edge AI technologies to enhance
                productivity, improve decision-making, and create impactful user experiences. I thrive on exploring new
                paradigms in AI, from machine learning models to natural language processing, and integrating them
                seamlessly into robust software systems.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Expertise</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  **AI & Machine Learning:** Developing and deploying custom AI models, integrating with large language
                  models (LLMs), and building intelligent agents.
                </li>
                <li>
                  **Automation Solutions:** Designing and implementing automated systems for data processing, workflow
                  optimization, and repetitive task elimination.
                </li>
                <li>
                  **Full-Stack Application Development:** Crafting robust and scalable web applications using modern
                  frameworks (Next.js, React) and backend technologies.
                </li>
                <li>
                  **Cloud Computing:** Deploying and managing AI and applications on cloud platforms (Vercel, AWS,
                  Azure, GCP).
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Python</span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                  JavaScript/TypeScript
                </span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Next.js</span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">React</span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Node.js</span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                  TensorFlow/PyTorch
                </span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                  LangChain/LlamaIndex
                </span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Docker</span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                  SQL/NoSQL Databases
                </span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full">API Design</span>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">My Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                My mission is to empower businesses and individuals by creating intelligent software that simplifies
                complex processes and unlocks new possibilities. I am committed to continuous learning and staying at
                the forefront of AI advancements to deliver innovative and high-quality solutions.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-3">Connect With Me</h2>
              <div className="flex gap-4">
                <Link
                  href="mailto:alex.mondinechen@example.com"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <Mail className="h-5 w-5" /> Email
                </Link>
                <Link
                  href="https://github.com/your-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <Github className="h-5 w-5" /> GitHub
                </Link>
                <Link
                  href="https://linkedin.com/in/your-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" /> LinkedIn
                </Link>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </BlogLayout>
  )
}
