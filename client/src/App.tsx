//Modules
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <LanguageProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
        <div>
          <Navbar/>  
          <main>  
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
};

const AppRoutes = () => {
  useScrollReveal();
  useRouteMeta();
  return (
    <>
    <FloatingCta />
    <Routes>
      <Route path="/" element={<><Home /><Footer /></>} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/dmaxSeries" element={<><DMaxSeries /><Footer /></>} />
      {/* Elite hidden for now */}
      {/* <Route path="/eliteSeries" element={<><EliteSeries /><Footer /></>} /> */}
      <Route path="/luxorSeries" element={<><LuxorSeries /><Footer /></>} />
      <Route path="/classicSeries" element={<><ClassicSeries /><Footer /></>} />
      <Route path="/thorSeries" element={<><ThorSeries /><Footer /></>} />
      {/* <Route path="/toraSeries" element={<><ToraSeries /><Footer /></>} /> */}
      <Route path="/contact" element={<><Contact /><Footer /></>} />
      <Route path="/videoShowcase" element={<><VideoShowcase /><Footer /></>} />
      <Route path="/termsAndConditions" element={<><TermsAndConditions /><Footer /></>} />
      <Route path="/privacy" element={<><Privacy /><Footer /></>} />
      <Route path="/unsubscribe" element={<><Unsubscribe /><Footer /></>} />
    </Routes>
    </>
  )
}

export default App;
