import { Link2, Users, Tag, LoaderCircle, CirclePlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Select from 'react-select'

interface FormData {
    handle: string;
    followers: string;
    niches: string[];
}

interface OptionType {
    value: string;
    label: string;
}

interface EditAccountFieldProps {
    formData: FormData;
    handle: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function EditAccountField({ formData, handle, handleInputChange, setFormData }: EditAccountFieldProps) {

    return (
        <>
            <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="handle" className="text-right flex items-center gap-2">
                        <Link2 className="w-4 h-4" />
                        Handle
                    </Label>
                    <Input
                        id="handle"
                        value={formData.handle}
                        onChange={handleInputChange}
                        placeholder={handle}
                        className="col-span-3"

                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="followers" className="text-right flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Followers
                    </Label>
                    <Input
                        id="followers"
                        type="text"
                        value={formData.followers}
                        onChange={handleInputChange}
                        placeholder="5000"
                        className="col-span-3"
                        required
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="niche" className="text-right flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Niche
                    </Label>
                    <div className="col-span-3">
                        <Select
                            isMulti
                            name="niches"
                            id="niches"
                            options={[
                                { value: 'fashion', label: 'Fashion & Style' },
                                { value: 'tech', label: 'Technology' },
                                { value: 'gaming', label: 'Gaming' },
                                { value: 'beauty', label: 'Beauty & Cosmetics' },
                                { value: 'fitness', label: 'Fitness & Health' },
                                { value: 'food', label: 'Food & Cooking' },
                                { value: 'travel', label: 'Travel' },
                                { value: 'music', label: 'Music' },
                                { value: 'art', label: 'Art & Design' },
                                { value: 'business', label: 'Business & Entrepreneurship' },
                                { value: 'education', label: 'Education' },
                                { value: 'entertainment', label: 'Entertainment' },
                            ]}
                            value={formData.niches.map(interest => ({
                                value: interest,
                                label: interest.charAt(0).toUpperCase() + interest.slice(1).replace(/_/g, ' ')
                            }))}
                            onChange={(selected) => {
                                setFormData(prev => ({
                                    ...prev,
                                    niches: selected ? selected.map(option => option.value) : []
                                }));
                            }}
                            className="w-full"
                            placeholder="Select niches (e.g. Fashion, Tech)..."
                            classNamePrefix="select"
                        />
                    </div>
                </div>
            </div>
        </>
    )

}