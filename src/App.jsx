import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import SpringPage from './pages/SpringPage'
import FastApiPage from './pages/FastApiPage'
import DockerPage from './pages/DockerPage'
import GitignorePage from './pages/GitignorePage'
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
            <Route path="/fastapi" element={<FastApiPage />} />
            <Route path="/docker" element={<DockerPage />} />
            <Route path='/gitignore' element={<GitignorePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}