import { axiosInstance } from "@/lib/utils"

export const startupService = {

    getAllStartups: async () => {
        const response = await axiosInstance.get('/startup/all')
        return response.data;
    }
}