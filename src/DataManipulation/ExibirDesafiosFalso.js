import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  // Importando o toast
import 'react-toastify/dist/ReactToastify.css';  // Importando os estilos do toast
import './ExibirDesafiosfalso.css'; 



function ExibirDeasfios() {
  const [desafios, setDesafios] = useState([]);
  const [detalhesDesafio, setDetalhesDesafio] = useState(null);
  const [novaSolucao, setNovaSolucao] = useState('');
  const [abriCaixaModal, setAbrirCaixaModal] = useState(false); 
  const [editarModal, setEditarModal] = useState(false);
  const [desafioEditado, setDesafioEditado] = useState({
    id: '',
    desafio: '',
    recompensa: '',
    dataLimite: '',
    descricao: '',
  });

  useEffect(() => {
    const mostrarDesafios = async () => {
      try {
        const resposta = await axios.get('http://localhost:8080/desafios');
        setDesafios(resposta.data);
      } catch (error) {
        console.error('Erro ao buscar desafios', error);
        toast.error('Erro ao carregar desafios!');
      }
    };

    mostrarDesafios();
  }, []);

  const exibirDetalhesDesafio = async (id) => {
    try {
      const resposta = await axios.get(`http://localhost:8080/desafios/${id}`);
      setDetalhesDesafio(resposta.data);
      setAbrirCaixaModal(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes do desafio:', error);
      toast.error('Erro ao exibir detalhes do desafio!');
    }
  };
  
  const fecharModal = () => {
    setAbrirCaixaModal(false);
    setDetalhesDesafio(null);
  };

  const adicionarSolucao = async (id) => {
    try {
      await axios.post(`http://localhost:8080/desafios/${id}/solucoes`, {
        solucao: novaSolucao,
      });
      toast.success('Solução adicionada com sucesso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setNovaSolucao('');
      exibirDetalhesDesafio(id); 
    } catch (error) {
      console.error('Erro ao adicionar solução:', error);
      toast.error('Erro ao adicionar solução!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const funcaoEditarDesafio = (desafio) => {
    setDesafioEditado(desafio);
    setEditarModal(true);
  };

  const fecharEditarDesafio = () => {
    setEditarModal(false);
  };

  const editarDesafio = async () => {
    try {
      await axios.put(`http://localhost:8080/desafios/${desafioEditado.id}`, desafioEditado);
      setDesafios(
        desafios.map((desafio) =>
          desafio.id === desafioEditado.id ? { ...desafio, ...desafioEditado } : desafio
        )
      );
      setEditarModal(false);
      setDesafioEditado({ id: '', desafio: '', recompensa: '', dataLimite: '', descricao: '' });
      toast.success('Desafio editado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Erro ao editar desafio:', error);
      toast.error('Erro ao editar desafio!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const excluirDesafio = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/desafios/${id}`);
      setDesafios(desafios.filter((desafio) => desafio.id !== id));
      toast.success('Desafio excluído com sucesso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error('Erro ao excluir desafio:', error);
      toast.error('Erro ao excluir desafio!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <div className="container">
      {desafios.map((desafio) => (
        <div key={desafio.id} className="card">
          <h2>{desafio.desafio}</h2>
          <p>Recompensa: {desafio.recompensa}</p>
          <p>Data Limite: {desafio.dataLimite}</p>
          <p>Descrição: {desafio.descricao}</p>

          {desafio.criterios && (
            <div>
              <strong>Critérios:</strong>
              <ul>
                {desafio.criterios.map((criterio, index) => (
                  <li key={index}>{criterio}</li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={() => exibirDetalhesDesafio(desafio.id)} className="button-details">Exibir detalhes</button> <br />
          <button onClick={() => funcaoEditarDesafio(desafio)} className="button-details">Editar</button>
          <button onClick={() => excluirDesafio(desafio.id)} className="button-details">Excluir</button>
        </div>
      ))}

      {abriCaixaModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={fecharModal}>&times;</span>
            <h2>Detalhes do Desafio</h2>
            <p>Descrição: {detalhesDesafio.descricao}</p>
            <p>Recompensa: {detalhesDesafio.recompensa}</p>
            <p>Data Limite: {detalhesDesafio.dataLimite ? new Date(detalhesDesafio.dataLimite).toLocaleDateString('pt-BR') : 'Sem data limite'}</p>
            <p>Autor: {detalhesDesafio.autorId}</p>

            {detalhesDesafio.criterios && (
              <div>
                <strong>Critérios:</strong>
                <ul>
                  {detalhesDesafio.criterios.map((criterio, index) => (
                    <li key={index}>{criterio}</li>
                  ))}
                </ul>
              </div>
            )}

            <ul>
              <strong>Soluções:</strong>
              {detalhesDesafio.solucoes?.map((solucao, index) => (
                <li key={index}>{solucao}</li>
              ))}
            </ul>
            <input
              type="text"
              placeholder="Adicionar solução"
              value={novaSolucao}
              onChange={(e) => setNovaSolucao(e.target.value)}
            />
            <button onClick={() => adicionarSolucao(detalhesDesafio.id)}>Salvar</button>
          </div>
        </div>
      )}

      {editarModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={fecharEditarDesafio}>&times;</span>
            <h2>Editar Desafio</h2>
            <input
              type="text"
              name="desafio"
              placeholder="Nome do Desafio"
              value={desafioEditado.desafio}
              onChange={(e) => setDesafioEditado({ ...desafioEditado, desafio: e.target.value })}
            />
            <input
              type="text"
              name="recompensa"
              placeholder="Recompensa"
              value={desafioEditado.recompensa}
              onChange={(e) => setDesafioEditado({ ...desafioEditado, recompensa: e.target.value })}
            />
            <input
              type="date"
              name="dataLimite"
              placeholder="Data Limite"
              value={desafioEditado.dataLimite}
              onChange={(e) => setDesafioEditado({ ...desafioEditado, dataLimite: e.target.value })}
            />
            <textarea
              type="text"
              name="descricao"
              placeholder="Descrição"
              value={desafioEditado.descricao}
              onChange={(e) => setDesafioEditado({ ...desafioEditado, descricao: e.target.value })}
            />
            <button onClick={editarDesafio}>Salvar Alterações</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default ExibirDeasfios;
