/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
  AlertCircle,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { campaignService } from "@/services/campaign";
import { axiosInstance } from "@/lib/utils";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../../components/ui/alert";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

type CampaignSchemaOutput = z.infer<typeof campaignSchema>;

const STEPS = ["details", "targeting", "content"] as const;

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

const PLATFORMS = ["instagram", "tiktok", "youtube", "twitter", "facebook"];

const NICHES = [
  { value: "fashion", label: "Fashion & Style" },
  { value: "tech", label: "Technology" },
  { value: "gaming", label: "Gaming" },
  { value: "beauty", label: "Beauty & Cosmetics" },
  { value: "fitness", label: "Fitness & Health" },
  { value: "food", label: "Food & Cooking" },
  { value: "travel", label: "Travel" },
  { value: "music", label: "Music" },
  { value: "art", label: "Art & Design" },
  { value: "business", label: "Business & Entrepreneurship" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
];

// Create a safe file schema that works on both server and client
const fileSchema =
  typeof File === "undefined"
    ? z.any() // During SSR, accept any
    : z.instanceof(File, { message: "Please upload a valid file" });

// Define the schema to match MediaFileClient interface
const mediaFileSchema = z
  .object({
    type: z.enum(["image", "video"] as const),
    url: z.string(),
    file: fileSchema, // File is required in MediaFileClient
  })
  .transform((data) => {
    // Ensure the file property is always present and correctly typed
    return {
      ...data,
      file: data.file as File, // Cast to File since we validate it's a File on client-side
    };
  });

const postingScheduleSchema = z
  .object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    days: z.array(z.string()).min(1, "Select at least one day"),
  })
  .strict();

