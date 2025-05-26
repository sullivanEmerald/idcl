"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/file-uploader";
import { Checkbox } from "@/components/ui/checkbox"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FormField {
    label: string;
    name: string;
    placeholder?: string;
    type: 'text' | 'select' | 'photo' | 'textarea' | 'combobox';
    full?: boolean;
    options?: string[]; // optional property
}

const PersonalInformation: FormField[] = [
    {
        label: 'Business Name',
        name: 'business',
        placeholder: 'Enter your business name',
        type: 'text',
        full: false
    },
    {
        label: 'Business Type/Category',
        name: 'category',
        placeholder: 'business category',
        type: 'select',
        full: false,
        options: ['IT & Software Development', 'Logistics & Procurement', 'Catering & Hospitality', 'Event Planning & Rentals', 'Security Services', 'Training & Education', 'Equipment Supply & Maintenance', 'Creative Media & Branding']
    },
    {
        label: 'Business Address',
        name: 'address',
        placeholder: 'business address',
        type: 'text',
        full: true
    },
    {
        label: 'Website (Optional)',
        name: 'website',
        placeholder: 'enter website',
        type: 'text',
        full: true
    },
    {
        label: 'Social Media Links (Optional)',
        name: 'links',
        placeholder: 'enter social links',
        type: 'text',
        full: true
    },
]

const ContactInformations: FormField[] = [

    {
        label: 'Primary Contact Name',
        name: 'companyname',
        placeholder: 'enter company name',
        type: 'text',
        full: false
    },

    {
        label: 'Email Address',
        name: 'email',
        placeholder: 'enter email address',
        type: 'text',
        full: false
    },
    {
        label: 'Phone Number',
        name: 'number',
        placeholder: 'enter phone number',
        type: 'text',
        full: true
    },
];


const ServiceDetails: FormField[] = [

    {
        label: 'Brief Description of Services',
        name: 'description',
        placeholder: 'enter description of service',
        type: 'textarea',
        full: true
    },

    {
        label: 'Service Area',
        name: 'service',
        placeholder: 'enter service area',
        type: 'textarea',
        full: true
    },

    {
        label: 'Years of Experience',
        name: 'years',
        placeholder: 'enter years of experience',
        type: 'text',
        full: true
    },

];

const Certificates: FormField[] = [
    {
        label: "Upload any relevant business licenses, certifications, or legal documents required to verify your business's legitimacy.",
        name: 'document',
        type: 'photo',
        full: true
    },
];

export default function RegisterVendorForm() {
    return (
        <div className="bg-[#fff] w-full max-w-[834px] rounded-[16px] flex flex-col p-4 sm:p-6 lg:p-[32px] justify-center border border-[#E4E4E4] mx-auto">
            <form className="flex flex-col gap-[24px]">
                <h1 className="font-figtree font-bold text-[20px] sm:text-[21px] text-[#344054] leading-[31px]">
                    Vendor Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PersonalInformation.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-1 md:col-span-2" : "col-span-1"}>
                            <Label htmlFor={item.name} className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                {item.label}
                            </Label>
                            {item.type === 'select' ? (
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={item.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {item.options?.map((option, i) => (
                                            <SelectItem key={i} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    type={item.type}
                                    id={item.name}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    className="w-full placeholder:font-figtree"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <h1 className="font-figtree font-bold text-[20px] sm:text-[21px] text-[#344054] leading-[31px]">
                    Contact Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ContactInformations.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-1 md:col-span-2" : "col-span-1"}>
                            <Label htmlFor={item.name} className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                {item.label}
                            </Label>
                            <Input
                                type={item.type}
                                id={item.name}
                                name={item.name}
                                placeholder={item.placeholder}
                                className="w-full placeholder:font-figtree"
                            />
                        </div>
                    ))}
                </div>

                <h1 className="font-figtree font-bold text-[20px] sm:text-[21px] text-[#344054] leading-[31px]">
                    Service Details
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ServiceDetails.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-1 md:col-span-2" : "col-span-1"}>
                            <Label htmlFor={item.name} className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                {item.label}
                            </Label>
                            {item.type === 'textarea' ? (
                                <Textarea
                                    id={item.name}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    className="w-full min-h-[120px]"
                                />
                            ) : (
                                <Input
                                    type={item.type}
                                    id={item.name}
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    className="w-full placeholder:font-figtree"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <h1 className="font-figtree font-bold text-[20px] sm:text-[21px] text-[#344054] leading-[31px]">
                    Certifications and Licenses
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Certificates.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-1 md:col-span-2" : "col-span-1"}>
                            <Label htmlFor={item.name} className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                {item.label}
                            </Label>
                            <FileUploader
                                accept=".pdf"
                                maxSize={5 * 1024 * 1024}
                                onDrop={(files) => {
                                    const file = files[0];
                                    if (file) {
                                        console.log(file);
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-[16px] self-end">
                    <button className="w-full sm:w-auto flex py-[10px] px-[24px] items-center justify-center gap-[26px] bg-[#F9FAFB] rounded-[50px]">
                        <p className="font-figtree font-semibold text-[18px] text-[#005DFF] leading-[24px]">Cancel</p>
                    </button>
                    <button className="w-full sm:w-auto flex py-[10px] px-[24px] items-center justify-center gap-[16px] bg-[#005DFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-[50px]">
                        <p className="font-figtree font-semibold text-[18px] text-[#fff] leading-[24px]">Submit</p>
                    </button>
                </div>
            </form>
        </div>
    );
}
