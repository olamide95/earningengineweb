"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Star,
  Clock,
  BookOpen,
  Users,
  Play,
  Bookmark,
  BookmarkCheck,
  Award,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/firebase-config"
import { collection, query, where, orderBy, getDocs, doc, getDoc } from "firebase/firestore"

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
  whatYouWillLearn: string[]
  requirements: string[]
  createdAt: Date
}

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  videoUrl: string
  order: number
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchCourseData()
      if (user) {
        checkSavedStatus()
        checkEnrollmentStatus()
      }
    }
  }, [params.id, user])

  const fetchCourseData = async () => {
    try {
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
          whatYouWillLearn: courseData.whatYouWillLearn || [],
          requirements: courseData.requirements || [],
          createdAt: courseData.createdAt?.toDate ? courseData.createdAt.toDate() : new Date(),
        })

        const lessonsRef = collection(db, "lessons")
        const q = query(lessonsRef, where("courseId", "==", params.id), orderBy("order", "asc"))
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
          })
        })

        setLessons(fetchedLessons)
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching course:", error)
      setLoading(false)
    }
  }

  const checkSavedStatus = async () => {
    if (!user || !params.id) return

    try {
      // In production, check Firestore for saved status
      setIsSaved(false)
    } catch (error) {
      console.error("Error checking saved status:", error)
    }
  }

  const checkEnrollmentStatus = async () => {
    if (!user || !params.id) return

    try {
      // In production, check Firestore for enrollment status
      setIsEnrolled(false)
    } catch (error) {
      console.error("Error checking enrollment status:", error)
    }
  }

  const handleSaveCourse = async () => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    try {
      if (isSaved) {
        // Remove from saved
        setIsSaved(false)
        toast.success("Course removed from saved")
      } else {
        // Add to saved
        setIsSaved(true)
        toast.success("Course saved successfully")
      }
    } catch (error) {
      console.error("Error saving course:", error)
      toast.error("Failed to save course")
    }
  }

  const handleEnrollCourse = async () => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    try {
      setIsEnrolled(true)
      toast.success("Successfully enrolled in course!")
      // In production, this would create enrollment record in Firestore
    } catch (error) {
      console.error("Error enrolling in course:", error)
      toast.error("Failed to enroll in course")
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

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
            <Button asChild>
              <Link href="/courses">Browse All Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="aspect-video mb-6 rounded-lg overflow-hidden">
                <img
                  src={course.imageUrl || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>1,234 students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.durationHours} hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessonCount} lessons</span>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {lessons.length} lessons • {course.durationHours} hours total
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lessons.map((lesson, index) => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">{lesson.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Play className="h-4 w-4" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Meet Your Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {course.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{course.instructor}</h3>
                        <p className="text-muted-foreground mb-4">
                          Professional trader and educator with over 10 years of experience in financial markets.
                          Specialized in {course.category.toLowerCase()} trading and risk management.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>4.9 instructor rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>15,000+ students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            <span>25 courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">{course.price}</div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>

                <div className="space-y-3 mb-6">
                  {isEnrolled ? (
                    <Button className="w-full" asChild>
                      <Link href={`/courses/${course.id}/lessons`}>
                        <Play className="mr-2 h-4 w-4" />
                        View Lessons
                      </Link>
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={handleEnrollCourse}>
                      Enroll Now
                    </Button>
                  )}

                  <Button variant="outline" className="w-full bg-transparent" onClick={handleSaveCourse}>
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="mr-2 h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save for Later
                      </>
                    )}
                  </Button>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.durationHours} hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lessons</span>
                    <span className="font-medium">{course.lessonCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="font-medium">{course.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Certificate</span>
                    <span className="font-medium">Yes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lifetime Access</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
