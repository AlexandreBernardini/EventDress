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

const BLANK_PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

export default function App() {
  const { pathname } = useLocation()
  const showWatermark = pathname !== "/"

  return (
    <div className="isolate relative flex min-h-screen flex-col bg-cream text-ink">
      {/* Filigrane décoratif : la source n'est téléchargée qu'à partir de md (48rem) */}
      {showWatermark && (
        <picture>
          <source media="(min-width: 48rem)" srcSet={dame} />
          <img
            src={BLANK_PIXEL}
            alt=""
            aria-hidden="true"
            width={775}
            height={1246}
            decoding="async"
            className="pointer-events-none fixed -right-12 top-(--header-h) -z-10 hidden h-[78vh] max-h-[720px] w-auto select-none opacity-10 md:block lg:-right-4"
          />
        </picture>
      )}

      <ScrollToTop />
      <Navbar />
      <main id="contenu" tabIndex={-1} className="flex-1 outline-none">
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
