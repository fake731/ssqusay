import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import PrivacyConsent from "./components/PrivacyConsent";
import NotificationBell from "./components/NotificationBell";
import Index from "./pages/Index";
import SultansPage from "./pages/SultansPage";
import BattlesPage from "./pages/BattlesPage";
import WeaponsPage from "./pages/WeaponsPage";
import WarriorsPage from "./pages/WarriorsPage";
import MapsPage from "./pages/MapsPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import TradePage from "./pages/TradePage";
import ReligionPage from "./pages/ReligionPage";
import DevLogin from "./pages/DevLogin";
import DevDashboard from "./pages/DevDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <PrivacyConsent />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NotificationBell />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/السلاطين" element={<SultansPage />} />
          <Route path="/المعارك" element={<BattlesPage />} />
          <Route path="/الأسلحة" element={<WeaponsPage />} />
          <Route path="/الجنود" element={<WarriorsPage />} />
          <Route path="/الخرائط" element={<MapsPage />} />
          <Route path="/المعمار" element={<ArchitecturePage />} />
          <Route path="/التجارة" element={<TradePage />} />
          <Route path="/الدين-والقضاء" element={<ReligionPage />} />
          <Route path="/دخول-المطور" element={<DevLogin />} />
          <Route path="/لوحة-التحكم" element={<DevDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
