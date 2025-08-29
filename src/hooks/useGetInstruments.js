import { useState, useEffect } from 'react';

const useGetInstruments = () => {
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
        
        // Dados mockados para fallback
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

  return { instruments, loading, error };
};

export default useGetInstruments;