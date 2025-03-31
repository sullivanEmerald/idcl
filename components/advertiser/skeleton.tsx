"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Verified, Plus, Calendar, DollarSign, Users, Pencil } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileSkeleton() {
    return (
        <div className="space-y-8 p-8">
            <div className="rounded-lg p-6 flex items-center justify-between gap-6">
                <div className="flex gap-4">
                    <Skeleton className="h-10 w-[150px] rounded-md" />
                    <Skeleton className="h-10 w-[150px] rounded-md" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-[120px] rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-3 w-[80px]" />
                    </div>
                </div>
            </div>

            <Card className="p-4 border-0 shadow-none">
                <CardHeader className="flex flex-row justify-between items-start space-y-0">
                    <div>
                        <CardTitle><Skeleton className="h-6 w-[200px]" /></CardTitle>
                        <CardDescription><Skeleton className="h-4 w-[250px] mt-2" /></CardDescription>
                    </div>
                    <Skeleton className="h-9 w-[120px] rounded-md" />
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">

                    <div className="space-y-4">
                        <Skeleton className="h-4 w-[180px]" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>


                    <div className="space-y-4">
                        <Skeleton className="h-4 w-[180px]" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>


                    <div className="space-y-4">
                        <Skeleton className="h-4 w-[180px]" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>


                    <div className="col-span-full space-y-4">
                        <Skeleton className="h-4 w-[180px]" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>


            <Card className="space-y-6 p-4 border-0 shadow-none">
                <CardHeader>
                    <CardTitle><Skeleton className="h-6 w-[200px]" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-[250px] mt-2" /></CardDescription>
                </CardHeader>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="p-6 border-0">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-6 w-[80px]" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>


                <div className="p-6">
                    <Tabs defaultValue="active" className="w-full">
                        <TabsList className="w-full">
                            <Skeleton className="h-10 w-full" />
                        </TabsList>
                        <TabsContent value="active">
                            <Card className="border-0">
                                <div className="p-6">
                                    <Skeleton className="h-6 w-[200px]" />
                                    <Skeleton className="h-4 w-[250px] mt-2" />
                                </div>
                                <div className="p-6 space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <Skeleton key={i} className="h-20 w-full rounded-md" />
                                    ))}
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </Card>
        </div>
    )
}