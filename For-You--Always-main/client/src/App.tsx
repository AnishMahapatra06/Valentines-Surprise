import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAudio } from "@/hooks/use-audio";

// Components

import { FloatingHearts } from "@/components/FloatingHearts";
import { Navigation } from "@/components/Navigation";
import { PageTransition } from "@/components/PageTransition";

// Pages
import Landing from "@/pages/Landing";
import Story from "@/pages/Story";
import Memories from "@/pages/Memories";
import Surprise from "@/pages/Surprise";
import FinalNote from "@/pages/FinalNote";
import NotFound from "@/pages/not-found";
import { MusicPlayer } from "./components/MusicPlayer";

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location}>
        <Route path="/">
          <PageTransition>
            <Landing />
          </PageTransition>
        </Route>
        <Route path="/story">
          <PageTransition>
            <Story />
          </PageTransition>
        </Route>
        <Route path="/memories">
          <PageTransition>
            <Memories />
          </PageTransition>
        </Route>
        <Route path="/surprise">
          <PageTransition>
            <Surprise />
          </PageTransition>
        </Route>
        <Route path="/final">
          <PageTransition>
            <FinalNote />
          </PageTransition>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen overflow-hidden selection:bg-pink-200">
        <FloatingHearts />
        <Navigation />
        <AnimatedRoutes />
       <MusicPlayer/>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
