/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BriefcaseIcon, BuildingIcon, CreditCardIcon, UserIcon } from 'lucide-react'
import onboardingService from '@/services/onboarding'
import { useRouter } from 'next/navigation'
import ReactSelect from 'react-select'

const steps = [
  {
    id: 'company',
    name: 'Company Details',
    icon: BuildingIcon,
    fields: ['companyName', 'website', 'industry', 'companySize']
  },
  {
    id: 'personal',
    name: 'Personal Info',
    icon: UserIcon,
    fields: ['role', 'phoneNumber']
  },
  {
    id: 'business',
    name: 'Business Info',
    icon: BriefcaseIcon,
    fields: ['businessType', 'targetAudience', 'goals']
  },
  {
    id: 'billing',
    name: 'Billing Setup',
    icon: CreditCardIcon,
    fields: ['billingEmail', 'billingAddress']
  }
]

interface Option {
  value: string
  label: string
}

export default function AdvertiserOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<{
    companyName: string
    website: string
    industry: string
    companySize: string
    role: string
    phoneNumber: string
    businessType: string
    targetAudience: Option[]
    goals: string
    billingEmail: string
    billingAddress: string
  }>({
    companyName: '',
    website: '',
    industry: '',
    companySize: '',
    role: '',
    phoneNumber: '',
    businessType: '',
    targetAudience: [],
    goals: '',
    billingEmail: '',
    billingAddress: ''
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length - 1) {
      handleNext()
      return
    }

    setIsLoading(true)
    setError('')
    try {
      // Get user ID from local storage
      const userId = localStorage.getItem('userId')
      if (!userId) {
        throw new Error('User ID not found. Please log in again.')
      }

      // Submit the form
      await onboardingService.updateAdvertiserProfile(userId, {
        ...formData,
        targetAudience: formData.targetAudience.map(option => option.value)
      })

      // Show success message and redirect to advertiser dashboard
      console.log('Advertiser profile updated successfully')
      router.push('/advertiser/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update profile')
      console.error('Onboarding error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${index <= currentStep
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-400'}
                  `}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-600">{step.name}</p>
                  {index < steps.length - 1 && (
                    <div className={`
                      h-1 w-24 mt-5
                      ${index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 backdrop-blur-sm bg-white/80">
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.adminting.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleInputChange('industry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) => handleInputChange('companySize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="role">Your Role</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      placeholder="e.g. Marketing Manager"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessType">Type of Business</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleInputChange('businessType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="b2b">B2B</SelectItem>
                        <SelectItem value="b2c">B2C</SelectItem>
                        <SelectItem value="both">Both B2B and B2C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <ReactSelect
                      isMulti
                      value={formData.targetAudience}
                      onChange={(newValue) => handleInputChange('targetAudience', newValue || [])}
                      options={[
                        { label: 'Gen Z (Under 25)', value: 'Gen Z' },
                        { label: 'Millennials (25-40)', value: 'Millennials' },
                        { label: 'Gen X (41-56)', value: 'Gen X' },
                        { label: 'Baby Boomers (57-75)', value: 'Baby Boomers' },
                        { label: 'Students', value: 'Students' },
                        { label: 'Young Professionals', value: 'Young Professionals' },
                        { label: 'Parents', value: 'Parents' },
                        { label: 'Business Decision Makers', value: 'Business Decision Makers' },
                        { label: 'Tech Enthusiasts', value: 'Tech Enthusiasts' },
                        { label: 'Fashion & Beauty', value: 'Fashion & Beauty' },
                        { label: 'Health & Fitness', value: 'Health & Fitness' },
                        { label: 'Gamers', value: 'Gamers' },
                        { label: 'Travelers', value: 'Travelers' },
                        { label: 'Foodies', value: 'Foodies' }
                      ]}
                      placeholder="Select target audiences"
                      className="w-full"
                      classNamePrefix="select"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goals">Marketing Goals</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      placeholder="What are your main marketing objectives?"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="billingEmail">Billing Email</Label>
                    <Input
                      id="billingEmail"
                      type="email"
                      value={formData.billingEmail}
                      onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                      placeholder="billing@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Textarea
                      id="billingAddress"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      placeholder="Enter your billing address"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                <Button
                  type={currentStep === steps.length - 1 ? 'submit' : 'button'}
                  onClick={currentStep === steps.length - 1 ? undefined : handleNext}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
