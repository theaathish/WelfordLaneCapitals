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
  TrendingDown,
  BarChart3, 
  PieChart, 
  Target, 
  Activity,
  Calendar,
  Download
} from 'lucide-react';

const InvestorAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('returns');

  const performanceData = [
    { date: 'Jan', returns: 7.2, volatility: 12.5, sharpe: 1.8, alpha: 2.1 },
    { date: 'Feb', returns: 8.5, volatility: 11.8, sharpe: 2.1, alpha: 2.8 },
    { date: 'Mar', returns: 12.1, volatility: 13.2, sharpe: 2.3, alpha: 3.2 },
    { date: 'Apr', returns: 15.8, volatility: 14.1, sharpe: 2.5, alpha: 4.1 },
    { date: 'May', returns: 13.2, volatility: 12.9, sharpe: 2.2, alpha: 3.8 },
    { date: 'Jun', returns: 18.7, volatility: 15.3, sharpe: 2.7, alpha: 5.2 },
    { date: 'Jul', returns: 22.3, volatility: 16.8, sharpe: 2.9, alpha: 6.1 },
    { date: 'Aug', returns: 25.1, volatility: 17.2, sharpe: 3.1, alpha: 6.8 },
    { date: 'Sep', returns: 23.8, volatility: 16.5, sharpe: 2.8, alpha: 6.2 },
    { date: 'Oct', returns: 28.4, volatility: 18.1, sharpe: 3.2, alpha: 7.5 },
    { date: 'Nov', returns: 31.2, volatility: 19.3, sharpe: 3.4, alpha: 8.1 },
    { date: 'Dec', returns: 34.7, volatility: 20.1, sharpe: 3.6, alpha: 8.9 },
  ];

  const riskMetrics = [
    { metric: 'Value at Risk (95%)', value: '-$18,500', change: -2.3, period: 'Daily' },
    { metric: 'Maximum Drawdown', value: '8.7%', change: 1.2, period: 'YTD' },
    { metric: 'Beta vs S&P 500', value: '0.72', change: -0.05, period: 'Current' },
    { metric: 'Correlation', value: '0.68', change: 0.03, period: 'vs Benchmark' },
  ];

  const sectorAllocation = [
    { sector: 'Technology', allocation: 32, value: 131840, return: 28.5 },
    { sector: 'Healthcare', allocation: 18, value: 74160, return: 15.2 },
    { sector: 'Financial Services', allocation: 15, value: 61800, return: 12.8 },
    { sector: 'Real Estate', allocation: 12, value: 49440, return: 18.7 },
    { sector: 'Energy', allocation: 10, value: 41200, return: 22.1 },
    { sector: 'Consumer Goods', allocation: 8, value: 32960, return: 9.3 },
    { sector: 'Other', allocation: 5, value: 20600, return: 14.6 },
  ];

  const getChartData = () => {
    return performanceData.map(item => ({
      date: item.date,
      value: item[selectedMetric as keyof typeof item] as number
    }));
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'returns': return 'Cumulative Returns (%)';
      case 'volatility': return 'Volatility (%)';
      case 'sharpe': return 'Sharpe Ratio';
      case 'alpha': return 'Alpha (%)';
      default: return 'Returns (%)';
    }
  };

  return (
    <ProtectedRoute requiredUserType="investor">
      <div className="min-h-screen bg-gray-50">
        <Navigation userType="investor" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-montserrat font-bold text-3xl text-navy-dark">
              Portfolio Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Advanced performance metrics and risk analysis
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </button>
            <button className="flex items-center space-x-2 bg-gold hover:bg-gold/90 text-navy-dark px-4 py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Annualized Return"
            value="24.8%"
            change={3.2}
            changeType="positive"
            icon={TrendingUp}
            subtitle="vs 18.9% benchmark"
          />
          <MetricCard
            title="Sharpe Ratio"
            value="2.14"
            change={0.15}
            changeType="positive"
            icon={Target}
            subtitle="Risk-adjusted return"
          />
          <MetricCard
            title="Alpha Generation"
            value="5.9%"
            change={0.8}
            changeType="positive"
            icon={BarChart3}
            subtitle="Excess return"
          />
          <MetricCard
            title="Volatility"
            value="16.2%"
            change={-1.1}
            changeType="positive"
            icon={Activity}
            subtitle="Annualized std dev"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-montserrat font-bold text-xl text-navy-dark">
                  {getMetricLabel()}
                </h2>
                <div className="flex space-x-2">
                  {[
                    { key: 'returns', label: 'Returns' },
                    { key: 'volatility', label: 'Volatility' },
                    { key: 'sharpe', label: 'Sharpe' },
                    { key: 'alpha', label: 'Alpha' }
                  ].map((metric) => (
                    <button
                      key={metric.key}
                      onClick={() => setSelectedMetric(metric.key)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedMetric === metric.key
                          ? 'bg-gold text-navy-dark'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {metric.label}
                    </button>
                  ))}
                </div>
              </div>
              <PerformanceChart 
                data={getChartData().map(item => ({ 
                  date: item.date, 
                  fund: item.value,
                  benchmark: 0
                }))} 
                height={350}
                showArea={true}
              />
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-montserrat font-bold text-lg text-navy-dark mb-6">
              Risk Metrics
            </h3>
            <div className="space-y-4">
              {riskMetrics.map((risk, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-navy-dark text-sm">{risk.metric}</p>
                      <p className="text-gray-600 text-xs">{risk.period}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-navy-dark">{risk.value}</p>
                      <p className={`text-xs ${risk.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {risk.change > 0 ? '+' : ''}{risk.change}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-montserrat font-bold text-xl text-navy-dark mb-6">
              Sector Allocation
            </h3>
            <div className="space-y-4">
              {sectorAllocation.map((sector, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-navy-dark">{sector.sector}</span>
                    <div className="text-right">
                      <span className="font-bold text-navy-dark">{sector.allocation}%</span>
                      <span className={`ml-2 text-sm ${sector.return > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        +{sector.return}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-gold h-2 rounded-full" 
                      style={{ width: `${sector.allocation}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600 text-xs">${sector.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Attribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-montserrat font-bold text-xl text-navy-dark mb-6">
              Performance Attribution
            </h3>
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-semibold text-navy-dark mb-3">Asset Allocation Effect</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Sector Selection</span>
                  <span className="font-semibold text-green-600">+2.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Security Selection</span>
                  <span className="font-semibold text-green-600">+3.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Interaction Effect</span>
                  <span className="font-semibold text-red-600">-0.3%</span>
                </div>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-semibold text-navy-dark mb-3">Top Contributors</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Technology Growth Pool</span>
                    <span className="font-semibold text-green-600 text-sm">+4.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Real Estate Alpha</span>
                    <span className="font-semibold text-green-600 text-sm">+1.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Energy Opportunities</span>
                    <span className="font-semibold text-green-600 text-sm">+1.1%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-navy-dark mb-3">Risk Factors</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Market Risk</span>
                    <span className="font-semibold text-navy-dark text-sm">72%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Specific Risk</span>
                    <span className="font-semibold text-navy-dark text-sm">28%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Performance Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-montserrat font-bold text-xl text-navy-dark mb-6">
            Historical Performance Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Period</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Portfolio Return</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Benchmark Return</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Excess Return</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Volatility</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Sharpe Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-navy-dark">YTD 2024</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">+24.8%</td>
                  <td className="py-3 px-4 text-right text-gray-700">+18.9%</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">+5.9%</td>
                  <td className="py-3 px-4 text-right text-gray-700">16.2%</td>
                  <td className="py-3 px-4 text-right font-semibold text-navy-dark">2.14</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-navy-dark">2023</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">+28.3%</td>
                  <td className="py-3 px-4 text-right text-gray-700">+21.7%</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">+6.6%</td>
                  <td className="py-3 px-4 text-right text-gray-700">15.8%</td>
                  <td className="py-3 px-4 text-right font-semibold text-navy-dark">2.31</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-navy-dark">2022</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">+19.1%</td>
                  <td className="py-3 px-4 text-right text-gray-700">+12.4%</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">+6.7%</td>
                  <td className="py-3 px-4 text-right text-gray-700">17.3%</td>
                  <td className="py-3 px-4 text-right font-semibold text-navy-dark">1.89</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-navy-dark">3-Year Avg</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">+24.1%</td>
                  <td className="py-3 px-4 text-right text-gray-700">+17.7%</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">+6.4%</td>
                  <td className="py-3 px-4 text-right text-gray-700">16.4%</td>
                  <td className="py-3 px-4 text-right font-semibold text-navy-dark">2.11</td>
                </tr>
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

export default InvestorAnalytics;