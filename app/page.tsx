'use client';

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PerformanceChart from '@/components/ui/PerformanceChart';
import MetricCard from '@/components/ui/MetricCard';
import SEOFAQSection from '@/components/SEOFAQSection';
import { TrendingUp, DollarSign, Users, Target, ArrowRight, AlertCircle, Shield, BarChart3 } from 'lucide-react';
import Link from 'next/link';

// Sample performance data
const performanceData = [
  { date: 'Jan', fund: 0.0, benchmark: 0.0 },
  { date: 'Feb', fund: 0.0, benchmark: 0.0 },
  { date: 'Mar', fund: 0.0, benchmark: 0.0 },
  { date: 'Apr', fund: 0.0, benchmark: 0.0 },
  { date: 'May', fund: 0.0, benchmark: 0.0 },
  { date: 'Jun', fund: 0.0, benchmark: 0.0 },
  { date: 'Jul', fund: 0.0, benchmark: 0.0 },
  { date: 'Aug', fund: 0.0, benchmark: 0.0 },
  { date: 'Sep', fund: 0.0, benchmark: 0.0 },
  { date: 'Oct', fund: 0.0, benchmark: 0.0 },
  { date: 'Nov', fund: 0.0, benchmark: 0.0 },
  { date: 'Dec', fund: 0.0, benchmark: 0.0 },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="public" />

      {/* Hidden SEO Content for Search Engines */}
      <div className="sr-only">
        <h1>Elite Alternative Investment Management</h1>
        <p>Welford Lane Capitals is a premier private investment firm delivering institutional-grade performance through diversified investment pools. Our top-performing assets include Technology Growth (+42.8% YTD), Alternative Credit (+18.5% YTD), and Real Estate Alpha (+26.3% YTD). Starting at just a $50 minimum investment, sophisticated investors can join our trusted community and benefit from consistent alpha generation.</p>
        <p>Keywords: elite investment performance, alternative investment strategies, institutional portfolio management, top performing assets, fund performance vs S&P 500, technology growth pool, alternative credit, real estate alpha, minimum investment $50, institutional investor hedge fund, alpha generator, high growth tech equities, private credit strategies, commercial real estate investments, performance reports, investor portal, investment pools, compliance risk disclosure, premier hedge fund</p>
      </div>

      {/* Maintenance Banner - Hidden by default */}
      <div className="bg-orange-50 border-b border-orange-200 px-4 py-3 hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <p className="text-orange-800 font-medium text-sm">
            Scheduled maintenance from 2:00 AM to 4:00 AM EST. Trading services may be temporarily unavailable.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-dark via-navy-medium to-navy-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="font-montserrat font-bold text-5xl lg:text-6xl mb-6 leading-tight">
                Elite Investment 
                <span className="text-gold"> Performance</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Delivering exceptional returns through sophisticated alternative investment strategies. 
                Join institutional investors who trust Welford Lane Capitals with their wealth.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  href="/auth/register"
                  className="bg-gold hover:bg-gold/90 text-navy-dark px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center"
                >
                  Start Investing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="border-2 border-gold text-gold hover:bg-gold hover:text-navy-dark px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  View Strategies
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-montserrat font-semibold text-xl mb-4">Fund Performance vs S&P 500</h3>
                <PerformanceChart 
                  data={performanceData} 
                  height={300}
                  showArea={true}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 blur-sm bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MetricCard
              title="Assets Under Management"
              value="$2.8B"
              change={12.5}
              changeType="positive"
              icon={DollarSign}
              subtitle="Year over year growth"
            />
            <MetricCard
              title="5-Year CAGR"
              value="24.7%"
              change={8.3}
              changeType="positive"
              icon={TrendingUp}
              subtitle="Compound Annual Growth Rate"
            />
            <MetricCard
              title="Active Investors"
              value="1,247"
              change={15.2}
              changeType="positive"
              icon={Users}
              subtitle="Institutional and qualified investors"
            />
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-4xl text-navy-dark mb-6">
                Institutional Excellence Since 2010
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Welford Lane Capital has established itself as a premier alternative investment manager, 
                delivering consistent alpha through rigorous research, risk management, and strategic execution.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                </div>
                <div className="flex items-start space-x-4">
                  <BarChart3 className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy-dark">Proven Track Record</h4>
                    <p className="text-gray-600">Consistent outperformance across market cycles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Target className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy-dark">Risk-Adjusted Returns</h4>
                    <p className="text-gray-600">Superior Sharpe ratios and downside protection</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white blur-sm rounded-2xl shadow-xl p-8">
              <h3 className="font-montserrat font-bold text-2xl text-navy-dark mb-6">Top Performing Assets</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-navy-dark">Technology Growth Pool</p>
                    <p className="text-sm text-gray-600">High growth tech equities</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+42.8%</p>
                    <p className="text-xs text-gray-500">YTD</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-navy-dark">Alternative Credit</p>
                    <p className="text-sm text-gray-600">Private credit strategies</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+18.5%</p>
                    <p className="text-xs text-gray-500">YTD</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-navy-dark">Real Estate Alpha</p>
                    <p className="text-sm text-gray-600">Commercial real estate</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">+26.3%</p>
                    <p className="text-xs text-gray-500">YTD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-navy-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-4xl mb-6">
            Ready to Elevate Your Investment Portfolio?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join sophisticated investors who demand excellence. Our minimum investment starts at $50.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/auth/register"
              className="bg-gold hover:bg-gold/90 text-navy-dark px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center"
            >
              Start Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-gray-300 text-white hover:bg-white hover:text-navy-dark px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-flex items-center justify-center"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Hidden SEO FAQ Section */}
      <SEOFAQSection />

      <Footer />
    </div>
  );
};

export default HomePage;