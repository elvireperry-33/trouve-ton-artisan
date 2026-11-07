import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/footer';
import Home from './Home';
import Artisans from './Artisans';
import Artisan from './artisan';
import NotFound from './NotFound';
import Legal from './Legal';
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisans />} />
        <Route path="/artisans/:id" element={<Artisan />} />
        <Route
  path="/mentions-legales"
  element={<Legal titre="Mentions légales" />}
/>
<Route
  path="/donnees-personnelles"
  element={<Legal titre="Données personnelles" />}
/>
<Route
  path="/accessibilite"
  element={<Legal titre="Accessibilité" />}
/>
<Route
  path="/cookies"
  element={<Legal titre="Cookies" />}
/>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
