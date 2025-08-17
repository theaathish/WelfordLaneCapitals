'use client';

import React, { useState } from 'react';
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
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const InvestorPortfolio: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

  const portfolioData = [
    { date: 'Jan', value: 250000, benchmark: 245000 },
    { date: 'Feb', value: 268000, benchmark: 252000 },
    { date: 'Mar', value: 285000, benchmark: 258000 },
    { date: 'Apr', value: 301000, benchmark: 265000 },
    { date: 'May', value: 295000, benchmark: 270000 },
    { date: 'Jun', value: 318000, benchmark: 275000 },
    { date: 'Jul', value: 335000, benchmark: 282000 },
    { date: 'Aug', value: 352000, benchmark: 288000 },
    { date: 'Sep', value: 348000, benchmark: 295000 },
    { date: 'Oct', value: 371000, benchmark: 301000 },
    { date: 'Nov', value: 389000, benchmark: 308000 },
    { date: 'Dec', value: 412000, benchmark: 315000 },
  ];

  const holdings = [
    {
      pool: 'Technology Growth Pool',
      allocation: 45,
      value: 185400,
      invested: 150000,
      return: 28.5,
      returnValue: 35400,
      risk: 'High',
      inception: '2022-03-15'
    },
    {
      pool: 'Balanced Growth Pool',
      allocation: 35,
      value: 144200,
      invested: 125000,
      return: 18.2,
      returnValue: 19200,
      risk: 'Medium',
      inception: '2021-08-10'
    },
    {
      pool: 'Alternative Credit',
      allocation: 20,
      value: 82400,
      invested: 75000,
      return: 12.8,
      returnValue: 7400,
      risk: 'Low',
      inception: '2023-01-20'
    },
  ];

  const transactions = [
    { date: '2024-01-15', type: 'Investment', pool: 'Technology Growth Pool', amount: 50000, status: 'Completed' },
    { date: '2024-01-10', type: 'Distribution', pool: 'Balanced Growth Pool', amount: -12500, status: 'Completed' },
    { date: '2024-01-05', type: 'Investment', pool: 'Alternative Credit', amount: 25000, status: 'Completed' },
    { date: '2023-12-28', type: 'Distribution', pool: 'Technology Growth Pool', amount: -8750, status: 'Completed' },
    { date: '2023-12-20', type: 'Investment', pool: 'Balanced Growth Pool', amount: 30000, status: 'Completed' },
  ];

  return (
    <ProtectedRoute requiredUserType="investor">
      <div className="min-h-screen bg-gray-50">
        <Navigation userType="investor" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-montserrat font-bold text-3xl text-navy-dark">
              Portfolio Overview
            </h1>
            <p className="text-gray-600 mt-1">
              Detailed view of your investment holdings and performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Portfolio Value"
            value="$412,000"
            change={18.5}
            changeType="positive"
            icon={DollarSign}
            subtitle="Total market value"
          />
          <MetricCard
            title="Total Invested"
            value="$350,000"
            subtitle="Capital deployed"
            icon={Target}
          />
          <MetricCard
            title="Total Returns"
            value="$62,000"
            change={24.8}
            changeType="positive"
            icon={TrendingUp}
            subtitle="Absolute gains"
          />
          <MetricCard
            title="Overall Return"
            value="17.7%"
            change={2.3}
            changeType="positive"
            icon={PieChart}
            subtitle="Weighted average"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-montserrat font-bold text-xl text-navy-dark">
                  Portfolio vs Benchmark
                </h2>
                <div className="flex space-x-2">
                  {['3M', '6M', '1Y', '3Y', 'All'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedTimeframe(period)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedTimeframe === period
                          ? 'bg-gold text-navy-dark'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <PerformanceChart 
                data={portfolioData.map(item => ({ 
                  date: item.date, 
                  fund: item.value / 1000,
                  benchmark: item.benchmark / 1000
                }))} 
                height={350}
                showArea={false}
              />
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-montserrat font-bold text-lg text-navy-dark mb-6">
              Asset Allocation
            </h3>
            <div className="space-y-6">
              {holdings.map((holding, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-navy-dark text-sm">{holding.pool}</p>
                      <p className="text-gray-600 text-xs">Risk: {holding.risk}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-navy-dark text-sm">{holding.allocation}%</p>
                      <p className="text-gray-600 text-xs">${holding.value.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gold h-2 rounded-full" 
                      style={{ width: `${holding.allocation}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">
                      Invested: ${holding.invested.toLocaleString()}
                    </span>
                    <span className={`font-medium ${holding.return > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      +{holding.return}% (+${holding.returnValue.toLocaleString()})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings Detail */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="font-montserrat font-bold text-xl text-navy-dark mb-6">
            Holdings Detail
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pool Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Market Value</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Cost Basis</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Unrealized P&L</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Return %</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Risk Level</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Inception</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-navy-dark">{holding.pool}</p>
                        <p className="text-sm text-gray-600">{holding.allocation}% allocation</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-navy-dark">
                      ${holding.value.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-700">
                      ${holding.invested.toLocaleString()}
                    </td>
                    <td className={`py-4 px-4 text-right font-semibold ${
                      holding.returnValue > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      +${holding.returnValue.toLocaleString()}
                    </td>
                    <td className={`py-4 px-4 text-right font-semibold ${
                      holding.return > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      +{holding.return}%
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        holding.risk === 'High' ? 'bg-red-100 text-red-800' :
                        holding.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {holding.risk}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700">
                      {new Date(holding.inception).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-montserrat font-bold text-xl text-navy-dark">
              Transaction History
            </h3>
            <button className="text-gold hover:text-gold/80 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pool</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
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
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default InvestorPortfolio;