import React from 'react';
import useGetInstruments from '../hooks/useGetInstruments';
import './InstrumentCards.css';

const InstrumentCards = () => {
  const { instruments, loading, error } = useGetInstruments();

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
                  <div className="price">R$ {instrument.preco.toFixed(2)}</div>
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