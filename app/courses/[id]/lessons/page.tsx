"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Star, Clock, BookOpen, Play, ArrowLeft, FileText, User, Trophy, Target, CheckCircle2, PlayCircle } from "lucide-react"
import Link from "next/link"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore"
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
  instructor: string
}

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  videoUrl: string
  order: number
  courseId: string
}

export default function LessonsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (params.id && user) {
      fetchCourseAndLessons()
    } else if (!user) {
      router.push("/auth/signin")
    }
  }, [params.id, user])

  const fetchCourseAndLessons = async () => {
    try {
      setLoading(true)
      setHasError(false)

      // Fetch course data
      const courseDoc = await getDoc(doc(db, "courses", params.id as string))
      if (courseDoc.exists()) {
        const courseData = courseDoc.data()
        setCourse({
          id: courseDoc.id,
          title: courseData.title || "Untitled Course",
          category: courseData.category || "General",
          description: courseData.description || "No description available",
          price: courseData.price || "$0",
          rating: typeof courseData.rating === "number" ? courseData.rating : 4.0,
          imageUrl: courseData.imageUrl || "",
          difficulty: courseData.difficulty || "Beginner",
          lessonCount: courseData.lessonCount || 0,
          durationHours: courseData.durationHours || 0,
          instructor: courseData.instructor || "Unknown Instructor",
        })

        // Fetch lessons for this course
        const lessonsRef = collection(db, "lessons")
        const q = query(lessonsRef, where("courseId", "==", params.id))
        const querySnapshot = await getDocs(q)

        const fetchedLessons: Lesson[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          fetchedLessons.push({
            id: doc.id,
            title: data.title || "Untitled Lesson",
            description: data.description || "No description available",
            duration: data.duration || "15 min",
            videoUrl: data.videoUrl || "",
            order: data.order || 1,
            courseId: data.courseId,
          })
        })

        fetchedLessons.sort((a, b) => a.order - b.order)
        setLessons(fetchedLessons)
      } else {
        setHasError(true)
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching course and lessons:", error)
      setHasError(true)
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-emerald-100"
      case "Intermediate":
        return "bg-amber-50 text-amber-700 border-amber-200 shadow-amber-100"
      case "Advanced":
        return "bg-rose-50 text-rose-700 border-rose-200 shadow-rose-100"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 shadow-slate-100"
    }
  }

  const getDifficultyGradient = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "from-emerald-500 to-teal-600"
      case "Intermediate":
        return "from-amber-500 to-orange-600"
      case "Advanced":
        return "from-rose-500 to-pink-600"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const handleStartLearning = () => {
    if (lessons.length > 0) {
      router.push(`/learning/${course?.id}`)
    } else {
      toast.error("No lessons available for this course")
    }
  }

  const handleLessonClick = (lessonIndex: number) => {
    router.push(`/learning/${course?.id}?lesson=${lessonIndex}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <div className="container px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent absolute top-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-indigo-600 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (hasError || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <div className="container px-4 py-8">
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Course Not Found</h1>
              <p className="text-slate-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/courses">Browse All Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const completedLessons = 0 // You can implement progress tracking
  const progressPercentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />

      <div className="container px-4 py-8 max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            asChild 
            className="hover:bg-white/80 hover:shadow-md transition-all duration-200 rounded-xl"
          >
            <Link href={`/courses/${course.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-90"></div>
<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] rounded-3xl"></div>          
          <div className="relative p-8 md:p-12 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className={`${getDifficultyColor(course.difficulty)} shadow-lg font-medium px-4 py-1.5`}>
                    <Target className="mr-1.5 h-3.5 w-3.5" />
                    {course.difficulty}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 shadow-lg font-medium px-4 py-1.5">
                    {course.category}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {course.title}
                </h1>

                <div className="flex items-center gap-8 text-white/90 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-white/30 text-white/30'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-lg">{course.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span className="font-medium">{lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">{course.durationHours} hours</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Instructor</p>
                    <p className="text-white/80">{course.instructor}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Course Progress</span>
                    <span className="text-sm">{completedLessons}/{lessons.length} completed</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5">
                    <div 
                      className="bg-white h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Course Stats Card */}
              <div className="lg:w-80">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="font-semibold text-lg mb-4">Course Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Total Lessons</span>
                      <span className="font-semibold">{lessons.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Duration</span>
                      <span className="font-semibold">{course.durationHours}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Difficulty</span>
                      <span className="font-semibold">{course.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Price</span>
                      <span className="font-semibold text-xl">{course.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Course Lessons</h2>
                <p className="text-slate-600">
                  {lessons.length} lessons • {course.durationHours} hours total
                </p>
              </div>
              <div className="flex items-center gap-2 bg-indigo-50 rounded-xl p-3">
                <Trophy className="h-5 w-5 text-indigo-600" />
                <span className="text-indigo-600 font-medium">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
            </div>

            {/* Lessons List */}
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200"></div>
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent absolute top-0 left-0"></div>
                </div>
              </div>
            ) : hasError ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Error loading lessons</h3>
                <p className="text-slate-600 mb-6">There was a problem loading the lessons for this course.</p>
                <Button 
                  onClick={fetchCourseAndLessons} 
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Try Again
                </Button>
              </div>
            ) : lessons.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No lessons available</h3>
                <p className="text-slate-600">This course doesn't have any lessons yet. Check back later!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson, index) => {
                  const isCompleted = index < completedLessons
                  return (
                    <Card
                      key={lesson.id}
                      className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 ${
                        isCompleted 
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 shadow-emerald-100' 
                          : 'bg-gradient-to-r from-slate-50 to-slate-100 hover:from-indigo-50 hover:to-purple-50'
                      }`}
                      onClick={() => handleLessonClick(index)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl font-bold text-lg transition-all duration-300 ${
                            isCompleted
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                              : `bg-gradient-to-br ${getDifficultyGradient(course.difficulty)} text-white group-hover:scale-110`
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="h-6 w-6" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                              {lesson.title}
                            </h3>
                            <p className="text-slate-600 mb-3 line-clamp-2">
                              {lesson.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <PlayCircle className="h-4 w-4" />
                                <span className="font-medium">{lesson.duration}</span>
                              </div>
                              {isCompleted && (
                                <div className="flex items-center gap-1.5 text-emerald-600">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span className="font-medium">Completed</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-indigo-100 hover:text-indigo-700"
                            >
                              <Play className="h-4 w-4 mr-1" />
                              {isCompleted ? 'Rewatch' : 'Play'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sticky Action Bar */}
          {lessons.length > 0 && (
            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Ready to start learning?</p>
                  <p className="text-sm text-slate-600">
                    {lessons.length} lessons • {course.durationHours} hours of content
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleStartLearning}
                >
                  <Play className="mr-2 h-5 w-5" />
                  {completedLessons > 0 ? 'Continue Learning' : 'Start Learning'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}