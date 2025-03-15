import React, { useState } from "react"
import {
    updateUserValidationSchema,
    updatePasswordValidationShema
} from "@/validations/user";
import userService, { updatePersonalDto, PasswordResetDto } from "@/services/user";
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import onboardingService from "@/services/onboarding";


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

interface Option {
    value: string
    label: string
}

interface onboardingUserDto {
    website: string
    industry: string
    companySize: string
    phoneNumber: string
    businessType: string
    targetAudience: Option[]
    goals: string
    billingEmail: string
    billingAddress: string,
}


const onboardingUserDefaultValues: onboardingUserDto = {
    website: '',
    industry: '',
    companySize: '',
    phoneNumber: '',
    businessType: '',
    targetAudience: [],
    goals: '',
    billingEmail: '',
    billingAddress: ''
}

export const useOnBoardingHandler = () => {
    const [isOnboardingProcessLoading, setIsOnboardingProcessLoading] = useState(false)
    const [isOnboardingProessError, setIsOnboardingProessError] = useState('')
    const [isOnboardingProessSuccessful, setIsOnboardingProessSuccessful] = useState(false)
    const [onboardingData, setOnboardingData] = useState<onboardingUserDto>(onboardingUserDefaultValues)

    const onChangeOnboardingHandler = (field: string, value: any) => {
        setOnboardingData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const onSubmitOnBoardingHandler = async (event: any) => {
        event.preventDefault();
        setIsOnboardingProcessLoading(true);
        setIsOnboardingProessError('');

        try {

            const userId = localStorage.getItem('userId')
            if (!userId) {
                throw new Error('User ID not found. Please log in again.')
            }

            await onboardingService.updateAdvertiserProfile(userId, {
                ...onboardingData,
                targetAudience: onboardingData.targetAudience.map((item) => item.value)
            })

            setIsOnboardingProessSuccessful(true);

            window.location.reload();

        } catch (error: any) {
            const responseError = error.response?.data?.message || 'An error occured. Try again!!'
            setIsOnboardingProessError(responseError)
        } finally {
            setIsOnboardingProcessLoading(false)
        }
    }

    return {
        onChangeOnboardingHandler,
        onboardingData,
        setOnboardingData,
        onSubmitOnBoardingHandler,
        isOnboardingProcessLoading,
        isOnboardingProessSuccessful,
        isOnboardingProessError
    }
}