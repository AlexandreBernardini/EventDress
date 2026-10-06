import { Route, Routes, useLocation } from "react-router-dom"
import dame from "./assets/dame.png"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"
import Catalogue from "./pages/Catalogue"
import Collaborations from "./pages/Collaborations"
import Compte from "./pages/Compte"
import Home from "./pages/Home"
import Panier from "./pages/Panier"
import RendezVous from "./pages/RendezVous"
import Vente from "./pages/Vente"

export default function App() {
  const { pathname } = useLocation()
  const showWatermark = pathname !== "/"

  return (
    <div className="isolate relative flex min-h-screen flex-col bg-cream text-ink">
      {showWatermark && (
        <img
          src={dame}
          alt=""
          aria-hidden="true"
          className="pointer-events-none fixed -right-16 top-20 -z-10 h-[75vh] max-h-[720px] w-auto opacity-20 md:-right-6 md:h-[80vh]"
        />
      )}

      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
          <Route path="/collaborations" element={<Collaborations />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/vente" element={<Vente />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
