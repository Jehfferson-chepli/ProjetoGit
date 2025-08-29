import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

const InstrumentCards = () => {
  const [instruments] = useState([
    {
      id: 1,
      name: 'Guitarra Elétrica',
      category: 'Cordas',
      price: 'R$ 1.899,00',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      description: 'Guitarra elétrica de 6 cordas com ótimo acabamento e som potente.'
    },
    {
      id: 2,
      name: 'Piano Digital',
      category: 'Teclas',
      price: 'R$ 3.499,00',
      rating: 4.9,
      image: 'https://br.yamaha.com/pt/files/p-s500_hero03_sp_d71a192304f4c07c58196f0f53e367e5.jpg?impolicy=resize&imwid=900&imhei=901',
      description: 'Piano digital com 88 teclas weighted e som de alta qualidade.'
    },
    {
      id: 3,
      name: 'Bateria Acústica',
      category: 'Percussão',
      price: 'R$ 4.299,00',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
      description: 'Bateria acústica completa de 5 peças com hardware incluído.'
    },
    {
      id: 4,
      name: 'Violino',
      category: 'Cordas',
      price: 'R$ 1.299,00',
      rating: 4.6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiZaxJX5SUI7JIsx9auebF0dakM12Zs1xS-w&s',
      description: 'Violino acústico de alta qualidade com arco e case inclusos.'
    },
    {
      id: 5,
      name: 'Saxofone Alto',
      category: 'Sopro',
      price: 'R$ 2.899,00',
      rating: 4.5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp3WA9uxEY8k-Egrh83LQYGCMeMhAH8_UXSA&s',
      description: 'Saxofone alto profissional com acabamento em latão dourado.'
    },
    {
      id: 6,
      name: 'Baixo Elétrico',
      category: 'Cordas',
      price: 'R$ 1.799,00',
      rating: 4.4,
      image: 'https://i.pinimg.com/236x/cf/78/ed/cf78edfb858a23e33ea34f8044af8679.jpg',
      description: 'Baixo elétrico de 4 cordas com captadores ativos e ótimo sustain.'
    }
  ]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="instrument-cards">
      <h2>Instrumentos em Destaque</h2>
      <p className="page-description">Visualize nossos instrumentos em formato de cards</p>
      
      <div className="cards-container">
        {instruments.map(instrument => (
          <div key={instrument.id} className="instrument-card">
            <div className="card-image">
              <img src={instrument.image} alt={instrument.name} />
              <span className="category-badge">{instrument.category}</span>
            </div>
            
            <div className="card-content">
              <h3>{instrument.name}</h3>
              <p className="description">{instrument.description}</p>
              
              <div className="card-details">
                <div className="rating">
                  {renderStars(instrument.rating)}
                  <span className="rating-value">{instrument.rating}</span>
                </div>
                
                <div className="price">{instrument.price}</div>
              </div>
              
              <div className="card-actions">
                <button className="btn-details">Ver Detalhes</button>
                <button className="btn-favorite">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InstrumentTable = () => {
  const [instruments] = useState([
    {
      id: 1,
      name: 'Guitarra Elétrica',
      category: 'Cordas',
      brand: 'Fender',
      price: 'R$ 1.899,00',
      rating: 4.8,
      inStock: true
    },
    {
      id: 2,
      name: 'Piano Digital',
      category: 'Teclas',
      brand: 'Yamaha',
      price: 'R$ 3.499,00',
      rating: 4.9,
      inStock: true
    },
    {
      id: 3,
      name: 'Bateria Acústica',
      category: 'Percussão',
      brand: 'Pearl',
      price: 'R$ 4.299,00',
      rating: 4.7,
      inStock: false
    },
    {
      id: 4,
      name: 'Violino',
      category: 'Cordas',
      brand: 'Stentor',
      price: 'R$ 1.299,00',
      rating: 4.6,
      inStock: true
    },
    {
      id: 5,
      name: 'Saxofone Alto',
      category: 'Sopro',
      brand: 'Yamaha',
      price: 'R$ 2.899,00',
      rating: 4.5,
      inStock: true
    },
    {
      id: 6,
      name: 'Baixo Elétrico',
      category: 'Cordas',
      brand: 'Ibanez',
      price: 'R$ 1.799,00',
      rating: 4.4,
      inStock: false
    }
  ]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="instrument-table">
      <h2>Lista de Instrumentos</h2>
      <p className="page-description">Visualize nossos instrumentos em formato de tabela</p>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Marca</th>
              <th>Avaliação</th>
              <th>Preço</th>
              <th>Disponibilidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {instruments.map(instrument => (
              <tr key={instrument.id}>
                <td>{instrument.name}</td>
                <td>
                  <span className="category-tag">{instrument.category}</span>
                </td>
                <td>{instrument.brand}</td>
                <td>
                  <div className="rating">
                    {renderStars(instrument.rating)}
                    <span className="rating-value">{instrument.rating}</span>
                  </div>
                </td>
                <td className="price">{instrument.price}</td>
                <td>
                  <span className={`stock-status ${instrument.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {instrument.inStock ? 'Em Estoque' : 'Fora de Estoque'}
                  </span>
                </td>
                <td>
                  <button className="btn-action">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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