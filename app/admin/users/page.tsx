'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  Users, 
  Search, 
  Filter, 
  Download,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign
} from 'lucide-react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  investmentAmount?: string;
  userType: 'investor' | 'admin';
  status: 'active' | 'pending' | 'suspended';
  createdAt: Date;
  lastLogin?: Date;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Sample data for development
  const sampleUsers: User[] = [
    {
      uid: '1',
      email: 'john.smith@example.com',
      firstName: 'John',
      lastName: 'Smith',
      phone: '+1-555-0123',
      company: 'ABC Capital',
      investmentAmount: '1m-5m',
      userType: 'investor',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-01-20')
    },
    {
      uid: '2',
      email: 'sarah.johnson@example.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1-555-0124',
      company: 'XYZ Investments',
      investmentAmount: '500k-1m',
      userType: 'investor',
      status: 'pending',
      createdAt: new Date('2024-01-14'),
    },
    {
      uid: '3',
      email: 'admin@welfordlc.com',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1-555-0125',
      company: 'Welford Lane Capitals',
      investmentAmount: '5m+',
      userType: 'admin',
      status: 'active',
      createdAt: new Date('2023-12-01'),
      lastLogin: new Date('2024-01-20')
    }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // In development, use sample data
      // In production, uncomment the Firestore code below
      setUsers(sampleUsers);
      setLoading(false);
      
      /* Production Firestore code:
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
      })) as User[];
      setUsers(usersData);
      */
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId: string, newStatus: 'active' | 'pending' | 'suspended') => {
    try {
      // Update in local state for demo
      setUsers(users.map(user => 
        user.uid === userId ? { ...user, status: newStatus } : user
      ));
      
      /* Production Firestore code:
      await updateDoc(doc(db, 'users', userId), { status: newStatus });
      */
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // Remove from local state for demo
        setUsers(users.filter(user => user.uid !== userId));
        
        /* Production Firestore code:
        await deleteDoc(doc(db, 'users', userId));
        */
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = 
      filterType === 'all' || 
      user.userType === filterType || 
      user.status === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserTypeColor = (userType: string) => {
    return userType === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  if (loading) {
    return (
      <ProtectedRoute requiredUserType="admin">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredUserType="admin">
      <div className="min-h-screen bg-gray-50">
        <Navigation userType="admin" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-montserrat font-bold text-3xl text-navy-dark">
                User Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage investor accounts and user permissions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Users</span>
              </button>
              <button className="flex items-center space-x-2 bg-gold hover:bg-gold/90 text-navy-dark px-4 py-2 rounded-lg transition-colors">
                <Users className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold"
                >
                  <option value="all">All Users</option>
                  <option value="investor">Investors</option>
                  <option value="admin">Admins</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-montserrat font-bold text-lg text-navy-dark">
                Users ({filteredUsers.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">User</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Contact</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700">Investment</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-700">Type</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-700">Joined</th>
                    <th className="text-center py-3 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.uid} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-navy-dark">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          {user.phone && (
                            <p className="text-sm text-gray-700 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {user.phone}
                            </p>
                          )}
                          {user.company && (
                            <p className="text-sm text-gray-700 flex items-center">
                              <Building className="w-3 h-3 mr-1" />
                              {user.company}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {user.investmentAmount && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gold/20 text-navy-dark">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {user.investmentAmount}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.userType)}`}>
                          {user.userType}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-sm text-gray-700">
                        <div className="flex items-center justify-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {user.createdAt.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleStatusUpdate(user.uid, user.status === 'active' ? 'suspended' : 'active')}
                            className={`p-1 rounded ${
                              user.status === 'active' 
                                ? 'text-red-600 hover:bg-red-50' 
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
                          >
                            {user.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.uid)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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

export default AdminUsersPage;