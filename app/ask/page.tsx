"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ArrowLeft, X, Plus } from "lucide-react"

const popularTags = ["javascript", "react", "nextjs", "typescript", "nodejs", "mongodb", "css", "html", "python", "api"]

export default function AskQuestionPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log({ title, description, tags: selectedTags })
    // Redirect to home or the new question page
    router.push("/")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Ask a Question</h1>

        <Card>
          <CardHeader>
            <CardTitle>Share your question with the community</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Question Title *</Label>
                <Input
                  id="title"
                  placeholder="What's your programming question? Be specific."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Be specific and imagine you're asking a question to another person
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about your question. Include what you've tried, what you expected to happen, and what actually happened."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Include all the information someone would need to answer your question
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <Label>Tags</Label>

                {/* Selected Tags */}
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Add New Tag */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag(newTag)
                      }
                    }}
                    disabled={selectedTags.length >= 5}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddTag(newTag)}
                    disabled={!newTag || selectedTags.includes(newTag) || selectedTags.length >= 5}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Popular Tags */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Popular tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTags
                      .filter((tag) => !selectedTags.includes(tag))
                      .slice(0, 8)
                      .map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddTag(tag)}
                          disabled={selectedTags.length >= 5}
                        >
                          {tag}
                        </Button>
                      ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Add up to 5 tags to describe what your question is about
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" disabled={!title || !description}>
                  Post Your Question
                </Button>
                <Link href="/">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
