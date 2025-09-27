"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Search, Star, Clock, BookOpen, Trash2, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SavedCourse {
  id: string
  title: string
  category: string
  difficulty: string
  price: string
  rating: number
  imageUrl: string
  instructor: string
  lessonCount: number
  durationHours: number
  savedDate: Date
}

export default function SavedCoursesPage() {
  const { user } = useAuth()
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([])
  const [filteredCourses, setFilteredCourses] = useState<SavedCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const categories = ["all", "Trading", "Investing", "Crypto", "Stocks", "Options"]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  useEffect(() => {
    if (user) {
      fetchSavedCourses()
    }
  }, [user])

  useEffect(() => {
    filterCourses()
  }, [savedCourses, searchTerm, selectedCategory, selectedDifficulty])

  const fetchSavedCourses = async () => {
    try {
      // Sample saved courses data - in production this would fetch from Firestore
      const sampleSavedCourses: SavedCourse[] = [
        {
          id: "3",
          title: "Advanced Options Strategies",
          category: "Options",
          difficulty: "Advanced",
          price: "$199",
          rating: 4.9,
          imageUrl: "/options-trading-strategies.png",
          instructor: "David Rodriguez",
          lessonCount: 24,
          durationHours: 16,
          savedDate: new Date("2024-03-10"),
        },
        {
          id: "4",
          title: "Value Investing Principles",
          category: "Investing",
          difficulty: "Intermediate",
          price: "$129",
          rating: 4.7,
          imageUrl: "/placeholder.svg?height=200&width=300&text=Value+Investing",
          instructor: "Warren Smith",
          lessonCount: 15,
          durationHours: 10,
          savedDate: new Date("2024-03-08"),
        },
        {
          id: "5",
          title: "Day Trading Essentials",
          category: "Trading",
          difficulty: "Advanced",
          price: "$179",
          rating: 4.6,
          imageUrl: "/placeholder.svg?height=200&width=300&text=Day+Trading",
          instructor: "Alex Thompson",
          lessonCount: 20,
          durationHours: 14,
          savedDate: new Date("2024-03-05"),
        },
        {
          id: "6",
          title: "Portfolio Management Basics",
          category: "Investing",
          difficulty: "Beginner",
          price: "$89",
          rating: 4.5,
          imageUrl: "/placeholder.svg?height=200&width=300&text=Portfolio+Management",
          instructor: "Lisa Chen",
          lessonCount: 10,
          durationHours: 6,
          savedDate: new Date("2024-03-01"),
        },
      ]

      setSavedCourses(sampleSavedCourses)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching saved courses:", error)
      setLoading(false)
    }
  }

  const filterCourses = () => {
    const filtered = savedCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })

    setFilteredCourses(filtered)
  }

  const handleRemoveSavedCourse = async (courseId: string) => {
    try {
      setSavedCourses(savedCourses.filter((course) => course.id !== courseId))
      toast.success("Course removed from saved")
    } catch (error) {
      console.error("Error removing saved course:", error)
      toast.error("Failed to remove course")
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to view your saved courses.</p>
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Saved Courses</h1>
          <p className="text-muted-foreground">Courses you've saved for later learning</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search saved courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {savedCourses.length === 0 ? "No saved courses yet" : "No courses found"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {savedCourses.length === 0
                ? "Save courses you're interested in for easy access later"
                : "Try adjusting your search or filter criteria"}
            </p>
            <Button asChild>
              <Link href="/courses">
                Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={course.imageUrl || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessonCount} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.durationHours}h</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground mb-4">Saved on {formatDate(course.savedDate)}</div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <div className="flex gap-2">
                      <Button size="sm" asChild>
                        <Link href={`/courses/${course.id}`}>View Course</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveSavedCourse(course.id)}
                        className="bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
