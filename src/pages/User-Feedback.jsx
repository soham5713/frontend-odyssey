"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockData = [
  { id: 1, type: "Feedback", content: "The new vegan options are delicious!", date: "2023-05-15" },
  { id: 2, type: "Issue", content: "The salad bar was not refilled during lunch hours.", date: "2023-05-14" },
  { id: 3, type: "Feedback", content: "Love the new seating arrangement!", date: "2023-05-13" },
]

const FeedbackAndIssues = () => {
  const [feedbackList, setFeedbackList] = useState(mockData)
  const [newFeedback, setNewFeedback] = useState({ type: "", content: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newFeedback.type && newFeedback.content) {
      setFeedbackList([
        { id: feedbackList.length + 1, ...newFeedback, date: new Date().toISOString().split("T")[0] },
        ...feedbackList,
      ])
      setNewFeedback({ type: "", content: "" })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Feedback & Issues</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Submit Feedback or Report an Issue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select value={newFeedback.type} onValueChange={(value) => setNewFeedback({ ...newFeedback, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Feedback">Feedback</SelectItem>
                <SelectItem value="Issue">Issue</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Your feedback or issue description"
              value={newFeedback.content}
              onChange={(e) => setNewFeedback({ ...newFeedback, content: e.target.value })}
              className="min-h-[100px]"
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <AnimatePresence>
          {feedbackList.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{item.type}</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default FeedbackAndIssues