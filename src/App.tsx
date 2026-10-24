import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CartWishlistProvider } from './context/CartWishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WishlistModal } from './components/WishlistModal';
import { UserModals } from './components/UserModals';
import { Toast } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';
import { RightCornerScrollBar } from './components/RightCornerScrollBar';
import { FaqAiAgentModal } from './components/FaqAiAgentModal';

import { HomePage } from './pages/HomePage';
import { FlavorsPage } from './pages/FlavorsPage';
import { FlavorDetailPage } from './pages/FlavorDetailPage';
import { OrderPage } from './pages/OrderPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, hasVisitedSession } = useAuth();
  const isLoginPage = location.pathname === '/login';

  // Entry Behavior: When website is opened for the first time in a session,
  // show the Login page before Home. If logged in or already visited this session, go straight to Home.
  useEffect(() => {
    if (!isLoggedIn && !hasVisitedSession && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, hasVisitedSession, location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8D0C8] text-[#7A2500] selection:bg-[#FF6F86] selection:text-white">
      {/* Top Pill Navbar on all pages EXCEPT Login page */}
      {!isLoginPage && <Navbar />}

      {/* Animation 5: Page Transition - Simple fade-in (opacity 0 -> 1, 0.3s ease-out) on route change */}
      <main key={location.pathname} className="flex-1 w-full animate-page-enter">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/flavors" element={<FlavorsPage />} />
          <Route path="/flavors/:id" element={<FlavorDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Navigate to="/" replace />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer on all pages EXCEPT Login page */}
      {!isLoginPage && <Footer />}

      {/* Right Corner Interactive Scrollbar (Top to Bottom & Bottom to Top) */}
      {!isLoginPage && <RightCornerScrollBar />}

      {/* Floating Scoop AI FAQ Agent Trigger & Modal */}
      {!isLoginPage && <FaqAiAgentModal />}

      {/* Wishlist interactive modal */}
      <WishlistModal />

      {/* User profile & orders modals */}
      <UserModals />

      {/* Instant notification toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <CartWishlistProvider>
        <AuthProvider>
          <ScrollToTop />
          <AppContent />
        </AuthProvider>
      </CartWishlistProvider>
    </BrowserRouter>
  );
}
