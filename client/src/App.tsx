import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import MachineryDetail from "@/pages/MachineryDetail";
import Marketplace from "@/pages/Marketplace";
import NotFound from "@/pages/not-found";
import { BackToTop } from "@/components/ui/BackToTop";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToHash } from "@/components/ScrollToHash";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { RegistrationProvider } from "@/contexts/RegistrationContext";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { useHtmlLang } from "@/hooks/useHtmlLang";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/machinery/:id" component={MachineryDetail} />
      <Route path="/marketplace" component={Marketplace} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Componente interno que usa el hook
function AppContent() {
  // Este hook se encarga de actualizar el lang del HTML basado en el idioma seleccionado
  useHtmlLang();
  
  return (
    <>
      <Header />
      <ScrollToHash />
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
