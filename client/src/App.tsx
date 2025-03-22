import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import MachineryDetail from "@/pages/MachineryDetail";
import NotFound from "@/pages/not-found";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { BackToTop } from "@/components/ui/BackToTop";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for a more polished experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingOverlay isLoading={loading} />
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
