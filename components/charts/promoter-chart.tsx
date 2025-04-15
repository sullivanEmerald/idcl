"use client"

import { useState, useEffect } from 'react';
import { TrendingUp, PartyPopper, CheckCircle } from "lucide-react";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface PromoterProfile {
    phoneNumber: string;
    fullName: string;
    companyName: string;
    location: string;
    platforms: string[];
    audienceAge: string;
    audienceInterests: string[];
    contentTypes: string[];
    paymentMethod: string;
    accountDetails: string;
    followersCount?: number;
    engagementRate?: number;
    isEmailNotificationEnabled?: boolean;
    isSmsNotificationEnabled?: boolean;
    isPushNotificationEnabled?: boolean;
    bio?: string;
    companySize?: string;
    website?: string;
    profileCompleted?: number;
    [key: string]: any;
}


interface ProfileField {
    key: keyof PromoterProfile;
    label: string;
}


const profileFields: ProfileField[] = [
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'fullName', label: 'Full Name' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'location', label: 'Location' },
    { key: 'platforms', label: 'Platforms' },
    { key: 'audienceAge', label: 'Audience Age' },
    { key: 'audienceInterests', label: 'Audience Interests' },
    { key: 'contentTypes', label: 'Content Types' },
    { key: 'paymentMethod', label: 'Payment Method' },
    { key: 'accountDetails', label: 'Account Details' }
];

interface ProfileCompletionProps {
    userData: Partial<PromoterProfile>;
    percentage?: number;
}

export function PromoterProfileCompletionChart({ userData = {}, percentage = 0 }: ProfileCompletionProps) {
    // Ensure percentage is between 0-100
    const safePercentage = Math.min(100, Math.max(0, Number(percentage) || 0));

    const chartData = [
        { name: "completion", value: safePercentage, fill: "hsl(var(--chart-2))" },
    ];

    // Check if a field is completed
    const isFieldCompleted = (key: keyof PromoterProfile, value: any): boolean => {
        if (value === undefined || value === null) return false;

        if (Array.isArray(value)) {
            return value.length > 0;
        } else if (typeof value === 'string') {
            return value.trim() !== '';
        }

        return false;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Profile Completion Chart */}
            <Card className="flex flex-col gap-4">
                <CardHeader className="items-center pb-0">
                    <CardTitle className="text-xl">Profile Completion</CardTitle>
                    <CardDescription>Your Profile Status</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <div className="mx-auto aspect-square w-full max-h-[250px]">
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
                        <div className="flex flex-col">
                            <CardContent className="flex-1">
                                <div className="space-y-1">
                                    {profileFields.map((field) => {
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
                            </CardContent>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
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


        </div >
    );
}

export default PromoterProfileCompletionChart;