'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { campaignService } from '@/services/campaign'
import type { CampaignFormData } from '@/services/campaign'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { TimePicker } from '@/components/ui/time-picker'

export default function EditCampaignPage() {
  const router = useRouter()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<CampaignFormData | null>(null)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const campaign = await campaignService.getCampaign(id as string)
        setFormData({
          name: campaign.title,
          description: campaign.description,
          budget: campaign.budget,
          pricePerPost: campaign.pricePerPost,
          platforms: campaign.requiredPlatforms,
          niches: campaign.targetedNiches,
          goal: campaign.campaignGoal,
          location: campaign.targetLocation.split(','),
          gender: campaign.targetGender,
          promoterCount: campaign.targetPromotions,
          promotionLink: campaign.promotionLink,
          startDate: new Date(campaign.startDate),
          endDate: new Date(campaign.endDate),
          contentType: campaign.contentAssets[0]?.type || 'photo',
          mediaFiles: [], // We don't need to load existing files
          contentGuidelines: campaign.requirements.contentGuidelines,
          postingSchedule: campaign.requirements.postingSchedule,
          hashtags: campaign.requirements.hashtags.join(', '),
          mentions: campaign.requirements.mentions.join(', '),
          brandAssetLinks: campaign.requirements.brandAssetLinks?.join(', ') || '',
          isBoosted: campaign.isBoosted,
        })
      } catch (error) {
        console.error('Error fetching campaign:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCampaign()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    try {
      await campaignService.updateCampaign(id as string, formData)
      router.push(`/advertiser/dashboard/campaigns/${id}`)
    } catch (error) {
      console.error('Error updating campaign:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!formData) {
    return <div>Campaign not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Campaign</h1>
        <p className="text-muted-foreground">Update your campaign details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update the basic details of your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pricePerPost">Price Per Post</Label>
                <Input
                  id="pricePerPost"
                  type="number"
                  value={formData.pricePerPost}
                  onChange={(e) => setFormData({ ...formData, pricePerPost: Number(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Schedule</CardTitle>
            <CardDescription>Update when your campaign will run</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <DatePicker
                  date={formData.startDate}
                  onChange={(date) => date && setFormData({ ...formData, startDate: date })}
                />
              </div>
              <div className="grid gap-2">
                <Label>End Date</Label>
                <DatePicker
                  date={formData.endDate}
                  onChange={(date) => date && setFormData({ ...formData, endDate: date })}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label>Posting Start Time</Label>
                <TimePicker
                  value={formData.postingSchedule.startTime}
                  onChange={(time) => setFormData({
                    ...formData,
                    postingSchedule: { ...formData.postingSchedule, startTime: time }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Posting End Time</Label>
                <TimePicker
                  value={formData.postingSchedule.endTime}
                  onChange={(time) => setFormData({
                    ...formData,
                    postingSchedule: { ...formData.postingSchedule, endTime: time }
                  })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Posting Days</Label>
              <div className="flex flex-wrap gap-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={formData.postingSchedule.days.includes(day)}
                      onCheckedChange={(checked) => {
                        const days = checked
                          ? [...formData.postingSchedule.days, day]
                          : formData.postingSchedule.days.filter((d) => d !== day)
                        setFormData({
                          ...formData,
                          postingSchedule: { ...formData.postingSchedule, days }
                        })
                      }}
                    />
                    <label htmlFor={day} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
            <CardDescription>Update campaign requirements and guidelines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="contentGuidelines">Content Guidelines</Label>
              <Textarea
                id="contentGuidelines"
                value={formData.contentGuidelines}
                onChange={(e) => setFormData({ ...formData, contentGuidelines: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="hashtags">Hashtags (comma-separated)</Label>
              <Input
                id="hashtags"
                value={formData.hashtags}
                onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="mentions">Mentions (comma-separated)</Label>
              <Input
                id="mentions"
                value={formData.mentions}
                onChange={(e) => setFormData({ ...formData, mentions: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="brandAssetLinks">Brand Asset Links</Label>
              <Input
                id="brandAssetLinks"
                value={formData.brandAssetLinks}
                onChange={(e) => setFormData({ ...formData, brandAssetLinks: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/advertiser/dashboard/campaigns/${id}`)}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  )
}
