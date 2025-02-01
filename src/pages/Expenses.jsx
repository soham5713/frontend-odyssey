import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, BarChart, PieChart } from "@/components/ui/chart"
import { format, subDays, startOfMonth, eachDayOfInterval, isWithinInterval, subMonths } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const categories = ["Mess Food", "Canteen", "Restaurant", "Snacks", "Beverages"]

const timeRanges = [
  { label: "This Month", value: "thisMonth" },
  { label: "Last 30 Days", value: "last30Days" },
  { label: "Last 3 Months", value: "last3Months" },
  { label: "This Year", value: "thisYear" },
]

// Generate dummy data for the past year
const generateDummyData = () => {
  const data = []
  const startDate = subMonths(new Date(), 12) // Start from 12 months ago
  const endDate = new Date()

  for (let date = startDate; date <= endDate; date = new Date(date.setDate(date.getDate() + 1))) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const randomAmount = Math.floor(Math.random() * 200) + 10 // Random amount between 10 and 210

    data.push({
      id: date.getTime(),
      description: `${randomCategory} purchase`,
      amount: randomAmount,
      category: randomCategory,
      date: new Date(date),
    })

    // Add some days with multiple expenses
    if (Math.random() > 0.7) {
      const secondCategory = categories[Math.floor(Math.random() * categories.length)]
      const secondAmount = Math.floor(Math.random() * 100) + 10

      data.push({
        id: date.getTime() + 1,
        description: `${secondCategory} purchase`,
        amount: secondAmount,
        category: secondCategory,
        date: new Date(date),
      })
    }
  }

  return data
}

const dummyExpenses = generateDummyData()

export function Expenses() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("thisMonth")

  const filteredExpenses = useMemo(() => {
    const now = new Date()
    const startDate = (() => {
      switch (selectedTimeRange) {
        case "thisMonth":
          return startOfMonth(now)
        case "last30Days":
          return subDays(now, 29)
        case "last3Months":
          return subMonths(now, 3)
        case "thisYear":
          return new Date(now.getFullYear(), 0, 1)
        default:
          return startOfMonth(now)
      }
    })()
    const endDate = now

    return dummyExpenses.filter((expense) => isWithinInterval(expense.date, { start: startDate, end: endDate }))
  }, [selectedTimeRange])

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  const expensesByCategory = useMemo(
    () =>
      categories.map((category) => ({
        category,
        amount: filteredExpenses
          .filter((expense) => expense.category === category)
          .reduce((sum, expense) => sum + expense.amount, 0),
      })),
    [filteredExpenses],
  )

  const dailyExpenses = useMemo(() => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), 29),
      end: new Date(),
    })
    return days.map((date) => ({
      date,
      amount: filteredExpenses
        .filter((expense) => expense.date.toDateString() === date.toDateString())
        .reduce((sum, expense) => sum + expense.amount, 0),
    }))
  }, [filteredExpenses])

  const lineChartData = {
    labels: dailyExpenses.map((item) => format(item.date, "MMM d")),
    datasets: [
      {
        label: "Daily Food Expenses",
        data: dailyExpenses.map((item) => item.amount),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const barChartData = {
    labels: categories,
    datasets: [
      {
        label: "Food Expenses by Category",
        data: expensesByCategory.map((item) => item.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  }

  const pieChartData = {
    labels: categories,
    datasets: [
      {
        data: expensesByCategory.map((item) => item.amount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Food Expenses</h1>

      <Card>
        <CardHeader>
          <CardTitle>Expense Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg font-semibold">Total Food Expenses:</p>
              <p className="text-2xl font-bold">₹{totalExpenses.toFixed(2)}</p>
            </div>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="line">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="line">Trend</TabsTrigger>
              <TabsTrigger value="bar">Categories</TabsTrigger>
              <TabsTrigger value="pie">Distribution</TabsTrigger>
            </TabsList>
            <TabsContent value="line">
              <div className="h-[300px]">
                <LineChart data={lineChartData} />
              </div>
            </TabsContent>
            <TabsContent value="bar">
              <div className="h-[300px]">
                <BarChart data={barChartData} />
              </div>
            </TabsContent>
            <TabsContent value="pie">
              <div className="h-[300px]">
                <PieChart data={pieChartData} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Food Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.slice(0, 10).map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{format(expense.date, "MMM d, yyyy")}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="text-right">₹{expense.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No food expenses recorded for the selected time range.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Expenses

