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

export const socialPlatforms = [
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
                      options={[
                        { value: '13-17', label: '13-17 years' },
                        { value: '18-24', label: '18-24 years' },
                        { value: '25-34', label: '25-34 years' },
                        { value: '35-44', label: '35-44 years' },
                        { value: '45+', label: '45+ years' }
                      ]}
                      value={formData.audienceAge ? { value: formData.audienceAge, label: formData.audienceAge + ' years' } : null}
                      onChange={(selected) => handleInputChange('audienceAge', selected ? selected.value : '')}
                      className="w-full"
                      classNamePrefix="select"
                      placeholder="Select age range"
                    />
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
                        className="w-full"
                        placeholder="Select audience interests..."
                        classNamePrefix="select"
                      />
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
                        className="w-full"
                        placeholder="Select content types..."
                        classNamePrefix="select"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                    <Select
                      options={[
                        { value: 'bank', label: 'Bank Transfer' },
                        // { value: 'paypal', label: 'PayPal' },
                        // { value: 'crypto', label: 'Cryptocurrency' }
                      ]}
                      value={formData.paymentMethod ? { value: formData.paymentMethod, label: formData.paymentMethod.charAt(0).toUpperCase() + formData.paymentMethod.slice(1) } : null}
                      onChange={(selected) => handleInputChange('paymentMethod', selected ? selected.value : '')}
                      className="w-full"
                      classNamePrefix="select"
                      placeholder="Select payment method"
                    />
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
                          } else {
                            handleInputChange('bankCode', '');
                            handleInputChange('bankName', '');
                          }
                        }}
                        className="w-full"
                        classNamePrefix="select"
                        placeholder="Select your bank"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber || ''}
                        onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                        placeholder="Enter your account number"
                        maxLength={10}
                        pattern="\d*"
                      />
                      {isValidatingAccount && <p className="text-sm text-gray-500">Validating account...</p>}
                      {accountValidationError && <p className="text-sm text-red-500">{accountValidationError}</p>}
                      {validatedAccountName && <p className="text-sm text-green-500">Account Name: {validatedAccountName}</p>}
                    </div>
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
