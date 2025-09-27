"use client"

import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { BookOpen, Clock, Star, TrendingUp, Award, Play, ChevronRight, Calendar } from "lucide-react"

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userProfile?.displayName || user.displayName || "Trader"}!
          </h1>
          <p className="text-muted-foreground">Continue your learning journey and master the markets.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Courses Enrolled</p>
                  <p className="text-2xl font-bold text-foreground">{userProfile?.enrolledCourses?.length || 0}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lessons Completed</p>
                  <p className="text-2xl font-bold text-foreground">{userProfile?.completedLessons?.length || 0}</p>
                </div>
                <Award className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Continue Learning
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sample course progress */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">Stock Market Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">Lesson 3: Technical Analysis Basics</p>
                    </div>
                    <Badge variant="secondary">Beginner</Badge>
                  </div>
                  <Progress value={60} className="mb-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">60% complete</span>
                    <Button size="sm" asChild>
                      <Link href="/learning/1">Continue</Link>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">Cryptocurrency Trading</h3>
                      <p className="text-sm text-muted-foreground">Lesson 1: Introduction to Crypto</p>
                    </div>
                    <Badge variant="default">Intermediate</Badge>
                  </div>
                  <Progress value={20} className="mb-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">20% complete</span>
                    <Button size="sm" asChild>
                      <Link href="/learning/2">Continue</Link>
                    </Button>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/courses">
                      Browse All Courses <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/courses">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/profile">
                    <Award className="mr-2 h-4 w-4" />
                    View Certificates
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/chat">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Get Support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">7</div>
                  <p className="text-sm text-muted-foreground">Days in a row</p>
                  <p className="text-xs text-muted-foreground mt-2">Keep it up! You're on fire 🔥</p>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Course */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Play className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Options Strategies</h3>
                    <p className="text-sm text-muted-foreground">Advanced trading techniques</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="destructive">Advanced</Badge>
                    <span className="text-sm font-semibold text-primary">$199</span>
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/courses/3">Enroll Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
