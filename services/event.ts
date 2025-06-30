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

    getAllUpcomingEvent: async (page = 1, limit = 15) => {
        const response = await axiosInstance.get('/event/upcoming/all', {
            params: {
                page, limit
            }
        })
        return response.data;
    }


}