import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Layouts
import DashboardLayout from './components/DashboardLayout';
import LandingLayout from './components/LandingLayout';

// Landing Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
// Dashboard Pages
import DashboardPage from './pages/DashboardPage';
import IdeaSubmissionPage from './pages/IdeaSubmissionPage';
import AIBuilderPage from './pages/AIBuilderPage';
import CommunityPage from './pages/CommunityPage';
import CommunityFeedPage from './pages/CommunityFeedPage';
import CommunityMembersPage from './pages/CommunityMembersPage';
import CommunityMessagesPage from './pages/CommunityMessagesPage';
import MarketplacePage from './pages/MarketplacePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AutomationPage from './pages/automation';
import MonetizationPage from './pages/monetization';
import NotificationsPage from './pages/notifications';
import SettingsPage from './pages/settings';

function App() {
  return (
    <ThemeProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Routes>
          {/* Landing Page Routes */}
          <Route path="/" element={
            <LandingLayout>
              <HomePage />
            </LandingLayout>
          } />
          <Route path="/about" element={
            <LandingLayout>
              <AboutPage />
            </LandingLayout>
          } />
          <Route path="/contact" element={
            <LandingLayout>
              <ContactPage />
            </LandingLayout>
          } />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/ideas" element={
            <DashboardLayout>
              <IdeaSubmissionPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/ai-builder" element={
            <DashboardLayout>
              <AIBuilderPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/community" element={
            <DashboardLayout>
              <Navigate to="/dashboard/community/feed" replace />
            </DashboardLayout>
          } />
          <Route path="/dashboard/community/feed" element={
            <DashboardLayout>
              <CommunityFeedPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/community/members" element={
            <DashboardLayout>
              <CommunityMembersPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/community/messages" element={
            <DashboardLayout>
              <CommunityMessagesPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/marketplace" element={
            <DashboardLayout>
              <MarketplacePage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/analytics" element={
            <DashboardLayout>
              <AnalyticsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/automation" element={
            <DashboardLayout>
              <AutomationPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/monetization" element={
            <DashboardLayout>
              <MonetizationPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/notifications" element={
            <DashboardLayout>
              <NotificationsPage />
            </DashboardLayout>
          } />
          <Route path="/dashboard/settings" element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          } />

          
          {/* Legacy routes redirect to dashboard */}
          <Route path="/ideas" element={<Navigate to="/dashboard/ideas" replace />} />
          <Route path="/ai-builder" element={<Navigate to="/dashboard/ai-builder" replace />} />
          <Route path="/community" element={<Navigate to="/dashboard/community" replace />} />
          <Route path="/marketplace" element={<Navigate to="/dashboard/marketplace" replace />} />
          <Route path="/analytics" element={<Navigate to="/dashboard/analytics" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;