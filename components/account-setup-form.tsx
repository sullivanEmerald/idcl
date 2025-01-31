import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface AccountSetupFormProps {
  onSubmit: (data: any) => void
}

export function AccountSetupForm({ onSubmit }: AccountSetupFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    preferences: {
      games: [] as string[],
      notifications: true
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Account Setup</CardTitle>
        <CardDescription>Complete your profile to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs value={String(step)} onValueChange={(value) => setStep(Number(value))}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1" disabled={step < 1}>Basic Info</TabsTrigger>
              <TabsTrigger value="2" disabled={step < 2}>Preferences</TabsTrigger>
              <TabsTrigger value="3" disabled={step < 3}>Finish</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Game Preferences
                  </label>
                  {/* Add game selection checkboxes here */}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={formData.preferences.notifications}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        notifications: e.target.checked
                      }
                    }))}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="notifications" className="text-sm">
                    Receive notifications about new tasks and giveaways
                  </label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="3">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Review your information before completing the setup
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="font-medium">Username:</dt>
                      <dd>{formData.username}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium">Email:</dt>
                      <dd>{formData.email}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} className={step === 1 ? 'w-full' : ''}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-primary">
            Complete Setup
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
