import { axiosInstance } from "@/lib/utils"

export const talentService = {

    getAllTalents: async (page = 1, limit = 15) => {
        const response = await axiosInstance.get('/talent/all', {
            params: {
                page, limit
            }
        })
        return response.data;
    },

}