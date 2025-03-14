import React, { useState } from "react"
import {
    updateUserValidationSchema,
    updatePasswordValidationShema
} from "@/validations/user";
import userService, { updatePersonalDto, PasswordResetDto } from "@/services/user";
import { useRouter } from 'next/navigation'
import * as yup from 'yup'


interface Errors {
    firstName?: string;
    lastName?: string;
    phone?: string;
    companyName?: string;
}

export const useAccountSettingHandler = () => {
    const router = useRouter()
    const [errors, setErrors] = useState<Errors>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [userData, setUserData] = useState<updatePersonalDto>({
        firstName: '',
        lastName: '',
        companyName: '',
        phone: ''
    })

    const isEmpty = (): boolean => {
        return Object.values(userData).some((item) => item.trim() === "")
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value.trim()
        }))
    }

    const onSubmitUserHandler = async (event: any) => {
        event.preventDefault();
        setErrors({});
        setIsLoading(true)

        try {
            await updateUserValidationSchema.validate(userData, {
                abortEarly: false
            })

            await userService.updateProfile(userData)

            setIsSuccessful(true)

            // refreshing user informations 
            window.location.reload();

        } catch (error: any) {
            const newErrors: Errors = {};
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((err: yup.ValidationError) => {
                    newErrors[err.path as keyof Errors] = err.message;
                });
            }
            setErrors(newErrors);
        } finally {
            setIsLoading(false)
        }
    }


    return {
        onSubmitUserHandler,
        onChangeHandler,
        userData,
        errors,
        isLoading,
        isEmpty,
        setUserData,
        isSuccessful
    }
}

const initialPasswordData: PasswordResetDto = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
};

interface PasswordErrors {
    oldPassword?: string,
    newPassword?: string,
    confirmNewPassword?: string
    responseError?: string
}

export const useUpdatePasswordHandler = () => {
    const [isPasswordLoading, setIsPasswordLoading] = useState(false)
    const [isPasswordResetSuccessful, setIsPasswordResetSuccessful] = useState(false)
    const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
    const [passwordData, setPasswordData] = useState<PasswordResetDto>(initialPasswordData)

    const onChangePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value.trim()
        }))
    }

    const onSubmitPasswordHandler = async (event: any) => {
        event.preventDefault();
        setPasswordErrors({});
        setIsPasswordLoading(true);
        try {
            await updatePasswordValidationShema.validate(passwordData, {
                abortEarly: false
            })
            // sending an API call for password reset
            await userService.updateUserPassword(passwordData)

            setIsPasswordResetSuccessful(true);

            // resetting password after updating to empty fields
            setPasswordData(initialPasswordData)

        } catch (error: any) {
            const newErrors: PasswordErrors = {};
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((err: yup.ValidationError) => {
                    newErrors[err.path as keyof PasswordErrors] = err.message;
                });
                setPasswordErrors(newErrors);
            }
            console.log(error.response.data)
            if (error.response?.data?.message) {
                const responseError = error.response?.data?.message || 'An error occured during password reset'
                setPasswordErrors((prev) => ({
                    ...prev,
                    responseError: responseError
                }))
            }
        } finally {
            setIsPasswordLoading(false)
        }
    }

    return {
        onChangePasswordHandler,
        passwordData,
        onSubmitPasswordHandler,
        passwordErrors,
        isPasswordLoading,
        isPasswordResetSuccessful
    }
}