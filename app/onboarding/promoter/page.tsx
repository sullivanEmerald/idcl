/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserIcon, UsersIcon, WalletIcon, GlobeIcon } from 'lucide-react'

const steps = [
  {
    id: 'personal',
    name: 'Personal Info',
    icon: UserIcon,
    fields: ['fullName', 'phoneNumber', 'location']
  },
  {
    id: 'social',
    name: 'Social Media',
    icon: GlobeIcon,
    fields: ['platforms', 'followersCount', 'engagementRate']
  },
  {
    id: 'audience',
    name: 'Audience Info',
    icon: UsersIcon,
    fields: ['audienceAge', 'audienceInterests', 'contentTypes']
  },
  {
    id: 'payout',
    name: 'Payout Setup',
    icon: WalletIcon,
    fields: ['paymentMethod', 'accountDetails']
  }
]

const socialPlatforms = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'facebook', label: 'Facebook' }
]

import onboardingService from '@/services/onboarding';
import { useRouter } from 'next/navigation';

export default function PromoterOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    platforms: [] as string[],
    followersCount: '',
    engagementRate: '',
    audienceAge: '',
    audienceInterests: '',
    contentTypes: '',
    paymentMethod: '',
    accountDetails: ''
  })

  const handleInputChange = (field: string, value: string | string[]) => {
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
      await onboardingService.updatePromoterProfile(userId, formData)
      
      // Show success message and redirect to promoter dashboard
      console.log('Promoter profile updated successfully')
      router.push('/promoter/dashboard')
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
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
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
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label>Social Media Platforms</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {socialPlatforms.map((platform) => (
                        <Button
                          key={platform.value}
                          type="button"
                          variant={formData.platforms.includes(platform.value) ? "default" : "outline"}
                          className={`justify-start ${
                            formData.platforms.includes(platform.value)
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                              : ""
                          }`}
                          onClick={() => {
                            const newPlatforms = formData.platforms.includes(platform.value)
                              ? formData.platforms.filter(p => p !== platform.value)
                              : [...formData.platforms, platform.value]
                            handleInputChange('platforms', newPlatforms)
                          }}
                        >
                          {platform.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="followersCount">Total Followers</Label>
                    <Input
                      id="followersCount"
                      value={formData.followersCount}
                      onChange={(e) => handleInputChange('followersCount', e.target.value)}
                      placeholder="e.g. 10000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="engagementRate">Average Engagement Rate</Label>
                    <Input
                      id="engagementRate"
                      value={formData.engagementRate}
                      onChange={(e) => handleInputChange('engagementRate', e.target.value)}
                      placeholder="e.g. 3.5%"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="audienceAge">Primary Audience Age Range</Label>
                    <Select
                      value={formData.audienceAge}
                      onValueChange={(value) => handleInputChange('audienceAge', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13-17">13-17 years</SelectItem>
                        <SelectItem value="18-24">18-24 years</SelectItem>
                        <SelectItem value="25-34">25-34 years</SelectItem>
                        <SelectItem value="35-44">35-44 years</SelectItem>
                        <SelectItem value="45+">45+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="audienceInterests">Audience Interests</Label>
                    <Textarea
                      id="audienceInterests"
                      value={formData.audienceInterests}
                      onChange={(e) => handleInputChange('audienceInterests', e.target.value)}
                      placeholder="What are your audience's main interests?"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contentTypes">Content Types</Label>
                    <Textarea
                      id="contentTypes"
                      value={formData.contentTypes}
                      onChange={(e) => handleInputChange('contentTypes', e.target.value)}
                      placeholder="What types of content do you create?"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange('paymentMethod', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accountDetails">Account Details</Label>
                    <Textarea
                      id="accountDetails"
                      value={formData.accountDetails}
                      onChange={(e) => handleInputChange('accountDetails', e.target.value)}
                      placeholder="Enter your payment account details"
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
