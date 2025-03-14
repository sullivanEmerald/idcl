import { axiosInstance } from "@/lib/utils"

export interface updatePersonalDto {
    firstName: string,
    lastName: string,
    companyName: string,
    phone: string
}

export interface PasswordResetDto {
    oldPassword: string,
    newPassword: string,
    confirmNewPassword?: string
}

const userService = {

    async updateProfile(data: updatePersonalDto) {
        const response = await axiosInstance.put('/api/users/me', data)
        return response.data
    },


    async updateUserPassword(data: PasswordResetDto) {
        const { confirmNewPassword, ...rest } = data;
        const response = await axiosInstance.put('/api/users/me/change-password', rest)
        return response.data;
    }
}


export default userService