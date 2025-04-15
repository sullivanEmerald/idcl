import React, { useState } from "react"
import { updatePromoterValidationSchema, updatePasswordValidationShema } from "@/validations/user/promoter";
import { ProfileDataDto } from "@/services/promoter";
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { PasswordResetDto } from "@/services/promoter";
import onboardingService from "@/services/onboarding";
import promoterService from "@/services/promoter";
import { socialPlatforms } from '@/app/onboarding/promoter/page'


interface Errors {
    fullName?: string;
    phoneNumber?: string;
    companyName?: string;
}

export const usePromoterAccountSettingHandler = () => {
    const router = useRouter()
    const [errors, setErrors] = useState<Errors>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [userData, setUserData] = useState<ProfileDataDto>({
        fullName: '',
        companyName: '',
        phoneNumber: ''
    })

    const isEmpty = (): boolean => {
        return Object.values(userData).some((item) => item === "")
    }

    const onChangePromoterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitPromoterHandler = async (event: any) => {
        event.preventDefault();
        setErrors({});
        setIsLoading(true)

        try {
            await updatePromoterValidationSchema.validate(userData, {
                abortEarly: false
            })

            const { user } = await promoterService.updatePromoterProfile(userData);
            console.log(user)

            setUserData({
                fullName: user?.fullName || '',
                phoneNumber: user?.phoneNumber || '',
                companyName: user?.companyName || ''
            })

            setIsSuccessful(true)

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
        onSubmitPromoterHandler,
        onChangePromoterHandler,
        userData,
        errors,
        isLoading,
        isEmpty,
        setUserData,
        isSuccessful
    }
}
// PROMOTER PASSWPORD RESET

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

export const usePromoterUpdatePasswordHandler = () => {
    const router = useRouter()
    const [isPasswordLoading, setIsPasswordLoading] = useState(false)
    const [isPasswordResetSuccessful, setIsPasswordResetSuccessful] = useState(false)
    const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({})
    const [passwordData, setPasswordData] = useState<PasswordResetDto>(initialPasswordData)

    const onChangePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const onSubmitPromoterPasswordHandler = async (event: any) => {
        event.preventDefault();
        setPasswordErrors({});
        setIsPasswordLoading(true);
        try {
            await updatePasswordValidationShema.validate(passwordData, {
                abortEarly: false
            })

            // removing the comfirmNewPassword value
            const { confirmNewPassword, ...rest } = passwordData

            // prevent submitting white spaces before sending
            const trimmedPasswordData: PasswordResetDto = {
                oldPassword: rest.oldPassword.trim(),
                newPassword: rest.newPassword.trim()
            };

            // sending an API call for password reset
            await promoterService.upatePromoterPassword(trimmedPasswordData)

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
            if (error.response?.data?.message && error.response?.data?.redirect) {
                const responseError = error.response?.data?.message || 'An error occured during password reset'
                setPasswordErrors((prev) => ({
                    ...prev,
                    responseError: responseError
                }))

                setTimeout(() => {
                    localStorage.clear();
                    router.push('/auth/login')
                }, 1000);
            } else {
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
        onSubmitPromoterPasswordHandler,
        passwordErrors,
        isPasswordLoading,
        isPasswordResetSuccessful
    }
}

export const usePromoterOnboardingHandler = () => {
    const [isUpdatingRecord, setIsUpdatingRecord] = useState(false)
    const [isUpdatingRecordSuccessful, setIsUpdatingRecordSuccessful] = useState(false)
    const [onboardingData, setOnboardingData] = useState({
        location: '',
        platforms: [] as string[],
        followersCount: '',
        engagementRate: '',
        audienceAge: '',
        audienceInterests: [] as string[],
        contentTypes: [] as string[],
        paymentMethod: '',
        accountDetails: ''
    })
    const [isRemovingSocial, setIsRemovingSocial] = useState<Record<string, boolean>>(
        (onboardingData?.platforms || []).map(item => item.toLowerCase()).reduce((acc: Record<string, boolean>, platform: string) => {
            acc[platform] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );

    // promoter onboarding handler
    const onChangeOnboardingHandler = (field: string, value: string | string[] | null) => {
        setOnboardingData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const onSubmitOnboardingHandler = async (e: any) => {
        e.preventDefault();
        setIsUpdatingRecord(true)
        try {

            const userId = localStorage.getItem('userId')
            if (!userId) {
                throw new Error('User ID not found. Please log in again.')
            }
            const { user } = await onboardingService.updatePromoterProfile(userId, onboardingData)


            // re-rendering the UI
            setOnboardingData({
                location: user?.location || '',
                platforms: user?.platforms || [],
                followersCount: user?.followersCount || '',
                engagementRate: user?.engagementRate || '',
                audienceAge: user?.audienceAge || '',
                audienceInterests: user?.audienceInterests || [],
                contentTypes: user?.contentTypes || [],
                paymentMethod: user?.paymentMethod || '',
                accountDetails: user?.accountDetails || ''
            })

            setIsUpdatingRecordSuccessful(true)
        } catch (error) {
            console.error('error', error)
        } finally {
            setIsUpdatingRecord(false)
        }


    }


    return {
        onboardingData,
        setOnboardingData,
        onChangeOnboardingHandler,
        onSubmitOnboardingHandler,
        isUpdatingRecord,
        isUpdatingRecordSuccessful,
        setIsRemovingSocial,
        isRemovingSocial
    }
}