//Modules
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Page addresses in French and English
import { LIVE_PAGES, PageKey, ROUTES } from './config/routes';

//Components
import Navbar from './components/navigation/navbar';
import ScrollToTop from './components/utilities/scrollToTop';
import FloatingCta from './components/utilities/floatingCta';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useRouteMeta } from './hooks/useRouteMeta';

// Translations
import { LanguageProvider } from './translations/languageSelection';

//Pages
import Home from './pages/home';
// import Login from './pages/login';
import LuxorSeries from './pages/luxorSeries';
import DMaxSeries from './pages/dmaxSeries';
// Elite hidden for now (not online yet). Uncomment here, in the route below and in the navbar, home, test ride, footer, sitemap and route meta to bring it back.
// import EliteSeries from './pages/eliteSeries';
import ClassicSeries from './pages/classicSeries';  
import ThorSeries from './pages/thorSeries';
// import ToraSeries from './pages/toraSeries'; 
import Contact from './pages/contact';
import TermsAndConditions from './pages/termsAndConditions';
import Privacy from './pages/privacy';
import Unsubscribe from './pages/unsubscribe';
import VideoShowcase from './pages/videoShowcase';
import Footer from './components/footer/footer';

// const [auth, setAuth] = React.useState(false);

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Inside the router: the language is read from the address */}
      <LanguageProvider>
      <ScrollToTop />
        <div>
          <Navbar/>  
          <main>  
            <AppRoutes />
          </main>
        </div>
      </LanguageProvider>
    </BrowserRouter>
  )
};

// Elite hidden for now: also set "live" to true for elite in config/routes.json
const PAGES: Record<PageKey, React.ReactNode> = {
  home: <Home />,
  dmax: <DMaxSeries />,
  elite: null, // <EliteSeries />
  luxor: <LuxorSeries />,
  classic: <ClassicSeries />,
  thor: <ThorSeries />,
  videos: <VideoShowcase />,
  contact: <Contact />,
  privacy: <Privacy />,
  terms: <TermsAndConditions />,
  unsubscribe: <Unsubscribe />,
};

/** Sends an old address to its new one, keeping the ?query (unsubscribe links in sent emails need it) */
const LegacyRedirect = ({ to }: { to: string }) => {
  const { search, hash } = useLocation();
  return <Navigate to={to + search + hash} replace />;
};

const AppRoutes = () => {
  useScrollReveal();
  useRouteMeta();
  return (
    <>
    <FloatingCta />
    <Routes>
      {/* Each page twice: its French address and its English address (see config/routes.json) */}
      {LIVE_PAGES.flatMap((page) => (['fr', 'en'] as const).map((lang) => (
        <Route key={page + lang} path={ROUTES[page][lang]} element={<>{PAGES[page]}<Footer /></>} />
      )))}
      {/* Old addresses (before Nov. 2026) go to the French page; nginx does the same on the live server */}
      {LIVE_PAGES.flatMap((page) => ROUTES[page].legacy.map((oldPath) => (
        <Route key={oldPath} path={oldPath} element={<LegacyRedirect to={ROUTES[page].fr} />} />
      )))}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/toraSeries" element={<><ToraSeries /><Footer /></>} /> */}
    </Routes>
    </>
  )
}

export default App;
