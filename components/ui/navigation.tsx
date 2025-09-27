"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, User, BookOpen, MessageCircle, Settings, LogOut } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, userProfile, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Earning Engine" width={32} height={32} className="h-8 w-8" />
          <span className="text-xl font-bold text-slate-900">Earning Engine</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/courses"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/learning"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                My Learning
              </Link>
              <Link href="/chat" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Support
              </Link>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Courses
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile?.displayName || user.displayName}</p>
                    <p className="text-xs leading-none text-slate-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/saved">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Saved Courses
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container py-4 space-y-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Courses</span>
                </Link>
                <Link
                  href="/chat"
                  className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Support</span>
                </Link>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                <span>Courses</span>
              </Link>
            )}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              {user ? (
                <>
                  <div className="px-2 py-1 text-sm text-slate-600">{userProfile?.displayName || user.displayName}</div>
                  <Button variant="ghost" className="w-full justify-start text-slate-700" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start text-slate-700" asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
