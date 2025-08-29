import React, { useState, useEffect } from 'react';
import './InstrumentTable.css';

const InstrumentTable = () => {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:3000/equipamentos');
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setInstruments(data);
        
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar instrumentos:', err);
        
        // Dados mockados de fallback
        setInstruments([
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
        ]);
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
    <div className="instrument-table-container">
      <div className="table-header">
        <h2>Lista de Instrumentos</h2>
        <div className="header-actions">
          <button className="btn-add">
            <i className="fas fa-plus"></i> Adicionar Instrumento
          </button>
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Buscar instrumento..." />
          </div>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <div className="error-icon">⚠️</div>
          <div className="error-message">
            <h4>Erro de conexão</h4>
            <p>{error}</p>
            <small>Mostrando dados de exemplo</small>
          </div>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Tentar Novamente
          </button>
        </div>
      )}

      <div className="table-responsive">
        <table className="instruments-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Marca</th>
              <th>Voltagem</th>
              <th>Ano</th>
              <th>Preço</th>
              <th>Peso (kg)</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {instruments.map((instrument) => (
              <tr key={instrument.id}>
                <td>
                  <div className="instrument-name">
                    <strong>{instrument.nome}</strong>
                  </div>
                </td>
                <td>{instrument.tipo}</td>
                <td>{instrument.marca}</td>
                <td>{instrument.voltagem || 'N/A'}</td>
                <td>{instrument.ano}</td>
                <td className="price-cell">R$ {instrument.preco}</td>
                <td>{instrument.peso_kg}</td>
                <td>
                  <span className={`status-badge ${instrument.ativo ? 'ativo' : 'inativo'}`}>
                    {instrument.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" title="Editar">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn-delete" title="Excluir">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="pagination-info">
          Mostrando {instruments.length} de {instruments.length} instrumentos
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled>
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="pagination-page">1</span>
          <button className="pagination-btn" disabled>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentTable;