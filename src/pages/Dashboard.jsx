import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Utensils, CreditCard, Heart, UserCog } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Dashboard() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const dashboardItems = [
    { title: 'Order Food', icon: Utensils, route: '/user/order' },
    { title: 'View Menu', icon: CreditCard, route: '/user/menu' },
    { title: 'Favorites', icon: Heart, route: '/user/favorites' },
    { title: 'Change Role', icon: UserCog, route: '/role-setup' },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Smart Mess</h1>
      <p className="text-lg">Your current role: <strong>{currentUser?.role || 'Not set'}</strong></p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => navigate(item.route)}
              >
                Go to {item.title}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
