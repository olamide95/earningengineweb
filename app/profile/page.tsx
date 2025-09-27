"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  User,
  Mail,
  Calendar,
  Award,
  BookOpen,
  Star,
  Edit,
  Save,
  X,
  Camera,
  Download,
  Trash2,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface Certificate {
  id: string
  courseTitle: string
  completedDate: Date
  certificateUrl: string
  instructor: string
}

interface SavedCourse {
  id: string
  title: string
  category: string
  difficulty: string
  price: string
  rating: number
  imageUrl: string
  savedDate: Date
}

export default function ProfilePage() {
  const { user, userProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && userProfile) {
      setDisplayName(userProfile.displayName || user.displayName || "")
      setBio("Passionate about learning trading and investing strategies.")
      fetchUserData()
    }
  }, [user, userProfile])

  const fetchUserData = async () => {
    try {
      // Sample certificates data
      const sampleCertificates: Certificate[] = [
        {
          id: "cert-1",
          courseTitle: "Stock Market Fundamentals",
          completedDate: new Date("2024-02-15"),
          certificateUrl: "/certificates/stock-fundamentals.pdf",
          instructor: "Sarah Johnson",
        },
      ]

      // Sample saved courses data
      const sampleSavedCourses: SavedCourse[] = [
        {
          id: "3",
          title: "Advanced Options Strategies",
          category: "Options",
          difficulty: "Advanced",
          price: "$199",
          rating: 4.9,
          imageUrl: "/options-trading-strategies.png",
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
          savedDate: new Date("2024-03-08"),
        },
      ]

      setCertificates(sampleCertificates)
      setSavedCourses(sampleSavedCourses)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user data:", error)
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      // In production, this would update the user profile in Firestore
      toast.success("Profile updated successfully!")
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    }
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
      month: "long",
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
            <p className="text-muted-foreground mb-6">You need to be signed in to access your profile.</p>
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
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.photoURL || ""} alt={displayName} />
                  <AvatarFallback className="text-2xl">
                    {displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="bg-transparent">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {formatDate(userProfile?.createdAt || new Date())}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userProfile?.enrolledCourses?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{certificates.length}</div>
                  <div className="text-sm text-muted-foreground">Certificates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{savedCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Saved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="certificates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="saved">Saved Courses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  My Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                {certificates.length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No certificates yet</h3>
                    <p className="text-muted-foreground mb-6">Complete courses to earn certificates</p>
                    <Button asChild>
                      <Link href="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificates.map((certificate) => (
                      <Card key={certificate.id} className="border-2 border-primary/20">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground mb-1">{certificate.courseTitle}</h3>
                              <p className="text-sm text-muted-foreground">by {certificate.instructor}</p>
                            </div>
                            <Award className="h-8 w-8 text-primary" />
                          </div>
                          <Separator className="mb-4" />
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              Completed on {formatDate(certificate.completedDate)}
                            </div>
                            <Button size="sm" asChild>
                              <Link href={certificate.certificateUrl} target="_blank">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Saved Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No saved courses</h3>
                    <p className="text-muted-foreground mb-6">Save courses you're interested in for later</p>
                    <Button asChild>
                      <Link href="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedCourses.map((course) => (
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
                          <h3 className="text-lg font-semibold text-foreground mb-2">{course.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Saved {formatDate(course.savedDate)}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-primary">{course.price}</span>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={user.email || ""} disabled className="mt-1" />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about your courses</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Marketing Emails</p>
                        <p className="text-sm text-muted-foreground">Receive promotional content</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Disabled
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Danger Zone</h3>
                  <div className="p-4 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
