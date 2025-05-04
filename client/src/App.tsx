import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import MachineryDetail from "@/pages/MachineryDetail";
import NotFound from "@/pages/not-found";
import { BackToTop } from "@/components/ui/BackToTop";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { RegistrationProvider } from "@/contexts/RegistrationContext";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/machinery/:id" component={MachineryDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <RegistrationProvider>
          <Header />
          <main>
            <Router />
          </main>
          <Footer />
          <BackToTop />
          <RegistrationForm />
        </RegistrationProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App;
