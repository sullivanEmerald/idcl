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
        label: 'Full Name',
        name: 'fullname',
        placeholder: 'Enter your full name',
        type: 'text'
    },
    {
        label: 'Organisation / Institution',
        name: 'company',
        placeholder: 'organisation name',
        type: 'text'
    },
    {
        label: 'Phone Number',
        name: 'phone',
        placeholder: 'Enter the role you\'re hiring for',
        type: 'text'
    },
    {
        label: 'Email Address',
        name: 'email',
        placeholder: 'email',
        type: 'text'
    },
    {
        label: 'Positon/Role',
        name: 'position',
        placeholder: 'e.g Managing Director',
        type: 'text'
    },
]

const IdeaDetails = [

    {
        label: 'Title of Your Idea / Innovation',
        name: 'title',
        placeholder: 'title of idea',
        type: 'text'
    },
    {
        label: 'Description of the Idea',
        name: 'description',
        placeholder: 'description of idea',
        type: 'textarea'
    },
    {
        label: 'Stage of Development',
        name: 'stage',
        placeholder: 'Stage of development',
        type: 'select',
        options: ['ideation', 'feasibility study', 'planning', 'design', 'excution']
    },

    {
        label: 'Problem Your Idea Solves',
        name: 'solution',
        placeholder: 'problems ideas solves',
        type: 'textarea'
    },

    {
        label: 'Target Market or Industry',
        name: 'target',
        placeholder: 'targeted market',
        type: 'text'
    },

    {
        label: 'Is the Idea Original / Your Own?',
        name: 'personal',
        placeholder: 'ownership',
        type: 'select',
        options: ['Yes', 'No']
    },

    {
        label: 'Has it been submitted elsewhere?',
        name: 'state',
        placeholder: 'ownership',
        type: 'select',
        options: ['Yes', 'No']
    },

];

const SupportRequest = [

    {
        label: 'What kind of support do you need?',
        name: 'support',
        type: 'combobox',
        options: ['Valuation', 'Prototype Development', 'Funding/Grants', 'Patent/IP Protection', 'Market Strategy', 'Mentorship']
    },
    {
        label: 'Have you filed any IP (e.g. patent)?',
        name: 'filed',
        placeholder: 'have you filed any IP',
        type: 'select',
        options: ['patent']
    },

    {
        label: 'Has it been submitted elsewhere?',
        name: 'submitted',
        placeholder: 'been submitted?',
        type: 'select',
        options: ['Yes', 'No']
    },

    {
        label: "Upload Supporting Documents (if any)",
        name: 'document',
        type: 'photo'
    },
    {
        label: 'Any existing partners or co-founders?',
        name: 'partners',
        placeholder: 'enter existing partners',
        type: 'text'
    },
];

export default function IdeaSubmissionForm() {

    return (
        <div className="bg-[#fff] w-[834px] rounded-[16px] flex flex-col p-[32px] justify-center border border-[#E4E4E4]">
            <form className="flex flex-col gap-[24px]">
                <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Innovator Information</h1>
                <div className="grid grid-cols-2 gap-x-6">
                    {PersonalInformation.map((item, index) => (
                        <div key={index} className="grid w-full items-center gap-1.5 mb-4">
                            <Label htmlFor={item.name} className="font-figtree text-[18px] leading-[27px] text-[#344054]">
                                {item.label}
                            </Label>
                            <Input
                                type={item.type}
                                id={item.name}
                                name={item.name}
                                placeholder={item.placeholder}
                                className="w-full placeholder:font-figtree "
                            />
                        </div>
                    ))}
                </div>
                <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Partnership Details</h1>
                <div>
                    {IdeaDetails.map((item, index) => (
                        <div key={index} className="grid w-full items-center gap-1.5 mb-4">
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
                <h1 className="font-figtree font-bold text-[21px] text-[#344054] leading-[31px]">Support Requested</h1>
                <div>
                    {SupportRequest.map((item, index) => (
                        <div key={index} className="grid w-full items-center gap-1.5 mb-4">
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
                            ) : item.type === 'combobox' ? (
                                <div className="flex items-center self-stretch flex-wrap justify-between gap-y-[15px]">
                                    {item.options?.map((element, index) => (
                                        <div key={index} className="w-[197px] flex items-center gap-[15px] ">
                                            <Checkbox />
                                            <p className="text-[#616161] font-jost text-[16px] font-normal leading-[24px]">{element}</p>
                                        </div>
                                    ))}
                                </div>
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
                    <div className="flex flex-col gap-[15px]">
                        <div className=" flex items-center gap-[15px] ">
                            <Checkbox checked />
                            <p className="text-[#616161] font-jost text-[16px] font-normal leading-[24px]">I declare this submission is truthful and mine.</p>
                        </div>
                        <div className="flex items-center gap-[15px] ">
                            <Checkbox checked />
                            <p className="text-[#616161] font-jost text-[16px] font-normal leading-[24px]">I agree to receive communication from IDCL..</p>
                        </div>
                    </div>
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