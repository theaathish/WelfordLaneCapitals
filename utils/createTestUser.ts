import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface TestUserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  investmentAmount?: string;
  userType: 'investor' | 'admin';
  createdAt: Date;
}

export const createTestUser = async (uid: string, email: string) => {
  const testUserData: TestUserData = {
    uid,
    email,
    firstName: 'Test',
    lastName: 'User',
    phone: '+1234567890',
    company: 'Test Company',
    investmentAmount: '250k-500k',
    userType: 'investor',
    createdAt: new Date()
  };

  try {
    await setDoc(doc(db, 'users', uid), testUserData);
    console.log('Test user created successfully');
    return testUserData;
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
};

export const createTestAdmin = async (uid: string, email: string) => {
  const testAdminData: TestUserData = {
    uid,
    email,
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1234567890',
    company: 'Welford Lane Capitals',
    investmentAmount: '5m+',
    userType: 'admin',
    createdAt: new Date()
  };

  try {
    await setDoc(doc(db, 'users', uid), testAdminData);
    console.log('Test admin created successfully');
    return testAdminData;
  } catch (error) {
    console.error('Error creating test admin:', error);
    throw error;
  }
};