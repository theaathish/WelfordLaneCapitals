import React from 'react';
import Link from 'next/link';
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
             <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-11 h-11" />
              </div>
              <span className="font-montserrat font-bold text-xl">
                Welford LC.
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Premier hedge fund delivering exceptional returns through strategic alternative investments and institutional portfolio management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-gold transition-colors duration-200">
                Home
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-gold transition-colors duration-200">
                Services
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-gold transition-colors duration-200">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-gold transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Investor Resources */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Investor Resources</h3>
            <div className="space-y-2">
              <Link href="/auth/login" className="block text-gray-300 hover:text-gold transition-colors duration-200">
                Investor Login
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-gold transition-colors duration-200">
                Investment Pools
              </Link>
              <Link href="/performance" className="block text-gray-300 hover:text-gold transition-colors duration-200">
                Performance Reports
              </Link>
              <Link href="/compliance" className="block text-gray-300 hover:text-gold transition-colors duration-200">
                Compliance
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gold" />
                <span className="text-gray-300 text-sm">
                  +91 6385362719
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-gray-300 text-sm">
                  welfordlc@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-medium flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Welfordlc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-gold text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gold text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="text-gray-400 hover:text-gold text-sm transition-colors duration-200">
              Risk Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;