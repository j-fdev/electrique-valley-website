//Modules
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Navbar from './components/navigation/navbar';
import ScrollToTop from './components/utilities/scrollToTop';

// Translations
import { LanguageProvider } from './translations/languageSelection';

//Pages
import Home from './pages/home';
// import Login from './pages/login';
import LuxorSeries from './pages/luxorSeries';
import EvolutionSeries from './pages/evolutionSeries';
import EliteSeries from './pages/eliteSeries';
import ClassicSeries from './pages/classicSeries';  
import DiabloSeries from './pages/diabloSeries';
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
  return (
    <Routes>
      <Route path="/" element={<><Home /><Footer /></>} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/evolutionSeries" element={<><EvolutionSeries /><Footer /></>} />
      <Route path="/eliteSeries" element={<><EliteSeries /><Footer /></>} />
      <Route path="/luxorSeries" element={<><LuxorSeries /><Footer /></>} />
      <Route path="/classicSeries" element={<><ClassicSeries /><Footer /></>} />
      <Route path="/diabloSeries" element={<><DiabloSeries /><Footer /></>} />
      <Route path="/thorSeries" element={<><ThorSeries /><Footer /></>} />
      {/* <Route path="/toraSeries" element={<><ToraSeries /><Footer /></>} /> */}
      <Route path="/contact" element={<><Contact /><Footer /></>} />
      <Route path="/videoShowcase" element={<><VideoShowcase /><Footer /></>} />
      <Route path="/termsAndConditions" element={<><TermsAndConditions /><Footer /></>} />
    </Routes>
  )
}

export default App;
