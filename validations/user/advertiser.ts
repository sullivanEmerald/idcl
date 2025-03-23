import * as yup from 'yup'

export const updateUserValidationSchema = yup.object({
    firstName: yup
        .string()
        .required('first name is required')
        .trim(),

    lastName: yup
        .string()
        .required('last name is required')
        .trim(),

    phone: yup
        .string()
        .required('phone number is required')
        .trim(),

    companyName: yup
        .string()
        .required('company name is required')
        .trim(),

})


export const updatePasswordValidationShema = yup.object({
    oldPassword: yup
        .string()
        .required('enter old password'),

    newPassword: yup
        .string()
        .min(5, 'New password must be at least 8 characters')
        .required('Enter new password'),

    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm new password'),
})

// checking for a valid url format 
const isValidUrl = (url: string) => {
    try {
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}

export const onBoardingValidationSchema = yup.object({
    website: yup
        .string()
        .required('website in required')
        .test('is-url', 'Invalid public URL format', isValidUrl),

    industry: yup
        .string()
        .required('industry is required')

})