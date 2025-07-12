"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MessageSquare, ThumbsUp, Plus } from "lucide-react"

// Mock data for questions
const mockQuestions = [
  {
    id: 1,
    title: "How to implement authentication in Next.js 14?",
    description:
      "I'm trying to set up authentication in my Next.js 14 app using the new App Router. What's the best approach for handling user sessions and protecting routes?",
    tags: ["nextjs", "authentication", "react"],
    votes: 15,
    answers: 3,
    username: "devuser123",
    timestamp: "2 hours ago",
    hasAcceptedAnswer: true,
  },
  {
    id: 2,
    title: "Best practices for MongoDB schema design",
    description:
      "What are the recommended patterns for designing MongoDB schemas for a social media application? Should I embed or reference related documents?",
    tags: ["mongodb", "database", "schema"],
    votes: 8,
    answers: 0,
    username: "dbexpert",
    timestamp: "4 hours ago",
    hasAcceptedAnswer: false,
  },
  {
    id: 3,
    title: "TypeScript generic constraints not working as expected",
    description:
      "I'm having trouble with TypeScript generic constraints. The compiler isn't inferring types correctly when I use conditional types with constraints.",
    tags: ["typescript", "generics", "types"],
    votes: 12,
    answers: 2,
    username: "typescriptdev",
    timestamp: "6 hours ago",
    hasAcceptedAnswer: false,
  },
  {
    id: 4,
    title: "How to optimize React component re-renders?",
    description:
      "My React app is experiencing performance issues due to unnecessary re-renders. What are the best strategies to optimize component rendering?",
    tags: ["react", "performance", "optimization"],
    votes: 23,
    answers: 5,
    username: "reactpro",
    timestamp: "1 day ago",
    hasAcceptedAnswer: true,
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredQuestions = mockQuestions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Questions</h1>
        <Link href="/ask">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ask New Question
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="unanswered">Unanswered</SelectItem>
            <SelectItem value="most-voted">Most Voted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <Link
                  href={`/question/${question.id}`}
                  className="text-lg font-semibold hover:text-primary transition-colors"
                >
                  {question.title}
                </Link>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {question.votes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {question.answers}
                    {question.hasAcceptedAnswer && <span className="text-green-600">✓</span>}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-3 line-clamp-2">{question.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  by <span className="font-medium">{question.username}</span> • {question.timestamp}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2">
        <Button variant="outline" size="sm" disabled={currentPage === 1}>
          Previous
        </Button>
        {[1, 2, 3, 4].map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  )
}
