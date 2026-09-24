import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Catalogue from "./pages/Catalogue"
import Home from "./pages/Home"
import RendezVous from "./pages/RendezVous"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
