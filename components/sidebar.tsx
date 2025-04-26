"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Store,
  BarChart3,
  Wallet,
  Settings,
  UserCircle2,
  LogOut,
  ClipboardList,
  Menu,
  X,
  Star,
  Trophy
} from 'lucide-react'

interface SidebarItem {
  title: string
  href: string
  icon: string
  items?: {
    title: string
    href: string
  }[]
}

interface SidebarProps {
  items: SidebarItem[],
  role: 'advertiser' | 'promoter'
}

function getIcon(iconName: string) {
  const iconProps = { className: 'h-5 w-5' }
  switch (iconName) {
    case 'dashboard':
      return <LayoutDashboard {...iconProps} />
    case 'store':
      return <Store {...iconProps} />
    case 'analytics':
      return <BarChart3 {...iconProps} />
    case 'wallet':
      return <Wallet {...iconProps} />
    case 'settings':
      return <Settings {...iconProps} />
    case 'clipboard':
      return <ClipboardList {...iconProps} />
    case 'star':
      return <Star {...iconProps} />
    case 'trophy':
      return <Trophy {...iconProps} />
    default:
      return <LayoutDashboard {...iconProps} />
  }
}

export function Sidebar({ items, role }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="sm:hidden fixed top-0 left-0 z-40 w-full bg-white border-b p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Adminting Logo" width={24} height={24} />
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Adminting
          </span>
        </Link>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed sm:sticky top-0 left-0 z-30 h-screen flex-shrink-0 w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out",
        "sm:translate-x-0 sm:flex",
        isOpen ? "translate-x-0 flex" : "-translate-x-full hidden"
      )}>
        <div className="hidden sm:flex h-20 items-center justify-center border-b">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Adminting Logo" width={32} height={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Adminting
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto pt-20 sm:pt-4">
          {items.map((item) => (
            <div key={item.href} className="space-y-1">
              <Link
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-150',
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
                onClick={() => setIsOpen(false)}
              >
                {getIcon(item.icon)}
                <span className="ml-3">{item.title}</span>
              </Link>
              {item.items?.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={cn(
                    'ml-8 flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150',
                    pathname === subItem.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        
        <div className="border-t p-4 space-y-2">
          <Link
            href={role === 'advertiser' ? '/advertiser/dashboard/profile' : '/promoter/dashboard/profile'}
            className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
            onClick={() => setIsOpen(false)}
          >
            <UserCircle2 className="h-5 w-5" />
            <span className="ml-3">Profile</span>
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/auth/login';
            }}
            className="w-full flex items-center rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}
