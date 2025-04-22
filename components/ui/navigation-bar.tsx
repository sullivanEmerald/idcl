"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export function NavigationBar() {
  const router = useRouter();
  const { isAuthenticated, userRole } = useAuth();

  return (
    <nav className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
      <div className="container flex h-16 items-center px-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Adminting Logo"
              width={32}
              height={32}
              className="w-auto h-8"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Adminting
            </span>
          </Link>

          {/* Main Navigation */}
          {/* <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/home"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/giveaways"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Giveaways
            </Link>
            <Link
              href="/faqs"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              FAQs
            </Link>
            <Link
              href="/knowledge-base"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Knowledge base
            </Link>
            <Link
              href="/calculator"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Calculator
            </Link>
          </div> */}
        </div>

        {/* Right side - CTA */}
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={() => {
              if (isAuthenticated && userRole) {
                const dashboardPath = userRole === 'advertiser'
                  ? '/advertiser/dashboard'
                  : '/promoter/dashboard';
                router.push(dashboardPath);
              } else {
                router.push('/auth/login');
              }
            }}
          >
            {isAuthenticated ? 'Dashboard' : 'Sign In'}
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90"
          >
            Download App
          </Button>
        </div>
      </div>
    </nav>
  );
}
