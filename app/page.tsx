"use client"

import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { 
  ArrowRight, 
  Play, 
  BookOpen, 
  Target, 
  Zap, 
  TrendingUp, 
  Shield, 
  Users, 
  Award,
  ChevronRight,
  Star,
  Quote,
  CheckCircle,
  BarChart3,
  PieChart,
  LineChart,
  Sparkles,
  Rocket,
  Globe,
  Brain
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -top-10 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg rotate-45 animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/5 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
        </div>

        <div className="container px-4 py-24 md:py-32 relative z-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-blue-200 shadow-lg">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">Start Your Trading Journey</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6">
                  Become a 
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> trading expert</span>
                  <br />today
                </h1>

                {/* Subheadline */}
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Master the art of trading and investing with our comprehensive courses. Learn from industry experts and
                  build wealth through proven strategies that actually work.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200" 
                    asChild
                  >
                    <Link href="/auth/signin">
                      Start Learning Free 
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 border-2 border-slate-300 text-slate-700 hover:bg-white hover:shadow-xl bg-white/80 backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-200"
                    asChild
                  >
                    <Link href="#demo">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span>10k+ happy learners</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9/5</span>
                    <span>(2.1k reviews)</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Interactive Dashboard */}
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">Trading Dashboard</h3>
                      <div className="flex items-center gap-2 bg-emerald-50 rounded-full px-3 py-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-emerald-700">Live</span>
                      </div>
                    </div>

                    {/* Chart Area */}
                    <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                      <svg className="w-full h-full" viewBox="0 0 300 100">
                        <path
                          d="M 10 80 Q 50 20 100 40 T 200 30 T 290 20"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          className="text-blue-500 animate-pulse"
                        />
                      </svg>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-medium text-emerald-700">Profit</span>
                        </div>
                        <div className="text-lg font-bold text-slate-900">+$2,847</div>
                        <div className="text-xs text-emerald-600">+12.5% today</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-700">Success Rate</span>
                        </div>
                        <div className="text-lg font-bold text-slate-900">94.2%</div>
                        <div className="text-xs text-blue-600">This month</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Start Trading
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border animate-bounce">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium">Expert Certified</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border animate-bounce">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">10k+ Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-blue-500/5 bg-[size:60px_60px] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)]"></div>
        </div>
        
        <div className="container px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by thousands of traders worldwide</h2>
            <p className="text-blue-200 text-lg">Join our community of successful investors</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300">
                <Users className="h-8 w-8 text-blue-300" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">25K+</div>
              <div className="text-blue-200">Active Learners</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300">
                <BookOpen className="h-8 w-8 text-blue-300" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-blue-200">Expert Courses</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300">
                <Star className="h-8 w-8 text-blue-300" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">4.9</div>
              <div className="text-blue-200">Average Rating</div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300">
                <Target className="h-8 w-8 text-blue-300" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">96%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
              <Rocket className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Everything you need to
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> master trading</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Professional tools and expert guidance to accelerate your financial education journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Structured Learning</h3>
                  <p className="text-slate-600 leading-relaxed">Progress through carefully designed courses from beginner to advanced levels with clear learning paths.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50"></div>
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Practical Skills</h3>
                  <p className="text-slate-600 leading-relaxed">Learn real-world trading strategies and risk management techniques used by professional traders.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Expert Support</h3>
                  <p className="text-slate-600 leading-relaxed">Get personalized help from experienced traders and join our supportive community of learners.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Secure Learning</h4>
              <p className="text-sm text-slate-600">Bank-level security</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Global Access</h4>
              <p className="text-sm text-slate-600">Learn from anywhere</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LineChart className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Live Markets</h4>
              <p className="text-sm text-slate-600">Real-time data</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Certificates</h4>
              <p className="text-sm text-slate-600">Industry recognized</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Choose Your 
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Learning Path</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Tailored courses for every skill level, from complete beginner to advanced trader.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-3 group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50"></div>
                <div className="relative z-10 p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    🌱
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Beginner</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">Perfect for those just starting their trading journey with no prior experience</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-slate-600">Basic concepts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-slate-600">Risk management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-slate-600">First trades</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-slate-600">Market basics</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200" asChild>
                    <Link href="/auth/signin">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-3 group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50"></div>
                <div className="relative z-10 p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    📈
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Intermediate</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">Build on your foundation with advanced strategies and technical analysis</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-slate-600">Technical analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-slate-600">Chart patterns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-slate-600">Advanced strategies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-slate-600">Psychology</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200" asChild>
                    <Link href="/auth/signin">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-3 group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>
                <div className="relative z-10 p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    🎯
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Advanced</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">Master complex trading techniques and institutional-level strategies</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-slate-600">Options trading</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-slate-600">Derivatives</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-slate-600">Algo trading</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-slate-600">Portfolio mgmt</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200" asChild>
                    <Link href="/auth/signin">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What our 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">students say</span>
            </h2>
            <p className="text-xl text-slate-600">Real success stories from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <Quote className="h-8 w-8 text-blue-200 mb-4" />
                <p className="text-slate-600 mb-6 italic leading-relaxed">"This platform transformed my trading completely. I went from losing money to consistent profits in just 3 months!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    SJ
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Sarah Johnson</div>
                    <div className="text-sm text-slate-500">Day Trader</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <Quote className="h-8 w-8 text-blue-200 mb-4" />
                <p className="text-slate-600 mb-6 italic leading-relaxed">"The courses are incredibly detailed and practical. I use these strategies with my clients every day."</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    MC
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Michael Chen</div>
                    <div className="text-sm text-slate-500">Investment Advisor</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <Quote className="h-8 w-8 text-blue-200 mb-4" />
                <p className="text-slate-600 mb-6 italic leading-relaxed">"Best investment I've ever made. The community support and expert guidance are unmatched."</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    ER
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Emily Rodriguez</div>
                    <div className="text-sm text-slate-500">Forex Trader</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-500/5 bg-[size:100px_100px] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]"></div>
        </div>
        
        <div className="container px-4 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Rocket className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Join 25k+ Successful Traders</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to transform your 
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">financial future?</span>
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join thousands of successful traders who started their journey with Earning Engine. 
              Begin your transformation today with our proven system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-200" 
                asChild
              >
                <Link href="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-200"
                asChild
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 opacity-50"></div>
        
        <div className="container px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Earning Engine</span>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed max-w-md">
                Professional trading and investing education for the modern investor. 
                Transform your financial future with our proven system.
              </p>
              <div className="flex items-center gap-4">
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  <Globe className="h-4 w-4 mr-2" />
                  English
                </Button>
              </div>
            </div>

            {/* Navigation Columns */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                Learning
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Lessons
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Progress
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Certificates
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Live Sessions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-400" />
                Community
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Forums
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-400" />
                Company
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3" />
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-slate-700 pt-8 mb-8">
            <div className="max-w-md">
              <h4 className="font-bold text-white mb-2">Stay Updated</h4>
              <p className="text-slate-300 text-sm mb-4">Get the latest trading insights and course updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              <p>&copy; 2025 Earning Engine. All rights reserved. Built with ❤️ for traders worldwide.</p>
            </div>
            <div className="flex items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200">
                  <span className="text-xs">𝕏</span>
                </button>
                <button className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200">
                  <span className="text-xs">in</span>
                </button>
                <button className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200">
                  <span className="text-xs">▶</span>
                </button>
                <button className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200">
                  <span className="text-xs">💬</span>
                </button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  <span>Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            size="lg" 
            className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200"
            asChild
          >
            <Link href="/auth/signin">
              <Play className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  )
}