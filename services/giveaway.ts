/* eslint-disable @typescript-eslint/no-explicit-any */
import { Giveaway, GiveawayEntry } from '@/types/giveaway'
import { axiosInstance } from '@/lib/utils'

export const giveawayService = {
  // Create a new giveaway
  createGiveaway: async (data: Omit<Giveaway, '_id' | 'createdAt' | 'updatedAt' | 'statistics'>) => {
    const response = await axiosInstance.post<Giveaway>('/giveaways', data)
    return response.data
  },

  // Get a single giveaway by ID
  getGiveaway: async (id: string) => {
    const response = await axiosInstance.get<Giveaway>(`/giveaways/${id}`)
    return response.data
  },

  // Get all giveaways (with optional filters)
  getGiveaways: async (params?: {
    status?: Giveaway['status']
    creatorId?: string
    creatorType?: Giveaway['creatorType']
  }) => {
    const response = await axiosInstance.get<Giveaway[]>('/giveaways', { params })
    return response.data
  },

  // Update a giveaway
  updateGiveaway: async (id: string, data: Partial<Giveaway>) => {
    const response = await axiosInstance.patch<Giveaway>(`/giveaways/${id}`, data)
    return response.data
  },

  // Delete a giveaway
  deleteGiveaway: async (id: string) => {
    await axiosInstance.delete(`/giveaways/${id}`)
  },

  // Enter a giveaway
  enterGiveaway: async (giveawayId: string) => {
    const response = await axiosInstance.post<GiveawayEntry>(`/giveaways/${giveawayId}/enter`)
    return response.data
  },

  // Complete a giveaway task
  completeTask: async (giveawayId: string, taskId: string, proof?: any) => {
    const response = await axiosInstance.post<GiveawayEntry>(
      `/giveaways/${giveawayId}/tasks/${taskId}/complete`,
      { proof }
    )
    return response.data
  },

  // Get user's entries for a giveaway
  getUserEntries: async (giveawayId: string) => {
    const response = await axiosInstance.get<GiveawayEntry>(`/giveaways/${giveawayId}/entries`)
    return response.data
  },

  // Draw winners for a giveaway
  drawWinners: async (giveawayId: string) => {
    const response = await axiosInstance.post<Giveaway>(`/giveaways/${giveawayId}/draw`)
    return response.data
  },

  // Claim a prize (for winners)
  claimPrize: async (giveawayId: string) => {
    const response = await axiosInstance.post<Giveaway>(`/giveaways/${giveawayId}/claim`)
    return response.data
  }
}