const campaignSchema = z.object({
  postingSchedule: postingScheduleSchema,
  name: z.string().min(3, "Campaign name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  coverImage: z.string().url("Please upload a valid cover image").optional(),
  budget: z.number().min(1, "Budget must be at least 1"),
  pricePerPost: z.number().min(1, "Price per post must be at least 1"),
  targetImpressions: z
    .number()
    .min(1, "Target reach must be at least 1")
    .optional(),
  pricePerImpression: z
    .number()
    .min(0.001, "Price per reach must be greater than 0")
    .optional(),
  estimatedBudget: z
    .number()
    .min(1, "Estimated budget must be greater than 0")
    .optional(),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  goal: z.enum(["awareness", "engagement", "conversion"], {
    required_error: "Please select a campaign goal",
  }),
  location: z.array(z.string()).min(1, "Select at least one location"),
  gender: z.enum(["all", "male", "female"]).default("all"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  niches: z.array(z.string()).min(1, "Select at least one niche"),
  isBoosted: z.boolean().default(false),
  contentType: z.enum(["photo", "video", "carousel"]),
  mediaFiles: z.array(mediaFileSchema).optional(),
  contentGuidelines: z
    .string()
    .min(10, "Guidelines must be at least 10 characters"),
  hashtags: z.string().min(1, "Add at least one hashtag"),
  mentions: z.string().optional(),
  brandAssetLinks: z.string().url().optional(),
  promotionLink: z.string().url("Please enter a valid URL"),
  contentAssets: z
    .array(
      z.object({
      type: z.string(),
      contentType: z.string(),
      url: z.string(),
      size: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      })
    )
    .optional(),
  ctaLabel: z.string().optional(),
});

// Update the form data type
type CampaignFormData = z.infer<typeof campaignSchema>;

export default function Page() {
  const router = useRouter();
  const [currentStep, setCurrentStep] =
    useState<(typeof STEPS)[number]>("details");
  // const [initializePayment, setInitializePayment] = useState<ReturnType<typeof usePaystackPayment>>(() => () => {});

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      contentType: "photo",
      isBoosted: false,
      gender: "all",
      budget: 1,
      pricePerPost: 1,
      targetImpressions: 1,
      pricePerImpression: 1,
      estimatedBudget: 1,
      platforms: [],
      niches: [],
      mediaFiles: [],
      coverImage: "",
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
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const validateStep = async () => {
    let fieldsToValidate: (keyof CampaignFormData)[] = [];

    switch (currentStep) {
      case "details":
        fieldsToValidate = [
          "name",
          "description",
          "coverImage",
          "startDate",
          "endDate",
        ];
        break;
      case "targeting":
        fieldsToValidate = [
          "goal",
          "platforms",
          "niches",
          "targetImpressions",
          "pricePerImpression",
          "estimatedBudget",
          "location",
          "gender",
        ];
        break;
      case "content":
        fieldsToValidate = [
          "contentType",
          "mediaFiles",
          "contentGuidelines",
          "postingSchedule", // Validate the entire postingSchedule object
          "hashtags",
          "promotionLink",
        ];
        break;
    }

    const isValid = await trigger(fieldsToValidate, { shouldFocus: true });

    if (!isValid) {
      const errorMessages = Object.entries(errors)
        .filter(([field]) => fieldsToValidate.some((f) => field.startsWith(f)))
        .map(([field, error]) => {
          if (error?.message) {
            const fieldName = field
              .split(".")
              .map((part) =>
                part
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()
                  .replace(/^./, (str) => str.toUpperCase())
              )
              .join(" › ");
            return `${fieldName}: ${error.message}`;
          }
          return null;
        })
        .filter(Boolean);

      if (errorMessages.length > 0) {
        toast.error(
          <div className="max-h-[80vh] overflow-auto">
            <p className="font-medium mb-2">Please fix the following errors:</p>
            <ul className="list-disc pl-4 space-y-1">
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </div>
        );
      }
    }

    return isValid;
  };

  const handleCoverImageUpload = async (file: File) => {
    try {
      setIsUploadingCover(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        "/upload/campaign-cover",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      form.setValue("coverImage", response.data.url);
      // toast.success("Cover image uploaded successfully");
    } catch (error: any) {
      console.error("Error uploading cover image:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to upload cover image. Please try again."
      );
    } finally {
      setIsUploadingCover(false);
    }
  };

  const coverImage = watch("coverImage");

  const [paymentConfig, setPaymentConfig] = useState(() => ({
    reference: "",
    email: "",
    amount: 0,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  }));

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setPaymentConfig({
  //       reference: new Date().getTime().toString(),
  //       email: localStorage?.getItem("userEmail") || "",
  //       amount: Math.round((watch("estimatedBudget") || 0) * 100),
  //       publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  //     });

  //     // Initialize payment only on client side
  //     const payment = usePaystackPayment(paymentConfig);
  //     setInitializePayment(() => payment);
  //   }
  // }, [watch]);

  const config = {
    reference:
      typeof window !== "undefined" ? new Date().getTime().toString() : "",
    email:
      typeof window !== "undefined"
        ? localStorage?.getItem("userEmail") || ""
        : "",
    amount: Math.round((watch("estimatedBudget") || 0) * 100),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  };

  // const initializePayment = usePaystackPayment(paymentConfig);

  const onSuccess = async (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    // Create campaign with payment
    try {
      const formValues = form.getValues();
      
      // Process media files if needed - this should happen before submitting
      let processedContentAssets = formValues.contentAssets;
      
      // If we don't have pre-uploaded content assets but we do have mediaFiles, process them
      if (
        (!processedContentAssets || processedContentAssets.length === 0) &&
        formValues.mediaFiles &&
        formValues.mediaFiles.length > 0
      ) {
        const mediaUploads = [];
        for (const mediaFile of formValues.mediaFiles) {
          if (mediaFile && mediaFile.file) {
            try {
              const formData = new FormData();
              formData.append("file", mediaFile.file);
              
              const fileType =
                mediaFile.type === "video"
                  ? "campaign-video"
                  : "campaign-photo";
              const response = await axiosInstance.post(`/upload`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
              });
              
              mediaUploads.push({
                type: mediaFile.type === "video" ? "video" : "photo",
                contentType: mediaFile.type,
                url: response.data.url,
                size: mediaFile.file.size,
                width: response.data.width || 0,
                height: response.data.height || 0,
                carouselIndex:
                  formValues.contentType === "carousel"
                    ? mediaUploads.length
                    : undefined,
              });
            } catch (error) {
              console.error("Error uploading media file:", error);
              toast.error("Failed to upload media files. Please try again.");
              return;
            }
          }
        }
        
        processedContentAssets = mediaUploads;
      }

      const pricePerPost =
        formValues.goal === "awareness"
          ? 60
          : formValues.goal === "engagement"
            ? 400
            : 1000;
      
      const campaignData = {
        title: formValues.name,
        description: formValues.description,
        coverImage: formValues.coverImage,
        conversionValue: Number(formValues.pricePerImpression) || 0,
        budget: Number(formValues.estimatedBudget),
        pricePerPost,
        requiredPlatforms: formValues.platforms || [],
        targetedNiches: formValues.niches || [],
        campaignGoal: formValues.goal,
        targetLocation: formValues.location[0] || "",
        targetGender: formValues.gender,
        minFollowers: Number(formValues.targetImpressions) || 1000,
        minEngagementRate: 1,
        targetPromotions: 10,
        promotionLink: formValues.promotionLink,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        contentAssets: processedContentAssets || [],
        requirements: {
          contentGuidelines: formValues.contentGuidelines,
          postingSchedule: {
            startTime: formValues.postingSchedule.startTime,
            endTime: formValues.postingSchedule.endTime,
            days: formValues.postingSchedule.days,
          },
          hashtags: formValues.hashtags
            ? formValues.hashtags.split(",").map((tag) => tag.trim())
            : [],
          mentions: formValues.mentions
            ? formValues.mentions.split(",").map((mention) => mention.trim())
            : [],
          brandAssetLinks: formValues.brandAssetLinks
            ? [formValues.brandAssetLinks]
            : [],
        },
        paymentReference: reference.reference,
      };
      
      const response = await axiosInstance.post("/campaigns", campaignData);

    toast.dismiss();
    toast.success(
      <div className="space-y-2">
        <p className="font-medium">Congratulations 🎊!</p>
        <p className="text-sm text-muted-foreground">
            Your campaign was created successfully. You can view your campaign
            on your dashboard.
        </p>
      </div>,
      {
        duration: 5000,
      }
    );

    setTimeout(() => {
      router.push("/advertiser/dashboard/campaigns");
    }, 2000);
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create campaign. Please try again."
      );
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Create Campaign",
    onSuccess: (reference: string) => onSuccess(reference),
    onClose,
  };

  const handleMediaFileUpload = async (file: File, type: "image" | "video") => {
    try {
      setIsUploadingMedia(true);

      // Always use Cloudinary for videos
      if (type === "video") {
        toast.info("Uploading video to cloud storage...");

        // Cloudinary direct upload
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = "adminting";

        if (!cloudName || !uploadPreset) {
          throw new Error("Cloudinary configuration is missing");
        }

      const formData = new FormData();
      formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("resource_type", "video");
        formData.append("max_file_size", "100000000"); // 100MB in bytes

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error?.message || "Error uploading to Cloudinary"
          );
        }

        // Store the uploaded asset in contentAssets form field
        const asset = {
          type: "video",
          contentType: "video",
          url: data.secure_url,
          thumbnailUrl: data.secure_url.replace(
            "/video/upload/",
            "/video/upload/c_thumb,w_640,g_face/"
          ),
          size: file.size,
          width: data.width || 0,
          height: data.height || 0,
        };

        form.setValue("contentAssets", [asset]);
        toast.success("Video uploaded successfully");
      } else {
        // Regular upload through your backend for images
        const formData = new FormData();
        formData.append("file", file);

        const response = await axiosInstance.post(`/upload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      // Store the uploaded asset in contentAssets form field
      const asset = {
        type: type === "image" ? "photo" : "video",
        contentType: type,
        url: response.data.url,
        size: file.size,
        width: response.data.width || 0,
        height: response.data.height || 0,
      };
      
      form.setValue("contentAssets", [asset]);
        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`
        );
      }
    } catch (error: any) {
      console.error(`Error uploading ${type} file:`, error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          `Failed to upload ${type} file. Please try again.`
      );
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const onSubmit = async (data: CampaignFormData) => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the campaign payload
      const campaignData: any = {
        title: data.name,
        description: data.description,
        coverImage: data.coverImage,
        conversionValue: Number(data.pricePerImpression) || 0,
        budget: Number(data.budget) * 100, // Convert to kobo
        pricePerPost: Number(data.pricePerPost),
        requiredPlatforms: data.platforms || [],
        targetedNiches: data.niches || [],
        campaignGoal: data.goal,
        targetLocation: data.location,
        targetGender: data.gender,
        minFollowers: Number(data.targetImpressions) || 1000,
        minEngagementRate: Number(data.pricePerImpression) || 0.02,
        targetPromotions: Math.floor(
          Number(data.budget) / Number(data.pricePerPost)
        ),
        promotionLink: data.promotionLink,
        startDate: data.startDate,
        endDate: data.endDate,
        requirements: {
          contentGuidelines: data.contentGuidelines,
          postingSchedule: {
            startTime: data.postingSchedule.startTime,
            endTime: data.postingSchedule.endTime,
            days: data.postingSchedule.days,
          },
          hashtags: data.hashtags
            ? data.hashtags.split(",").map((tag) => tag.trim())
            : [],
          mentions: data.mentions
            ? data.mentions.split(",").map((mention) => mention.trim())
            : [],
          brandAssetLinks: data.brandAssetLinks ? [data.brandAssetLinks] : [],
        },
      };
      
      // Use the pre-uploaded contentAssets if available
      if (data.contentAssets && data.contentAssets.length > 0) {
        campaignData.contentAssets = data.contentAssets;
      } 
      // Otherwise, process the mediaFiles
      else if (data.mediaFiles && data.mediaFiles.length > 0) {
        const mediaFileUploads = [];
        for (const mediaFile of data.mediaFiles) {
          if (mediaFile.file) {
            const formData = new FormData();
            formData.append("file", mediaFile.file);
            
            const fileType =
              mediaFile.type === "video" ? "campaign-video" : "campaign-photo";
            const response = await axiosInstance.post(`/upload`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            });
            
            mediaFileUploads.push({
              type: mediaFile.type === "video" ? "video" : "photo",
              contentType: mediaFile.type,
              url: response.data.url,
              size: mediaFile.file.size,
              width: response.data.width || 0,
              height: response.data.height || 0,
            });
          }
        }
        
        campaignData.contentAssets = mediaFileUploads;
      } else {
        toast.error("Please upload at least one media file for your campaign");
        setIsSubmitting(false);
        return;
      }
      
      // Create the campaign
      const response = await campaignService.createCampaign(campaignData);
      
      toast.success("Campaign created successfully!");
      router.push(`/advertiser/dashboard/campaigns/${response._id}`);
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      
      setIsSubmitting(false);
    }
  };

  // Safely check for media files existence first
  const mediaFiles = form.watch("mediaFiles");
  const mediaFilesExist = Array.isArray(mediaFiles) && mediaFiles.length > 0;
  const multipleMediaFiles = Array.isArray(mediaFiles) && mediaFiles.length > 1;

  // Use a more specific check to prevent TypeScript errors
  const contentAssets = form.watch("contentAssets");
  const hasContentAssets =
    Array.isArray(contentAssets) && contentAssets.length > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
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

                <div className="space-y-2">
                  <Label>Campaign Cover Image</Label>
                  <div className="flex flex-col gap-4">
                    {form.watch("coverImage") && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={form.watch("coverImage")}
                          alt="Campaign cover"
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => form.setValue("coverImage", "")}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6L6 18" />
                            <path d="M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="flex items-center justify-center w-full">
                      <label
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${isUploadingCover ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          {isUploadingCover ? (
                            <div className="flex flex-col items-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                              <p className="text-sm text-gray-500">
                                Uploading cover image...
                              </p>
                            </div>
                          ) : (
                            <>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                Upload your campaign cover image
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCoverImageUpload(file);
                          }}
                        />
                      </label>
                    </div>
                    {errors.coverImage && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.coverImage.message}
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
                    onValueChange={(value) => {
                      form.setValue("goal", value as any);
                      // Update pricing based on new goal
                      const impressions = form.getValues("targetImpressions");
                      let pricePerImpression = 0;
                      switch (value) {
                        case "awareness":
                          pricePerImpression = 60;
                          break;
                        case "engagement":
                          const viewCost = 300;
                          const clickCost = 100;
                          pricePerImpression = viewCost + clickCost;
                          break;
                        case "conversion":
                          pricePerImpression = 1000;
                          break;
                      }
                      form.setValue("pricePerImpression", pricePerImpression);
                      form.setValue(
                        "estimatedBudget",
                        (impressions || 0) * pricePerImpression
                      );
                    }}
                    defaultValue={form.getValues("goal")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your campaign goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="awareness">
                        Awareness (CPM - ₦60 per reach)
                      </SelectItem>
                      <SelectItem value="engagement">
                        Engagement (CPA - ₦100 per view, ₦300 per click)
                      </SelectItem>
                      <SelectItem value="conversion">
                        Action (CPA - ₦1,000 per action)
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
                        form.setValue("location", NIGERIAN_STATES, {
                          shouldValidate: true,
                        });
                      } else {
                        const currentLocations =
                          form.getValues("location") || [];
                        if (!currentLocations.includes(value)) {
                          form.setValue(
                            "location",
                            [...currentLocations, value],
                            { shouldValidate: true }
                          );
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
                              currentLocations.filter((s) => s !== state),
                              { shouldValidate: true }
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

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Target reach</Label>
                      <span className="text-sm text-muted-foreground">
                        {(
                          form.watch("targetImpressions") || 0
                        ).toLocaleString()}{" "}
                        reach
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter target reach"
                        value={form.watch("targetImpressions") === 0 ? "" : form.watch("targetImpressions")}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Allow empty input
                          if (inputValue === "") {
                            form.setValue("targetImpressions", 0);
                            form.setValue("estimatedBudget", 0);
                            return;
                          }
                          
                          const value = parseInt(inputValue);
                          // Only update if it's a valid number
                          if (!isNaN(value)) {
                        form.setValue("targetImpressions", value);
                        // Calculate estimated budget based on goal
                        const goal = form.getValues("goal");
                        let pricePerImpression = 0;
                        switch (goal) {
                          case "awareness":
                            pricePerImpression = 60; // ₦60 per impression
                            break;
                          case "engagement":
                            pricePerImpression = 300 + 100; // ₦400 per engagement
                            break;
                          case "conversion":
                            pricePerImpression = 1000; // ₦1,000 per action
                            break;
                        }
                            form.setValue(
                              "pricePerImpression",
                              pricePerImpression
                            );
                        form.setValue(
                          "estimatedBudget",
                          value * pricePerImpression
                        );
                          }
                      }}
                        className="w-full"
                    />
                    </div>
                    {errors.targetImpressions && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.targetImpressions.message}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Price per{" "}
                        {form.watch("goal") === "awareness"
                          ? "reach"
                          : form.watch("goal") === "engagement"
                            ? "engagement"
                            : "conversion"}
                        :
                      </span>
                      <span>
                        ₦
                        {(
                          form.watch("pricePerImpression") || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Estimated Budget:</span>
                      <span>
                        ₦
                        {form.watch("estimatedBudget")?.toLocaleString() || "0"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Required Platforms</Label>
                  <Select
                    onValueChange={(value) => {
                      if (value === "all") {
                        form.setValue("platforms", PLATFORMS, {
                          shouldValidate: true,
                        });
                      } else {
                        const currentPlatforms =
                          form.getValues("platforms") || [];
                        form.setValue(
                          "platforms",
                          [...currentPlatforms, value],
                          { shouldValidate: true }
                        );
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
                              currentPlatforms.filter((p) => p !== platform),
                              { shouldValidate: true }
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
                        form.setValue(
                          "niches",
                          NICHES.map((niche) => niche.value),
                          { shouldValidate: true }
                        );
                      } else {
                        const currentNiches = form.getValues("niches") || [];
                        form.setValue("niches", [...currentNiches, value], {
                          shouldValidate: true,
                        });
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
                          {niche.label.charAt(0).toUpperCase() +
                            niche.label.slice(1)}
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
                              currentNiches.filter((n) => n !== niche),
                              { shouldValidate: true }
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
                    Feature campaign
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
                            // Set the mediaFiles for UI preview
                            form.setValue("mediaFiles", [
                              {
                                type: "image" as const,
                                url: URL.createObjectURL(file),
                                file,
                              },
                            ]);
                            
                            // Upload the image asynchronously
                            handleMediaFileUpload(file, "image");
                          }
                        }}
                      />
                      {form.watch("mediaFiles")?.[0] && (
                        <div className="relative overflow-hidden rounded-lg border w-[200px] h-[200px]">
                          <img
                            src={form.watch("mediaFiles")?.[0]?.url || ""}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                          {isUploadingMedia ? (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                          ) : (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2"
                              onClick={() => {
                                form.setValue("mediaFiles", []);
                                form.setValue("contentAssets", []);
                              }}
                          >
                            ×
                          </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {contentType === "video" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Media Content</Label>
                        <div className="grid gap-4">
                          <div
                            className="border border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() =>
                              document.getElementById("file-upload")?.click()
                            }
                          >
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm font-medium mb-1">
                              Upload your campaign media
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Drag and drop or click to upload
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Supported formats: .jpg, .png, .mp4, .mov
                              <br />
                              <span className="font-medium">
                                Videos up to 100MB supported
                              </span>
                            </p>

                            <input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              accept="image/jpeg,image/png,video/mp4,video/quicktime"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const fileType = file.type.startsWith(
                                    "image/"
                                  )
                                    ? "image"
                                    : "video";

                                  // Check file size for warning
                                  if (
                                    fileType === "video" &&
                                    file.size > 50 * 1024 * 1024
                                  ) {
                                    toast.warning(
                                      "Large video detected. Upload may take a few minutes."
                                    );
                                  }

                                  handleMediaFileUpload(file, fileType);
                            }
                          }}
                        />
                          </div>

                          {isUploadingMedia && (
                            <div className="space-y-2">
                              <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                                <div className="h-full bg-primary animate-pulse rounded-full"></div>
                              </div>
                              <p className="text-xs text-center text-muted-foreground">
                                Uploading media... Please wait
                              </p>
                      </div>
                          )}

                          {hasContentAssets && !isUploadingMedia && (
                            <div className="space-y-2">
                              <div className="aspect-video relative rounded-lg overflow-hidden border">
                                {contentAssets[0].contentType === "image" ? (
                                  <img
                                    src={contentAssets[0].url}
                                    alt="Campaign media"
                                    className="object-contain w-full h-full"
                                  />
                                ) : (
                                  <div className="relative w-full h-full">
                            <video
                                      src={contentAssets[0].url}
                              controls
                                      className="object-contain w-full h-full"
                            />
                          </div>
                                )}
                            </div>

                              <div className="flex justify-between items-center">
                                <p className="text-xs text-muted-foreground">
                                  {contentAssets[0].contentType === "image"
                                    ? "Image"
                                    : "Video"}{" "}
                                  uploaded (
                                  {Math.round(
                                    ((contentAssets[0].size || 0) /
                                      1024 /
                                      1024) *
                                      10
                                  ) / 10}{" "}
                                  MB)
                                </p>
                          <Button
                            type="button"
                                  variant="outline"
                                  size="sm"
                              onClick={() => {
                                    document
                                      .getElementById("file-upload")
                                      ?.click();
                              }}
                          >
                                  Replace
                          </Button>
                              </div>
                        </div>
                      )}

                          <Alert variant="info" className="mt-2">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>File Size Information</AlertTitle>
                            <AlertDescription>
                              <ul className="text-xs list-disc pl-4 space-y-1 mt-2">
                                <li>
                                  Videos under 10MB will upload through our
                                  server
                                </li>
                                <li>
                                  Larger videos (10-100MB) will upload directly
                                  to cloud storage
                                </li>
                                <li>
                                  For best performance, compress videos before
                                  uploading
                                </li>
                              </ul>
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
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
                      {mediaFilesExist && (
                        <div className="relative mx-auto max-w-md">
                          <div className="overflow-hidden rounded-lg border bg-background">
                            <div className="relative aspect-video">
                              {(mediaFiles || []).map((media, index) => (
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
                              <button
                                type="button"
                                className="absolute right-2 top-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                onClick={() => {
                                  const files = form.watch("mediaFiles") || [];
                                  if (files.length > 0) {
                                  files.splice(currentSlide, 1);
                                  form.setValue("mediaFiles", [...files]);
                                  if (currentSlide > 0)
                                    setCurrentSlide(currentSlide - 1);
                                  }
                                }}
                              >
                                ×
                              </button>
                            </div>
                            <div className="flex items-center justify-center gap-2 p-2">
                              {(mediaFiles || []).map((_, index) => (
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
                          {multipleMediaFiles && (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                                onClick={() => {
                                  const files = mediaFiles || [];
                                  const length = files.length || 1;
                                  setCurrentSlide(
                                    (prev) => (prev - 1 + length) % length
                                  );
                                }}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                                onClick={() => {
                                  const files = mediaFiles || [];
                                  const length = files.length || 1;
                                  setCurrentSlide(
                                    (prev) => (prev + 1) % length
                                  );
                                }}
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
                        value={form.watch("postingSchedule.startTime") || ""}
                        onChange={(e) =>
                          form.setValue(
                            "postingSchedule",
                            {
                              ...form.getValues("postingSchedule"),
                              startTime: e.target.value,
                            },
                            { shouldValidate: true }
                          )
                        }
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
                        value={form.watch("postingSchedule.endTime") || ""}
                        onChange={(e) =>
                          form.setValue(
                            "postingSchedule",
                            {
                              ...form.getValues("postingSchedule"),
                              endTime: e.target.value,
                            },
                            { shouldValidate: true }
                          )
                        }
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
                            form.watch("postingSchedule")?.days?.includes(day)
                              ? "default"
                              : "outline"
                          }
                          className="text-sm"
                          onClick={() => {
                            const schedule = form.getValues(
                              "postingSchedule"
                            ) || { days: [], startTime: "", endTime: "" };
                            const currentDays = schedule.days || [];
                            const updatedDays = currentDays.includes(day)
                              ? currentDays.filter((d) => d !== day)
                              : [...currentDays, day];

                            form.setValue(
                              "postingSchedule",
                              { ...schedule, days: updatedDays },
                              { shouldValidate: true }
                            );
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
                {form.watch("goal") !== "awareness" && (
                <div className="space-y-2">
                  <Label>CTA Label (optional)</Label>
                  <Input
                    {...form.register("ctaLabel")}
                    type="text"
                    placeholder="e.g., Learn More, Shop Now, Sign Up"
                  />
                  {errors.ctaLabel && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.ctaLabel.message}
                    </p>
                  )}
                </div>
                )}
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
                <PaystackButton {...componentProps} />
              )}
            </div>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
