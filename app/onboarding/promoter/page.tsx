/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

import Select from 'react-select'
import { UserIcon, UsersIcon, WalletIcon, GlobeIcon } from 'lucide-react'

import onboardingService from '@/services/onboarding';
import { useRouter } from 'next/navigation';

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
  { value: 'facebook', label: 'Facebook' },
]


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
    audienceInterests: [] as string[],
    contentTypes: [] as string[],
    paymentMethod: '',
    accountNumber: '',
    bankCode: '',
    bankName: ''
  })

  const [banks, setBanks] = useState<Array<{ value: string; label: string }>>([]);
  const [isValidatingAccount, setIsValidatingAccount] = useState(false);
  const [accountValidationError, setAccountValidationError] = useState('');
  const [isLoadingBanks, setIsLoadingBanks] = useState(true);
  const [validatedAccountName, setValidatedAccountName] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch('/api/banks');
        const data = await response.json();
        if (data.status) {
          const formattedBanks = data.data.map((bank: any) => ({
            value: bank.code,
            label: bank.name
          }));
          setBanks(formattedBanks);
        }
      } catch (error) {
        console.error('Error fetching banks:', error);
      } finally {
        setIsLoadingBanks(false);
      }
    };

    fetchBanks();
  }, []);

  const validateAccountNumber = async (accountNumber: string, bankCode: string) => {
    if (accountNumber.length === 10 && bankCode) {
      setIsValidatingAccount(true);
      setAccountValidationError('');
      try {
        const response = await fetch(`/api/validate-account?account_number=${accountNumber}&bank_code=${bankCode}`);
        const data = await response.json();
        console.log(data)
        if (data.status) {
          setValidatedAccountName(data.data.account_name);
          setAccountValidationError('');
        } else {
          setValidatedAccountName('');
          setAccountValidationError('Invalid account details');
        }
      } catch (error) {
        setAccountValidationError('Failed to validate account');
      } finally {
        setIsValidatingAccount(false);
      }
    }
  };

  useEffect(() => {
    if (formData.accountNumber && formData.bankCode) {
      validateAccountNumber(formData.accountNumber, formData.bankCode);
    }
  }, [formData.accountNumber, formData.bankCode]);

  const handleInputChange = (field: string, value: string | string[] | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Only clear error if the field has a valid value
    if (value && value !== '') {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validatePersonalInfo = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required'
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required'
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number'
    }
    
    if (!formData.location.trim()) {
      errors.location = 'Location is required'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateSocialMedia = () => {
    const errors: Record<string, string> = {}
    
    if (formData.platforms.length === 0) {
      errors.platforms = 'Select at least one platform'
    }
    
    if (!formData.followersCount.trim()) {
      errors.followersCount = 'Followers count is required'
    } else if (!/^\d+$/.test(formData.followersCount)) {
      errors.followersCount = 'Please enter a valid number'
    }
    
    if (!formData.engagementRate.trim()) {
      errors.engagementRate = 'Engagement rate is required'
    } else if (!/^\d+(\.\d+)?$/.test(formData.engagementRate)) {
      errors.engagementRate = 'Please enter a valid number (e.g., 3.5)'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateAudienceInfo = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.audienceAge) {
      errors.audienceAge = 'Please select an age range'
    }
    
    if (formData.audienceInterests.length === 0) {
      errors.audienceInterests = 'Select at least one interest'
    }
    
    if (formData.contentTypes.length === 0) {
      errors.contentTypes = 'Select at least one content type'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePayoutSetup = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Please select a payment method'
    }
    
    if (!formData.bankCode) {
      errors.bankCode = 'Please select a bank'
    }
    
    if (!formData.accountNumber) {
      errors.accountNumber = 'Account number is required'
    } else if (!/^\d{10}$/.test(formData.accountNumber)) {
      errors.accountNumber = 'Account number must be 10 digits'
    }
    
    if (!validatedAccountName) {
      errors.accountNumber = 'Please verify your account number'
    }
    
    if (accountValidationError) {
      errors.accountNumber = accountValidationError
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    let isValid = false
    
    switch (currentStep) {
      case 0:
        isValid = validatePersonalInfo()
        break
      case 1:
        isValid = validateSocialMedia()
        break
      case 2:
        isValid = validateAudienceInfo()
        break
      case 3:
        isValid = validatePayoutSetup()
        break
    }
    
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      // Clear all errors when moving to next step
      setFormErrors({})
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 sm:py-8 md:py-12 px-0 sm:px-6 md:px-8">
      <div className="container max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12 md:mb-16 overflow-x-auto">
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
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className={formErrors.fullName ? 'border-red-500' : ''}
                    />
                    {formErrors.fullName && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className={formErrors.phoneNumber ? 'border-red-500' : ''}
                    />
                    {formErrors.phoneNumber && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.phoneNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                      className={formErrors.location ? 'border-red-500' : ''}
                    />
                    {formErrors.location && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.location}</p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label>Social Media Platforms</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {socialPlatforms.map((platform) => (
                        <Button
                          key={platform.value}
                          type="button"
                          variant={formData.platforms.includes(platform.value) ? "default" : "outline"}
                          className={`justify-start ${formData.platforms.includes(platform.value)
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
                    {formErrors.platforms && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.platforms}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="followersCount">Total Followers</Label>
                    <Input
                      id="followersCount"
                      value={formData.followersCount}
                      onChange={(e) => handleInputChange('followersCount', e.target.value)}
                      placeholder="e.g. 10000"
                      className={formErrors.followersCount ? 'border-red-500' : ''}
                    />
                    {formErrors.followersCount && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.followersCount}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="engagementRate">Average Engagement Rate</Label>
                    <Input
                      id="engagementRate"
                      value={formData.engagementRate}
                      onChange={(e) => handleInputChange('engagementRate', e.target.value)}
                      placeholder="e.g. 3.5"
                      className={formErrors.engagementRate ? 'border-red-500' : ''}
                    />
                    {formErrors.engagementRate && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.engagementRate}</p>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <Label htmlFor="audienceAge">Primary Audience Age Range</Label>
                    <Select
                      options={[
                        { value: '13-17', label: '13-17 years' },
                        { value: '18-24', label: '18-24 years' },
                        { value: '25-34', label: '25-34 years' },
                        { value: '35-44', label: '35-44 years' },
                        { value: '45+', label: '45+ years' }
                      ]}
                      value={formData.audienceAge ? { value: formData.audienceAge, label: formData.audienceAge + ' years' } : null}
                      onChange={(selected) => handleInputChange('audienceAge', selected ? selected.value : '')}
                      className={`w-full ${formErrors.audienceAge ? 'border-red-500' : ''}`}
                      classNamePrefix="select"
                      placeholder="Select age range"
                    />
                    {formErrors.audienceAge && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.audienceAge}</p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Audience Interests</Label>
                      <Select
                        isMulti
                        options={[
                          { value: 'fashion', label: 'Fashion & Style' },
                          { value: 'tech', label: 'Technology' },
                          { value: 'gaming', label: 'Gaming' },
                          { value: 'beauty', label: 'Beauty & Cosmetics' },
                          { value: 'fitness', label: 'Fitness & Health' },
                          { value: 'food', label: 'Food & Cooking' },
                          { value: 'travel', label: 'Travel' },
                          { value: 'music', label: 'Music' },
                          { value: 'art', label: 'Art & Design' },
                          { value: 'business', label: 'Business & Entrepreneurship' },
                          { value: 'education', label: 'Education' },
                          { value: 'entertainment', label: 'Entertainment' },
                        ]}
                        value={formData.audienceInterests.map(interest => ({
                          value: interest,
                          label: interest.charAt(0).toUpperCase() + interest.slice(1)
                        }))}
                        onChange={(selected) => {
                          handleInputChange('audienceInterests', selected ? selected.map(option => option.value) : []);
                        }}
                        className={`w-full ${formErrors.audienceInterests ? 'border-red-500' : ''}`}
                        placeholder="Select audience interests..."
                        classNamePrefix="select"
                      />
                      {formErrors.audienceInterests && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.audienceInterests}</p>
                      )}
                    </div>
                    <div>
                      <Label>Content Types</Label>
                      <Select
                        isMulti
                        options={[
                          { value: 'photos', label: 'Photos & Images' },
                          { value: 'videos', label: 'Videos' },
                          { value: 'reels', label: 'Reels & Short Videos' },
                          { value: 'stories', label: 'Stories' },
                          { value: 'live', label: 'Live Streaming' },
                          { value: 'blogs', label: 'Blog Posts' },
                          { value: 'reviews', label: 'Product Reviews' },
                          { value: 'tutorials', label: 'Tutorials & How-tos' },
                          { value: 'podcasts', label: 'Podcasts' },
                        ]}
                        value={formData.contentTypes.map(type => ({
                          value: type,
                          label: type.charAt(0).toUpperCase() + type.slice(1)
                        }))}
                        onChange={(selected) => {
                          handleInputChange('contentTypes', selected ? selected.map(option => option.value) : []);
                        }}
                        className={`w-full ${formErrors.contentTypes ? 'border-red-500' : ''}`}
                        placeholder="Select content types..."
                        classNamePrefix="select"
                      />
                      {formErrors.contentTypes && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.contentTypes}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                    <Select
                      options={[
                        { value: 'bank', label: 'Bank Transfer' },
                      ]}
                      value={formData.paymentMethod ? { value: formData.paymentMethod, label: formData.paymentMethod.charAt(0).toUpperCase() + formData.paymentMethod.slice(1) } : null}
                      onChange={(selected) => handleInputChange('paymentMethod', selected ? selected.value : '')}
                      className={`w-full ${formErrors.paymentMethod ? 'border-red-500' : ''}`}
                      classNamePrefix="select"
                      placeholder="Select payment method"
                    />
                    {formErrors.paymentMethod && (
                      <p className="text-sm text-red-500 mt-1">{formErrors.paymentMethod}</p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bankCode">Select Bank</Label>
                      <Select
                        options={banks}
                        isLoading={isLoadingBanks}
                        value={formData.bankCode ? { value: formData.bankCode, label: formData.bankName } : null}
                        onChange={(selected) => {
                          if (selected) {
                            handleInputChange('bankCode', selected.value);
                            handleInputChange('bankName', selected.label);
                            // Reset account validation when bank changes
                            setValidatedAccountName('');
                            setAccountValidationError('');
                          } else {
                            handleInputChange('bankCode', '');
                            handleInputChange('bankName', '');
                            setValidatedAccountName('');
                            setAccountValidationError('');
                          }
                        }}
                        className={`w-full ${formErrors.bankCode ? 'border-red-500' : ''}`}
                        classNamePrefix="select"
                        placeholder="Select your bank"
                      />
                      {formErrors.bankCode && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.bankCode}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber || ''}
                        onChange={(e) => {
                          handleInputChange('accountNumber', e.target.value);
                          // Reset account validation when account number changes
                          setValidatedAccountName('');
                          setAccountValidationError('');
                        }}
                        placeholder="Enter your account number"
                        maxLength={10}
                        pattern="\d*"
                        className={formErrors.accountNumber ? 'border-red-500' : ''}
                      />
                      {isValidatingAccount && <p className="text-sm text-gray-500">Validating account...</p>}
                      {formErrors.accountNumber && <p className="text-sm text-red-500">{formErrors.accountNumber}</p>}
                      {validatedAccountName && <p className="text-sm text-green-500">Account Name: {validatedAccountName}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 flex-wrap md:flex-no-wrap space-y-2 gap-2">
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
                  disabled={isLoading || (currentStep === steps.length - 1 && !validatedAccountName)}
                >
                  {currentStep === steps.length - 1 ? (
                    isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Setting up...</span>
                      </div>
                    ) : (
                      'Complete Setup'
                    )
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
