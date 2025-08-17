'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, TrendingUp, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationProps {
  userType?: 'public' | 'investor' | 'admin';
}

interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const Navigation: React.FC<NavigationProps> = ({ userType = 'public' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const publicNavItems: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const investorNavItems: NavItem[] = [
    { href: '/investor/dashboard', label: 'Dashboard', icon: TrendingUp },
    { href: '/investor/portfolio', label: 'Portfolio', icon: User },
    { href: '/investor/analytics', label: 'Analytics', icon: Settings },
  ];

  const adminNavItems: NavItem[] = [
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

  const UserMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { userData, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await logout();
        router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-navy-dark" />
          </div>
          <span className="text-navy-dark font-medium">{userData?.firstName || 'User'}</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-semibold text-navy-dark">{userData?.firstName} {userData?.lastName}</p>
              <p className="text-sm text-gray-600">{userData?.email}</p>
            </div>
            <Link
              href="/investor/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/investor/portfolio"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-11 h-11" />
            </div>
            <span className="font-montserrat font-bold text-xl text-navy-dark">WelfordLane</span>
          </Link>
          <div className="hidden md:flex space-x-4">
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
                {item.icon && React.createElement(item.icon, { className: "inline-block w-4 h-4 mr-1" })}
                {item.label}
              </Link>
            ))}
          </div>
          {userType === 'public' ? (
            <div className="hidden md:flex items-center space-x-4">
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
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <UserMenu />
            </div>
          )}
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
      {isMobileMenuOpen && (
        <div className="md:hidden">
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
              {item.icon && React.createElement(item.icon, { className: "inline-block w-4 h-4 mr-2" })}
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
      )}
    </nav>
  );
};

export default Navigation;