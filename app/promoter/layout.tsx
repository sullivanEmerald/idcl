import { Metadata } from 'next'
import { Sidebar } from '@/components/sidebar'
import { RoleGuard } from '@/components/guards/role-guard'

export const metadata: Metadata = {
  title: 'Promoter Dashboard | Adminting',
  description: 'Browse campaigns and track your earnings',
}

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/promoter/dashboard',
    icon: 'dashboard'
  },
  {
    title: 'Marketplace',
    href: '/promoter/marketplace',
    icon: 'store',
    items: [
      {
        title: 'Browse Campaigns',
        href: '/promoter/marketplace/browse'
      }
    ]
  },
  {
    title: 'My Campaigns',
    href: '/promoter/my-campaigns',
    icon: 'campaign',
    items: [
      {
        title: 'Active',
        href: '/promoter/my-campaigns/active'
      },
      {
        title: 'Completed',
        href: '/promoter/my-campaigns/completed'
      }
    ]
  },
  {
    title: 'Wallet',
    href: '/promoter/wallet',
    icon: 'wallet',
    items: [
      {
        title: 'Overview',
        href: '/promoter/wallet/overview'
      },
      {
        title: 'Withdraw',
        href: '/promoter/wallet/withdraw'
      }
    ]
  },
  {
    title: 'Analytics',
    href: '/promoter/analytics',
    icon: 'analytics',
    items: [
      {
        title: 'Performance',
        href: '/promoter/analytics/performance'
      },
      {
        title: 'Insights',
        href: '/promoter/analytics/insights'
      }
    ]
  },
  {
    title: 'Settings',
    href: '/promoter/settings',
    icon: 'settings',
    items: [
      {
        title: 'Profile',
        href: '/promoter/settings/profile'
      },
      {
        title: 'Preferences',
        href: '/promoter/settings/preferences'
      }
    ]
  }
]

export default function PromoterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard role="promoter">
      <div className="flex h-screen">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </RoleGuard>
  )
}
