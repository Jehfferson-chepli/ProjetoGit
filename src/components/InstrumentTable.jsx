import React from 'react';
import useGetInstruments from '../hooks/useGetInstruments';
import './InstrumentTable.css';

const InstrumentTable = () => {
  const { instruments, loading, error } = useGetInstruments();

  // Função para formatar o preço em Real brasileiro
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

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
      <h2>Lista de Instrumentos</h2>
      <p className="page-description">Visualize nossos instrumentos em formato de tabela</p>
      
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
            {instruments.map(instrument => (
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
                <td className="price-cell">{formatPrice(instrument.preco)}</td>
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
    </div>
  );
};

export default InstrumentTable;