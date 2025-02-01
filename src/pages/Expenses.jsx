import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, BarChart, PieChart } from "@/components/ui/chart"
import { format, subDays, startOfMonth, eachDayOfInterval, isWithinInterval, subMonths } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"

const categories = ["Mess Food", "Canteen", "Restaurant", "Snacks", "Beverages"]

const timeRanges = [
  { label: "This Month", value: "thisMonth" },
  { label: "Last 30 Days", value: "last30Days" },
  { label: "Last 3 Months", value: "last3Months" },
  { label: "This Year", value: "thisYear" },
  { label: "Custom", value: "custom" },
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
  const [customDateRange, setCustomDateRange] = useState({ from: subMonths(new Date(), 1), to: new Date() })
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [amountRange, setAmountRange] = useState([0, 500])

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
        case "custom":
          return customDateRange.from
        default:
          return startOfMonth(now)
      }
    })()
    const endDate = selectedTimeRange === "custom" ? customDateRange.to : now

    return dummyExpenses.filter(
      (expense) =>
        isWithinInterval(expense.date, { start: startDate, end: endDate }) &&
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "All" || expense.category === categoryFilter) &&
        expense.amount >= amountRange[0] &&
        expense.amount <= amountRange[1],
    )
  }, [selectedTimeRange, customDateRange, searchTerm, categoryFilter, amountRange])

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

  const handleExportCSV = useCallback(() => {
    const csvContent = [
      ["Date", "Description", "Category", "Amount"],
      ...filteredExpenses.map((expense) => [
        format(expense.date, "yyyy-MM-dd"),
        expense.description,
        expense.category,
        expense.amount.toFixed(2),
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "food_expenses.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [filteredExpenses])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Food Expenses</h1>
        <Button onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

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
          {selectedTimeRange === "custom" && (
            <div className="flex space-x-2 mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customDateRange.from ? format(customDateRange.from, "PPP") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={customDateRange.from}
                    onSelect={(date) => setCustomDateRange((prev) => ({ ...prev, from: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customDateRange.to ? format(customDateRange.to, "PPP") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={customDateRange.to}
                    onSelect={(date) => setCustomDateRange((prev) => ({ ...prev, to: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
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
          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">
              Amount Range: ₹{amountRange[0]} - ₹{amountRange[1]}
            </p>
            <Slider min={0} max={500} step={10} value={amountRange} onValueChange={setAmountRange} />
          </div>
          {filteredExpenses.length > 0 ? (
            <ScrollArea className="h-[400px]">
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
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{format(expense.date, "MMM d, yyyy")}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">₹{expense.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <p className="text-muted-foreground">No food expenses recorded for the selected criteria.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Expenses

