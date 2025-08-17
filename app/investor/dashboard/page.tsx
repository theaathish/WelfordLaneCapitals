'use client';

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/ui/MetricCard';
import PerformanceChart from '@/components/ui/PerformanceChart';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Bell
} from 'lucide-react';

const InvestorDashboard: React.FC = () => {
  const { user, userData, loading } = useAuth();

  // Show loading state while user data is being fetched
  if (loading || !userData) {
    return (
      <ProtectedRoute requiredUserType="investor">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Sample portfolio data
  const portfolioData = [
    { date: 'Jan', value: 250000 },
    { date: 'Feb', value: 268000 },
    { date: 'Mar', value: 285000 },
    { date: 'Apr', value: 301000 },
    { date: 'May', value: 295000 },
    { date: 'Jun', value: 318000 },
    { date: 'Jul', value: 335000 },
    { date: 'Aug', value: 352000 },
    { date: 'Sep', value: 348000 },
    { date: 'Oct', value: 371000 },
    { date: 'Nov', value: 389000 },
    { date: 'Dec', value: 412000 },
  ];

  const recentTransactions = [
    { date: '2024-01-15', type: 'Investment', amount: 50000, pool: 'Technology Growth Pool' },
    { date: '2024-01-10', type: 'Distribution', amount: -12500, pool: 'Balanced Growth Pool' },
    { date: '2024-01-05', type: 'Investment', amount: 25000, pool: 'Alternative Credit' },
  ];

  const holdings = [
    { pool: 'Technology Growth Pool', allocation: 45, value: 185400, return: 28.5 },
    { pool: 'Balanced Growth Pool', allocation: 35, value: 144200, return: 18.2 },
    { pool: 'Alternative Credit', allocation: 20, value: 82400, return: 12.8 },
  ];

  return (
    <ProtectedRoute requiredUserType="investor">
      <div className="min-h-screen bg-gray-50">
        <Navigation userType="investor" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-montserrat font-bold text-3xl text-navy-dark">
                Welcome back, {userData.firstName}
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your portfolio overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Calendar className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Portfolio Value"
            value="$412,000"
            change={18.5}
            changeType="positive"
            icon={DollarSign}
            subtitle="vs last month"
          />
          <MetricCard
            title="YTD Return"
            value="24.8%"
            change={3.2}
            changeType="positive"
            icon={TrendingUp}
            subtitle="Year to date performance"
          />
          <MetricCard
            title="Monthly Gain"
            value="$23,000"
            change={6.3}
            changeType="positive"
            icon={ArrowUpRight}
            subtitle="This month's growth"
          />
          <MetricCard
            title="Risk Score"
            value="7.2/10"
            change={-0.5}
            changeType="negative"
            icon={Target}
            subtitle="Portfolio risk level"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Performance Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-montserrat font-bold text-xl text-navy-dark">
                  Portfolio Performance
                </h2>
                <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                  <option>Last 12 months</option>
                  <option>Last 6 months</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              <PerformanceChart 
                data={portfolioData.map(item => ({ date: item.date, fund: item.value / 1000, benchmark: 0 }))} 
                height={300}
                showArea={true}
              />
            </div>
          </div>

          {/* Portfolio Allocation */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-montserrat font-bold text-lg text-navy-dark mb-4">
                Portfolio Allocation
              </h3>
              <div className="space-y-4">
                {holdings.map((holding, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-navy-dark text-sm">{holding.pool}</p>
                        <p className="text-gray-600 text-xs">{holding.allocation}% allocation</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-navy-dark text-sm">
                          ${holding.value.toLocaleString()}
                        </p>
                        <p className={`text-xs ${holding.return > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          +{holding.return}%
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gold h-2 rounded-full" 
                        style={{ width: `${holding.allocation}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-montserrat font-bold text-lg text-navy-dark mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-semibold py-3 px-4 rounded-lg transition-colors">
                  Make Investment
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-navy-dark font-semibold py-3 px-4 rounded-lg transition-colors">
                  Request Distribution
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-navy-dark font-semibold py-3 px-4 rounded-lg transition-colors">
                  Download Reports
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-montserrat font-bold text-xl text-navy-dark mb-6">
              Recent Activity
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Pool</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'Investment' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.type === 'Investment' ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                          )}
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{transaction.pool}</td>
                      <td className={`py-3 px-4 text-right font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default InvestorDashboard;