import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCartWishlist } from './CartWishlistContext';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface StoredAccount extends User {
  password: string;
}

export interface PlacedOrderRecord {
  orderNumber: string;
  name: string;
  phone: string;
  email?: string;
  userId?: string;
  address: string;
  paymentMethod: string;
  items: Array<{
    id: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  discountCode: string | null;
  total: number;
  date: string;
  status?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  hasVisitedSession: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (data: { name: string; email: string; phone: string; password: string }) => { success: boolean; error?: string };
  continueAsGuest: () => void;
  logout: () => void;
  updateProfile: (data: { name: string; phone: string }) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isOrdersModalOpen: boolean;
  setIsOrdersModalOpen: (open: boolean) => void;
  getUserOrders: () => PlacedOrderRecord[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'scoop_demo_users_v1';
const CURRENT_USER_KEY = 'scoop_current_user_v1';
const SESSION_VISITED_KEY = 'scoop_session_visited_v1';

// Pre-seeded demo account so user can easily test login or signup
const DEFAULT_DEMO_USERS: StoredAccount[] = [
  {
    id: 'user-demo-1',
    name: 'Meera Kapoor',
    email: 'meera@scoop.com',
    phone: '9876543210',
    password: 'password123',
    createdAt: '2026-10-15'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useCartWishlist();

  // Load existing accounts from localStorage
  const [users, setUsers] = useState<StoredAccount[]>(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return DEFAULT_DEMO_USERS;
  });

  // Current logged in user from localStorage
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Session visited flag from sessionStorage
  const [hasVisitedSession, setHasVisitedSession] = useState<boolean>(() => {
    try {
      // If user is already logged in, automatically considered visited
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedUser) {
        return true;
      }
      return sessionStorage.getItem(SESSION_VISITED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }
  }, [users]);

  // Sync current user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        sessionStorage.setItem(SESSION_VISITED_KEY, 'true');
        setHasVisitedSession(true);
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const markSessionVisited = () => {
    try {
      sessionStorage.setItem(SESSION_VISITED_KEY, 'true');
    } catch {
      // ignore
    }
    setHasVisitedSession(true);
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found || found.password !== password) {
      return { success: false, error: 'Invalid email or password' };
    }

    const authUser: User = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      createdAt: found.createdAt
    };

    setUser(authUser);
    markSessionVisited();
    showToast(`Welcome to Scoop, ${found.name}!`, 'success');
    return { success: true };
  };

  const signUp = (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): { success: boolean; error?: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    const exists = users.some((u) => u.email.toLowerCase() === cleanEmail);

    if (exists) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newAccount: StoredAccount = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: data.phone.trim(),
      password: data.password,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers((prev) => [...prev, newAccount]);

    const authUser: User = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      phone: newAccount.phone,
      createdAt: newAccount.createdAt
    };

    setUser(authUser);
    markSessionVisited();
    showToast(`Welcome to Scoop, ${authUser.name}!`, 'success');
    return { success: true };
  };

  const continueAsGuest = () => {
    markSessionVisited();
    showToast('Welcome, Guest!', 'info');
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
      sessionStorage.removeItem(SESSION_VISITED_KEY);
    } catch {
      // ignore
    }
    setHasVisitedSession(false);
    showToast('Logged out successfully', 'info');
  };

  const updateProfile = (data: { name: string; phone: string }) => {
    if (!user) return;
    const updated: User = {
      ...user,
      name: data.name.trim(),
      phone: data.phone.trim()
    };
    setUser(updated);
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, name: data.name.trim(), phone: data.phone.trim() } : u))
    );
    showToast('Profile updated successfully!', 'success');
  };

  const getUserOrders = (): PlacedOrderRecord[] => {
    try {
      const stored = localStorage.getItem('scoop_placed_orders');
      if (!stored) return [];
      const allOrders: PlacedOrderRecord[] = JSON.parse(stored);
      if (!user) {
        // Return recent guest orders if any
        return allOrders.filter((o) => !o.userId || o.userId === 'guest');
      }
      return allOrders.filter(
        (o) => o.userId === user.id || o.email?.toLowerCase() === user.email.toLowerCase()
      );
    } catch {
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        hasVisitedSession,
        login,
        signUp,
        continueAsGuest,
        logout,
        updateProfile,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isOrdersModalOpen,
        setIsOrdersModalOpen,
        getUserOrders
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
