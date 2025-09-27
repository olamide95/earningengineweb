"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Play, BookOpen, Star, Award, TrendingUp, Calendar } from "lucide-react"

interface EnrolledCourse {
  id: string
  title: string
  category: string
  difficulty: string
  imageUrl: string
  instructor: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed: Date
  rating: number
}

export default function MyLearningPage() {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses()
    }
  }, [user])

  const fetchEnrolledCourses = async () => {
    try {
      // Sample enrolled courses data - in production this would fetch from Firestore
      const sampleEnrolledCourses: EnrolledCourse[] = [
        
       
      ]

      setEnrolledCourses(sampleEnrolledCourses)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching enrolled courses:", error)
      setLoading(false)
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
            <p className="text-muted-foreground mb-6">You need to be signed in to access your learning dashboard.</p>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">My Learning</h1>
          <p className="text-muted-foreground">Track your progress and continue your trading education journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-foreground">{enrolledCourses.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Lessons</p>
                  <p className="text-2xl font-bold text-foreground">
                    {enrolledCourses.reduce((sum, course) => sum + course.completedLessons, 0)}
                  </p>
                </div>
                <Award className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                  <p className="text-2xl font-bold text-foreground">
                    {enrolledCourses.length > 0
                      ? Math.round(
                          enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length,
                        )
                      : 0}
                    %
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Learning Streak</p>
                  <p className="text-2xl font-bold text-foreground">7</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="in-progress" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-6">
            {enrolledCourses.filter((course) => course.progress < 100).length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No courses in progress</h3>
                <p className="text-muted-foreground mb-6">Start learning by enrolling in a course</p>
                <Button asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses
                  .filter((course) => course.progress < 100)
                  .map((course) => (
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
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button size="lg" className="rounded-full" asChild>
                            <Link href={`/learning/${course.id}`}>
                              <Play className="mr-2 h-5 w-5" />
                              Continue
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">by {course.instructor}</p>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>
                              {course.completedLessons} of {course.totalLessons} lessons
                            </span>
                            <span>Last accessed {formatDate(course.lastAccessed)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <Button asChild>
                            <Link href={`/learning/${course.id}`}>Continue Learning</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-12">
              <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No completed courses yet</h3>
              <p className="text-muted-foreground">Complete your first course to earn a certificate</p>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No saved courses</h3>
              <p className="text-muted-foreground mb-6">Save courses you're interested in for later</p>
              <Button asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
