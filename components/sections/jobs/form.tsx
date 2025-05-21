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


const PersonalInformation = [
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

const PositonInformations = [

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

const Documents = [

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


const Education = [

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
        full: false
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

const AdditionalInfomations = [
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
        <div className="bg-[#fff] w-[834px] rounded-[16px] mx-auto flex flex-col p-[32px] justify-center border border-[#E4E4E4]">
            <form className="flex flex-col gap-[24px]">
                <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Personal Information</h1>
                <div className="grid grid-cols-2 gap-6">
                    {PersonalInformation.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-2" : "col-span-1"}>
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
                                    className="w-full placeholder:font-figtree "
                                />
                            )}

                        </div>
                    ))}
                </div>
                <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Position Information</h1>
                <div className="grid grid-cols-2 gap-6">
                    {PositonInformations.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-2" : "col-span-1"}>
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
                                            <SelectItem key={i} value={option.toLowerCase().replace(' ', '-')}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : item.type === 'photo' ? (
                                <FileUploader
                                    accept=".pdf"
                                    maxSize={5 * 1024 * 1024}
                                    onDrop={(files) => {
                                        const file = files[0];
                                        if (file) {
                                            // Set the mediaFiles for UI preview
                                            console.log(file)
                                        }
                                    }}
                                />
                            ) : item.type === 'textarea' ? (
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
                                    className="w-full placeholder:font-figtree "
                                />
                            )}
                        </div>
                    ))}
                </div>
                <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Resume & Supporting Documents</h1>
                <div className="grid grid-cols-2 gap-6">
                    {Documents.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-2" : "col-span-1"}>
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
                                            <SelectItem key={i} value={option.toLowerCase().replace(' ', '-')}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : item.type === 'photo' ? (
                                <FileUploader
                                    accept=".pdf"
                                    maxSize={5 * 1024 * 1024}
                                    onDrop={(files) => {
                                        const file = files[0];
                                        if (file) {
                                            // Set the mediaFiles for UI preview
                                            console.log(file)
                                        }
                                    }}
                                />
                            ) : item.type === 'textarea' ? (
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
                                    className="w-full placeholder:font-figtree "
                                />
                            )}
                        </div>
                    ))}
                </div>
                <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Education & Experience</h1>
                <div className="grid grid-cols-2 gap-6">
                    {Education.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-2" : "col-span-1"}>
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
                                            <SelectItem key={i} value={option.toLowerCase().replace(' ', '-')}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : item.type === 'photo' ? (
                                <FileUploader
                                    accept=".pdf"
                                    maxSize={5 * 1024 * 1024}
                                    onDrop={(files) => {
                                        const file = files[0];
                                        if (file) {
                                            // Set the mediaFiles for UI preview
                                            console.log(file)
                                        }
                                    }}
                                />
                            ) : item.type === 'textarea' ? (
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
                                    className="w-full placeholder:font-figtree "
                                />
                            )}
                        </div>
                    ))}
                </div>
                <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Additional Information</h1>
                <div className="grid grid-cols-2 gap-6">
                    {AdditionalInfomations.map((item, index) => (
                        <div key={index} className={item.full ? "col-span-2" : "col-span-1"}>
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
                                            <SelectItem key={i} value={option.toLowerCase().replace(' ', '-')}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : item.type === 'photo' ? (
                                <FileUploader
                                    accept=".pdf"
                                    maxSize={5 * 1024 * 1024}
                                    onDrop={(files) => {
                                        const file = files[0];
                                        if (file) {
                                            // Set the mediaFiles for UI preview
                                            console.log(file)
                                        }
                                    }}
                                />
                            ) : item.type === 'textarea' ? (
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
                                    className="w-full placeholder:font-figtree "
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex items-start gap-[16px] self-end">
                    <button className="flex py-[10px] px-[24px] items-center justify-center gap-[26] bg-[#F9FAFB] rounded-[50px]">
                        <p className="font-figtree font-semibold text-[18px] text-[#005DFF] leading-[24px]">Cancel</p>
                    </button>
                    <button className="flex py-[10px] px-[24px] items-center justify-center gap-[16px] bg-[#005DFF] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-[50px]">
                        <p className="font-figtree font-semibold text-[18px] text-[#fff] leading-[24px]">Submit</p>
                    </button>
                </div>
            </form>
        </div>
    )
}     