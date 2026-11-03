//Modules
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Navbar from './components/navigation/navbar';
import ScrollToTop from './components/utilities/scrollToTop';
import FloatingCta from './components/utilities/floatingCta';
import { useScrollReveal } from './hooks/useScrollReveal';

// Translations
import { LanguageProvider } from './translations/languageSelection';

//Pages
import Home from './pages/home';
// import Login from './pages/login';
import LuxorSeries from './pages/luxorSeries';
import DMaxSeries from './pages/dmaxSeries';
import EliteSeries from './pages/eliteSeries';
import ClassicSeries from './pages/classicSeries';  
import ThorSeries from './pages/thorSeries';
// import ToraSeries from './pages/toraSeries'; 
import Contact from './pages/contact';
import TermsAndConditions from './pages/termsAndConditions';
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
  return (
    <>
    <FloatingCta />
    <Routes>
      <Route path="/" element={<><Home /><Footer /></>} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/dmaxSeries" element={<><DMaxSeries /><Footer /></>} />
      <Route path="/eliteSeries" element={<><EliteSeries /><Footer /></>} />
      <Route path="/luxorSeries" element={<><LuxorSeries /><Footer /></>} />
      <Route path="/classicSeries" element={<><ClassicSeries /><Footer /></>} />
      <Route path="/thorSeries" element={<><ThorSeries /><Footer /></>} />
      {/* <Route path="/toraSeries" element={<><ToraSeries /><Footer /></>} /> */}
      <Route path="/contact" element={<><Contact /><Footer /></>} />
      <Route path="/videoShowcase" element={<><VideoShowcase /><Footer /></>} />
      <Route path="/termsAndConditions" element={<><TermsAndConditions /><Footer /></>} />
    </Routes>
    </>
  )
}

export default App;
