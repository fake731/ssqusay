import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import Index from "./pages/Index";
import SultansPage from "./pages/SultansPage";
import BattlesPage from "./pages/BattlesPage";
import WeaponsPage from "./pages/WeaponsPage";
import WarriorsPage from "./pages/WarriorsPage";
import MapsPage from "./pages/MapsPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import TradePage from "./pages/TradePage";
import ReligionPage from "./pages/ReligionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sultans" element={<SultansPage />} />
          <Route path="/battles" element={<BattlesPage />} />
          <Route path="/weapons" element={<WeaponsPage />} />
          <Route path="/warriors" element={<WarriorsPage />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/trade" element={<TradePage />} />
          <Route path="/religion" element={<ReligionPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
