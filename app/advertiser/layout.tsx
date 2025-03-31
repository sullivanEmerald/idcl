import { Metadata } from 'next'
import { Sidebar } from '@/components/sidebar'
import { RoleGuard } from '@/components/guards/role-guard'

export const metadata: Metadata = {
  title: 'Advertiser Dashboard | Adminting',
  description: 'Manage your advertising campaigns and track performance',
}

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/advertiser/dashboard',
    icon: 'dashboard'
  },
  {
    title: 'Campaigns',
    href: '/advertiser/dashboard/campaigns',
    icon: 'store',
    items: [
      {
        title: 'Overview',
        href: '/advertiser/dashboard/campaigns/overview'
      },
      {
        title: 'Create Campaign',
        href: '/advertiser/dashboard/campaigns/create'
      }
    ]
  },
  {
    title: 'Analytics',
    href: '/advertiser/dashboard/analytics',
    icon: 'analytics',
    items: [
      {
        title: 'Performance',
        href: '/advertiser/dashboard/analytics/performance'
      },
      {
        title: 'Insights',
        href: '/advertiser/dashboard/analytics/insights'
      }
    ]
  },
  {
    title: 'Wallet',
    href: '/advertiser/dashboard/wallet',
    icon: 'wallet',
    items: [
      {
        title: 'Overview',
        href: '/advertiser/dashboard/wallet/overview'
      },
      {
        title: 'Add Funds',
        href: '/advertiser/dashboard/wallet/add-funds'
      }
    ]
  },
  {
    title: 'Settings',
    href: '/advertiser/dashboard/settings',
    icon: 'settings',
    items: [
      {
        title: 'Profile',
        href: '/advertiser/dashboard/settings/profile'
      },
      {
        title: 'Preferences',
        href: '/advertiser/dashboard/settings/preferences'
      }
    ]
  },

]

export default function AdvertiserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard role="advertiser">
      <div className="flex h-screen">
        <Sidebar items={sidebarItems} role='advertiser' />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </RoleGuard>
  )
}
