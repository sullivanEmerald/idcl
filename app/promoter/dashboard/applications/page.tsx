/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import promoterService from "@/services/promoter";
import { useToast } from "@/hooks/use-toast";
import { Clock, Calendar, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Application {
  id: string;
  campaign: {
    id: string;
    title: string;
    advertiser: {
      companyName: string;
      logo: string;
    };
    pricePerPost: number;
  };
  status: "pending" | "approved" | "rejected";
  applicationDate: string;
  approvalDate?: string;
  applicationNote?: string;
  rejectionReason?: string;
  proposedPlatforms: string[];
  promotionalLink?: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [sortBy, setSortBy] = useState('applicationDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  const statusOptions = [
    { label: 'All', value: undefined },
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
    { label: 'Rejected', value: 'rejected' },
  ];

  const sortOptions = [
    { label: 'Application Date', value: 'applicationDate' },
    { label: 'Status', value: 'status' },
    { label: 'Campaign', value: 'campaign.title' },
  ];

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const { applications: appData, pagination } = await promoterService.getApplications({
        page: currentPage,
        limit: 9,
        status: selectedStatus,
        sortBy,
        sortOrder,
      });
      console.log({ appData, pagination });
      setApplications(appData);
      setTotalPages(pagination.totalPages);
    } catch (error: any) {
      console.error("Error fetching applications:", error?.response?.data);
      toast({
        title: error?.response?.data?.message || "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [currentPage, selectedStatus, sortBy, sortOrder]);

  const handleWithdraw = async (applicationId: string) => {
    try {
      await promoterService.withdrawApplication(applicationId);
      toast({
        title: "Application withdrawn successfully",
      });
      fetchApplications();
    } catch (error: any) {
      console.error("Error withdrawing application:", error?.response?.data);
      toast({
        title: error?.response?.data?.message || "Failed to withdraw application",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-8">
        <Skeleton className="h-12 w-[200px]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[200px]" />
          ))}
        </div>
      </div>
    );
  }

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">My Applications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your campaign applications
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value || undefined);
              setCurrentPage(1);
            }}
          >
            {statusOptions?.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <select
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              {sortOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSortOrder(current => current === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>
      </div>

      {applications?.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-lg font-medium">No applications yet</h3>
          <p className="text-sm text-gray-500 mt-2">
            Start applying to campaigns in the marketplace to see them here.
          </p>
        </Card>
      ) : (
        <>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications?.map((application) => (
            <Card key={application.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium line-clamp-1">
                    {application.campaign.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {application.campaign.advertiser.companyName}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1.5",
                    getStatusColor(application.status)
                  )}
                >
                  {getStatusIcon(application.status)}
                  <span className="capitalize">{application.status}</span>
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Applied on{" "}
                    {new Date(application.applicationDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>

                {application.proposedPlatforms.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {application?.proposedPlatforms?.map((platform) => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                )}

                {application.status === "approved" && application.promotionalLink && (
                  <div className="pt-2">
                    <a
                      href={application.promotionalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      View Promotional Link →
                    </a>
                  </div>
                )}

                {application.status === "rejected" && application.rejectionReason && (
                  <div className="pt-2">
                    <p className="text-sm text-red-500">
                      Reason: {application.rejectionReason}
                    </p>
                  </div>
                )}

                {application.status === "pending" && (
                  <div className="pt-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleWithdraw(application.id)}
                    >
                      Withdraw Application
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </div>
        )}
        </>
      )}
    </div>
  );
}
