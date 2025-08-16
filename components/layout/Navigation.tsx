'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, TrendingUp, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  userType?: 'public' | 'investor' | 'admin';
}

const Navigation: React.FC<NavigationProps> = ({ userType = 'public' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const publicNavItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const investorNavItems = [
    { href: '/investor/dashboard', label: 'Dashboard', icon: TrendingUp },
    { href: '/investor/portfolio', label: 'Portfolio', icon: User },
    { href: '/investor/analytics', label: 'Analytics', icon: Settings },
  ];

  const adminNavItems = [
    { href: '/admin/dashboard', label: 'Overview', icon: TrendingUp },
    { href: '/admin/pools', label: 'Pool Management', icon: User },
    { href: '/admin/investors', label: 'Investors', icon: Settings },
    { href: '/admin/content', label: 'Content', icon: Settings },
  ];

  const getNavItems = () => {
    switch (userType) {
      case 'investor':
        return investorNavItems;
      case 'admin':
        return adminNavItems;
      default:
        return publicNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-11 h-11" />
            </div>
            <span className="font-montserrat font-bold text-xl text-navy-dark">
              Welford Lane Capitals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  pathname === item.href
                    ? "text-gold bg-gold/10"
                    : "text-navy-medium hover:text-gold hover:bg-gold/5"
                )}
              >
                {'icon' in item && (
                  <item.icon className="inline-block w-4 h-4 mr-1" />
                )}
                {item.label}
              </Link>
            ))}
            
            {userType === 'public' && (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  href="/auth/login"
                  className="text-navy-medium hover:text-gold transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gold hover:bg-gold/90 text-navy-dark px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
            
            {userType !== 'public' && (
              <div className="flex items-center space-x-4 ml-4">
                <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-navy-dark" />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-navy-medium hover:text-gold transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                  pathname === item.href
                    ? "text-gold bg-gold/10"
                    : "text-navy-medium hover:text-gold hover:bg-gold/5"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {'icon' in item && (
                  <item.icon className="inline-block w-4 h-4 mr-2" />
                )}
                {item.label}
              </Link>
            ))}
            
            {userType === 'public' && (
              <div className="pt-4 border-t border-gray-200 space-y-1">
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-navy-medium hover:text-gold hover:bg-gold/5 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-gold text-navy-dark hover:bg-gold/90 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;