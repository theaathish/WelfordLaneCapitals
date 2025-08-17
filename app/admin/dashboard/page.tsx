'use client';

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/ui/MetricCard';
import PerformanceChart from '@/components/ui/PerformanceChart';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Sample admin data
  const totalAUM = 2800000000; // $2.8B
  const totalInvestors = 1247;
  const pendingApplications = 23;
  const monthlyInflow = 125000000; // $125M

  const aumData = [
    { date: 'Jan', value: 2200 },
    { date: 'Feb', value: 2280 },
    { date: 'Mar', value: 2350 },
    { date: 'Apr', value: 2420 },
    { date: 'May', value: 2380 },
    { date: 'Jun', value: 2510 },
    { date: 'Jul', value: 2590 },
    { date: 'Aug', value: 2650 },
    { date: 'Sep', value: 2720 },
    { date: 'Oct', value: 2780 },
    { date: 'Nov', value: 2800 },
    { date: 'Dec', value: 2800 },
  ];

  const recentApplications = [
    { name: 'John Smith', company: 'ABC Capital', amount: '$2.5M', status: 'pending', date: '2024-01-15' },
    { name: 'Sarah Johnson', company: 'XYZ Investments', amount: '$1.8M', status: 'approved', date: '2024-01-14' },
    { name: 'Michael Chen', company: 'Global Fund', amount: '$5.2M', status: 'under_review', date: '2024-01-13' },
    { name: 'Emily Davis', company: 'Pension Fund LLC', amount: '$3.1M', status: 'approved', date: '2024-01-12' },
  ];

  const poolPerformance = [
    { name: 'Technology Growth Pool', aum: '$1.2B', return: '+28.5%', investors: 342 },
    { name: 'Balanced Growth Pool', aum: '$890M', return: '+18.2%', investors: 456 },
    { name: 'Alternative Credit', aum: '$710M', return: '+12.8%', investors: 289 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'under_review':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute requiredUserType="admin">
      <div className="min-h-screen bg-gray-50">
        <Navigation userType="admin" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-3xl text-navy-dark">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Overview of fund performance and investor management
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total AUM"
              value={`$${(totalAUM / 1000000000).toFixed(1)}B`}
              change={8.5}
              changeType="positive"
              icon={DollarSign}
              subtitle="Assets under management"
            />
            <MetricCard
              title="Total Investors"
              value={totalInvestors.toLocaleString()}
              change={12.3}
              changeType="positive"
              icon={Users}
              subtitle="Active investor accounts"
            />
            <MetricCard
              title="Monthly Inflow"
              value={`$${(monthlyInflow / 1000000).toFixed(0)}M`}
              change={15.7}
              changeType="positive"
              icon={TrendingUp}
              subtitle="New investments this month"
            />
            <MetricCard
              title="Pending Applications"
              value={pendingApplications.toString()}
              change={-5.2}
              changeType="negative"
              icon={UserPlus}
              subtitle="Awaiting approval"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* AUM Growth Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-montserrat font-bold text-xl text-navy-dark">
                    Assets Under Management Growth
                  </h2>
                  <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                    <option>Last 12 months</option>
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
                <PerformanceChart 
                  data={aumData.map(item => ({ date: item.date, fund: item.value, benchmark: 0 }))} 
                  height={300}
                  showArea={true}
                />
              </div>
            </div>

            {/* Pool Performance */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-montserrat font-bold text-lg text-navy-dark mb-6">
                Pool Performance
              </h3>
              <div className="space-y-4">
                {poolPerformance.map((pool, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-navy-dark text-sm">{pool.name}</p>
                        <p className="text-gray-600 text-xs">{pool.investors} investors</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-navy-dark text-sm">{pool.aum}</p>
                        <p className="text-green-600 text-xs font-semibold">{pool.return}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-montserrat font-bold text-xl text-navy-dark">
                Recent Applications
              </h3>
              <button className="text-gold hover:text-gold/80 font-medium text-sm">
                View All Applications
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Applicant</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Investment Amount</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((application, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold text-navy-dark">
                        {application.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {application.company}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-navy-dark">
                        {application.amount}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {new Date(application.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Review
                          </button>
                          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                            Approve
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-montserrat font-bold text-lg text-navy-dark mb-4">
                Investor Management
              </h4>
              <div className="space-y-3">
                <button className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                  Review Applications
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-navy-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                  Manage Investors
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-montserrat font-bold text-lg text-navy-dark mb-4">
                Pool Management
              </h4>
              <div className="space-y-3">
                <button className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                  Create New Pool
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-navy-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                  Manage Existing Pools
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-montserrat font-bold text-lg text-navy-dark mb-4">
                Reports & Analytics
              </h4>
              <div className="space-y-3">
                <button className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                  Generate Reports
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-navy-dark font-semibold py-2 px-4 rounded-lg transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;