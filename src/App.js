import React from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { FunnelProvider } from "./funnel/FunnelContext";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Hub from "./pages/Hub";
import ProductPage from "./pages/ProductPage";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Claims from "./pages/Claims";
import Tawakkul from "./pages/Tawakkul";
import Devis from "./pages/Devis";
import Solutions from "./pages/Solutions";
import Contact from "./pages/Contact";
import Agences from "./pages/Agences";
import About from "./pages/About";
import TakafulPage from "./pages/TakafulPage";
import Partners from "./pages/Partners";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

// Le routeur (BrowserRouter côté navigateur, StaticRouter au pré-rendu)
// est fourni par src/index.js et src/ssg/entry.js.
export default function App() {
  return (
    <LanguageProvider>
        <FunnelProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Hubs */}
              <Route path="/particuliers" element={<Hub segment="particuliers" />} />
              <Route path="/entreprises" element={<Hub segment="entreprises" />} />

              {/* Offres B2B packagées (doit précéder /entreprises/:slug) */}
              <Route path="/entreprises/solutions" element={<Solutions />} />

              {/* Pages produit — un composant, 11 produits */}
              <Route path="/particuliers/:slug" element={<ProductPage />} />
              <Route path="/entreprises/:slug" element={<ProductPage />} />

              {/* Landing pages de devis (campagnes Ads / SEO transactionnel) */}
              <Route path="/devis" element={<Devis />} />
              <Route path="/devis/:slug" element={<Devis />} />

              {/* Pages autonomes */}
              <Route path="/sinistres" element={<Claims />} />
              <Route path="/takaful-et-tawakkul" element={<Tawakkul />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Article />} />
              <Route path="/takaful" element={<TakafulPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/agences" element={<Agences />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/partenaires" element={<Partners />} />
              <Route path="/confidentialite" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </FunnelProvider>
    </LanguageProvider>
  );
}
