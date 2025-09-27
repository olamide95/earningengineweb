"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  CheckCircle,
  Circle,
  ArrowLeft,
  BookOpen,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Star,
  Trophy,
  Target,
  PlayCircle,
  User,
  Calendar,
  FileText,
  Download,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/firebase-config"
import { getDoc, collection, query, where, getDocs, doc } from "firebase/firestore"

interface Course {
  id: string
  title: string
  category: string
  difficulty: string
  imageUrl: string
  instructor: string
  rating: number
}

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  videoUrl: string
  order: number
  completed: boolean
}

// Fixed YouTube video ID extractor - now handles YouTube Shorts URLs
const extractYouTubeId = (url: string): string | null => {
  if (!url) return null
  
  const patterns = [
    // Standard YouTube URLs
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^&\n?#]+)/,
    // YouTube Shorts URLs
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/shorts\/([^&\n?#]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function LearningPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showNotes, setShowNotes] = useState(true)

  useEffect(() => {
    if (params.courseId && user) {
      fetchCourseData()
    } else if (!user) {
      router.push("/auth/signin")
    }
  }, [params.courseId, user])

  const fetchCourseData = async () => {
    try {
      setLoading(true)

      // Fetch course data
      const courseDoc = await getDoc(doc(db, "courses", params.courseId as string))
      if (courseDoc.exists()) {
        const courseData = courseDoc.data()
        setCourse({
          id: courseDoc.id,
          title: courseData.title || "Untitled Course",
          category: courseData.category || "General",
          difficulty: courseData.difficulty || "Beginner",
          imageUrl: courseData.imageUrl || "",
          instructor: courseData.instructor || "Unknown Instructor",
          rating: typeof courseData.rating === "number" ? courseData.rating : 4.5,
        })

        // Fetch lessons for this course
        const lessonsRef = collection(db, "lessons")
        const q = query(lessonsRef, where("courseId", "==", params.courseId))
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
            completed: false,
          })
        })

        const sortedLessons = fetchedLessons.sort((a, b) => a.order - b.order)
        setLessons(sortedLessons)
        calculateProgress(sortedLessons)

        // Set initial lesson from URL parameter if provided
        const urlParams = new URLSearchParams(window.location.search)
        const lessonParam = urlParams.get("lesson")
        if (lessonParam && !isNaN(Number.parseInt(lessonParam))) {
          const lessonIndex = Number.parseInt(lessonParam)
          if (lessonIndex >= 0 && lessonIndex < sortedLessons.length) {
            setCurrentLessonIndex(lessonIndex)
          }
        }
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching course:", error)
      setLoading(false)
    }
  }

  const calculateProgress = (lessonList: Lesson[]) => {
    const completed = lessonList.filter((lesson) => completedLessons.has(lesson.id)).length
    const progressPercent = (completed / lessonList.length) * 100
    setProgress(progressPercent)
  }

  const markLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons)
    newCompleted.add(lessonId)
    setCompletedLessons(newCompleted)

    // Update lesson completion status
    const updatedLessons = lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, completed: true } : lesson))
    setLessons(updatedLessons)
    calculateProgress(updatedLessons)

    toast.success("🎉 Lesson completed! Keep up the great work!")
  }

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      // Auto-mark current lesson as complete when moving to next
      markLessonComplete(lessons[currentLessonIndex].id)
    } else {
      toast.success("🏆 Congratulations! You've completed the entire course!")
    }
  }

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Intermediate":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Advanced":
        return "bg-rose-50 text-rose-700 border-rose-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const getDifficultyGradient = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "from-emerald-400 to-teal-500"
      case "Intermediate":
        return "from-amber-400 to-orange-500"
      case "Advanced":
        return "from-rose-400 to-pink-500"
      default:
        return "from-slate-400 to-slate-500"
    }
  }

  // Function to get proper YouTube embed URL (handles Shorts conversion)
  const getYouTubeEmbedUrl = (videoUrl: string): string | null => {
    const videoId = extractYouTubeId(videoUrl)
    if (!videoId) return null
    
    // For YouTube Shorts, we need to use the standard embed format
    // Shorts URLs like https://www.youtube.com/shorts/VIDEO_ID work with embed
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&showinfo=0`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <div className="container px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-200"></div>
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-500 border-t-transparent absolute top-0 left-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="h-8 w-8 text-indigo-600 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course || lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navigation />
        <div className="container px-4 py-8">
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Course Not Found</h1>
              <p className="text-slate-600 mb-8">The course you're looking for doesn't exist or has no lessons available.</p>
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/courses">Browse All Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentLesson = lessons[currentLessonIndex]
  const embedUrl = getYouTubeEmbedUrl(currentLesson.videoUrl)
  const completionRate = Math.round((completedLessons.size / lessons.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation />

      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                asChild 
                className="hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <Link href={`/courses/${course.id}/lessons`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Lessons
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">{course.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
            <Badge className={`${getDifficultyColor(course.difficulty)} font-medium px-4 py-2`}>
              <Target className="mr-1.5 h-3.5 w-3.5" />
              {course.difficulty}
            </Badge>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Course Progress</h3>
                  <p className="text-sm text-slate-600">
                    {completedLessons.size} of {lessons.length} lessons completed
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">{completionRate}%</div>
                <div className="text-sm text-slate-600">Complete</div>
              </div>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3 bg-slate-200" />
              <div 
                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Video Area */}
          <div className="xl:col-span-3">
            <div className="space-y-6">
              {/* Video Player Card */}
              <Card className="overflow-hidden shadow-xl border-0 bg-white">
                <CardContent className="p-0">
                  {/* YouTube Video Player */}
                  <div className="aspect-video bg-slate-900 relative overflow-hidden">
                    {embedUrl ? (
                      <iframe
                        className="w-full h-full"
                        src={embedUrl}
                        title={currentLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsVideoLoaded(true)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                        <div className="text-center text-white">
                          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <PlayCircle className="h-10 w-10" />
                          </div>
                          <p className="text-xl font-semibold mb-2">No Video Available</p>
                          <p className="text-slate-300">This lesson doesn't have a valid video URL</p>
                          {currentLesson.videoUrl && (
                            <p className="text-slate-400 text-sm mt-2">
                              URL: {currentLesson.videoUrl}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Lesson Details */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-8 h-8 bg-gradient-to-br ${getDifficultyGradient(course.difficulty)} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                            {currentLessonIndex + 1}
                          </div>
                          <Badge variant="outline" className="font-medium">
                            Lesson {currentLessonIndex + 1} of {lessons.length}
                          </Badge>
                        </div>
                        
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">{currentLesson.title}</h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">{currentLesson.description}</p>
                        
                        <div className="flex items-center gap-6 text-slate-500">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span className="font-medium">{currentLesson.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span className="font-medium">Updated recently</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="hover:bg-slate-50">
                          <Share2 className="h-4 w-4 mr-1.5" />
                          Share
                        </Button>
                        <Button
                          onClick={() => markLessonComplete(currentLesson.id)}
                          disabled={completedLessons.has(currentLesson.id)}
                          className={completedLessons.has(currentLesson.id) 
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200" 
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                          }
                          size="lg"
                        >
                          {completedLessons.has(currentLesson.id) ? (
                            <>
                              <CheckCircle className="mr-2 h-5 w-5" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Circle className="mr-2 h-5 w-5" />
                              Mark Complete
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <Separator className="mb-6" />

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={goToPreviousLesson}
                        disabled={currentLessonIndex === 0}
                        className="hover:bg-slate-50 disabled:opacity-50"
                        size="lg"
                      >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        Previous Lesson
                      </Button>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>{currentLessonIndex + 1} / {lessons.length}</span>
                      </div>
                      
                      <Button 
                        onClick={goToNextLesson} 
                        disabled={currentLessonIndex === lessons.length - 1}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
                        size="lg"
                      >
                        {currentLessonIndex === lessons.length - 1 ? (
                          <>
                            <Award className="mr-2 h-5 w-5" />
                            Complete Course
                          </>
                        ) : (
                          <>
                            Next Lesson
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lesson Resources */}
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      Lesson Resources & Notes
                    </CardTitle>
                    <Button
                      variant="ghost"
                      onClick={() => setShowNotes(!showNotes)}
                      size="sm"
                    >
                      {showNotes ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </CardHeader>
                {showNotes && (
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-indigo-600" />
                          About This Lesson
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed mb-4">
                          {currentLesson.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>Duration: {currentLesson.duration}</span>
                        </div>
                      </div>
                      
                      <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <Download className="h-4 w-4 text-emerald-600" />
                          Additional Resources
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            Course materials and worksheets
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            Code examples and templates
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            Additional reading materials
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Course Progress Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Your Progress</h3>
                      <p className="text-white/80 text-sm">{completionRate}% completed</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Completed</span>
                      <span className="font-medium">{completedLessons.size}/{lessons.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining</span>
                      <span className="font-medium">{lessons.length - completedLessons.size}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lessons List */}
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    Course Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="p-4 space-y-2">
                      {lessons.map((lesson, index) => {
                        const isActive = index === currentLessonIndex
                        const isCompleted = completedLessons.has(lesson.id)
                        
                        return (
                          <div
                            key={lesson.id}
                            className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                              isActive 
                                ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-md" 
                                : "hover:bg-slate-50 border border-transparent"
                            }`}
                            onClick={() => setCurrentLessonIndex(index)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                {isCompleted ? (
                                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  </div>
                                ) : isActive ? (
                                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <Play className="h-3 w-3 text-white" />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-xs font-medium group-hover:bg-slate-300 transition-colors">
                                    {index + 1}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-medium mb-1 line-clamp-2 ${
                                  isActive ? "text-indigo-700" : "text-slate-900 group-hover:text-slate-700"
                                }`}>
                                  {lesson.title}
                                </h4>
                                <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                                  {lesson.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                  <Clock className="h-3 w-3" />
                                  <span>{lesson.duration}</span>
                                  {isCompleted && (
                                    <>
                                      <span>•</span>
                                      <CheckCircle className="h-3 w-3 text-emerald-500" />
                                      <span className="text-emerald-600">Done</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}