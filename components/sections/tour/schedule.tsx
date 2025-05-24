import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
        name: 'other-purpose',
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
];

export default function ScheduledTour() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-[60px] px-4 bg-white">
            <section className="bg-[#144DAF] w-full max-w-[834px] rounded-[16px] p-6 md:p-8 flex flex-col gap-6 items-center border border-solid border-[#E4E4E4]">
                <h1 className="text-white font-satoshi font-bold text-2xl md:text-[32px] leading-snug text-center">
                    Schedule Your Tour to IDCL
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {FormFields.map((item, index) => (
                        <div
                            key={index}
                            className={item.full ? "col-span-full" : "col-span-1"}
                        >
                            <div className="grid w-full items-center gap-1.5">
                                <Label
                                    htmlFor={item.name}
                                    className="font-figtree font-medium text-base md:text-[18px] leading-[27px] text-white"
                                >
                                    {item.label}
                                </Label>

                                {item.dropdown ? (
                                    <Select>
                                        <SelectTrigger className="bg-[#1A4190] text-white border-none">
                                            <SelectValue placeholder={item.placeholder} />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1A4190] text-white border-none">
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
                                        className="bg-[#1A4190] text-white placeholder:text-white placeholder:font-figtree placeholder:font-light placeholder:leading-[27px] placeholder:text-base rounded-md border-none p-2 min-h-[100px] w-full"
                                    />
                                ) : (
                                    <Input
                                        type={item.type}
                                        id={item.name}
                                        placeholder={item.placeholder}
                                        className="bg-[#1A4190] text-white placeholder:text-white placeholder:font-figtree placeholder:font-light placeholder:leading-[27px] placeholder:text-base w-full"
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="col-span-full flex justify-end mt-4">
                        <Button
                            type="submit"
                            className="py-2.5 px-6 gap-4 rounded-full w-full sm:w-auto h-[44px] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                        >
                            <span className="font-figtree font-semibold text-base text-[#1E1E1E]">
                                Submit Appointment Request
                            </span>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
