"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, MessageCircle, Clock, CheckCircle, User, Bot, Paperclip, Smile } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  text: string
  senderId: string
  senderName: string
  timestamp: Date
  isUser: boolean
  status?: "sent" | "delivered" | "read"
}

interface ChatSession {
  id: string
  userId: string
  userName: string
  lastMessage: string
  lastMessageTime: Date
  status: "active" | "resolved" | "pending"
  unreadCount: number
}

export default function ChatPage() {
  const { user, userProfile } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [chatSession, setChatSession] = useState<ChatSession | null>(null)

  useEffect(() => {
    if (user) {
      initializeChat()
    }
  }, [user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const initializeChat = async () => {
    try {
      // Initialize chat session
      const session: ChatSession = {
        id: `chat-${user?.uid}`,
        userId: user?.uid || "",
        userName: userProfile?.displayName || user?.displayName || "User",
        lastMessage: "",
        lastMessageTime: new Date(),
        status: "active",
        unreadCount: 0,
      }
      setChatSession(session)

      // Load existing messages or create welcome message
      const welcomeMessage: Message = {
        id: "welcome-1",
        text: "Hello! Welcome to Earning Engine support. I'm here to help you with any questions about our courses, platform, or trading education. How can I assist you today?",
        senderId: "support",
        senderName: "Earning Engine Support",
        timestamp: new Date(),
        isUser: false,
        status: "delivered",
      }

      setMessages([welcomeMessage])
      setLoading(false)
    } catch (error) {
      console.error("Error initializing chat:", error)
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return

    const messageText = newMessage.trim()
    setNewMessage("")

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      text: messageText,
      senderId: user.uid,
      senderName: userProfile?.displayName || user.displayName || "You",
      timestamp: new Date(),
      isUser: true,
      status: "sent",
    }

    setMessages((prev) => [...prev, userMessage])

    // Show typing indicator
    setIsTyping(true)

    // Simulate support response after 2-3 seconds
    setTimeout(
      () => {
        setIsTyping(false)
        const supportResponse = generateSupportResponse(messageText)
        const supportMessage: Message = {
          id: `msg-${Date.now()}-support`,
          text: supportResponse,
          senderId: "support",
          senderName: "Earning Engine Support",
          timestamp: new Date(),
          isUser: false,
          status: "delivered",
        }
        setMessages((prev) => [...prev, supportMessage])
      },
      Math.random() * 2000 + 1500,
    )
  }

  const generateSupportResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("course") || message.includes("lesson")) {
      return "I'd be happy to help you with course-related questions! You can browse our full course catalog, track your progress in the dashboard, or contact your instructor directly. Is there a specific course you need help with?"
    }

    if (message.includes("payment") || message.includes("billing") || message.includes("refund")) {
      return "For billing and payment questions, I can help you with course purchases, refund requests, and payment methods. All courses come with a 30-day money-back guarantee. What specific billing question do you have?"
    }

    if (message.includes("certificate") || message.includes("completion")) {
      return "Certificates are automatically generated when you complete all lessons in a course with a passing grade. You can download your certificates from your profile page. Have you completed all the required lessons?"
    }

    if (message.includes("technical") || message.includes("bug") || message.includes("error")) {
      return "I'm sorry you're experiencing technical difficulties. Can you please describe the specific issue you're encountering? Include details like what page you were on and what you were trying to do when the problem occurred."
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Thanks for reaching out to Earning Engine support. I'm here to help with any questions about our trading courses, platform features, or account issues. What can I help you with today?"
    }

    if (message.includes("trading") || message.includes("investing") || message.includes("strategy")) {
      return "Great question about trading and investing! While I can help with platform and course questions, for specific trading strategies and investment advice, I'd recommend consulting with our certified instructors or taking our comprehensive courses. Would you like me to recommend some courses based on your experience level?"
    }

    // Default responses
    const defaultResponses = [
      "Thank you for your message! I'm reviewing your question and will provide you with the best possible assistance. Can you provide a bit more detail about what you need help with?",
      "I appreciate you reaching out to us. To better assist you, could you please provide more specific information about your question or concern?",
      "Thanks for contacting Earning Engine support! I want to make sure I give you the most accurate information. Could you elaborate on what you're looking for help with?",
      "I'm here to help! To provide you with the best support, could you please share more details about your question or the issue you're experiencing?",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">You need to be signed in to access support chat.</p>
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

      <div className="container px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Chat Header */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <MessageCircle className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Earning Engine Support</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Online - Typically responds in a few minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Messages */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        {message.isUser ? (
                          <>
                            <AvatarImage src={user.photoURL || ""} alt={message.senderName} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div className={`flex flex-col max-w-[70%] ${message.isUser ? "items-end" : "items-start"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">{message.senderName}</span>
                          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                        </div>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                        {message.isUser && message.status && (
                          <div className="flex items-center gap-1 mt-1">
                            {message.status === "sent" && <Clock className="h-3 w-3 text-muted-foreground" />}
                            {message.status === "delivered" && (
                              <CheckCircle className="h-3 w-3 text-muted-foreground" />
                            )}
                            {message.status === "read" && <CheckCircle className="h-3 w-3 text-primary" />}
                            <span className="text-xs text-muted-foreground capitalize">{message.status}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">Earning Engine Support</span>
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <div className="flex items-center gap-1">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">typing...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Input */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-20 min-h-[44px] resize-none"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button onClick={sendMessage} disabled={!newMessage.trim()} className="h-11">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Press Enter to send, Shift + Enter for new line</span>
                <span>Response time: Usually within 5 minutes</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Help</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start bg-transparent"
                  onClick={() => setNewMessage("I need help with course enrollment")}
                >
                  <div className="font-medium mb-1">Course Enrollment</div>
                  <div className="text-xs text-muted-foreground">Get help enrolling in courses</div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start bg-transparent"
                  onClick={() => setNewMessage("I have a billing question")}
                >
                  <div className="font-medium mb-1">Billing Support</div>
                  <div className="text-xs text-muted-foreground">Payment and refund questions</div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start bg-transparent"
                  onClick={() => setNewMessage("I'm experiencing technical issues")}
                >
                  <div className="font-medium mb-1">Technical Issues</div>
                  <div className="text-xs text-muted-foreground">Report bugs or technical problems</div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start bg-transparent"
                  onClick={() => setNewMessage("How do I get my course certificate?")}
                >
                  <div className="font-medium mb-1">Certificates</div>
                  <div className="text-xs text-muted-foreground">Questions about course certificates</div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
