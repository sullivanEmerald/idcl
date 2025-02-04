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
    href: '/advertiser/campaigns',
    icon: 'campaign',
    items: [
      {
        title: 'All Campaigns',
        href: '/advertiser/campaigns'
      },
      {
        title: 'Create Campaign',
        href: '/advertiser/campaigns/create'
      }
    ]
  },
  {
    title: 'Wallet',
    href: '/advertiser/wallet',
    icon: 'wallet',
    items: [
      {
        title: 'Overview',
        href: '/advertiser/wallet/overview'
      },
      {
        title: 'Deposit',
        href: '/advertiser/wallet/deposit'
      },
      {
        title: 'Withdraw',
        href: '/advertiser/wallet/withdraw'
      }
    ]
  },
  {
    title: 'Analytics',
    href: '/advertiser/analytics',
    icon: 'analytics',
    items: [
      {
        title: 'Overview',
        href: '/advertiser/analytics/overview'
      },
      {
        title: 'Campaigns',
        href: '/advertiser/analytics/campaigns'
      },
      {
        title: 'Reports',
        href: '/advertiser/analytics/reports'
      }
    ]
  },
  {
    title: 'Settings',
    href: '/advertiser/settings',
    icon: 'settings',
    items: [
      {
        title: 'Profile',
        href: '/advertiser/settings/profile'
      },
      {
        title: 'Team',
        href: '/advertiser/settings/team'
      },
      {
        title: 'Billing',
        href: '/advertiser/settings/billing'
      }
    ]
  }
]

export default function AdvertiserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard role="advertiser">
      <div className="flex h-screen">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </RoleGuard>
  )
}
