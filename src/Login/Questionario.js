import React, { useState } from 'react';
import axios from 'axios';

function Questionario({ uid, onQuestionarioEnviado }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [CPF, setCPF] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [tipoConta, setTipoConta] = useState('');
  const [experiencias, setExperiencias] = useState('');
  const [listaExperiencias, setListaExperiencias] = useState([]);
  const [conhecimentos, setConhecimentos] = useState('');

  const adicionarExperiencia = () => {
    if (experiencias.trim() !== '') {
      setListaExperiencias([... listaExperiencias, experiencias])
      setExperiencias('');
    }
  }

  const enviar = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/contas/enviar-questionario', {
        userId: uid,
        email: '',
        displayName: '',
        nomeCompletoUsuario: nomeCompleto,
        CPFUsuario: CPF,
        dataNascimentoUsuario: dataNascimento,
        tipoConta,
        experiencias: listaExperiencias,
        listaConhecimentos: conhecimentos.split(',').map((conhe) => conhe.trim()),
      });

      onQuestionarioEnviado();
    } catch (error) {
      console.error('Erro ao enviar questionário:', error);
      alert('Erro ao enviar questionário.');
    }
  };

  return (
    <div>
      <div>
        <label>Nome Completo:</label>
        <input type="text" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required />
      </div>
      <div>
        <label>CPF:</label>
        <input type="text" value={CPF} onChange={(e) => setCPF(e.target.value)} required />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
      </div>
      <div>
        <label>Tipo de Conta:</label>
        <input type="text" value={tipoConta} onChange={(e) => setTipoConta(e.target.value)} required />
      </div>
      <div>
        <label>Adicione suas experiências:</label>
        <input 
          type="text" 
          value={experiencias} 
          onChange={(e) => setExperiencias(e.target.value)} />
          <button onClick={adicionarExperiencia}> Adicionar Experiência </button>
      </div>
      <ul>
        {listaExperiencias.map((experiencia, index) => (
          <li key={index}>{experiencia}</li>
        ))}
      </ul>
      <button onClick={enviar}>Enviar Questionário</button>
    </div>
  );
}

export default Questionario;
