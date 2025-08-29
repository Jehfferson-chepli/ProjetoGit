import React, { useState, useEffect } from 'react';
import './InstrumentCards.css';

const InstrumentCards = () => {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/equipamentos', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setInstruments(data);
        
      } catch (err) {
        setError(err.message);
        
        const mockInstruments = [
          {
            id: 1,
            nome: "Guitarra Fender",
            tipo: "Guitarra",
            marca: "Fender",
            ano: 2020,
            preco: 3500,
            ativo: true,
            voltagem: "Bivolt",
            peso_kg: 3.5
          },
          {
            id: 2,
            nome: "Microfone Shure",
            tipo: "Microfone",
            marca: "Shure",
            ano: 2018,
            preco: 800,
            ativo: true,
            voltagem: "N/A",
            peso_kg: 0.4
          }
        ];
        
        setInstruments(mockInstruments);
      } finally {
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando instrumentos...</p>
      </div>
    );
  }

  return (
    <div className="instrument-cards">
      <h2>Instrumentos em Destaque</h2>
      <p className="page-description">Visualize nossos instrumentos em formato de cards</p>
      
      {error && (
        <div className="error-banner">
          <div className="error-icon">⚠️</div>
          <div className="error-message">
            <h4>Erro de Conexão</h4>
            <p>{error}</p>
            <small>Mostrando dados de exemplo</small>
          </div>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Tentar Novamente
          </button>
        </div>
      )}
      
      <div className="cards-container">
        {instruments.map(instrument => (
          <div key={instrument.id} className="instrument-card">
            <div className="card-image">
              <img 
                src={`https://source.unsplash.com/random/300x200/?music,${instrument.tipo}`} 
                alt={instrument.nome} 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80';
                }}
              />
              <span className="category-badge">{instrument.tipo}</span>
            </div>
            
            <div className="card-content">
              <h3>{instrument.nome}</h3>
              <p className="modelo">{instrument.marca}</p>
              <p className="description">Instrumento musical profissional</p>
              
              <div className="card-details">
                <div className="card-detail-item">
                  <strong>Marca:</strong> {instrument.marca}
                </div>
                <div className="card-detail-item">
                  <strong>Ano:</strong> {instrument.ano}
                </div>
                <div className="card-detail-item">
                  <strong>Voltagem:</strong> {instrument.voltagem || 'N/A'}
                </div>
                <div className="card-detail-item">
                  <strong>Peso:</strong> {instrument.peso_kg} kg
                </div>
              </div>
              
              <div className="card-footer">
                <div className="price-status">
                  <div className="price">R$ {instrument.preco}</div>
                  <span className={`status-badge ${instrument.ativo ? 'ativo' : 'inativo'}`}>
                    {instrument.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                
                <div className="card-actions">
                  <button className="btn-details">Ver Detalhes</button>
                  <button className="btn-favorite">
                    <i className="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstrumentCards;