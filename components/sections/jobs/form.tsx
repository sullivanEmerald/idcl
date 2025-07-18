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
    placeholder: string;
    type: 'text' | 'select' | 'photo' | 'textarea';
    full: boolean;
    options?: string[]; // optional property
}
const PersonalInformation: FormField[] = [
    {
        label: 'Full Name (required)',
        name: 'fullname',
        placeholder: 'Enter your fullname',
        type: 'text',
        full: false
    },
    {
        label: 'Email Address (required)',
        name: 'mail',
        placeholder: 'enter email',
        type: 'text',
        full: false,
    },
    {
        label: 'Phone Number (required)',
        name: 'phone',
        placeholder: 'enter phone number',
        type: 'text',
        full: true,
    },
    {
        label: 'Residential Address (required)',
        name: 'residence',
        placeholder: 'enter current residence',
        type: 'text',
        full: true,
    },

]

const PositonInformations: FormField[] = [

    {
        label: 'Position You Are Applying For (required)',
        name: 'position',
        placeholder: 'enter position',
        type: 'select',
        full: false,
        options: ['Secretary', 'Director', 'Supervisor']
    },

    {
        label: 'Employment Type',
        name: 'employment',
        placeholder: 'enter employment type',
        type: 'select',
        full: false,
        options: ['full-time', 'part-time', 'contract']
    },
];

const Documents: FormField[] = [

    {
        label: 'Upload Resume (PDF/DOC, max 5MB) (required)',
        name: 'resume',
        placeholder: 'enter resume',
        type: 'photo',
        full: true,
    },

    {
        label: 'Upload Cover Letter (optional)',
        name: 'resume',
        placeholder: 'enter resume',
        type: 'photo',
        full: true,
    },

    {
        label: 'Upload Certifications or Portfolio (if applicable)',
        name: 'resume',
        placeholder: 'enter resume',
        type: 'photo',
        full: true,
    },

];


const Education: FormField[] = [

    {
        label: 'Highest Level of Education Completed (required)',
        name: 'education',
        placeholder: 'enter highest education',
        type: 'text',
        full: true
    },

    {
        label: 'Relevant Work Experience (required)',
        name: 'work',
        placeholder: 'enter work experience',
        type: 'text',
        full: false,
    },

    {
        label: 'Key Skills (required)',
        name: 'skills',
        placeholder: 'enter key skills',
        type: 'text',
        full: false
    },

    {
        label: 'Years of Experience',
        name: 'years',
        placeholder: 'enter years of experience',
        type: 'text',
        full: true
    },

];

const AdditionalInfomations: FormField[] = [
    {
        label: "Why do you want to work with IDCL? (required)",
        name: 'reasom',
        placeholder: 'enter reasons',
        type: 'textarea',
        full: true
    },
    {
        label: "How did you hear about this job?",
        name: 'knowledge',
        type: 'text',
        full: true,
        placeholder: 'enter how you found us',
    },
];

export default function JobForm() {
    return (
        <div className="bg-[#fff] w-full max-w-[834px] rounded-[16px] mx-auto flex flex-col p-4 sm:p-6 md:p-8 justify-center border border-[#E4E4E4] my-8">
            <form className="flex flex-col gap-6">
                {/* Personal Information Section */}
                <div>
                    <h1 className="font-figtree font-bold text-lg sm:text-xl text-[#344054] mb-4 sm:mb-6">Personal Information</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {PersonalInformation.map((item, index) => (
                            <div key={index} className={item.full ? "col-span-1 md:col-span-2" : "col-span-1"}>
                                <Label htmlFor={item.name} className="font-figtree text-base sm:text-[18px] text-[#344054]">
                                    {item.label}
                                </Label>
                                {item.type === 'select' ? (
                                    <Select>
                                        <SelectTrigger className="w-full mt-1 sm:mt-2">
                                            <SelectValue placeholder={item.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {item.options?.map((option, i) => (
                                                <SelectItem key={i} value={option.toLowerCase().replace(' ', '-')}>
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
                                        className="w-full mt-1 sm:mt-2 placeholder:font-figtree"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="font-figtree font-bold text-lg sm:text-xl text-[#344054] mb-4 sm:mb-6">Position Information</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {PositonInformations.map((item, index) => (
                            <div key={index} className={item.full ? "col-span-1 md:col-span-2" : "col-span-1"}>
                                <Label htmlFor={item.name} className="font-figtree text-base sm:text-[18px] text-[#344054]">
                                    {item.label}
                                </Label>
                                {item.type === 'select' ? (
                                    <Select>
                                        <SelectTrigger className="w-full mt-1 sm:mt-2">
                                            <SelectValue placeholder={item.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {item.options?.map((option, i) => (
                                                <SelectItem key={i} value={option.toLowerCase().replace(' ', '-')}>
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
                                        className="w-full mt-1 sm:mt-2 placeholder:font-figtree"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Documents Section */}
                <div>
                    <h1 className="font-figtree font-bold text-lg sm:text-xl text-[#344054] mb-4 sm:mb-6">Resume & Supporting Documents</h1>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        {Documents.map((item, index) => (
                            <div key={index} className="col-span-1">
                                <Label htmlFor={item.name} className="font-figtree text-base sm:text-[18px] text-[#344054]">
                                    {item.label}
                                </Label>
                                <FileUploader
                                    accept=".pdf"
                                    maxSize={5 * 1024 * 1024}
                                    onDrop={(files) => {
                                        const file = files[0];
                                        if (file) console.log(file);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Section */}
                <div>
                    <h1 className="font-figtree font-bold text-lg sm:text-xl text-[#344054] mb-4 sm:mb-6">Education & Experience</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {Education.map((item, index) => (
                            <div key={index} className={item.full ? "col-span-1 md:col-span-2" : "col-span-1"}>
                                <Label htmlFor={item.name} className="font-figtree text-base sm:text-[18px] text-[#344054]">
                                    {item.label}
                                </Label>
                                {item.type === 'textarea' ? (
                                    <Textarea
                                        id={item.name}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        className="w-full mt-1 sm:mt-2 min-h-[120px]"
                                    />
                                ) : (
                                    <Input
                                        type={item.type}
                                        id={item.name}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        className="w-full mt-1 sm:mt-2 placeholder:font-figtree"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="font-figtree font-bold text-lg sm:text-xl text-[#344054] mb-4 sm:mb-6">Additional Information</h1>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        {AdditionalInfomations.map((item, index) => (
                            <div key={index} className="col-span-1">
                                <Label htmlFor={item.name} className="font-figtree text-base sm:text-[18px] text-[#344054]">
                                    {item.label}
                                </Label>
                                {item.type === 'textarea' ? (
                                    <Textarea
                                        id={item.name}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        className="w-full mt-1 sm:mt-2 min-h-[120px]"
                                    />
                                ) : (
                                    <Input
                                        type={item.type}
                                        id={item.name}
                                        name={item.name}
                                        placeholder={item.placeholder}
                                        className="w-full mt-1 sm:mt-2 placeholder:font-figtree"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="px-6 py-2 sm:px-6 sm:py-2 rounded-full font-figtree font-semibold text-base sm:text-[18px] text-[#005DFF]"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-6 py-2 sm:px-6 sm:py-2 rounded-full font-figtree font-semibold text-base sm:text-[18px] bg-[#005DFF] hover:bg-[#0045CC] text-white"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}