import { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import { RoleGuard } from "@/components/guards/role-guard";

export const metadata: Metadata = {
  title: "Promoter Dashboard | Adminting",
  description: "Browse campaigns and track your earnings",
};

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/promoter/dashboard",
    icon: "dashboard",
  },
  {
    title: "Marketplace",
    href: "/promoter/dashboard/marketplace/browse",
    icon: "store",
    // items: [
    //   {
    //     title: "Browse Campaigns",
    //     href: "/promoter/dashboard/marketplace/browse",
    //   },
    // ],
  },
  {
    title: 'Brands',
    href: '/promoter/dashboard/brands',
    icon: 'star',
  },
  {
    title: "Wallet",
    href: "/promoter/dashboard/wallet/overview",
    icon: "wallet",
    items: [
      {
        title: "Overview",
        href: "/promoter/dashboard/wallet/overview",
      },
      {
        title: "Withdraw",
        href: "/promoter/dashboard/wallet/withdraw",
      },
    ],
  },
  {
    title: "Analytics",
    href: "/promoter/dashboard/analytics",
    icon: "analytics",
    // items: [
    //   {
    //     title: "Performance",
    //     href: "/promoter/dashboard/analytics/performance",
    //   }
    // ],
  },
  // {
  //   title: "Leaderboard",
  //   href: "/promoter/dashboard/leaderboard",
  //   icon: "trophy"
  // },
  {
    title: "Settings",
    href: "/promoter/dashboard/settings",
    icon: "settings",
    items: [
      {
        title: "Profile",
        href: "/promoter/dashboard/settings/profile",
      },
      {
        title: "Preferences",
        href: "/promoter/dashboard/settings/preferences",
      },
    ],
  },
];

export default function PromoterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard role="promoter">
      <div className="flex flex-col sm:flex-row min-h-screen">
        <Sidebar items={sidebarItems} role='promoter' />
        <main className="flex-1 overflow-y-auto bg-[#F8FBFC] px-2 py-20 sm:p-6 md:p-8">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}
