import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import MachineryDetail from "@/pages/MachineryDetail";
import Marketplace from "@/pages/Marketplace";
import NotFound from "@/pages/not-found";
import { BackToTop } from "@/components/ui/BackToTop";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToHash } from "@/components/ScrollToHash";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { RegistrationProvider } from "@/contexts/RegistrationContext";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { useHtmlLang } from "@/hooks/useHtmlLang";

function Router() {
  return (
    <Switch>
      {/* IMPORTANTE: marketplace antes de la ruta "/" */}
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/machinery/:id" component={MachineryDetail} />
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Componente interno que usa el hook
function AppContent() {
  // Este hook se encarga de actualizar el lang del HTML basado en el idioma seleccionado
  useHtmlLang();
  
  // Preservar hash en carga inicial
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      // Esperar a que el DOM se renderice
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);
  
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
      <BackToTop />
      <RegistrationForm />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <RegistrationProvider>
          <AppContent />
        </RegistrationProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
