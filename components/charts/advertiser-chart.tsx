"use client"

import { TrendingUp, PartyPopper, CheckCircle } from "lucide-react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer
} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Advertiser } from "@/app/advertiser/dashboard/profile/page"

interface ProfileField {
    key: keyof Advertiser;
    label: string;
}

const AdvertiserFields: ProfileField[] = [
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'companySize', label: 'Company Size' },
    { key: 'industry', label: 'Industry' },
    { key: 'businessType', label: 'Business Type' },
    { key: 'targetAudience', label: 'Target Audience' },
    { key: 'website', label: 'Website' },
    { key: 'billingAddress', label: 'Billing Address' },
    { key: 'billingEmail', label: 'Billing Email' },
    { key: 'goals', label: 'Goals' }
];

interface ProfileCompleteData {
    percentage: number;
    userData: Partial<Advertiser>
}

export function ProfileCompletionPie({ percentage = 0, userData }: ProfileCompleteData) {
    const safePercentage = Math.min(100, Math.max(0, Number(percentage) || 0));

    const chartData = [
        { name: "completion", value: safePercentage, fill: "hsl(var(--chart-2))" },
    ]

    const isFieldCompleted = (key: keyof Advertiser, value: any): boolean => {
        if (value === undefined || value === null) return false;
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'string') return value.trim() !== '';
        return false;
    };

    return (
        <div className="h-full"> {/* Make container take full height */}
            <Card className="h-full flex flex-col"> {/* Card takes full height and uses flex column */}
                <CardHeader className="items-center pb-0">
                    <CardTitle className="text-xl">Profile Completion</CardTitle>
                    <CardDescription>Your Profile Status</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden flex flex-col gap-4"> {/* Flexible content area */}
                    {/* Chart Section */}
                    <div className="flex-1 min-h-[200px] max-h-[250px]"> {/* Flexible chart container */}
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                data={chartData}
                                startAngle={0}
                                endAngle={360 * (safePercentage / 100)}
                                innerRadius={80}
                                outerRadius={110}
                            >
                                <PolarGrid
                                    gridType="circle"
                                    radialLines={false}
                                    stroke="none"
                                    className="first:fill-muted last:fill-background"
                                    polarRadius={[86, 74]}
                                />
                                <RadialBar dataKey="value" background cornerRadius={10} />
                                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-4xl font-bold"
                                                        >
                                                            {safePercentage}%
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Complete
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />
                                </PolarRadiusAxis>
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Checkboxes Section */}
                    <div className="flex-1 overflow-y-auto"> {/* Scrollable checkboxes area */}
                        <div className="space-y-2 pr-2"> {/* Added right padding for scrollbar */}
                            {AdvertiserFields.map((field) => {
                                const isCompleted = isFieldCompleted(field.key, userData[field.key]);
                                return (
                                    <div key={field.key} className="flex items-center space-x-3">
                                        <Checkbox
                                            id={`check-${field.key}`}
                                            checked={isCompleted}
                                            disabled={true}
                                            className={`${isCompleted ? 'border-[hsl(var(--chart-2))]' : ''}`}
                                            style={{
                                                backgroundColor: isCompleted ? 'hsl(var(--chart-2))' : '',
                                                borderColor: isCompleted ? 'hsl(var(--chart-2))' : ''
                                            }}
                                        />
                                        <label
                                            htmlFor={`check-${field.key}`}
                                            className={`text-sm ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}
                                        >
                                            {field.label}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-2 text-sm pt-4 border-t">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        {safePercentage < 100 ?
                            `${100 - safePercentage}% more to complete` :
                            "Profile fully completed"}
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        {safePercentage < 100 ? (
                            <span>Optimize your profile to enjoy all features</span>
                        ) : (
                            <span className="flex items-center gap-3">
                                <div className="space-y-4">
                                    <p className="">Your profile is well optimized.</p>
                                    <span className="flex items-center justify-between">
                                        Congratulations
                                        <PartyPopper className="text-red-700" />
                                    </span>
                                </div>
                            </span>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}