'use client';

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/ui/MetricCard';
import { Shield, TrendingUp, Target, PieChart, Calendar, DollarSign, BarChart3, Users, Clock } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const poolCategories = [
    {
      title: "Low Risk Portfolio",
      risk: "Conservative",
      minInvestment: "$250,000",
      expectedReturn: "8-12%",
      description: "Fixed income securities, government bonds, and stable dividend-paying equities.",
      features: ["Capital preservation focused", "Quarterly distributions", "Low volatility"],
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Balanced Growth Pool",
      risk: "Moderate",
      minInvestment: "$500,000",
      expectedReturn: "15-22%",
      description: "Diversified portfolio combining growth equities, REITs, and alternative investments.",
      features: ["Balanced risk-return profile", "Semi-annual reporting", "Professional management"],
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "High Alpha Strategy",
      risk: "Aggressive",
      minInvestment: "$1,000,000",
      expectedReturn: "25-40%",
      description: "Alternative investments, private equity, hedge strategies, and emerging markets.",
      features: ["Maximum growth potential", "Monthly performance updates", "Institutional-grade strategies"],
      color: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="public" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-dark to-navy-medium text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-montserrat font-bold text-5xl mb-6">
              Investment <span className="text-gold">Solutions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sophisticated investment pools designed for institutional and qualified investors seeking superior risk-adjusted returns.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Pools Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-4xl text-navy-dark mb-4">
              Investment Pool Categories
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Choose from our carefully structured investment pools, each designed to meet specific risk profiles and return objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {poolCategories.map((pool, index) => (
              <div key={index} className={`rounded-2xl border-2 p-8 hover:shadow-xl transition-all duration-200 ${pool.color}`}>
                <div className="text-center mb-6">
                  <h3 className="font-montserrat font-bold text-2xl text-navy-dark mb-2">{pool.title}</h3>
                  <span className="inline-block bg-navy-dark text-white px-4 py-1 rounded-full text-sm font-medium">
                    {pool.risk}
                  </span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Minimum Investment:</span>
                    <span className="font-bold text-navy-dark">{pool.minInvestment}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Target Return:</span>
                    <span className="font-bold text-gold">{pool.expectedReturn}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{pool.description}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-navy-dark">Key Features:</h4>
                  <ul className="space-y-1">
                    {pool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <TrendingUp className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pool Launch Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-4xl text-navy-dark mb-6">
                New Pool Launch Details
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our next investment pool launches Q2 2025, offering institutional investors access to our flagship multi-strategy approach.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-gold mt-1" />
                  <div>
                    <h4 className="font-semibold text-navy-dark">Launch Date</h4>
                    <p className="text-gray-600">April 15, 2025 - Subscription period opens March 1st</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <DollarSign className="w-6 h-6 text-gold mt-1" />
                  <div>
                    <h4 className="font-semibold text-navy-dark">Minimum Investment</h4>
                    <p className="text-gray-600">$1M initial, $100K subsequent investments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-gold mt-1" />
                  <div>
                    <h4 className="font-semibold text-navy-dark">Lock-up Period</h4>
                    <p className="text-gray-600">24 months with quarterly redemption thereafter</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="font-montserrat font-bold text-2xl text-navy-dark mb-6">Upcoming Pool Performance Targets</h3>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  title="Target CAGR"
                  value="28%"
                  subtitle="5-year projection"
                />
                <MetricCard
                  title="Max Drawdown"
                  value="<12%"
                  subtitle="Risk management"
                />
                <MetricCard
                  title="Sharpe Ratio"
                  value="1.85"
                  subtitle="Risk-adjusted returns"
                />
                <MetricCard
                  title="Beta vs S&P"
                  value="0.72"
                  subtitle="Market correlation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Analytics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-4xl text-navy-dark mb-4">
              Portfolio Performance Analytics
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Comprehensive performance metrics demonstrating our commitment to delivering superior risk-adjusted returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MetricCard
              title="Overall Fund Returns"
              value="34.2%"
              change={12.8}
              changeType="positive"
              icon={TrendingUp}
              subtitle="Trailing 12 months"
            />
            <MetricCard
              title="Sharpe Ratio"
              value="2.14"
              change={8.5}
              changeType="positive"
              icon={Target}
              subtitle="Risk-adjusted performance"
            />
            <MetricCard
              title="5-Year CAGR"
              value="24.7%"
              change={5.3}
              changeType="positive"
              icon={BarChart3}
              subtitle="Compound annual growth"
            />
            <MetricCard
              title="Alpha Generation"
              value="11.8%"
              change={15.2}
              changeType="positive"
              icon={PieChart}
              subtitle="Excess return vs benchmark"
            />
          </div>

          <div className="mt-12 bg-navy-dark text-white rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-montserrat font-semibold text-xl mb-2">Risk Management</h3>
                <p className="text-gray-300">Advanced ICT And Liquidity Based strategies To protect And Grow capital</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-montserrat font-semibold text-xl mb-2">Expert Team</h3>
                <p className="text-gray-300">Seasoned professionals with Years of institutional investment experience</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-montserrat font-semibold text-xl mb-2">Transparent Reporting</h3>
                <p className="text-gray-300">Comprehensive monthly reports with detailed performance attribution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;