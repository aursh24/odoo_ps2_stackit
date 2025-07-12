"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThumbsUp, ThumbsDown, Check, Sparkles } from "lucide-react"

// Mock data for question detail
const mockQuestion = {
  id: 1,
  title: "How to implement authentication in Next.js 14?",
  description: `I'm trying to set up authentication in my Next.js 14 app using the new App Router. What's the best approach for handling user sessions and protecting routes?

I've looked into several options:
- NextAuth.js (now Auth.js)
- Supabase Auth
- Custom JWT implementation

Here's what I've tried so far:

\`\`\`javascript
// app/api/auth/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { email, password } = await request.json()
  // Authentication logic here
  return NextResponse.json({ success: true })
}
\`\`\`

But I'm not sure about the best practices for:
1. Session management
2. Route protection
3. Server-side authentication checks

Any guidance would be appreciated!`,
  tags: ["nextjs", "authentication", "react"],
  votes: 15,
  username: "devuser123",
  timestamp: "2 hours ago",
  userId: "user123",
}

const mockAnswers = [
  {
    id: 1,
    content: `For Next.js 14 with App Router, I'd recommend using **Auth.js** (formerly NextAuth.js) as it has excellent support for the new App Router.

Here's a basic setup:

\`\`\`javascript
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return session
    }
  }
})

export { GET }
\`\`\`

For route protection, you can use middleware:

\`\`\`javascript
// middleware.js
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
})

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
}
\`\`\`

This approach handles sessions automatically and provides great DX.`,
    author: "authexpert",
    timestamp: "1 hour ago",
    votes: 8,
    isAccepted: true,
    userId: "expert1",
  },
  {
    id: 2,
    content: `Another great option is **Supabase Auth** if you want a backend-as-a-service solution:

\`\`\`javascript
// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default supabase
\`\`\`

\`\`\`javascript
// app/login/page.js
import { supabase } from '@/lib/supabase'

export default function Login() {
  const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }
  
  return (
    // Your login form
  )
}
\`\`\`

Supabase handles all the complexity and provides real-time subscriptions too.`,
    author: "supabasedev",
    timestamp: "30 minutes ago",
    votes: 3,
    isAccepted: false,
    userId: "expert2",
  },
]

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  const [newAnswer, setNewAnswer] = useState("")
  const [answers, setAnswers] = useState(mockAnswers)
  const currentUserId = "user123" // This would come from your auth context

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAnswer.trim()) return

    const answer = {
      id: answers.length + 1,
      content: newAnswer,
      author: "currentuser",
      timestamp: "just now",
      votes: 0,
      isAccepted: false,
      userId: currentUserId,
    }

    setAnswers([...answers, answer])
    setNewAnswer("")
  }

  const handleVote = (answerId: number, voteType: "up" | "down") => {
    // Handle voting logic
    console.log(`Vote ${voteType} on answer ${answerId}`)
  }

  const handleAcceptAnswer = (answerId: number) => {
    setAnswers(
      answers.map((answer) => ({
        ...answer,
        isAccepted: answer.id === answerId,
      })),
    )
  }

  const handleSummarize = () => {
    // This would call your AI summarization API
    console.log("Summarizing thread...")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{mockQuestion.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <h1 className="text-2xl font-bold">{mockQuestion.title}</h1>
            <Button onClick={handleSummarize} variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              Summarize Thread
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap">{mockQuestion.description}</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {mockQuestion.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                {mockQuestion.votes}
              </div>
            </div>
            <div>
              asked by <span className="font-medium">{mockQuestion.username}</span> • {mockQuestion.timestamp}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {answers.length} Answer{answers.length !== 1 ? "s" : ""}
        </h2>

        {answers.map((answer) => (
          <Card
            key={answer.id}
            className={
              answer.isAccepted ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20" : ""
            }
          >
            <CardContent className="pt-6">
              <div className="flex gap-4">
                {/* Vote buttons */}
                <div className="flex flex-col items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleVote(answer.id, "up")}>
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{answer.votes}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleVote(answer.id, "down")}>
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  {answer.isAccepted && (
                    <div className="text-green-600">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>

                {/* Answer content */}
                <div className="flex-1 space-y-4">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap">{answer.content}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {mockQuestion.userId === currentUserId && !answer.isAccepted && (
                        <Button variant="outline" size="sm" onClick={() => handleAcceptAnswer(answer.id)}>
                          <Check className="h-4 w-4 mr-2" />
                          Accept Answer
                        </Button>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      answered by <span className="font-medium">{answer.author}</span> • {answer.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Answer Form */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Your Answer</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <Textarea
              placeholder="Write your answer here... You can use Markdown formatting."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              rows={6}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={!newAnswer.trim()}>
                Post Your Answer
              </Button>
              <Button type="button" variant="outline">
                Preview
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
