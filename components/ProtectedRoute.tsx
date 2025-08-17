'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'investor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredUserType = 'investor' 
}) => {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      // Only redirect based on user type if we have userData
      if (userData && requiredUserType && userData.userType !== requiredUserType) {
        // Redirect to appropriate dashboard based on user type
        if (userData.userType === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/investor/dashboard');
        }
        return;
      }
    }
  }, [user, userData, loading, router, requiredUserType]);

  // Show loading while auth is loading OR while we have a user but no userData yet
  if (loading || (user && !userData)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user, don't render anything (redirect will happen in useEffect)
  if (!user) {
    return null;
  }

  // If we have a user but userData doesn't match required type, don't render
  if (requiredUserType && userData && userData.userType !== requiredUserType) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;