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
        
        // Dados mockados baseados no componente de cards
        const mockInstruments = [
          {
            id: 1,
            nome: "Guitarra Fender Stratocaster",
            tipo: "Guitarra",
            marca: "Fender",
            ano: 2020,
            preco: 3500.00,
            ativo: true,
            voltagem: "Bivolt",
            peso_kg: 3.5
          },
          {
            id: 2,
            nome: "Microfone Shure SM58",
            tipo: "Microfone", 
            marca: "Shure",
            ano: 2018,
            preco: 800.00,
            ativo: true,
            voltagem: "N/A",
            peso_kg: 0.4
          },
          {
            id: 3,
            nome: "Mesa de Som Behringer X32",
            tipo: "Mesa de Som",
            marca: "Behringer",
            ano: 2019,
            preco: 12000.00,
            ativo: false,
            voltagem: "110V",
            peso_kg: 12
          },
          {
            id: 4,
            nome: "Teclado Yamaha PSR-E463",
            tipo: "Teclado",
            marca: "Yamaha",
            ano: 2021,
            preco: 2500.00,
            ativo: true,
            voltagem: "220V", 
            peso_kg: 6.6
          },
          {
            id: 5,
            nome: "Amplificador Marshall MG30FX",
            tipo: "Guitarra",
            marca: "Marshall",
            ano: 2022,
            preco: 1800.00,
            ativo: false,
            voltagem: "Bivolt",
            peso_kg: 7.8
          }
        ];
        
        setInstruments(mockInstruments);
      } finally {
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

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