"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { talentService } from "@/services/talent";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export interface TalentInterface {
    id: string;
    image: string;
    track: string;
    name: string;
    email: string;
    date: string;
    isApproved: boolean;
    fullYear: number;
}

export default function TalentPool() {
    const router = useRouter();
    const [talents, setTalents] = useState<TalentInterface[]>([]);
    const [filteredTalents, setFilteredTalents] = useState<TalentInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        batch: 'all',
        isApproved: 'all'
    });

    useEffect(() => {
        const getAllTalents = async () => {
            try {
                setLoading(true);
                const data = await talentService.getAllTalents(currentPage);
                if (!data) {
                    toast.error('Check your network connection');
                    return;
                }
                setTalents(data.talents);
                setFilteredTalents(data.talents);
                setTotalPages(data.pagination.totalPages);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch talents');
            } finally {
                setLoading(false);
            }
        };

        getAllTalents();
    }, [currentPage]);

    useEffect(() => {
        let results = [...talents];

        if (filters.search) {
            results = results.filter((talent) =>
                talent.email.toLowerCase().includes(filters.search.toLowerCase()) ||
                talent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                talent.track.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        if (filters.isApproved !== 'all') {
            results = results.filter((talent) => {
                if (filters.isApproved === 'Approved') return talent.isApproved;
                if (filters.isApproved === 'Pending') return !talent.isApproved;
                return true;
            });
        }

        if (filters.batch !== 'all') {
            results = results.filter((talent) =>
                talent.fullYear.toString() === filters.batch
            );
        }

        setFilteredTalents(results);
    }, [filters, talents]);

    return (
        <div className="w-full max-w-[1200px] px-4 sm:px-6 mx-auto py-4 sm:py-6 flex flex-col gap-4 sm:gap-6 md:gap-8">
            {/* Search and Filters Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-3 sm:p-4 border border-[#E4E4E4] rounded-xl sm:rounded-2xl">
                {/* Search */}
                <div className="relative w-full">
                    <Search className="absolute left-3 top-[20px] h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search"
                        className="pl-10 rounded-xl w-full"
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            search: e.target.value
                        }))}
                    />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {/* Approval Status Filter */}
                    <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-[#EFEFEF] w-full sm:w-auto">
                        <p className="font-bold text-sm sm:text-base text-[#344054]">Type</p>
                        <Select
                            value={filters.isApproved}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, isApproved: value }))}
                        >
                            <SelectTrigger className="rounded-xl border border-[#E1E5EB] bg-[#FDFDFD] shadow-sm w-full sm:w-[150px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Batch Filter */}
                    <div className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-[#EFEFEF] w-full sm:w-auto">
                        <p className="font-bold text-sm sm:text-base text-[#344054]">Batch</p>
                        <Select
                            value={filters.batch}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, batch: value }))}
                        >
                            <SelectTrigger className="rounded-xl border border-[#E1E5EB] bg-[#FDFDFD] shadow-sm w-full sm:w-[150px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Talent Pool Section */}
            <section className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm">
                {/* Header */}
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[#101828] text-base sm:text-lg font-medium">Talent Pool</span>
                            <span className="bg-[#F7FAFF] rounded-lg text-[#005DFF] text-xs font-medium py-1 px-2">
                                {filteredTalents.length}
                            </span>
                        </div>
                        <p className="text-[#667085] text-xs sm:text-sm">
                            Certified students from skill-up imo program
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader className="bg-[#FCFCFD]">
                            <TableRow className="text-[#667085]">
                                <TableHead className="w-[50px] sm:w-[80px]">#</TableHead>
                                <TableHead className="px-2 sm:px-4">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden xs:table-cell">Email</TableHead>
                                <TableHead>Skill</TableHead>
                                <TableHead className="hidden sm:table-cell">Date</TableHead>
                                <TableHead className="text-right px-2 sm:px-4">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">
                                        Loading talents...
                                    </TableCell>
                                </TableRow>
                            ) : filteredTalents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">
                                        No talents found matching your criteria
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredTalents.map((talent, index) => (
                                    <TableRow key={talent.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium text-xs sm:text-sm">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-2 sm:px-4">
                                            <div className="w-7 h-7 sm:w-8 sm:h-8 relative">
                                                <Image
                                                    src={talent.image || '/default-avatar.png'}
                                                    fill
                                                    alt={talent.name}
                                                    className="object-cover rounded-full"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-[#101828] font-medium text-sm sm:text-base">
                                            {talent.name}
                                        </TableCell>
                                        <TableCell className="text-[#667085] hidden xs:table-cell truncate max-w-[120px] sm:max-w-[180px]">
                                            {talent.email}
                                        </TableCell>
                                        <TableCell className="text-[#667085] text-sm sm:text-base">
                                            {talent.track}
                                        </TableCell>
                                        <TableCell className="text-[#667085] hidden sm:table-cell">
                                            {talent.date}
                                        </TableCell>
                                        <TableCell className="text-right px-2 sm:px-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="focus:outline-none">
                                                    <div className="w-6 h-6 flex items-center justify-center">
                                                        <Image
                                                            src='/icons/more.svg'
                                                            width={10}
                                                            height={10}
                                                            alt="Actions"
                                                        />
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="min-w-[120px]">
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => router.push(`/admin/dashboard/talent/${talent.id}`)}
                                                    >
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {!loading && filteredTalents.length > 0 && (
                    <div className="p-4 sm:p-6 border-t">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(prev => Math.max(prev - 1, 1));
                                        }}
                                        aria-disabled={currentPage === 1}
                                        className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                                    />
                                </PaginationItem>

                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    const page = i + 1;
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                href="#"
                                                isActive={page === currentPage}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage(page);
                                                }}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                {totalPages > 5 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                        }}
                                        aria-disabled={currentPage === totalPages}
                                        className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </section>
        </div>
    );
}