/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const MediaUpload = dynamic(
  () =>
    import("@/app/components/campaign/MediaUpload").then(
      (mod) => mod.MediaUpload
    ),
  { ssr: false }
);
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { FileUploader } from "@/components/ui/file-uploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ImageIcon,
  VideoIcon,
  LayoutIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { campaignService } from "@/services/campaign";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const PLATFORMS = ["instagram", "tiktok", "youtube", "twitter"];

const NICHES = [
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
]

const mediaFileSchema = z.object({
  type: z.enum(["image", "video"] as const),
  url: z.string(),
  file: z.any(),
});

const postingScheduleSchema = z.object({
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  days: z.array(z.string()).min(1, "Select at least one day"),
});

const campaignSchema = z.object({
  // Campaign Details
  name: z.string().min(3, "Campaign name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.number().min(1, "Budget must be greater than 0"),
  pricePerPost: z.number().min(1, "Price per post must be greater than 0"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),

  // Targeting & Goals
  goal: z.enum(["awareness", "engagement", "conversion"], {
    required_error: "Please select a campaign goal",
  }),
  location: z.array(z.string()).min(1, "Select at least one location"),
  gender: z.enum(["all", "male", "female"]).default("all"),
  promoterCount: z.number().min(5).max(200),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  niches: z.array(z.string()).min(1, "Select at least one niche"),
  isBoosted: z.boolean().default(false),

  // Content & Assets
  contentType: z.enum(["photo", "video", "carousel"]),
  mediaFiles: z
    .array(mediaFileSchema)
    .min(1, "Please upload at least one media file"),
  contentGuidelines: z
    .string()
    .min(10, "Guidelines must be at least 10 characters"),
  postingSchedule: postingScheduleSchema,
  hashtags: z.string().min(1, "Add at least one hashtag"),
  mentions: z.string().optional(),
  brandAssetLinks: z.string().url().optional(),
  promotionLink: z.string().url("Please enter a valid URL"),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

const STEPS = ["details", "targeting", "content"] as const;

export default function Page() {
  const router = useRouter();
  const [currentStep, setCurrentStep] =
    useState<(typeof STEPS)[number]>("details");

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      contentType: "photo",
      isBoosted: false,
      gender: "all",
      promoterCount: 10,
      platforms: [],
      niches: [],
      mediaFiles: [],
      postingSchedule: {
        startTime: "09:00",
        endTime: "17:00",
        days: [],
      },
    },
  });

  const {
    watch,
    trigger,
    formState: { errors },
  } = form;

  const contentType = watch("contentType");
  const isBoosted = watch("isBoosted");
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const [currentSlide, setCurrentSlide] = useState(0);

  const validateStep = async () => {
    let fieldsToValidate: (keyof CampaignFormData)[] = [];

    switch (currentStep) {
      case "details":
        fieldsToValidate = [
          "name",
          "description",
          "budget",
          "pricePerPost",
          "startDate",
          "endDate",
        ];
        break;
      case "targeting":
        fieldsToValidate = ["goal", "platforms", "niches", "promoterCount"];
        break;
      case "content":
        fieldsToValidate = [
          "contentType",
          "mediaFiles",
          "contentGuidelines",
          "postingSchedule",
          "hashtags",
          "promotionLink",
        ];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (typeof window === "undefined") return; // Skip in Node.js environment

    const files = event.target.files;
    if (!files?.length) return;

    const fileArray = Array.from(files);
    const mediaFiles = fileArray.map((file) => ({
      type: file.type.startsWith("video/") ? "video" as const : "image" as const,
      url: URL.createObjectURL(file),
      file: file as File, // Ensure file is treated as required
    }));

    form.setValue("mediaFiles", mediaFiles);
  };

  const onSubmit = async (data: any) => {
    try {
      toast.loading("Creating campaign...");
      await campaignService.createCampaign(data);
      toast.success("Campaign created successfully!");
      router.push("/advertiser/dashboard/campaigns");
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast.error(error.response?.data?.message || "Failed to create campaign");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Create Campaign</h1>
        <p className="mt-2 text-muted-foreground">
          Launch a new advertising campaign
        </p>
      </div>

      <Tabs value={currentStep} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="details">Campaign Details</TabsTrigger>
          <TabsTrigger value="targeting">Targeting & Goals</TabsTrigger>
          <TabsTrigger value="content">Content & Assets</TabsTrigger>
        </TabsList>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TabsContent value="details">
            <Card className="p-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label>Campaign Name</Label>
                  <Input
                    {...form.register("name")}
                    type="text"
                    placeholder="Enter a memorable name for your campaign"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    {...form.register("description")}
                    placeholder="Describe your campaign objectives and requirements"
                    className="min-h-[100px]"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Campaign Budget ($)</Label>
                    <Input
                      {...form.register("budget", { valueAsNumber: true })}
                      type="number"
                      min={0}
                      step={0.01}
                    />
                    {errors.budget && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Price Per Post ($)</Label>
                    <Input
                      {...form.register("pricePerPost", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      min={0}
                      step={0.01}
                    />
                    {errors.pricePerPost && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.pricePerPost.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? (
                            format(startDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) =>
                            form.setValue("startDate", date as Date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? (
                            format(endDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) =>
                            form.setValue("endDate", date as Date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="targeting">
            <Card className="p-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label>Campaign Goal</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("goal", value as any)
                    }
                    defaultValue={form.getValues("goal")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your campaign goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">
                        Awareness (Reach & Impressions)
                      </SelectItem>
                      <SelectItem value="engagement">
                        Engagement (Views & Clicks)
                      </SelectItem>
                      <SelectItem value="conversion">
                        Conversion (Leads & Downloads)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.goal && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.goal.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Target Location</Label>
                  <Select
                    onValueChange={(value) => {
                      if (value === "all") {
                        form.setValue("location", NIGERIAN_STATES);
                      } else {
                        const currentLocations =
                          form.getValues("location") || [];
                        if (!currentLocations.includes(value)) {
                          form.setValue("location", [
                            ...currentLocations,
                            value,
                          ]);
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {NIGERIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.location.message}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("location")?.map((state) => (
                      <div
                        key={state}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-2"
                      >
                        {state}
                        <button
                          type="button"
                          onClick={() => {
                            const currentLocations = form.getValues("location");
                            form.setValue(
                              "location",
                              currentLocations.filter((s) => s !== state)
                            );
                          }}
                          className="hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Gender</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("gender", value as any)
                    }
                    defaultValue={form.getValues("gender")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Target Number of Promoters</Label>
                    <span className="text-sm text-muted-foreground">
                      {form.watch("promoterCount") || 5} promoters
                    </span>
                  </div>
                  <Slider
                    defaultValue={[form.getValues("promoterCount") || 5]}
                    min={5}
                    max={200}
                    step={1}
                    onValueChange={([value]) =>
                      form.setValue("promoterCount", value)
                    }
                    className="py-4"
                  />
                  {errors.promoterCount && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.promoterCount.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Required Platforms</Label>
                  <Select
                    onValueChange={(value) => {
                      if (value === "all") {
                        form.setValue("platforms", PLATFORMS);
                      } else {
                        const currentPlatforms =
                          form.getValues("platforms") || [];
                        form.setValue("platforms", [
                          ...currentPlatforms,
                          value,
                        ]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select required platforms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      {PLATFORMS.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.platforms && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.platforms.message}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("platforms").map((platform) => (
                      <div
                        key={platform}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-2"
                      >
                        {platform}
                        <button
                          type="button"
                          onClick={() => {
                            const currentPlatforms =
                              form.getValues("platforms");
                            form.setValue(
                              "platforms",
                              currentPlatforms.filter((p) => p !== platform)
                            );
                          }}
                          className="hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Targeted Niches</Label>
                  <Select
                    onValueChange={(value) => {
                      if (value === "all") {
                        form.setValue("niches", NICHES.map(niche => niche.value));
                      } else {
                        const currentNiches = form.getValues("niches") || [];
                        form.setValue("niches", [...currentNiches, value]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select target niches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Niches</SelectItem>
                      {NICHES.map((niche) => (
                        <SelectItem key={niche.value} value={niche.value}>
                          {niche.label.charAt(0).toUpperCase() + niche.label.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.niches && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.niches.message}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("niches").map((niche) => (
                      <div
                        key={niche}
                        className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center gap-2"
                      >
                        {niche}
                        <button
                          type="button"
                          onClick={() => {
                            const currentNiches = form.getValues("niches");
                            form.setValue(
                              "niches",
                              currentNiches.filter((n) => n !== niche)
                            );
                          }}
                          className="hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="boost"
                    checked={isBoosted}
                    onCheckedChange={(checked) =>
                      form.setValue("isBoosted", checked)
                    }
                  />
                  <Label htmlFor="boost">
                    Boost Campaign (Make available to community promoters)
                  </Label>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="p-6">
              <div className="grid gap-6">
                <div className="space-y-4">
                  <Label>Content Type</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      type="button"
                      variant={contentType === "photo" ? "default" : "outline"}
                      className="flex flex-col items-center py-4"
                      onClick={() => {
                        form.setValue("contentType", "photo");
                        form.setValue("mediaFiles", []);
                      }}
                    >
                      <ImageIcon className="h-6 w-6 mb-2" />
                      Photo
                    </Button>
                    <Button
                      type="button"
                      variant={contentType === "video" ? "default" : "outline"}
                      className="flex flex-col items-center py-4"
                      onClick={() => {
                        form.setValue("contentType", "video");
                        form.setValue("mediaFiles", []);
                      }}
                    >
                      <VideoIcon className="h-6 w-6 mb-2" />
                      Video
                    </Button>
                    <Button
                      type="button"
                      variant={
                        contentType === "carousel" ? "default" : "outline"
                      }
                      className="flex flex-col items-center py-4"
                      onClick={() => {
                        form.setValue("contentType", "carousel");
                        form.setValue("mediaFiles", []);
                      }}
                    >
                      <LayoutIcon className="h-6 w-6 mb-2" />
                      Carousel
                    </Button>
                  </div>

                  {contentType === "photo" && (
                    <div className="space-y-4">
                      <FileUploader
                        accept="image/jpeg,image/png,image/webp"
                        maxSize={5242880} // 5MB
                        onDrop={(files) => {
                          const file = files[0];
                          if (file) {
                            form.setValue("mediaFiles", [
                              {
                                type: "image" as const,
                                url: URL.createObjectURL(file),
                                file,
                              },
                            ]);
                          }
                        }}
                      />
                      {form.watch("mediaFiles")?.[0] && (
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                          <img
                            src={form.watch("mediaFiles")[0].url}
                            alt="Preview"
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={() => form.setValue("mediaFiles", [])}
                          >
                            ×
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {contentType === "video" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <FileUploader
                          accept="video/mp4,video/quicktime"
                          maxSize={104857600} // 100MB
                          onDrop={(files) => {
                            const file = files[0];
                            if (file) {
                              if (file.size > 104857600) {
                                form.setError("mediaFiles", {
                                  type: "size",
                                  message: "Video size must be less than 100MB",
                                });
                                return;
                              }
                              form.clearErrors("mediaFiles");
                              form.setValue("mediaFiles", [
                                {
                                  type: "video" as const,
                                  url: URL.createObjectURL(file),
                                  file,
                                },
                              ]);
                            }
                          }}
                        />
                        {form.formState.errors.mediaFiles?.type === "size" && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.mediaFiles.message}
                          </p>
                        )}
                      </div>
                      {form.watch("mediaFiles")?.[0] && (
                        <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border">
                          <div className="relative aspect-video bg-black flex items-center justify-center">
                            <video
                              src={form.watch("mediaFiles")[0].url}
                              controls
                              playsInline
                              className="max-h-full max-w-full"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2 z-10"
                            onClick={() => form.setValue("mediaFiles", [])}
                          >
                            ×
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {contentType === "carousel" && (
                    <div className="space-y-4">
                      <FileUploader
                        accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                        maxSize={104857600} // 100MB
                        multiple
                        maxFiles={10}
                        onDrop={(files) => {
                          const newFiles = files.map(
                            (file) =>
                              ({
                                type: file.type.startsWith("image/")
                                  ? ("image" as const)
                                  : ("video" as const),
                                url: URL.createObjectURL(file),
                                file,
                              }) as const
                          );
                          form.setValue("mediaFiles", [
                            ...(form.watch("mediaFiles") || []),
                            ...newFiles,
                          ]);
                        }}
                      />
                      {form.watch("mediaFiles")?.length > 0 && (
                        <div className="relative mx-auto max-w-md">
                          <div className="overflow-hidden rounded-lg border bg-background">
                            <div className="relative aspect-video">
                              {form.watch("mediaFiles").map((media, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "absolute inset-0 w-full transition-opacity duration-300",
                                    currentSlide === index
                                      ? "opacity-100"
                                      : "opacity-0 pointer-events-none"
                                  )}
                                >
                                  {media.type === "image" ? (
                                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                                      <img
                                        src={media.url}
                                        alt={`Item ${index + 1}`}
                                        className="max-h-full max-w-full object-contain"
                                      />
                                    </div>
                                  ) : (
                                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                                      <video
                                        key={currentSlide}
                                        src={media.url}
                                        controls
                                        playsInline
                                        preload="metadata"
                                        className="max-h-full max-w-full"
                                        style={{
                                          width: "auto",
                                          height: "auto",
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2 z-10"
                                onClick={() => {
                                  const files = form.watch("mediaFiles");
                                  files.splice(currentSlide, 1);
                                  form.setValue("mediaFiles", [...files]);
                                  if (currentSlide > 0)
                                    setCurrentSlide(currentSlide - 1);
                                }}
                              >
                                ×
                              </Button>
                            </div>
                            <div className="flex items-center justify-center gap-2 p-2">
                              {form.watch("mediaFiles").map((_, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  className={cn(
                                    "h-1.5 rounded-full transition-all",
                                    currentSlide === index
                                      ? "w-4 bg-primary"
                                      : "w-1.5 bg-primary/25"
                                  )}
                                  onClick={() => setCurrentSlide(index)}
                                />
                              ))}
                            </div>
                          </div>
                          {form.watch("mediaFiles").length > 1 && (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                                onClick={() =>
                                  setCurrentSlide(
                                    (prev) =>
                                      (prev -
                                        1 +
                                        form.watch("mediaFiles").length) %
                                      form.watch("mediaFiles").length
                                  )
                                }
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                                onClick={() =>
                                  setCurrentSlide(
                                    (prev) =>
                                      (prev + 1) %
                                      form.watch("mediaFiles").length
                                  )
                                }
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {errors.mediaFiles && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.mediaFiles.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Content Guidelines</Label>
                  <Textarea
                    {...form.register("contentGuidelines")}
                    placeholder="Provide detailed guidelines for content creation"
                    className="min-h-[100px]"
                  />
                  {errors.contentGuidelines && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.contentGuidelines.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label>Posting Schedule</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">
                        Start Time
                      </Label>
                      <Input
                        {...form.register("postingSchedule.startTime")}
                        type="time"
                      />
                      {errors.postingSchedule?.startTime && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.postingSchedule.startTime.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">
                        End Time
                      </Label>
                      <Input
                        {...form.register("postingSchedule.endTime")}
                        type="time"
                      />
                      {errors.postingSchedule?.endTime && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.postingSchedule.endTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Days of the Week
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={
                            form.watch("postingSchedule.days")?.includes(day)
                              ? "default"
                              : "outline"
                          }
                          className="text-sm"
                          onClick={() => {
                            const currentDays =
                              form.watch("postingSchedule.days") || [];
                            if (currentDays.includes(day)) {
                              form.setValue(
                                "postingSchedule.days",
                                currentDays.filter((d) => d !== day)
                              );
                            } else {
                              form.setValue("postingSchedule.days", [
                                ...currentDays,
                                day,
                              ]);
                            }
                          }}
                        >
                          {day.slice(0, 3)}
                        </Button>
                      ))}
                    </div>
                    {errors.postingSchedule?.days && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.postingSchedule.days.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Hashtags (comma separated)</Label>
                  <Input
                    {...form.register("hashtags")}
                    type="text"
                    placeholder="e.g., #brandname, #campaign, #ad"
                  />
                  {errors.hashtags && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.hashtags.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Mentions (comma separated)</Label>
                  <Input
                    {...form.register("mentions")}
                    type="text"
                    placeholder="e.g., @brandname, @partner"
                  />
                  {errors.mentions && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.mentions.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Brand Asset Links (optional)</Label>
                  <Input
                    {...form.register("brandAssetLinks")}
                    type="url"
                    placeholder="Add links to brand assets, logos, or guidelines"
                  />
                  {errors.brandAssetLinks && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.brandAssetLinks.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Promotion Link</Label>
                  <Input
                    {...form.register("promotionLink")}
                    type="url"
                    placeholder="Add the main link to be promoted"
                  />
                  {errors.promotionLink && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.promotionLink.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <div className="flex justify-between space-x-4">
            <div>
              {currentStep !== "details" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentIndex = STEPS.indexOf(currentStep);
                    setCurrentStep(STEPS[currentIndex - 1]);
                  }}
                >
                  Back
                </Button>
              )}
            </div>
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              {currentStep !== "content" ? (
                <Button
                  type="button"
                  variant="new"
                  onClick={async () => {
                    const isValid = await validateStep();
                    if (isValid) {
                      const currentIndex = STEPS.indexOf(currentStep);
                      setCurrentStep(STEPS[currentIndex + 1]);
                    }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="new">
                  Create Campaign
                </Button>
              )}
            </div>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
