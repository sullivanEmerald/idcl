import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FormFields = [
    {
        label: 'Full Name ',
        name: 'fullname',
        placeholder: 'enter fullname',
        dropDown: false,
        full: false,
        type: 'text'
    },
    {
        label: 'Organization / Institution (if applicable)',
        name: 'organisation',
        placeholder: 'E.g Adminting',
        dropDown: false,
        full: false,
        type: 'text'
    },
    {
        label: 'Phone Number ',
        name: 'phone',
        placeholder: '+238033369478',
        dropDown: false,
        full: false,
        type: 'text'
    },
    {
        label: 'Email Address',
        name: 'email',
        placeholder: 'imodigitalcity.com',
        dropDown: false,
        full: false,
        type: 'text'
    },
    {
        label: 'Preferred Date',
        name: 'date',
        placeholder: '12/12/2000',
        dropDown: false,
        full: false,
        type: 'date'
    },
    {
        label: 'Preferred Time',
        name: 'time',
        placeholder: 'time',
        full: false,
        type: 'time',
        dropdown: [
            'Morning (9:00 AM – 11:00 AM)',
            'Midday (12:00 PM – 2:00 PM)',
            'Afternoon (3:00 PM – 5:00 PM)',
        ]
    },
    {
        label: 'Tour Type',
        name: 'tourtype',
        placeholder: 'Tour type',
        full: true,
        type: 'time',
        dropdown: [
            'General Tour (Overview of all facilities)',
            'Student Tour (Focus on training labs & innovation spaces)',
            'Corporate/Partner Tour',
            'Custom Tour (We’ll contact you to personalize it)',
        ]
    },
    {
        label: 'Other Purpose',
        name: 'date',
        placeholder: 'other purposes',
        dropDown: false,
        full: true,
        type: 'text'
    },
    {
        label: 'Number of Attendees',
        name: 'attendees',
        placeholder: 'number of attendees',
        dropDown: false,
        full: true,
        type: 'text'
    },
    {
        label: 'Purpose of Visit / Additional Notes',
        name: 'notes',
        placeholder: 'purpose of visit / additional notes',
        dropDown: false,
        full: true,
        type: 'textarea'
    },

    {
        label: 'How Did You Hear About Us?',
        name: 'source',
        placeholder: 'how did you hear about us?',
        dropDown: true,
        full: true,
        type: 'text'
    },
]

export default function ScheduledTour() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-[81px] bg-[#fff]">
            <section className="bg-[#144DAF] w-[834px] rounded-[16px] p-[32px] flex flex-col gap-[30px] items-center border border-solid border-[#E4E4E4] ">
                <h1 className="text-[#fff] font-satoshi font-bold text-[32px] leading-[35px]">
                    Schedule Your Tour to IDCL
                </h1>
                <div className="grid grid-cols-2 gap-6 w-[770px] relative">
                    {FormFields.map((item, index) => (
                        <div
                            key={index}
                            className={item.full ? "col-span-2" : "col-span-1"}
                        >
                            <div className="grid w-full items-center gap-1.5">
                                <Label
                                    htmlFor={item.name}
                                    className="font-figtree font-medium text-[18px] leading-[27px] text-[#fff]"
                                >
                                    {item.label}
                                </Label>

                                {item.dropdown ? (
                                    <Select>
                                        <SelectTrigger className="bg-[#1A4190] text-[#fff] border-none">
                                            <SelectValue placeholder={item.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1A4190] text-[#fff] border-none">
                                            {item.dropdown.map((option, i) => (
                                                <SelectItem
                                                    key={i}
                                                    value={option.toLowerCase().replace(/\s+/g, '-')}
                                                    className="hover:bg-[#144DAF]"
                                                >
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : item.type === 'textarea' ? (
                                    <textarea
                                        id={item.name}
                                        placeholder={item.placeholder}
                                        className="bg-[#1A4190] text-[#fff] placeholder:text-[#fff] placeholder:font-figtree placeholder:font-light placeholder:leading-[27px] placeholder:text-[18px] rounded-md border-none p-2 min-h-[100px] w-full"
                                    />
                                ) : (
                                    <Input
                                        type={item.type}
                                        id={item.name}
                                        placeholder={item.placeholder}
                                        className="bg-transparent placeholder:text-[#fff] placeholder:font-figtree placeholder:font-light placeholder:leading-[27px] placeholder:text-[18px] text-[#fff] bg-[#1A4190] w-full"
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="col-span-2 flex justify-end">
                        <Button
                            type="submit"
                            className="py-[10px] px-[24px] gap-[16px] rounded-[50px] w-[293px] h-[44px] bg-[#fff] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                        >
                            <span className="font-figtree font-semi-bold text-[18px] text-[#1E1E1E]">
                                Submit Appointment Request
                            </span>
                        </Button>
                    </div>

                </div>
            </section>
        </div>
    )
}