import { axiosInstance } from "@/lib/utils"

export const eventsService = {

    getUpcomingEvents: async (page = 1, limit = 15) => {
        const response = await axiosInstance.get('/event/upcoming', {
            params: {
                page, limit
            }
        })
        return response.data;
    },

    getBlog: async (id: string) => {
        const response = await axiosInstance.get(`/blog/${id}`)
        return response.data;
    }


}