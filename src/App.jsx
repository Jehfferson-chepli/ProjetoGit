import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import InstrumentCards from './components/InstrumentCards';
import InstrumentTable from './components/InstrumentTable';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <i className="fas fa-th"></i> Visualização em Cards
        </Link>
        <Link 
          to="/tabela" 
          className={`nav-link ${location.pathname === '/tabela' ? 'active' : ''}`}
        >
          <i className="fas fa-table"></i> Visualização em Tabela
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1><i className="fas fa-music"></i> Catálogo de Instrumentos Musicais</h1>
            <p>Encontre o instrumento perfeito para sua performance</p>
          </div>
        </header>

        <Navigation />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<InstrumentCards />} />
            <Route path="/tabela" element={<InstrumentTable />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2023 Catálogo de Instrumentos Musicais. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;