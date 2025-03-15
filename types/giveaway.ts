/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GiveawayEntry {
  _id: string
  userId: string
  giveawayId: string
  entries: number
  tasks: {
    taskId: string
    completed: boolean
    completedAt: Date
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface GiveawayTask {
  _id?: string
  type: 'follow' | 'share' | 'like' | 'comment' | 'custom'
  platform?: 'twitter' | 'instagram' | 'facebook' | 'tiktok'
  description: string
  entries: number
  required: boolean
  verificationMethod: 'automatic' | 'manual'
  metadata?: Record<string, any>
}

export interface Giveaway {
  isEntered: any
  _id: string
  title: string
  description: string
  creatorId: string
  creatorType: 'advertiser' | 'promoter'
  startDate: Date
  endDate: Date
  prize: {
    title: string
    description: string
    value: number
    quantity: number
    image?: string
  }
  tasks: GiveawayTask[]
  rules: string[]
  eligibility: {
    countries?: string[]
    minAge?: number
    maxWinners: number
  }
  status: 'draft' | 'active' | 'ended' | 'cancelled'
  winners?: {
    userId: string
    selectedAt: Date
    claimed: boolean
    claimedAt?: Date
  }[]
  statistics: {
    totalEntries: number
    uniqueParticipants: number
    completedTasks: number
  }
  createdAt: Date
  updatedAt: Date
}