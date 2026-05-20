import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import SpringPage from './pages/SpringPage'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1 className='logo'>C.NFIGUR<span>=D</span></h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spring-boot" element={<SpringPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}