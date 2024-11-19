import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [desafios, setDesafios] = useState([]);
  const [detalhesDesafio, setDetalhesDesafio] = useState(null);
  const [novaSolucao, setNovaSolucao] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const todosDesafios = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/desafios`);
        setDesafios(response.data);
      } catch (error) {
        console.error('Erro ao buscar desafios:', error);
      }
    };

    todosDesafios();
  }, []);

  const exibirDetalhesDesafios = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/desafios/${id}`);
      setDetalhesDesafio(response.data);
      setModalAberto(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes do desafio:', error);
    }
  };

  const adicionarNovaSolucao = async (id) => {
    try {
      await axios.post(`http://localhost:8080/desafios/${id}/solucoes`, {
        solucao: novaSolucao,
      });
      alert('Solução adicionada com sucesso');
      setNovaSolucao('');
      exibirDetalhesDesafios(id);
    } catch (error) {
      console.error('Erro ao adicionar solução:', error);
      alert('Erro ao adicionar solução');
    }
  };

  const fehcarJanela = () => {
    setModalAberto(false);
  };

  return (
    <div className="desafios">
      <div className="desafio-mostrar">
        {desafios.map((desafio) => (
          <div key={desafio.id} className="cartao">
            <h2 className="cartao-titulo">{desafio.desafio}</h2>
            <p className="cartao-detalhes"><strong>Recompensa:</strong> {desafio.recompensa || 'Sem recompensa'}</p>
            <p className="cartao-detalhes"><strong>Data Limite:</strong> {desafio.dataLimite || 'Sem data limite'}</p>
            <p className="cartao-detalhes"><strong>Descrição:</strong> {desafio.descricao || 'Sem descrição'}</p>
            <button
              onClick={() => exibirDetalhesDesafios(desafio.id)}
              className="botao-detalhes"
            >Exibir detalhes</button>
          </div>
        ))}
      </div>

      {modalAberto && detalhesDesafio && (
        <div className="modal">
          <div className="modal-container">
            <button className="modal-botao-fechar" onClick={fehcarJanela}>✖</button>
            <h2 className="modal-titulo">Detalhes do Desafio</h2>
            <p><strong>Descrição:</strong> {detalhesDesafio.descricao || 'Sem Descrição'}</p>
            <p><strong>Recompensa:</strong> {detalhesDesafio.recompensa || 'Sem Recompensa'}</p>
            <p><strong>Data Limite:</strong> {detalhesDesafio.dataLimite ? new Date(detalhesDesafio.dataLimite).toLocaleDateString('pt-BR') : 'Sem data limite'}</p>

            {detalhesDesafio.criterios && detalhesDesafio.criterios.length > 0 && (
              <div className="modal-criterios">
                <h3>Critérios do Desafio</h3>
                <ul>
                  {detalhesDesafio.criterios.map((criterio, index) => (
                    <li key={index} className="criterio-item">{criterio}</li>
                  ))}
                </ul>
              </div>
            )}

            <input
              type="text"
              placeholder="Adicionar solução"
              value={novaSolucao}
              onChange={(e) => setNovaSolucao(e.target.value)}
              className="modal-input-solucao"
            />
            <button onClick={() => adicionarNovaSolucao(detalhesDesafio.id)} className="modal-salvar">Salvar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
