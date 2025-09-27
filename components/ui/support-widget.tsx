"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Minimize2 } from "lucide-react"
import Link from "next/link"

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // In production, this would send the message to support
      setMessage("")
      setIsOpen(false)
      // Redirect to full chat page
      window.location.href = "/chat"
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 shadow-2xl border-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Support</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Online
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Hi! How can we help you today?</p>
              <p className="mt-2">We typically respond within a few minutes.</p>
            </div>

            <div className="space-y-3">
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[80px] resize-none"
              />

              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" asChild className="bg-transparent">
                  <Link href="/chat">Open Full Chat</Link>
                </Button>
                <Button onClick={handleSendMessage} disabled={!message.trim()} size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>For urgent issues, email us at support@earningengine.com</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
