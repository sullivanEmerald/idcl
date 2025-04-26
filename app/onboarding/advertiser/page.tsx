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
import { toast } from 'sonner'

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

interface FormData {
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
  logo: string
}

export default function AdvertiserOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
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
    billingAddress: '',
    logo: ''
  })

  const [isUploadingLogo, setIsUploadingLogo] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setIsLoading(true)
      try {
        // Validate current step fields
        const currentStepFields = steps[currentStep].fields as Array<keyof FormData>
        const hasEmptyFields = currentStepFields.some(field => {
          if (field === 'targetAudience') {
            return formData[field].length === 0
          }
          return !formData[field]
        })

        if (hasEmptyFields) {
          toast.error('Please fill in all required fields')
          return
        }

        setCurrentStep(currentStep + 1)
      } finally {
        setIsLoading(false)
      }
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
      await handleNext()
      return
    }

    // Validate final step fields
    const finalStepFields = steps[currentStep].fields as Array<keyof FormData>
    const hasEmptyFields = finalStepFields.some(field => !formData[field])
    if (hasEmptyFields) {
      toast.error('Please fill in all required fields')
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
        targetAudience: formData.targetAudience.map(option => option.value),
        logoUrl: formData.logo
      })

      toast.success('Profile updated successfully!')
      router.push('/advertiser/dashboard')
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update profile'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Onboarding error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoUpload = async (file: File) => {
    try {
      setIsUploadingLogo(true)
      
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = "adminting"

      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing")
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)
      formData.append("resource_type", "image")

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "Error uploading to Cloudinary")
      }

      handleInputChange('logo', data.secure_url)
      toast.success("Logo uploaded successfully")
    } catch (error: any) {
      console.error("Error uploading logo:", error)
      toast.error("Upload failed");
    } finally {
      setIsUploadingLogo(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 sm:py-8 md:py-12 px-0 sm:px-4 md:px-6">
      <div className="container max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-20 sm:mb-20 md:mb-20 overflow-x-auto">
          <div className="flex justify-between min-w-[400px] sm:min-w-full px-2">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div className={`
                    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center
                    ${index <= currentStep
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-400'}
                  `}>
                    <StepIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                  </div>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-gray-600 text-center whitespace-nowrap">{step.name}</p>
                  {index < steps.length - 1 && (
                    <div className={`
                      h-0.5 sm:h-1 w-full mt-3 sm:mt-4 md:mt-5
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
          <Card className="p-3 sm:p-4 md:p-6 backdrop-blur-sm bg-white/80">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
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

                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <div className="flex flex-col gap-4">
                      {formData.logo && (
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={formData.logo}
                            alt="Company logo"
                            className="object-contain w-full h-full"
                          />
                          <button
                            type="button"
                            onClick={() => handleInputChange('logo', '')}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6L6 18" />
                              <path d="M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <div className="flex items-center justify-center w-full">
                        <label
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${isUploadingLogo ? "opacity-50 pointer-events-none" : ""}`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            {isUploadingLogo ? (
                              <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                                <p className="text-sm text-gray-500">
                                  Uploading logo...
                                </p>
                              </div>
                            ) : (
                              <>
                                <p className="mb-2 text-sm text-gray-500">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                  Upload your company logo (PNG, JPG)
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleLogoUpload(file);
                            }}
                          />
                        </label>
                      </div>
                    </div>
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

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  Back
                </Button>
                <Button
                  type={currentStep === steps.length - 1 ? 'submit' : 'button'}
                  onClick={currentStep === steps.length - 1 ? undefined : handleNext}
                  className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
