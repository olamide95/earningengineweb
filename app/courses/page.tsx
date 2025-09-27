"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/ui/navigation"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, Star, Clock, BookOpen } from "lucide-react"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase-config"

interface Course {
  id: string
  title: string
  category: string
  description: string
  price: string
  rating: number
  imageUrl: string
  difficulty: string
  lessonCount: number
  durationHours: number
  createdAt: Date
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const categories = ["all", "Trading", "Investing", "Crypto", "Stocks", "Options"]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterAndSortCourses()
  }, [courses, searchTerm, selectedCategory, selectedDifficulty, sortBy])

  const fetchCourses = async () => {
    try {
      const coursesRef = collection(db, "courses")
      const q = query(coursesRef, orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)

      const fetchedCourses: Course[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        fetchedCourses.push({
          id: doc.id,
          title: data.title || "Untitled Course",
          category: data.category || "General",
          description: data.description || "No description available",
          price: data.price || "$0",
          rating: typeof data.rating === "number" ? data.rating : 4.0,
          imageUrl: data.imageUrl || "",
          difficulty: data.difficulty || "Beginner",
          lessonCount: data.lessonCount || 5,
          durationHours: data.durationHours || 3,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        })
      })

      setCourses(fetchedCourses)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching courses:", error)
      setLoading(false)
    }
  }

  const filterAndSortCourses = () => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime()
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime()
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", ""))
        case "price-high":
          return Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", ""))
        default:
          return 0
      }
    })

    setFilteredCourses(filtered)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-50 text-green-700 border-green-200"
      case "Intermediate":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "Advanced":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        <Navigation />

        <div className="container px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">All Courses</h1>
            <p className="text-slate-600">Discover our comprehensive collection of trading and investing courses</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="mb-8 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-slate-300"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48 border-slate-300">
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
                    <SelectTrigger className="w-full md:w-48 border-slate-300">
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

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48 border-slate-300">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>

              {/* Course Grid */}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No courses found</h3>
                  <p className="text-slate-600">
                    {courses.length === 0
                      ? "No courses are available at the moment. Check back later!"
                      : "Try adjusting your search or filter criteria"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img
                          src={course.imageUrl || "/placeholder.svg?height=200&width=300&text=Course+Image"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center"
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-white/90 text-slate-700">
                            {course.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{course.description}</p>

                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
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

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-500">{course.price}</span>
                          <Button className="bg-blue-500 hover:bg-blue-600" asChild>
                            <Link href={`/courses/${course.id}/lessons`}>View Course</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}